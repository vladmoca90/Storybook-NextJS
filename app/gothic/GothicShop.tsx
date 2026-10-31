'use client';

import { useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, Search, ShoppingBag, X, Plus, Minus, Moon, ArrowUpRight } from 'lucide-react';
import styles from './gothic.module.css';

const products = [
  { id: 0, name: 'Ravenlace Corset Dress', price: 149, category: 'Clothing', description: 'A little romance. A little darkness. Intricate lace, a sculpted corset silhouette and a sweeping layered skirt.', sizes: ['XS', 'S', 'M', 'L', 'XL'] },
  { id: 1, name: 'The Vampire Coat', price: 189, category: 'Costumes', description: 'Make an entrance after sundown. Rich burgundy velvet meets antique-inspired embroidery in a dramatic longline silhouette.', sizes: ['S', 'M', 'L', 'XL'] },
  { id: 2, name: 'Nocturne Witch Hat', price: 89, category: 'Accessories', description: 'For a spellbinding finishing touch. A sculptural pointed hat, dressed in delicate lace, feathers and a dark red rose.', sizes: ['One size'] },
  { id: 3, name: 'Eclipse Platform Boots', price: 129, category: 'Accessories', description: 'Stand a little taller in the dark. Statement platforms with lace-up fronts, silver-tone buckles and chain details.', sizes: ['UK 4', 'UK 5', 'UK 6', 'UK 7', 'UK 8'] },
];
const slides = [
  { title: <>For your<br />darker side.</>, description: <>Gothic souls. Midnight muses.<br />Dress like yourself, after dark.</>, cta: 'Explore the collection', filter: 'All', className: 'romance' },
  { title: <>A night to<br />be someone else.</>, description: <>Velvet capes. Wicked intentions.<br />Find your Halloween alter ego.</>, cta: 'Discover Halloween', filter: 'Costumes', className: 'halloween' },
  { title: <>The devil is<br />in the details.</>, description: <>From midnight lace to statement boots.<br />Make the darkness your own.</>, cta: 'Shop accessories', filter: 'Accessories', className: 'details' },
];
type Product = typeof products[number];
type BagItem = { product: Product; size: string; quantity: number };
const money = (price: number) => `£${price.toFixed(2)}`;

function ProductImage({ product, className = '' }: { product: Product; className?: string }) {
  return <div role="img" aria-label={product.name} className={`${styles.productImage} ${className}`} style={{ backgroundPosition: `${product.id * 100 / 3}% center` }} />;
}

export default function GothicShop() {
  const [slide, setSlide] = useState(0);
  const [category, setCategory] = useState('All');
  const [query, setQuery] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);
  const [selected, setSelected] = useState<Product | null>(null);
  const [size, setSize] = useState('');
  const [bag, setBag] = useState<BagItem[]>([]);
  const [bagOpen, setBagOpen] = useState(false);
  const [notice, setNotice] = useState('');
  const dialog = useRef<HTMLDialogElement>(null);
  const touchStart = useRef(0);
  const current = slides[slide];
  const count = bag.reduce((total, item) => total + item.quantity, 0);
  const visible = products.filter(p => (category === 'All' || p.category === category) && p.name.toLowerCase().includes(query.toLowerCase()));
  function browse(filter: string) { setCategory(filter); setQuery(''); document.getElementById('collection')?.scrollIntoView({ behavior: 'smooth' }); }
  function openProduct(product: Product) { setSelected(product); setSize(product.sizes[0]); setBagOpen(false); dialog.current?.showModal(); }
  function openBag() { setBagOpen(true); setSelected(null); dialog.current?.showModal(); }
  function addToBag() {
    if (!selected) return;
    setBag(items => {
      const existing = items.find(item => item.product.id === selected.id && item.size === size);
      return existing ? items.map(item => item === existing ? { ...item, quantity: item.quantity + 1 } : item) : [...items, { product: selected, size, quantity: 1 }];
    });
    setNotice(`${selected.name} added to your bag.`);
    setBagOpen(true); setSelected(null);
  }
  function changeQuantity(index: number, amount: number) { setBag(items => items.map((item, i) => i === index ? { ...item, quantity: item.quantity + amount } : item).filter(item => item.quantity > 0)); }

  return <div className={styles.shop}>
    <a className={styles.skip} href="#collection">Skip to collection</a>
    <div className={styles.announcement}>For the beautifully strange.</div>
    <header className={styles.header}>
      <a className={styles.logo} href="#">NOCTURNE</a>
      <nav aria-label="Main navigation"><button onClick={() => browse('All')}>Shop all</button><button onClick={() => browse('Clothing')}>Gothic clothing</button><button onClick={() => browse('Costumes')}>Halloween</button><button onClick={() => browse('Accessories')}>Accessories</button></nav>
      <div className={styles.headerActions}><button aria-label="Search collection" aria-expanded={searchOpen} onClick={() => { setSearchOpen(!searchOpen); }}><Search size={21} /></button><button aria-label={`Shopping bag, ${count} items`} onClick={openBag}><ShoppingBag size={21} />{count > 0 && <span className={styles.count}>{count}</span>}</button></div>
    </header>
    {searchOpen && <form className={styles.search} onSubmit={e => { e.preventDefault(); document.getElementById('collection')?.scrollIntoView({ behavior: 'smooth' }); }}><Search size={18} /><input autoFocus aria-label="Search products" placeholder="Find your next obsession…" value={query} onChange={e => { setQuery(e.target.value); setCategory('All'); }} /><button type="submit">Search <ArrowRight size={16} /></button><button type="button" aria-label="Close search" onClick={() => { setSearchOpen(false); setQuery(''); }}><X size={20} /></button></form>}
    <main>
      <section className={`${styles.hero} ${styles[current.className]}`} aria-roledescription="carousel" aria-label="Featured collections" onTouchStart={e => { touchStart.current = e.touches[0].clientX; }} onTouchEnd={e => { const delta = touchStart.current - e.changedTouches[0].clientX; if (Math.abs(delta) > 50) setSlide(s => (s + (delta > 0 ? 1 : 2)) % 3); }}>
        <div className={styles.heroPhoto} />
        <div className={styles.heroContent} key={slide} aria-live="polite"><h1>{current.title}</h1><p>{current.description}</p><button className={styles.primary} onClick={() => browse(current.filter)}>{current.cta}<ArrowUpRight size={17} /></button></div>
        <div className={styles.carouselBottom}><div className={styles.dots}>{slides.map((_, i) => <button key={i} aria-label={`Go to slide ${i + 1}`} aria-current={slide === i ? 'true' : undefined} className={slide === i ? styles.activeDot : ''} onClick={() => setSlide(i)} />)}</div><div className={styles.arrows}><button aria-label="Previous slide" onClick={() => setSlide(s => (s + 2) % 3)}><ArrowLeft size={18} /></button><span>0{slide + 1} <i>/ 03</i></span><button aria-label="Next slide" onClick={() => setSlide(s => (s + 1) % 3)}><ArrowRight size={18} /></button></div></div>
      </section>
      <div className={styles.manifesto}><span>GOTHIC BY NATURE.</span><i>/</i><span>NOT JUST FOR HALLOWEEN.</span><i>/</i><span>MADE TO BE DIFFERENT.</span></div>
      <section id="collection" className={styles.collection}>
        <div className={styles.collectionHeading}><h2>Objects of obsession</h2><div className={styles.filters} aria-label="Product categories">{['All', 'Clothing', 'Costumes', 'Accessories'].map(item => <button key={item} aria-pressed={item === category} className={category === item ? styles.selectedFilter : ''} onClick={() => setCategory(item)}>{item}</button>)}</div></div>
        <div className={styles.products}>{visible.map(product => <button key={product.id} className={styles.product} onClick={() => openProduct(product)}><div className={styles.imageWrap}><ProductImage product={product} /><span className={styles.quickView}>Take a closer look <Plus size={17} /></span></div><div className={styles.productInfo}><h3>{product.name}</h3><ArrowUpRight size={16} /></div><p>{money(product.price)}</p></button>)}</div>
        {visible.length === 0 && <div className={styles.empty}>No matches in the shadows.<button onClick={() => { setQuery(''); setCategory('All'); }}>Show the full collection <ArrowRight size={17} /></button></div>}
      </section>
    </main>
    <footer className={styles.footer}><a className={styles.logo} href="#">NOCTURNE</a><p>Wear your own kind of strange.</p><Moon size={23} strokeWidth={1} /><span>© {new Date().getFullYear()} Nocturne</span></footer>
    <p className={styles.srOnly} role="status">{notice}</p>
    <dialog className={styles.modal} ref={dialog} onClick={e => { if (e.target === e.currentTarget) dialog.current?.close(); }}><button className={styles.close} aria-label="Close dialog" onClick={() => dialog.current?.close()}><X size={22} /></button>
      {selected && <div className={styles.detail}><ProductImage product={selected} /><div className={styles.detailCopy}><span className={styles.detailCategory}>{selected.category}</span><h2>{selected.name}</h2><p className={styles.price}>{money(selected.price)}</p><p>{selected.description}</p><fieldset><legend>Select size</legend><div className={styles.sizes}>{selected.sizes.map(s => <button key={s} aria-pressed={s === size} onClick={() => setSize(s)}>{s}</button>)}</div></fieldset><button className={styles.primary} onClick={addToBag}>Add to bag <ShoppingBag size={18} /></button><small>Concept collection · illustrative products</small></div></div>}
      {bagOpen && <div className={styles.bag}><h2>Your midnight finds <span>({count})</span></h2>{bag.length ? <><div className={styles.bagItems}>{bag.map((item, i) => <div className={styles.bagItem} key={`${item.product.id}-${item.size}`}><ProductImage product={item.product} /><div><h3>{item.product.name}</h3><p>{item.size} · {money(item.product.price)}</p><div className={styles.quantity}><button aria-label={`Remove one ${item.product.name}`} onClick={() => changeQuantity(i, -1)}><Minus size={14} /></button><span>{item.quantity}</span><button aria-label={`Add one ${item.product.name}`} onClick={() => changeQuantity(i, 1)}><Plus size={14} /></button></div></div></div>)}</div><div className={styles.total}><span>Subtotal</span><span>{money(bag.reduce((total, item) => total + item.product.price * item.quantity, 0))}</span></div><p className={styles.demoNote}>This is a concept storefront. Checkout and payments are not enabled.</p></> : <p>Your bag is waiting for something wicked.</p>}<button className={styles.primary} onClick={() => { dialog.current?.close(); browse('All'); }}>Continue exploring <ArrowRight size={18} /></button></div>}
    </dialog>
  </div>;
}
