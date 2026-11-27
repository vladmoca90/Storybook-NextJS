const fs = require('fs');
const read = p => fs.readFileSync(p, 'utf8');
const write = (p, s) => { fs.mkdirSync(require('path').dirname(p), { recursive: true }); fs.writeFileSync(p, s); };
const edit = (p, fn) => write(p, fn(read(p)));

// API payloads must contain JSON values, not React elements.
edit('app/data/gothic.ts', s => s.replace(/\(\s*<>\s*([\s\S]*?)\s*<\/>\s*\)/g, (_, text) => JSON.stringify(text.trim().replace(/\s*<br\s*\/>\s*/g, '\n').replace(/[^\S\n]+/g, ' '))));
edit('app/data/types/gothic.ts', s => s.replace('title: ReactNode;', 'title: string;').replace('description: ReactNode;', 'description: string;'));

for (const [file, marker, target] of [['cars','export const formatPrice','car-format'], ['products','export const calculateDiscountAmount','discounts']]) {
  const source = read(`app/data/${file}.ts`);
  const index = source.indexOf(marker);
  write(`lib/${target}.ts`, source.slice(index));
  write(`app/data/${file}.ts`, source.slice(0,index) + `export { ${file === 'cars' ? 'formatPrice, formatMileage' : 'calculateDiscountAmount, calculateSalePrice'} } from '@/lib/${target}';\n`);
}
write('app/data/quick-list.ts', `import type { ListItem } from './types/quick-list';\nexport type { ListItem } from './types/quick-list';\nexport const items: ListItem[] = [];\n`);

const routes = {
  airlines: ['airlines', 'airlines'], cars: ['cars','cars'], countries: ['countries','countries'], currencies: ['currencies','Currencies'],
  people: ['people','people'], products: ['products','products'], wines: ['wines','allWines'],
  gothic: ['gothic','products, slides, categories','{ products, slides, categories }'],
  medals: ['medals','data, colors, medalTypes','{ data, colors, medalTypes }'],
  'quick-list': ['quick-list','items'],
  cv: ['../cv/resume-data','experience, skills','{ experience, skills }'],
  'reading-pharmacies': ['../reading-pharmacies/pharmacies.json','snapshot','snapshot'],
};
for (const [key,[module,names,body]] of Object.entries(routes)) {
  const source = module.startsWith('../') ? `@/app/${module.slice(3)}` : `@/app/data/${module}`;
  write(`app/api/${key}/route.ts`, `import { NextResponse, NextRequest } from 'next/server';\nimport ${key === 'reading-pharmacies' ? names : `{ ${names} }`} from '${source}';\n\nexport async function GET(request: NextRequest) {\n  return NextResponse.json(\n    {\n      body: ${body || names},\n      path: request.nextUrl.pathname,\n      query: request.nextUrl.search,\n      cookies: request.cookies.getAll(),\n    },\n    { status: 200 },\n  );\n}\n\n// http://localhost:3000/api/${key}\n`);
}

const roots = [
 ['app/departures/DeparturesBoard.tsx','DeparturesBoard','airlines','flights'],
 ['app/cars/page.tsx','Home','cars','cars'],
 ['app/countries/components/CountriesExplorer.tsx','CountriesExplorer','countries','countries'],
 ['app/people/PeopleDirectory.tsx','PeopleDirectory','people','people'],
 ['app/discounts/DiscountShop.tsx','DiscountShop','products','products'],
 ['app/wines/WineShop.tsx','WineShop','wines','allWines'],
 ['app/gothic/GothicShop.tsx','GothicShop','gothic','{ products }'],
 ['app/medal-chart/components/MedalChart.tsx','MedalChart','medals','{ colors, data }'],
 ['app/quick-list/QuickList.tsx','QuickList','quick-list','initialItems'],
];
for (const [path,name,key,binding] of roots) {
  edit(path, s => {
    s = s.replace(/^import \{[^\n]+\} from ["'][^"']*data\/(airlines|cars|countries|people|products|wines|gothic|medals)["'];\r?\n/gm, '');
    const extras = key === 'cars' ? `import { formatPrice, formatMileage } from '@/lib/car-format';\n` : key === 'products' ? `import { calculateDiscountAmount, calculateSalePrice } from '@/lib/discounts';\n` : key === 'wines' ? `import { WineCategory } from '@/app/data/types/wineCategory';\n` : '';
    s = s.replace(`export default function ${name}() {`, `function ${name}() {\n  const ${binding} = useApiData('${key}');`);
    s = s.replace(/^("use client";|'use client';)/, `$1\nimport { apiBaseUrl } from '@/lib/api';\nimport { useApiData, withApiData } from '@/lib/api-client';\n${extras}\nconst ${key.replace(/-([a-z])/g, (_,c) => c.toUpperCase())}Url = \`\${apiBaseUrl}/api/${key}\`;`);
    return s + `\nexport default withApiData(${name}, '${key}', ${key.replace(/-([a-z])/g, (_,c) => c.toUpperCase())}Url);\n`;
  });
}
edit('app/cars/page.tsx', s => {
 const constants = s.match(/const makes =[\s\S]*?const transmissions =[^\n]+/)[0];
 return s.replace(constants, '').replace("const cars = useApiData('cars');", `const cars = useApiData('cars');\n  ${constants}`).replace('[body, fuel, make, maxPrice, query, sort, transmission]', '[cars, body, fuel, make, maxPrice, query, sort, transmission]');
});
edit('app/people/PeopleDirectory.tsx', s => s.replace('const pageCount = Math.ceil(people.length / PAGE_SIZE);','').replace("const people = useApiData('people');", "const people = useApiData('people');\n  const pageCount = Math.max(1, Math.ceil(people.length / PAGE_SIZE));"));
edit('app/countries/components/CountriesExplorer.tsx', s => s.replace('0), []);','0), [countries]);').replace('[population, query, sort]', '[countries, population, query, sort]'));
edit('app/discounts/DiscountShop.tsx', s => s.replace('useState(1)', 'useState(products[0]?.id ?? 0)').replace('products[0].discount','products[0]?.discount ?? 0').replace('[category, query]', '[products, category, query]').replace('  return (\n    <main', '  if (!selected) return <p role="status" className="p-8">No products available.</p>;\n\n  return (\n    <main'));
edit('app/discounts/components/ProductCard.tsx', s => s.replace('../../data/products','@/lib/discounts'));
edit('app/quick-list/QuickList.tsx', s => s.replace('useState<ListItem[]>([])','useState<ListItem[]>(initialItems)'));
for (const [path,key,binding] of [
 ['app/gothic/components/HeroCarousel.tsx','gothic','slides'],
 ['app/gothic/components/ProductCollection.tsx','gothic','categories'],
 ['app/medal-chart/components/MedalPlot.tsx','medals','medalTypes'],
 ['app/medal-chart/components/MedalLegend.tsx','medals','medalTypes'],
 ['app/cv/components/SkillsComponent.tsx','cv','skills'],
 ['app/cv/components/WorkExperienceComponent.tsx','cv','experience'],
]) {
 edit(path, s => s.replace(/^import \{ (slides|categories|medalTypes|skills|experience) \} from [^\n]+\n/m, `import { useApiData } from '@/lib/api-client';\n`).replace(/(export default function [^{]+\{(?:[^}]*\}[^)]*)?\) \{)/, '$1') );
 // Match the function body, including destructured props.
 edit(path, s => s.replace(/(export default function [\s\S]*?\) \{)/, `$1\n  const { ${binding} } = useApiData('${key}');`));
}
edit('app/gothic/components/HeroCarousel.tsx', s => s.replace('{current.title}', '<span className="whitespace-pre-line">{current.title}</span>').replace('{current.description}', '<span className="whitespace-pre-line">{current.description}</span>'));
write('app/medal-chart/MedalChart.tsx', `export { default } from './components/MedalChart';\n`);
write('app/countries/data/countries.ts', `export { countries } from '@/app/data/countries';\n`);
for (const p of ['app/people/components/PersonRow.tsx','app/people/components/PeopleTable.tsx']) edit(p,s=>s.replace('../../data/people','../../data/types/people'));

// Keep page metadata on the server and load data in a client boundary.
let cv = read('app/cv/page.tsx');
const metadata = cv.match(/export const metadata:[\s\S]*?\n};/)[0];
cv = cv.replace('import type { Metadata } from "next";\n','').replace(metadata,'').replace('export default function CVPage()', 'function CVContent()');
write('app/cv/CVContent.tsx', `'use client';\nimport { apiBaseUrl } from '@/lib/api';\nimport { withApiData } from '@/lib/api-client';\nconst cvUrl = \`\${apiBaseUrl}/api/cv\`;\n${cv}\nexport default withApiData(CVContent, 'cv', cvUrl);\n`);
write('app/cv/page.tsx', `import type { Metadata } from 'next';\nimport CVContent from './CVContent';\n${metadata}\nexport default function CVPage() { return <CVContent />; }\n`);
let pharmacy = read('app/reading-pharmacies/page.tsx');
const pm = pharmacy.match(/export const metadata:[\s\S]*?\n};/)[0];
pharmacy = pharmacy.replace('import type { Metadata } from "next";\n','').replace('import snapshot from "./pharmacies.json";','').replace(pm,'').replace('export default function ReadingPharmaciesPage() {', `function PharmacyContent() {\n  const snapshot = useApiData('reading-pharmacies');`);
write('app/reading-pharmacies/PharmacyContent.tsx', `'use client';\nimport { apiBaseUrl } from '@/lib/api';\nimport { useApiData, withApiData } from '@/lib/api-client';\nconst pharmaciesUrl = \`\${apiBaseUrl}/api/reading-pharmacies\`;\n${pharmacy}\nexport default withApiData(PharmacyContent, 'reading-pharmacies', pharmaciesUrl);\n`);
write('app/reading-pharmacies/page.tsx', `import type { Metadata } from 'next';\nimport PharmacyContent from './PharmacyContent';\n${pm}\nexport default function ReadingPharmaciesPage() { return <PharmacyContent />; }\n`);

edit('app/cars/[slug]/page.tsx', s => s.replace("import { cars, formatMileage, formatPrice } from '@/app/data/cars';", `import { formatMileage, formatPrice } from '@/lib/car-format';\nimport { getCars } from '@/lib/api-server';`).replace(/export function generateStaticParams\(\) \{[\s\S]*?\n\}\n/, '').replaceAll('  const { slug } = await params;', '  const [{ slug }, cars] = await Promise.all([params, getCars()]);'));
