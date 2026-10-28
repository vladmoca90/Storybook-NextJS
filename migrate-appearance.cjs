const fs = require('fs');
const path = require('path');
const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const postcss = require('postcss');
const selectors = require('postcss-selector-parser');
const tw = require('tailwindcss');

const rem = s => s.replace(/(-?\d*\.?\d+)px/g, (_, n) => `${Number(n) / 16}rem`);
const files = dir => fs.readdirSync(dir,{withFileTypes:true}).flatMap(e=>e.isDirectory()?files(path.join(dir,e.name)):[path.join(dir,e.name)]);
const appearanceProperties = /^(?:color|background(?:-.+)?|font(?:-.+)?|line-height|letter-spacing|text-transform|text-decoration(?:-.+)?|text-underline-offset|border(?:-(?:top|bottom|left|right|inline|block)(?:-(?:start|end))?)?-color|accent-color|fill|stroke(?:-.+)?|box-shadow|--tw-(?:font-weight|leading|tracking|shadow.*|inset-shadow.*|ring-color|inset-ring-color|border-opacity|text-opacity|bg-opacity|gradient.*))$/;

async function main() {
  const theme = fs.readFileSync('node_modules/tailwindcss/theme.css','utf8');
  const themeValues = new Map();
  postcss.parse(theme).walkDecls(d=>themeValues.set(d.prop,d.value));
  const ds = await tw.__unstable__loadDesignSystem(theme);
  const inlineTheme = value => {
    for(let i=0;i<5;i++) value=value.replace(/var\((--[\w-]+)\)/g,(match,key)=>themeValues.get(key)??match);
    return value;
  };
  for(const project of ['countries','discounts','departures','cars','dashboard','medal-chart']) {
    const dir=`app/${project}`;
    const sourceFiles=files(dir).filter(f=>f.endsWith('.tsx')&&!f.includes('.stories.'));
    const candidateMap=new Map();
    const records=[];
    const usedKeys=new Set();
    function appearance(token) {
      if(candidateMap.has(token)) return candidateMap.get(token);
      const compiled=ds.candidatesToCss([token])[0];
      if(!compiled) { candidateMap.set(token,null); return null; }
      const ast=postcss.parse(compiled);
      const declarations=[];
      ast.walkRules(rule=>rule.walkDecls(d=>declarations.push(d)));
      // Keep layout, transitions, and runtime sizing in Tailwind.
      if(!declarations.length || !declarations.every(d=>appearanceProperties.test(d.prop)||d.prop==='content')) {
        candidateMap.set(token,null); return null;
      }
      let key=token.replace(/var\(--/g,'').replace(/[^a-zA-Z0-9]+(.)?/g,(_,next)=>next?next.toUpperCase():'');
      if(!/^[a-zA-Z]/.test(key)) key='style'+key;
      let unique=key, count=2;
      while(usedKeys.has(unique)) unique=key+count++;
      usedKeys.add(unique);
      ast.walkRules(rule=> {
        rule.selector=selectors(root=>root.walkClasses(node=> {
          if(node.value===token) node.value=unique;
          else node.replaceWith(selectors.pseudo({value:':global',nodes:[selectors.selector({nodes:[node.clone()]})]}));
        })).processSync(rule.selector);
      });
      ast.walkDecls(d=> { d.value=inlineTheme(d.value); });
      const entry={key:unique,ast,token};
      candidateMap.set(token,entry);
      return entry;
    }
    for(const file of sourceFiles) {
      let source=fs.readFileSync(file,'utf8');
      const tree=parser.parse(source,{sourceType:'module',plugins:['typescript','jsx']});
      const edits=[];
      let usesAppearance=false;
      function visit(nodePath) {
        const node=nodePath.node;
        const active=nodePath.findParent(p => (p.isJSXAttribute() && p.node.name.name==='className') || (p.isVariableDeclarator() && /Class$/.test(p.node.id.name ?? '')));
        if(active) {
          const original=node.type==='TemplateElement'?node.value.raw:node.value;
          const converted=original.split(/(\s+)/).map(token=> {
            if(!token.trim()) return token;
            token=rem(token).replace(/(?<=^|:)h-px$/,'h-[0.0625rem]');
            // Split old arbitrary border shorthands so border color lives in CSS.
            const border=token.match(/^(.*)\[(border(?:-(?:top|bottom|left|right))?):([^_]+)_solid_(.+)\]$/);
            let layout='';
            if(border) {
              layout=`${border[1]}[${border[2]}-width:${border[3]}] ${border[1]}[${border[2]}-style:solid] `;
              token=`${border[1]}[${border[2]}-color:${border[4]}]`;
            }
            const entry=appearance(token);
            if(!entry) return layout+token;
            usesAppearance=true;
            return layout+'${appearance.'+entry.key+'}';
          }).join('');
          let text;
          if(node.type==='TemplateElement') text=converted;
          else {
            text='`'+converted+'`';
            if(nodePath.parentPath.isJSXAttribute()) text='{'+text+'}';
          }
          edits.push({start:node.start,end:node.end,text});
        }
      }
      traverse(tree,{StringLiteral:visit, TemplateElement:visit});
      for(const edit of edits.sort((a,b)=>b.start-a.start)) source=source.slice(0,edit.start)+edit.text+source.slice(edit.end);
      if(usesAppearance) {
        const relative=path.relative(path.dirname(file),path.join(dir,'appearance.module.css')).replaceAll('\\','/');
        const importLine=`import appearance from "${relative.startsWith('.')?relative:'./'+relative}";\n`;
        const directive=source.match(/^(["']use client["'];?\s*)/);
        const index=directive?directive[0].length:0;
        source=source.slice(0,index)+importLine+source.slice(index);
      }
      records.push([file,source]);
    }
    const entries=[...candidateMap.values()].filter(Boolean);
    const order=new Map(ds.getClassOrder(entries.map(e=>e.token)));
    entries.sort((a,b)=>order.get(a.token)<order.get(b.token)?-1:1);
    if(entries.length) {
      const output=postcss.root();
      output.append(postcss.comment({text:'Colors, backgrounds, and typography. Layout and responsive geometry stay in Tailwind.'}));
      const properties=new Set();
      for(const entry of entries) {
        for(const node of [...entry.ast.nodes]) {
          if(node.type==='atrule'&&node.name==='property') {
            if(properties.has(node.params)) continue;
            properties.add(node.params);
          }
          output.append(node);
        }
      }
      fs.writeFileSync(path.join(dir,'appearance.module.css'),output.toString());
    }
    for(const [file,source] of records) fs.writeFileSync(file,source);
    console.log(project,entries.length,'appearance styles moved to CSS');
  }
}
main().catch(error=>{console.error(error);process.exitCode=1;});
