"use client";

import { useMemo, useState } from "react";
import { ArrowRight, Search, Sparkles, Tag } from "lucide-react";
import { calculateDiscountAmount, calculateSalePrice, products } from "../data/products";
import type { ProductCategory } from "../data/types/products";
import { ProductArt } from "./ProductArt";

const money = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });
const categories: Array<"All" | ProductCategory> = ["All", "Audio", "Home", "Kitchen", "Lifestyle", "Travel"];
const logoClass = "flex items-center gap-2.5 text-sm font-black tracking-[.12em]";
const kickerClass = "flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-[.17em] text-[#e5583c]";
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
    <main className="min-h-screen bg-[#f4f0e8] font-sans text-[#20221f]">
      <header className="relative z-10 flex h-20 items-center justify-between border-b border-[#20221f26] px-6 sm:px-[5vw]">
        <a className={logoClass} href="#top"><span className="grid size-[34px] place-items-center rounded-full bg-[#e5583c] text-white"><Tag size={18} /></span>MARKDOWN</a>
        <nav aria-label="Main navigation" className="hidden gap-8 md:flex"><a className="text-[13px] font-bold" href="#deals">Deals</a><a className="text-[13px] font-bold" href="#calculator">Calculator</a></nav>
        <a className="hidden items-center gap-2 text-[13px] font-bold md:flex" href="#deals">Shop the drop <ArrowRight size={15} /></a>
      </header>

      <section className="grid min-h-[630px] grid-cols-1 gap-10 overflow-hidden px-6 py-12 sm:px-[5vw] lg:grid-cols-2 lg:gap-[7vw] lg:py-[54px] lg:pb-[70px]" id="top">
        <div className="max-w-[650px] self-center">
          <p className={kickerClass}><Sparkles size={15} /> This week’s edit</p>
          <h1 className={`${headingClass} my-6 text-[clamp(58px,7vw,108px)] leading-[.87]`}>Good design.<br /><em className="font-normal text-[#e5583c]">Better prices.</em></h1>
          <p className="max-w-[500px] font-serif text-[19px] leading-[1.6] text-[#5e605a]">Ten objects worth keeping, each with a price that makes the decision delightfully easy.</p>
          <div className="mt-9 flex flex-col items-start gap-7 min-[420px]:flex-row min-[420px]:items-center">
            <a className="inline-flex items-center gap-3 bg-[#20221f] px-[22px] py-[17px] text-white" href="#deals">Explore the deals <ArrowRight size={17} /></a>
            <span className="text-xs text-[#777970]"><strong className="mr-1 text-xl text-[#20221f]">10</strong> curated finds</span>
          </div>
        </div>
        <div className="relative flex min-h-[430px] flex-col items-center justify-center rounded-[48%_48%_8px_8px] bg-[#e4d3b4] before:absolute before:inset-[25px] before:rounded-[48%_48%_8px_8px] before:border before:border-white/60 lg:min-h-[520px]">
          <div className="absolute right-[-10px] top-[45px] z-20 grid size-24 rotate-[8deg] place-content-center rounded-full bg-[#e5583c] text-center uppercase text-white shadow-[0_14px_25px_#9f342c33] lg:right-[-30px] lg:size-[116px]"><span className="text-[9px] font-extrabold tracking-[.16em]">up to</span><strong className="font-serif text-[25px] leading-none lg:text-[31px]">35%</strong><span className="text-[9px] font-extrabold tracking-[.16em]">off</span></div>
          <div className="z-10 w-[min(80%,430px)] text-[#252722] drop-shadow-[0_22px_20px_#78684e45]"><ProductArt type="chair" accent="#e95a3e" /></div>
          <p className="z-10 text-[10px] font-black tracking-[.13em]">CURVE LOUNGE CHAIR <span className="text-[#e5583c]">— 28% OFF</span></p>
        </div>
      </section>

      <section className="bg-[#fffdf8] px-6 py-24 sm:px-[5vw]" id="deals">
        <div className="flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between">
          <div><p className={kickerClass}>The collection</p><h2 className={`${headingClass} my-2 text-[clamp(38px,5vw,64px)]`}>Small luxuries, marked down.</h2></div>
          <p className="max-w-[400px] text-sm leading-[1.7] text-[#6d6e68]">Every discount is calculated from the original price, so the number you see is the number you pay.</p>
        </div>
        <div className="my-8 flex flex-col items-start justify-between gap-5 border-t border-[#ddd8cf] pt-[22px] lg:my-12 lg:flex-row lg:items-center">
          <div className="flex flex-wrap gap-2">{categories.map((item) => <button key={item} className={`cursor-pointer rounded-full px-3.5 py-2.5 text-xs font-bold ${category === item ? "bg-[#20221f] text-white" : "text-[#6b6b66]"}`} onClick={() => setCategory(item)}>{item}</button>)}</div>
          <label className="flex items-center gap-2 border-b border-[#aaa49a] p-2"><Search size={17} /><span className="sr-only">Search products</span><input className="w-36 bg-transparent outline-none" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search products" /></label>
        </div>
        <div className="grid grid-cols-2 gap-x-2.5 gap-y-7 md:grid-cols-3 lg:grid-cols-5 lg:gap-x-[18px]">
          {visibleProducts.map((product) => {
            const salePrice = calculateSalePrice(product.price, product.discount);
            return <article className="group min-w-0" key={product.id}>
              <div className="relative grid aspect-square place-items-center overflow-hidden" style={{ backgroundColor: `${product.accent}20` }}>
                <span className="absolute left-3 top-3 z-20 px-[9px] py-[7px] text-[11px] font-extrabold text-white" style={{ backgroundColor: product.accent }}>−{product.discount}%</span>
                <div className="absolute size-[70%] rounded-full border" style={{ borderColor: `${product.accent}55` }} />
                <div className="z-10 w-[73%] text-[#292b27] transition-transform duration-300 group-hover:scale-105 group-hover:-rotate-2"><ProductArt type={product.image} accent={product.accent} /></div>
              </div>
              <div><p className="mb-1.5 mt-4 text-[9px] font-extrabold uppercase tracking-[.15em] text-[#8a8a83]">{product.category}</p><h3 className="mb-3 font-serif text-base font-normal lg:text-lg">{product.name}</h3><div className="flex items-baseline gap-2"><strong className="text-[15px]">{money.format(salePrice)}</strong><s className="text-xs text-[#999]">{money.format(product.price)}</s></div><button className="mt-3 flex cursor-pointer items-center gap-2 border-b border-[#222] bg-transparent text-[11px] font-extrabold" onClick={() => selectProduct(product.id)}>Try in calculator <ArrowRight size={15} /></button></div>
            </article>;
          })}
        </div>
        {visibleProducts.length === 0 && <p className="py-16 text-center text-[#777]">No products match that search. Try another word.</p>}
      </section>

      <section className="grid grid-cols-1 gap-[8vw] bg-[#20221f] px-6 py-24 text-white sm:px-[9vw] lg:grid-cols-[.8fr_1.2fr] lg:px-[clamp(24px,9vw,140px)]" id="calculator">
        <div><p className={kickerClass}>Price calculator</p><h2 className={`${headingClass} my-4 text-[clamp(48px,6vw,78px)] leading-[.95]`}>See exactly<br />what you save.</h2><p className="max-w-[390px] leading-[1.7] text-[#b7b8b2]">Choose a product and adjust the discount. The price and savings update instantly.</p><div className="mt-10 max-w-[390px] border-l-2 border-[#e5583c] pl-[18px] font-mono text-xs leading-[1.7] text-[#d5d5cf]">Sale price = Original price − (Original price × Discount ÷ 100)</div></div>
        <div className="bg-[#f7f1e7] p-[clamp(28px,5vw,60px)] text-[#20221f] shadow-[8px_8px_0_#e5583c] lg:shadow-[14px_14px_0_#e5583c]">
          <label className="flex flex-col gap-2.5 text-[11px] font-extrabold uppercase tracking-[.13em]">Product<select className="appearance-none border border-[#cac3b8] bg-[#fffdf8] p-4 font-serif text-lg" value={selectedId} onChange={(event) => selectProduct(Number(event.target.value))}>{products.map((product) => <option value={product.id} key={product.id}>{product.name}</option>)}</select></label>
          <div className="mt-9 flex items-end justify-between"><label className="text-[11px] font-extrabold uppercase tracking-[.13em]" htmlFor="discount">Discount</label><strong className="font-serif text-[31px] text-[#e5583c]">{customDiscount}%</strong></div>
          <input id="discount" className="my-3.5 mb-8 w-full accent-[#e5583c]" type="range" min="0" max="70" value={customDiscount} onChange={(event) => setCustomDiscount(Number(event.target.value))} />
          <div className="border-t border-[#d2ccc1]"><div className="flex justify-between border-b border-[#d2ccc1] py-[15px]"><span className="text-[13px] text-[#74746e]">Original price</span><strong className="text-sm">{money.format(selected.price)}</strong></div><div className="flex justify-between border-b border-[#d2ccc1] py-[15px]"><span className="text-[13px] text-[#74746e]">You save</span><strong className="text-sm text-[#e5583c]">−{money.format(calculateDiscountAmount(selected.price, customDiscount))}</strong></div><div className="flex items-end justify-between pt-[26px]"><span className="text-[13px] font-extrabold">Price after discount</span><strong className="font-serif text-[37px]">{money.format(calculateSalePrice(selected.price, customDiscount))}</strong></div></div>
        </div>
      </section>
      <footer className="flex flex-col items-center justify-between gap-5 bg-[#131512] px-6 py-[34px] text-center text-white sm:px-[5vw] md:flex-row md:text-left"><div className={logoClass}><span className="grid size-[34px] place-items-center rounded-full bg-[#e5583c] text-white"><Tag size={18} /></span>MARKDOWN</div><p className="text-[11px] text-[#8f918a]">Great objects. Honest prices.</p><p className="text-[11px] text-[#8f918a]">© 2026 Markdown Goods</p></footer>
    </main>
  );
}
