"use client";

import appearance from "./appearance.module.css";
import { useMemo, useState } from "react";
import { ArrowRight, Search, Sparkles, Tag } from "lucide-react";
import { calculateDiscountAmount, calculateSalePrice, products } from "../data/products";
import type { ProductCategory } from "../data/types/products";
import { ProductArt } from "./ProductArt";
import ProductCard from "./components/ProductCard";
import colors from "./discount-colors.module.css";

const money = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });
const categories: Array<"All" | ProductCategory> = ["All", "Audio", "Home", "Kitchen", "Lifestyle", "Travel"];
const logoClass = `flex items-center gap-2.5 ${appearance.textSm} ${appearance.fontBlack} ${appearance.tracking12em}`;
const kickerClass = `flex items-center gap-2 ${appearance.text06875rem} ${appearance.fontExtrabold} ${appearance.uppercase} ${appearance.tracking17em} ${appearance.textStoreAccent}`;
const headingClass = `${appearance.fontSerif} ${appearance.fontNormal} ${appearance.tracking055em}`;

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
    <main className={`${colors.theme} min-h-screen ${appearance.bgStoreCanvas} ${appearance.fontSans} ${appearance.textStoreInk}`}>
      <header className={`relative z-10 flex h-20 items-center justify-between border-b ${appearance.borderStoreNavLine} px-6 sm:px-[5vw]`}>
        <a className={logoClass} href="#top"><span className={`grid size-[2.125rem] place-items-center rounded-full ${appearance.bgStoreAccent} ${appearance.textWhite}`}><Tag size={18} /></span>MARKDOWN</a>
        <nav aria-label="Main navigation" className={`hidden gap-8 md:flex`}><a className={`${appearance.text08125rem} ${appearance.fontBold}`} href="#deals">Deals</a><a className={`${appearance.text08125rem} ${appearance.fontBold}`} href="#calculator">Calculator</a></nav>
        <a className={`hidden items-center gap-2 ${appearance.text08125rem} ${appearance.fontBold} md:flex`} href="#deals">Shop the drop <ArrowRight size={15} /></a>
      </header>

      <section className={`grid min-h-[39.375rem] grid-cols-1 gap-10 overflow-hidden px-6 py-12 sm:px-[5vw] lg:grid-cols-2 lg:gap-[7vw] lg:py-[3.375rem] lg:pb-[4.375rem]`} id="top">
        <div className={`max-w-[40.625rem] self-center`}>
          <p className={kickerClass}><Sparkles size={15} /> This week’s edit</p>
          <h1 className={`${headingClass} my-6 ${appearance.textClamp3625rem7vw675rem} ${appearance.leading87}`}>Good design.<br /><em className={`${appearance.fontNormal} ${appearance.textStoreAccent}`}>Better prices.</em></h1>
          <p className={`max-w-[31.25rem] ${appearance.fontSerif} ${appearance.text11875rem} ${appearance.leading16} ${appearance.textStoreBody}`}>Ten objects worth keeping, each with a price that makes the decision delightfully easy.</p>
          <div className={`mt-9 flex flex-col items-start gap-7 min-[26.25rem]:flex-row min-[26.25rem]:items-center`}>
            <a className={`inline-flex items-center gap-3 ${appearance.bgStoreInk} px-[1.375rem] py-[1.0625rem] ${appearance.textWhite}`} href="#deals">Explore the deals <ArrowRight size={17} /></a>
            <span className={`${appearance.textXs} ${appearance.textStoreMuted}`}><strong className={`mr-1 ${appearance.textXl} ${appearance.textStoreInk}`}>10</strong> curated finds</span>
          </div>
        </div>
        <div className={`relative flex min-h-[26.875rem] flex-col items-center justify-center rounded-[48%_48%_0.5rem_0.5rem] ${appearance.bgStoreHero} before:absolute before:inset-[1.5625rem] before:rounded-[48%_48%_0.5rem_0.5rem] before:border ${appearance.beforeBorderWhite60} lg:min-h-[32.5rem]`}>
          <div className={`absolute right-[-0.625rem] top-[2.8125rem] z-20 grid size-24 rotate-[8deg] place-content-center rounded-full ${appearance.bgStoreAccent} text-center ${appearance.uppercase} ${appearance.textWhite} ${appearance.shadow00875rem15625remStoreBadgeShadow} lg:right-[-1.875rem] lg:size-[7.25rem]`}><span className={`${appearance.text05625rem} ${appearance.fontExtrabold} ${appearance.tracking16em}`}>up to</span><strong className={`${appearance.fontSerif} ${appearance.text15625rem} ${appearance.leadingNone} ${appearance.lgText19375rem}`}>35%</strong><span className={`${appearance.text05625rem} ${appearance.fontExtrabold} ${appearance.tracking16em}`}>off</span></div>
          <div className={`z-10 w-[min(80%,26.875rem)] ${appearance.textStoreIllustration} drop-shadow-[0_1.375rem_1.25rem_var(--store-art-shadow)]`}><ProductArt type="chair" accent="var(--store-accent)" /></div>
          <p className={`z-10 ${appearance.text0625rem} ${appearance.fontBlack} ${appearance.tracking13em}`}>CURVE LOUNGE CHAIR <span className={`${appearance.textStoreAccent}`}>— 28% OFF</span></p>
        </div>
      </section>

      <section className={`${appearance.bgStorePaper} px-6 py-24 sm:px-[5vw]`} id="deals">
        <div className={`flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between`}>
          <div><p className={kickerClass}>The collection</p><h2 className={`${headingClass} my-2 ${appearance.textClamp2375rem5vw4rem}`}>Small luxuries, marked down.</h2></div>
          <p className={`max-w-[25rem] ${appearance.textSm} ${appearance.leading17} ${appearance.textStoreCopy}`}>Every discount is calculated from the original price, so the number you see is the number you pay.</p>
        </div>
        <div className={`my-8 flex flex-col items-start justify-between gap-5 border-t ${appearance.borderStoreLine} pt-[1.375rem] lg:my-12 lg:flex-row lg:items-center`}>
          <div className={`flex flex-wrap gap-2`}>{categories.map((item) => <button key={item} className={`cursor-pointer rounded-full px-3.5 py-2.5 ${appearance.textXs} ${appearance.fontBold} ${category === item ? `${appearance.bgStoreInk} ${appearance.textWhite}` : `${appearance.textStoreFilter}`}`} onClick={() => setCategory(item)}>{item}</button>)}</div>
          <label className={`flex items-center gap-2 border-b ${appearance.borderStoreSearchLine} p-2`}><Search size={17} /><span className={`sr-only`}>Search products</span><input className={`w-36 ${appearance.bgTransparent} outline-none`} value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search products" /></label>
        </div>
        <div className={`grid grid-cols-2 gap-x-2.5 gap-y-7 md:grid-cols-3 lg:grid-cols-5 lg:gap-x-[1.125rem]`}>
          {visibleProducts.map((product) => (
            <ProductCard key={product.id} product={product} onSelect={selectProduct} />
          ))}
        </div>
        {visibleProducts.length === 0 && <p className={`py-16 text-center ${appearance.textStoreMuted}`}>No products match that search. Try another word.</p>}
      </section>

      <section className={`grid grid-cols-1 gap-[8vw] ${appearance.bgStoreInk} px-6 py-24 ${appearance.textWhite} sm:px-[9vw] lg:grid-cols-[.8fr_1.2fr] lg:px-[clamp(1.5rem,9vw,8.75rem)]`} id="calculator">
        <div><p className={kickerClass}>Price calculator</p><h2 className={`${headingClass} my-4 ${appearance.textClamp3rem6vw4875rem} ${appearance.leading95}`}>See exactly<br />what you save.</h2><p className={`max-w-[24.375rem] ${appearance.leading17} ${appearance.textStoreInverseCopy}`}>Choose a product and adjust the discount. The price and savings update instantly.</p><div className={`mt-10 max-w-[24.375rem] border-l-2 ${appearance.borderStoreAccent} pl-[1.125rem] ${appearance.fontMono} ${appearance.textXs} ${appearance.leading17} ${appearance.textStoreFormula}`}>Sale price = Original price − (Original price × Discount ÷ 100)</div></div>
        <div className={`${appearance.bgStoreCard} p-[clamp(1.75rem,5vw,3.75rem)] ${appearance.textStoreInk} ${appearance.shadow05rem05rem0StoreAccent} ${appearance.lgShadow0875rem0875rem0StoreAccent}`}>
          <label className={`flex flex-col gap-2.5 ${appearance.text06875rem} ${appearance.fontExtrabold} ${appearance.uppercase} ${appearance.tracking13em}`}>Product<select className={`appearance-none border ${appearance.borderStoreInputLine} ${appearance.bgStorePaper} p-4 ${appearance.fontSerif} ${appearance.textLg}`} value={selectedId} onChange={(event) => selectProduct(Number(event.target.value))}>{products.map((product) => <option value={product.id} key={product.id}>{product.name}</option>)}</select></label>
          <div className={`mt-9 flex items-end justify-between`}><label className={`${appearance.text06875rem} ${appearance.fontExtrabold} ${appearance.uppercase} ${appearance.tracking13em}`} htmlFor="discount">Discount</label><strong className={`${appearance.fontSerif} ${appearance.text19375rem} ${appearance.textStoreAccent}`}>{customDiscount}%</strong></div>
          <input id="discount" className={`my-3.5 mb-8 w-full ${appearance.accentStoreAccent}`} type="range" min="0" max="70" value={customDiscount} onChange={(event) => setCustomDiscount(Number(event.target.value))} />
          <div className={`border-t ${appearance.borderStoreDivider}`}><div className={`flex justify-between border-b ${appearance.borderStoreDivider} py-[0.9375rem]`}><span className={`${appearance.text08125rem} ${appearance.textStoreLabel}`}>Original price</span><strong className={`${appearance.textSm}`}>{money.format(selected.price)}</strong></div><div className={`flex justify-between border-b ${appearance.borderStoreDivider} py-[0.9375rem]`}><span className={`${appearance.text08125rem} ${appearance.textStoreLabel}`}>You save</span><strong className={`${appearance.textSm} ${appearance.textStoreAccent}`}>−{money.format(calculateDiscountAmount(selected.price, customDiscount))}</strong></div><div className={`flex items-end justify-between pt-[1.625rem]`}><span className={`${appearance.text08125rem} ${appearance.fontExtrabold}`}>Price after discount</span><strong className={`${appearance.fontSerif} ${appearance.text23125rem}`}>{money.format(calculateSalePrice(selected.price, customDiscount))}</strong></div></div>
        </div>
      </section>
      <footer className={`flex flex-col items-center justify-between gap-5 ${appearance.bgStoreFooter} px-6 py-[2.125rem] text-center ${appearance.textWhite} sm:px-[5vw] md:flex-row md:text-left`}><div className={logoClass}><span className={`grid size-[2.125rem] place-items-center rounded-full ${appearance.bgStoreAccent} ${appearance.textWhite}`}><Tag size={18} /></span>MARKDOWN</div><p className={`${appearance.text06875rem} ${appearance.textStoreFooterCopy}`}>Great objects. Honest prices.</p><p className={`${appearance.text06875rem} ${appearance.textStoreFooterCopy}`}>© 2026 Markdown Goods</p></footer>
    </main>
  );
}
