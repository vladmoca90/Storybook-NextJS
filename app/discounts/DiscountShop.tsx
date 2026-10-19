"use client";

import { useMemo, useState } from "react";
import { ArrowRight, Search, Sparkles, Tag } from "lucide-react";
import { calculateDiscountAmount, calculateSalePrice, products } from "../data/products";
import type { ProductCategory } from "../data/types/products";
import { ProductArt } from "./ProductArt";
import ProductCard from "./components/ProductCard";
import colors from "./discount-colors.module.css";

const money = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });
const categories: Array<"All" | ProductCategory> = ["All", "Audio", "Home", "Kitchen", "Lifestyle", "Travel"];
const logoClass = "flex items-center gap-2.5 text-sm font-black tracking-[.12em]";
const kickerClass = "flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-[.17em] text-[var(--store-accent)]";
const headingClass = "font-serif font-normal tracking-[-.055em]";

export default function DiscountShop() {
  const [category, setCategory] = useState<(typeof categories)[number]>("All");
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(1);
  const [customDiscount, setCustomDiscount] = useState(products[0].discount);
  const selected = products.find((product) => product.id === selectedId) ?? products[0];
  const visibleProducts = useMemo(() => products.filter((product) => {
    const matchesCategory = category === "All" || product.category === category;
    return matchesCategory && product.name.toLowerCase().includes(query.toLowerCase());
  }), [category, query]);

  const selectProduct = (id: number) => {
    const product = products.find((item) => item.id === id);
    if (!product) return;
    setSelectedId(id);
    setCustomDiscount(product.discount);
    document.getElementById("calculator")?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <main className={`${colors.theme} min-h-screen bg-[var(--store-canvas)] font-sans text-[var(--store-ink)]`}>
      <header className="relative z-10 flex h-20 items-center justify-between border-b border-[var(--store-nav-line)] px-6 sm:px-[5vw]">
        <a className={logoClass} href="#top"><span className="grid size-[34px] place-items-center rounded-full bg-[var(--store-accent)] text-white"><Tag size={18} /></span>MARKDOWN</a>
        <nav aria-label="Main navigation" className="hidden gap-8 md:flex"><a className="text-[13px] font-bold" href="#deals">Deals</a><a className="text-[13px] font-bold" href="#calculator">Calculator</a></nav>
        <a className="hidden items-center gap-2 text-[13px] font-bold md:flex" href="#deals">Shop the drop <ArrowRight size={15} /></a>
      </header>

      <section className="grid min-h-[630px] grid-cols-1 gap-10 overflow-hidden px-6 py-12 sm:px-[5vw] lg:grid-cols-2 lg:gap-[7vw] lg:py-[54px] lg:pb-[70px]" id="top">
        <div className="max-w-[650px] self-center">
          <p className={kickerClass}><Sparkles size={15} /> This week’s edit</p>
          <h1 className={`${headingClass} my-6 text-[clamp(58px,7vw,108px)] leading-[.87]`}>Good design.<br /><em className="font-normal text-[var(--store-accent)]">Better prices.</em></h1>
          <p className="max-w-[500px] font-serif text-[19px] leading-[1.6] text-[var(--store-body)]">Ten objects worth keeping, each with a price that makes the decision delightfully easy.</p>
          <div className="mt-9 flex flex-col items-start gap-7 min-[420px]:flex-row min-[420px]:items-center">
            <a className="inline-flex items-center gap-3 bg-[var(--store-ink)] px-[22px] py-[17px] text-white" href="#deals">Explore the deals <ArrowRight size={17} /></a>
            <span className="text-xs text-[var(--store-muted)]"><strong className="mr-1 text-xl text-[var(--store-ink)]">10</strong> curated finds</span>
          </div>
        </div>
        <div className="relative flex min-h-[430px] flex-col items-center justify-center rounded-[48%_48%_8px_8px] bg-[var(--store-hero)] before:absolute before:inset-[25px] before:rounded-[48%_48%_8px_8px] before:border before:border-white/60 lg:min-h-[520px]">
          <div className="absolute right-[-10px] top-[45px] z-20 grid size-24 rotate-[8deg] place-content-center rounded-full bg-[var(--store-accent)] text-center uppercase text-white shadow-[0_14px_25px_var(--store-badge-shadow)] lg:right-[-30px] lg:size-[116px]"><span className="text-[9px] font-extrabold tracking-[.16em]">up to</span><strong className="font-serif text-[25px] leading-none lg:text-[31px]">35%</strong><span className="text-[9px] font-extrabold tracking-[.16em]">off</span></div>
          <div className="z-10 w-[min(80%,430px)] text-[var(--store-illustration)] drop-shadow-[0_22px_20px_var(--store-art-shadow)]"><ProductArt type="chair" accent="var(--store-accent)" /></div>
          <p className="z-10 text-[10px] font-black tracking-[.13em]">CURVE LOUNGE CHAIR <span className="text-[var(--store-accent)]">— 28% OFF</span></p>
        </div>
      </section>

      <section className="bg-[var(--store-paper)] px-6 py-24 sm:px-[5vw]" id="deals">
        <div className="flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between">
          <div><p className={kickerClass}>The collection</p><h2 className={`${headingClass} my-2 text-[clamp(38px,5vw,64px)]`}>Small luxuries, marked down.</h2></div>
          <p className="max-w-[400px] text-sm leading-[1.7] text-[var(--store-copy)]">Every discount is calculated from the original price, so the number you see is the number you pay.</p>
        </div>
        <div className="my-8 flex flex-col items-start justify-between gap-5 border-t border-[var(--store-line)] pt-[22px] lg:my-12 lg:flex-row lg:items-center">
          <div className="flex flex-wrap gap-2">{categories.map((item) => <button key={item} className={`cursor-pointer rounded-full px-3.5 py-2.5 text-xs font-bold ${category === item ? "bg-[var(--store-ink)] text-white" : "text-[var(--store-filter)]"}`} onClick={() => setCategory(item)}>{item}</button>)}</div>
          <label className="flex items-center gap-2 border-b border-[var(--store-search-line)] p-2"><Search size={17} /><span className="sr-only">Search products</span><input className="w-36 bg-transparent outline-none" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search products" /></label>
        </div>
        <div className="grid grid-cols-2 gap-x-2.5 gap-y-7 md:grid-cols-3 lg:grid-cols-5 lg:gap-x-[18px]">
          {visibleProducts.map((product) => (
            <ProductCard key={product.id} product={product} onSelect={selectProduct} />
          ))}
        </div>
        {visibleProducts.length === 0 && <p className="py-16 text-center text-[var(--store-muted)]">No products match that search. Try another word.</p>}
      </section>

      <section className="grid grid-cols-1 gap-[8vw] bg-[var(--store-ink)] px-6 py-24 text-white sm:px-[9vw] lg:grid-cols-[.8fr_1.2fr] lg:px-[clamp(24px,9vw,140px)]" id="calculator">
        <div><p className={kickerClass}>Price calculator</p><h2 className={`${headingClass} my-4 text-[clamp(48px,6vw,78px)] leading-[.95]`}>See exactly<br />what you save.</h2><p className="max-w-[390px] leading-[1.7] text-[var(--store-inverse-copy)]">Choose a product and adjust the discount. The price and savings update instantly.</p><div className="mt-10 max-w-[390px] border-l-2 border-[var(--store-accent)] pl-[18px] font-mono text-xs leading-[1.7] text-[var(--store-formula)]">Sale price = Original price − (Original price × Discount ÷ 100)</div></div>
        <div className="bg-[var(--store-card)] p-[clamp(28px,5vw,60px)] text-[var(--store-ink)] shadow-[8px_8px_0_var(--store-accent)] lg:shadow-[14px_14px_0_var(--store-accent)]">
          <label className="flex flex-col gap-2.5 text-[11px] font-extrabold uppercase tracking-[.13em]">Product<select className="appearance-none border border-[var(--store-input-line)] bg-[var(--store-paper)] p-4 font-serif text-lg" value={selectedId} onChange={(event) => selectProduct(Number(event.target.value))}>{products.map((product) => <option value={product.id} key={product.id}>{product.name}</option>)}</select></label>
          <div className="mt-9 flex items-end justify-between"><label className="text-[11px] font-extrabold uppercase tracking-[.13em]" htmlFor="discount">Discount</label><strong className="font-serif text-[31px] text-[var(--store-accent)]">{customDiscount}%</strong></div>
          <input id="discount" className="my-3.5 mb-8 w-full accent-[var(--store-accent)]" type="range" min="0" max="70" value={customDiscount} onChange={(event) => setCustomDiscount(Number(event.target.value))} />
          <div className="border-t border-[var(--store-divider)]"><div className="flex justify-between border-b border-[var(--store-divider)] py-[15px]"><span className="text-[13px] text-[var(--store-label)]">Original price</span><strong className="text-sm">{money.format(selected.price)}</strong></div><div className="flex justify-between border-b border-[var(--store-divider)] py-[15px]"><span className="text-[13px] text-[var(--store-label)]">You save</span><strong className="text-sm text-[var(--store-accent)]">−{money.format(calculateDiscountAmount(selected.price, customDiscount))}</strong></div><div className="flex items-end justify-between pt-[26px]"><span className="text-[13px] font-extrabold">Price after discount</span><strong className="font-serif text-[37px]">{money.format(calculateSalePrice(selected.price, customDiscount))}</strong></div></div>
        </div>
      </section>
      <footer className="flex flex-col items-center justify-between gap-5 bg-[var(--store-footer)] px-6 py-[34px] text-center text-white sm:px-[5vw] md:flex-row md:text-left"><div className={logoClass}><span className="grid size-[34px] place-items-center rounded-full bg-[var(--store-accent)] text-white"><Tag size={18} /></span>MARKDOWN</div><p className="text-[11px] text-[var(--store-footer-copy)]">Great objects. Honest prices.</p><p className="text-[11px] text-[var(--store-footer-copy)]">© 2026 Markdown Goods</p></footer>
    </main>
  );
}
