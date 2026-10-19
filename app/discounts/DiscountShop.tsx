"use client";

import { useMemo, useState } from "react";
import { ArrowRight, Search, Sparkles, Tag } from "lucide-react";
import { calculateDiscountAmount, calculateSalePrice, products } from "../data/products";
import type { ProductCategory } from "../data/types/products";
import { ProductArt } from "./ProductArt";
import styles from "./discounts.module.css";

const money = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });
const categories: Array<"All" | ProductCategory> = ["All", "Audio", "Home", "Kitchen", "Lifestyle", "Travel"];

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
    <main className={styles.page}>
      <header className={styles.nav}>
        <a className={styles.logo} href="#top"><span><Tag size={18} /></span>MARKDOWN</a>
        <nav aria-label="Main navigation"><a href="#deals">Deals</a><a href="#calculator">Calculator</a></nav>
        <a className={styles.navCta} href="#deals">Shop the drop <ArrowRight size={15} /></a>
      </header>

      <section className={styles.hero} id="top">
        <div className={styles.heroCopy}>
          <p className={styles.kicker}><Sparkles size={15} /> This week’s edit</p>
          <h1>Good design.<br/><em>Better prices.</em></h1>
          <p className={styles.intro}>Ten objects worth keeping, each with a price that makes the decision delightfully easy.</p>
          <div className={styles.heroActions}><a className={styles.primaryButton} href="#deals">Explore the deals <ArrowRight size={17}/></a><span><strong>10</strong> curated finds</span></div>
        </div>
        <div className={styles.heroVisual}>
          <div className={styles.heroBadge}><span>up to</span><strong>35%</strong><span>off</span></div>
          <div className={styles.heroArt}><ProductArt type="chair" accent="#e95a3e" /></div>
          <p>CURVE LOUNGE CHAIR <span>— 28% OFF</span></p>
        </div>
      </section>

      <section className={styles.deals} id="deals">
        <div className={styles.sectionHeading}><div><p className={styles.kicker}>The collection</p><h2>Small luxuries, marked down.</h2></div><p>Every discount is calculated from the original price, so the number you see is the number you pay.</p></div>
        <div className={styles.controls}>
          <div className={styles.categories}>{categories.map((item) => <button key={item} className={category === item ? styles.active : ""} onClick={() => setCategory(item)}>{item}</button>)}</div>
          <label className={styles.search}><Search size={17}/><span className="sr-only">Search products</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search products"/></label>
        </div>
        <div className={styles.grid}>
          {visibleProducts.map((product) => {
            const salePrice = calculateSalePrice(product.price, product.discount);
            return <article className={styles.card} key={product.id}>
              <div className={styles.image} style={{ "--accent": product.accent } as React.CSSProperties}><span className={styles.discountBadge}>−{product.discount}%</span><ProductArt type={product.image} accent={product.accent}/></div>
              <div className={styles.cardBody}><p>{product.category}</p><h3>{product.name}</h3><div className={styles.price}><strong>{money.format(salePrice)}</strong><s>{money.format(product.price)}</s></div><button onClick={() => selectProduct(product.id)}>Try in calculator <ArrowRight size={15}/></button></div>
            </article>;
          })}
        </div>
        {visibleProducts.length === 0 && <p className={styles.empty}>No products match that search. Try another word.</p>}
      </section>

      <section className={styles.calculator} id="calculator">
        <div className={styles.calcIntro}><p className={styles.kicker}>Price calculator</p><h2>See exactly<br/>what you save.</h2><p>Choose a product and adjust the discount. The price and savings update instantly.</p><div className={styles.formula}>Sale price = Original price − (Original price × Discount ÷ 100)</div></div>
        <div className={styles.calcCard}>
          <label>Product<select value={selectedId} onChange={(event) => selectProduct(Number(event.target.value))}>{products.map((product) => <option value={product.id} key={product.id}>{product.name}</option>)}</select></label>
          <div className={styles.rangeLabel}><label htmlFor="discount">Discount</label><strong>{customDiscount}%</strong></div>
          <input id="discount" className={styles.range} type="range" min="0" max="70" value={customDiscount} onChange={(event) => setCustomDiscount(Number(event.target.value))}/>
          <div className={styles.breakdown}><div><span>Original price</span><strong>{money.format(selected.price)}</strong></div><div><span>You save</span><strong className={styles.saving}>−{money.format(calculateDiscountAmount(selected.price, customDiscount))}</strong></div><div className={styles.total}><span>Price after discount</span><strong>{money.format(calculateSalePrice(selected.price, customDiscount))}</strong></div></div>
        </div>
      </section>
      <footer><div className={styles.logo}><span><Tag size={18}/></span>MARKDOWN</div><p>Great objects. Honest prices.</p><p>© 2026 Markdown Goods</p></footer>
    </main>
  );
}
