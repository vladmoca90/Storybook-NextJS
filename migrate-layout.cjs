const fs = require('fs');
const path = require('path');
const postcss = require('postcss');

function files(dir) {
  return fs.readdirSync(dir, {withFileTypes:true}).flatMap(e => e.isDirectory() ? files(path.join(dir,e.name)) : [path.join(dir,e.name)]);
}
const rem = value => value.replace(/(-?\d*\.?\d+)px/g, (_,n)=>`${Number(n)/16}rem`);
const simple = {
  display: {flex:'flex',grid:'grid',block:'block',none:'hidden','inline-flex':'inline-flex','inline-block':'inline-block'},
  position: {relative:'relative',absolute:'absolute'},
  'align-items': {center:'items-center',start:'items-start','flex-start':'items-start','flex-end':'items-end'},
  'justify-content': {center:'justify-center','space-between':'justify-between'},
  'place-items': {center:'place-items-center'},
  'flex-direction': {column:'flex-col'},
  'border-collapse': {collapse:'border-collapse'},
  'text-align': {center:'text-center',left:'text-left',right:'text-right'},
  'white-space': {nowrap:'whitespace-nowrap'},
  'pointer-events': {none:'pointer-events-none'},
  cursor: {pointer:'cursor-pointer'},
};
const prefixes = {width:'w',height:'h','min-width':'min-w','max-width':'max-w','min-height':'min-h','max-height':'max-h',padding:'p','padding-left':'pl','padding-top':'pt','padding-bottom':'pb',margin:'m','margin-left':'ml','margin-top':'mt','margin-bottom':'mb',gap:'gap','border-radius':'rounded','grid-template-columns':'grid-cols','align-self':'self','flex-shrink':'shrink','z-index':'z',overflow:'overflow'};
const layoutProps = new Set([...Object.keys(simple),...Object.keys(prefixes)]);

function convert(cssFile, sourceFiles, module = true) {
  const root = postcss.parse(fs.readFileSync(cssFile,'utf8'));
  const additions = new Map();
  root.walkRules(rule => {
    if (!rule.selectors.every(s=>/^\.[\w-]+/.test(s))) return;
    if (rule.selector.includes('.srOnly')) return;
    let media = '';
    if (rule.parent.type === 'atrule') {
      if (rule.parent.name !== 'media') return;
      media = `[@media${rule.parent.params.replace(/\s+/g,'')}]:`;
    }
    const targets = rule.selectors.map(s=> {
      const [,name,tail]=s.match(/^\.([\w-]+)(.*)$/);
      if(module && /\.[\w-]+/.test(tail)) return null;
      return {name, prefix:media+(tail ? `[&${tail.replace(/ /g,'_')}]:` : '')};
    });
    if(targets.some(t=>!t)) return;
    const used = targets.every(({name})=>sourceFiles.some(file=> {
      const source=fs.readFileSync(file,'utf8');
      return module ? source.includes(`styles.${name}`) : source.includes(name);
    }));
    if(!used) return;
    rule.walkDecls(decl=> {
      let utility;
      const value = rem(decl.value);
      if (/^border(?:-(?:top|bottom|left|right))?$/.test(decl.prop)) {
        if(value === '0' || value === 'none') utility = 'border-0';
        else {
          const match = value.match(/^(\S+) (solid|dashed) (.+)$/);
          if(!match) return;
          const side=decl.prop.replace('border','').replace('-top','-t').replace('-bottom','-b').replace('-left','-l').replace('-right','-r');
          utility = `border${side}-[${match[1]}]`;
          if(match[2] === 'dashed') utility += ' border-dashed';
          decl.prop += '-color';
          decl.value = match[3];
        }
      } else if(layoutProps.has(decl.prop)) {
        utility = simple[decl.prop]?.[value];
        if(!utility) {
          const prefix=prefixes[decl.prop];
          if(prefix && !value.includes(' ')) utility=`${prefix}-[${value}]`;
          else utility=`[${decl.prop}:${value.replace(/ /g,'_')}]`;
        }
      } else if(decl.prop === 'outline' && /^(none|0)$/.test(value)) utility='outline-none';
      else return;
      for(const {name,prefix} of targets) {
        const set=additions.get(name)??new Set();
        for(const token of utility.split(' ')) set.add(prefix+token+(decl.important?'!':''));
        additions.set(name,set);
      }
      if(!decl.prop.endsWith('-color')) decl.remove();
    });
  });
  root.walkRules(rule=>{if(!rule.nodes.length) rule.remove();});
  root.walkAtRules(rule=>{if(rule.nodes && !rule.nodes.length) rule.remove();});
  const css=root.toString();
  for(const file of sourceFiles) {
    let source=fs.readFileSync(file,'utf8');
    for(const [name,set] of additions) {
      const utilities=[...set].join(' ');
      if(module) {
        const retained = new RegExp('\\.'+name+'(?![\\w-])').test(css);
        source=source.replaceAll('${styles.'+name+'}', retained?'${styles.'+name+'} '+utilities:utilities);
        source=source.replaceAll('className={styles.'+name+'}', retained?'className={`${styles.'+name+'} '+utilities+'`}':'className="'+utilities+'"');
      } else {
        source=source.replace(new RegExp('(?<=["` ])'+name+'(?=["` $])','g'),name+' '+utilities);
      }
    }
    fs.writeFileSync(file,source);
  }
  fs.writeFileSync(cssFile,css);
  console.log(cssFile, additions.size, 'layout groups migrated');
}

const tsx=dir=>files(dir).filter(f=>f.endsWith('.tsx')&&!f.includes('.stories.'));
convert('app/dashboard/dashboard.css',tsx('app/dashboard'),false);
convert('app/departures/departures.module.css',tsx('app/departures'));
fs.copyFileSync('app/dashboard/page.module.css','app/medal-chart/OlympicsPage.module.css');
const olympics='app/medal-chart/OlympicsPage.tsx';
fs.writeFileSync(olympics,fs.readFileSync(olympics,'utf8').replace('../page.module.css','./OlympicsPage.module.css'));
convert('app/medal-chart/OlympicsPage.module.css',[olympics]);
// The old stylesheet lived under an unrelated project and had no consumers.
fs.unlinkSync('app/dashboard/page.module.css');
// Keep D3's class selectors intact; attach layout utilities to its generated groups separately.
const chartFiles=tsx('app/medal-chart/components');
convert('app/medal-chart/MedalChart.module.css',chartFiles);
for(const file of chartFiles) {
  let source=fs.readFileSync(file,'utf8');
  source=source.replace('.attr("class", styles.grid)', '.attr("class", `${styles.grid} [&_path]:hidden`)');
  fs.writeFileSync(file,source);
}
