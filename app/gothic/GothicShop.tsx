"use client";

import { useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Search,
  ShoppingBag,
  X,
  Plus,
  Minus,
  Moon,
  ArrowUpRight,
} from "lucide-react";
import { categories, products, slides } from "@/app/data/gothic";
import type {
  BagItem,
  GothicCategory,
  Product,
  ProductImageProps,
} from "@/app/data/types/gothic";
import styles from "./gothic.module.css";

const money = (price: number) => `£${price.toFixed(2)}`;

function ProductImage({ product, className = "" }: ProductImageProps) {
  return (
    <div
      role="img"
      aria-label={product.name}
      className={`${styles.productImage} ${className}`}
      style={{ backgroundPosition: `${(product.id * 100) / 3}% center` }}
    />
  );
}

export default function GothicShop() {
  const [slide, setSlide] = useState(0);
  const [category, setCategory] = useState<GothicCategory>("All");
  const [query, setQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [selected, setSelected] = useState<Product | null>(null);
  const [size, setSize] = useState("");
  const [bag, setBag] = useState<BagItem[]>([]);
  const [bagOpen, setBagOpen] = useState(false);
  const [notice, setNotice] = useState("");
  const dialog = useRef<HTMLDialogElement>(null);
  const touchStart = useRef(0);
  const current = slides[slide];
  const count = bag.reduce((total, item) => total + item.quantity, 0);
  const visible = products.filter(
    (p) =>
      (category === "All" || p.category === category) &&
      p.name.toLowerCase().includes(query.toLowerCase()),
  );
  function browse(filter: GothicCategory) {
    setCategory(filter);
    setQuery("");
    document
      .getElementById("collection")
      ?.scrollIntoView({ behavior: "smooth" });
  }
  function openProduct(product: Product) {
    setSelected(product);
    setSize(product.sizes[0]);
    setBagOpen(false);
    dialog.current?.showModal();
  }
  function openBag() {
    setBagOpen(true);
    setSelected(null);
    dialog.current?.showModal();
  }
  function addToBag() {
    if (!selected) return;
    setBag((items) => {
      const existing = items.find(
        (item) => item.product.id === selected.id && item.size === size,
      );
      return existing
        ? items.map((item) =>
            item === existing ? { ...item, quantity: item.quantity + 1 } : item,
          )
        : [...items, { product: selected, size, quantity: 1 }];
    });
    setNotice(`${selected.name} added to your bag.`);
    setBagOpen(true);
    setSelected(null);
  }
  function changeQuantity(index: number, amount: number) {
    setBag((items) =>
      items
        .map((item, i) =>
          i === index ? { ...item, quantity: item.quantity + amount } : item,
        )
        .filter((item) => item.quantity > 0),
    );
  }

  return (
    <div className={`${styles.shop} min-h-screen`}>
      <a className={styles.skip} href="#collection">
        Skip to collection
      </a>
      <div className={`${styles.announcement} grid h-[31px] place-items-center text-center max-[700px]:h-[27px]`}>
        For the beautifully strange.
      </div>
      <header
        className={`${styles.header} flex h-[81px] items-center justify-between gap-[25px] border-b px-[3.1%] max-[700px]:h-auto max-[700px]:min-h-[104px] max-[700px]:flex-wrap max-[700px]:gap-4 max-[700px]:px-[5%] max-[700px]:pt-[19px]`}
      >
        <a className={styles.logo} href="#">
          NOCTURNE
        </a>
        <nav
          className="flex gap-8 max-[1000px]:gap-5 max-[700px]:order-3 max-[700px]:w-full max-[700px]:justify-between max-[700px]:gap-3"
          aria-label="Main navigation"
        >
          <button className="border-0 py-3 max-[700px]:pt-2 max-[700px]:pb-[15px]" onClick={() => browse("All")}>Shop all</button>
          <button className="border-0 py-3 max-[700px]:pt-2 max-[700px]:pb-[15px]" onClick={() => browse("Clothing")}>Gothic clothing</button>
          <button className="border-0 py-3 max-[700px]:pt-2 max-[700px]:pb-[15px]" onClick={() => browse("Costumes")}>Halloween</button>
          <button className="border-0 py-3 max-[700px]:pt-2 max-[700px]:pb-[15px]" onClick={() => browse("Accessories")}>Accessories</button>
        </nav>
        <div className={`${styles.headerActions} flex gap-6 max-[1000px]:gap-[15px] max-[700px]:gap-4`}>
          <button
            className="relative border-0 p-[5px]"
            aria-label="Search collection"
            aria-expanded={searchOpen}
            onClick={() => {
              setSearchOpen(!searchOpen);
            }}
          >
            <Search size={21} />
          </button>
          <button
            className="relative border-0 p-[5px]"
            aria-label={`Shopping bag, ${count} items`}
            onClick={openBag}
          >
            <ShoppingBag size={21} />
            {count > 0 && (
              <span className={`${styles.count} absolute -top-1 -right-1.5 rounded-full px-[5px] py-[3px]`}>
                {count}
              </span>
            )}
          </button>
        </div>
      </header>
      {searchOpen && (
        <form
          className={`${styles.search} flex items-center gap-5 border-b px-[4%] py-[18px] max-[700px]:gap-3`}
          onSubmit={(e) => {
            e.preventDefault();
            document
              .getElementById("collection")
              ?.scrollIntoView({ behavior: "smooth" });
          }}
        >
          <Search size={18} />
          <input
            className="min-w-0 flex-1 border-0"
            autoFocus
            aria-label="Search products"
            placeholder="Find your next obsession…"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setCategory("All");
            }}
          />
          <button className="flex items-center gap-3 border-0" type="submit">
            Search <ArrowRight size={16} />
          </button>
          <button
            className="flex items-center gap-3 border-0"
            type="button"
            aria-label="Close search"
            onClick={() => {
              setSearchOpen(false);
              setQuery("");
            }}
          >
            <X size={20} />
          </button>
        </form>
      )}
      <main>
        <section
          className={`${styles.hero} ${styles[current.className]} relative h-[550px] overflow-hidden max-[1000px]:h-[510px] max-[700px]:h-[535px] min-[1500px]:h-[620px]`}
          aria-roledescription="carousel"
          aria-label="Featured collections"
          onTouchStart={(e) => {
            touchStart.current = e.touches[0].clientX;
          }}
          onTouchEnd={(e) => {
            const delta = touchStart.current - e.changedTouches[0].clientX;
            if (Math.abs(delta) > 50)
              setSlide((s) =>
                (s + (delta > 0 ? 1 : slides.length - 1)) % slides.length,
              );
          }}
        >
          <div
            className={styles.heroPhoto}
            style={{ backgroundImage: `url("${current.image}")` }}
          />
          <div
            className={`${styles.heroContent} px-[6.3%] pt-[76px] pb-[70px] max-[1000px]:pt-20 max-[700px]:px-[7%] max-[700px]:pt-[91px] max-[700px]:pb-20 min-[1500px]:pt-[95px]`}
            key={slide}
            aria-live="polite"
          >
            <h1 className="mb-5 max-w-[680px] max-[700px]:max-w-[330px]">{current.title}</h1>
            <p className="mb-[23px]">{current.description}</p>
            <button
              className={`${styles.primary} inline-flex items-center justify-center gap-6 border px-[25px] py-[15px] max-[700px]:gap-5 max-[700px]:px-5 max-[700px]:py-[14px]`}
              onClick={() => browse(current.filter)}
            >
              {current.cta}
              <ArrowUpRight size={17} />
            </button>
          </div>
          <div className={`${styles.carouselBottom} absolute right-[3.1%] bottom-6 left-[3.1%] flex items-center justify-between max-[700px]:right-[6%] max-[700px]:bottom-[23px] max-[700px]:left-[7%]`}>
            <div className={`${styles.dots} flex items-center gap-3`}>
              {slides.map((_, i) => (
                <button
                  key={i}
                  aria-label={`Go to slide ${i + 1}`}
                  aria-current={slide === i ? "true" : undefined}
                  className={`${slide === i ? styles.activeDot : ""} relative h-[11px] w-[11px] rounded-full border p-0`}
                  onClick={() => setSlide(i)}
                />
              ))}
            </div>
            <div className={`${styles.arrows} flex items-center gap-[22px] max-[700px]:gap-[15px]`}>
              <button
                className="grid h-[39px] w-[39px] place-items-center rounded-full border"
                aria-label="Previous slide"
                onClick={() => setSlide((s) => (s + slides.length - 1) % slides.length)}
              >
                <ArrowLeft size={18} />
              </button>
              <span>
                0{slide + 1} <i className="ml-1">/ 03</i>
              </span>
              <button
                className="grid h-[39px] w-[39px] place-items-center rounded-full border"
                aria-label="Next slide"
                onClick={() => setSlide((s) => (s + 1) % slides.length)}
              >
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </section>
        <div className={`${styles.manifesto} flex h-[44px] items-center justify-center gap-11 border-y max-[1000px]:gap-[25px] max-[700px]:h-[42px] max-[700px]:gap-4`}>
          <span>GOTHIC BY NATURE.</span>
          <i>/</i>
          <span>NOT JUST FOR HALLOWEEN.</span>
          <i>/</i>
          <span>MADE TO BE DIFFERENT.</span>
        </div>
        <section
          id="collection"
          className={`${styles.collection} scroll-mt-5 px-[3.1%] pt-8 pb-[42px] max-[700px]:px-[5%] max-[700px]:pt-[31px] max-[700px]:pb-8 min-[1500px]:pt-10`}
        >
          <div className={`${styles.collectionHeading} mb-[22px] flex items-center justify-between gap-5 max-[700px]:mb-5 max-[700px]:block`}>
            <h2 className="m-0">Objects of obsession</h2>
            <div className={`${styles.filters} flex gap-[26px] max-[1000px]:gap-[18px] max-[700px]:mt-3 max-[700px]:gap-[25px]`} aria-label="Product categories">
              {categories.map((item) => (
                <button
                  key={item}
                  className={`border-x-0 border-t-0 border-b px-0 py-2.5 ${
                    category === item ? styles.selectedFilter : ""
                  }`}
                  aria-pressed={item === category}
                  onClick={() => setCategory(item)}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
          <div className={`${styles.products} grid grid-cols-4 gap-4 max-[700px]:grid-cols-2 max-[700px]:gap-x-3 max-[700px]:gap-y-[25px]`}>
            {visible.map((product) => (
              <button
                key={product.id}
                className={`${styles.product} min-w-0 border-0 p-0 text-left`}
                onClick={() => openProduct(product)}
              >
                <div className={`${styles.imageWrap} relative overflow-hidden`}>
                  <ProductImage product={product} />
                  <span className={`${styles.quickView} absolute right-0 bottom-0 left-0 flex justify-between px-[17px] py-[15px]`}>
                    Take a closer look <Plus size={17} />
                  </span>
                </div>
                <div className={`${styles.productInfo} mt-[14px] flex items-center justify-between gap-2 max-[700px]:mt-[10px]`}>
                  <h3>{product.name}</h3>
                  <ArrowUpRight size={16} />
                </div>
                <p>{money(product.price)}</p>
              </button>
            ))}
          </div>
          {visible.length === 0 && (
            <div className={`${styles.empty} py-[60px]`}>
              No matches in the shadows.
              <button
                className="mt-[18px] flex gap-3 border-0"
                onClick={() => {
                  setQuery("");
                  setCategory("All");
                }}
              >
                Show the full collection <ArrowRight size={17} />
              </button>
            </div>
          )}
        </section>
      </main>
      <footer
        className={`${styles.footer} flex items-center justify-between gap-6 border-t px-[3.1%] py-[30px] max-[700px]:flex-wrap max-[700px]:gap-[18px] max-[700px]:px-[5%] max-[700px]:py-[25px]`}
      >
        <a className={styles.logo} href="#">
          NOCTURNE
        </a>
        <p className="max-[700px]:order-3 max-[700px]:w-full max-[700px]:m-0">
          Wear your own kind of strange.
        </p>
        <Moon size={23} strokeWidth={1} />
        <span>© {new Date().getFullYear()} Nocturne</span>
      </footer>
      <p className={styles.srOnly} role="status">
        {notice}
      </p>
      <dialog
        aria-label={
          bagOpen ? "Shopping bag" : (selected?.name ?? "Product details")
        }
        className={`${styles.modal} fixed inset-0 m-auto max-h-[90dvh] w-[calc(100%_-_36px)] max-w-[850px] overflow-auto border px-0 py-0`}
        ref={dialog}
        onClick={(e) => {
          if (e.target === e.currentTarget) dialog.current?.close();
        }}
      >
        <button
          className={`${styles.close} absolute top-3 right-3 z-[2] border-0 p-[5px]`}
          aria-label="Close dialog"
          onClick={() => dialog.current?.close()}
        >
          <X size={22} />
        </button>
        {selected && (
          <div className={`${styles.detail} grid grid-cols-2 max-[700px]:grid-cols-1`}>
            <ProductImage
              product={selected}
              className="max-[700px]:mx-auto"
            />
            <div className={`${styles.detailCopy} px-8 pt-[55px] pb-[30px] max-[700px]:p-[25px]`}>
              <span className={styles.detailCategory}>{selected.category}</span>
              <h2 className="my-[15px]">{selected.name}</h2>
              <p className={styles.price}>{money(selected.price)}</p>
              <p>{selected.description}</p>
              <fieldset className="my-6 border-0 p-0">
                <legend className="mb-3">Select size</legend>
                <div className={`${styles.sizes} flex flex-wrap gap-[7px]`}>
                  {selected.sizes.map((s) => (
                    <button
                      key={s}
                      className="min-h-[38px] min-w-[38px] border px-[9px] py-0"
                      aria-pressed={s === size}
                      onClick={() => setSize(s)}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </fieldset>
              <button
                className={`${styles.primary} inline-flex items-center justify-center gap-6 border px-[25px] py-[15px]`}
                onClick={addToBag}
              >
                Add to bag <ShoppingBag size={18} />
              </button>
              <small className="mt-[15px] block">
                Concept collection · illustrative products
              </small>
            </div>
          </div>
        )}
        {bagOpen && (
          <div className={`${styles.bag} min-h-[270px] p-[35px] max-[700px]:p-[25px]`}>
            <h2 className="my-[15px] pr-5">
              Your midnight finds <span>({count})</span>
            </h2>
            {bag.length ? (
              <>
                <div className={styles.bagItems}>
                  {bag.map((item, i) => (
                    <div
                      className={`${styles.bagItem} flex items-center gap-5 border-b py-[18px]`}
                      key={`${item.product.id}-${item.size}`}
                    >
                      <ProductImage product={item.product} />
                      <div>
                        <h3 className="mb-[9px]">
                          {item.product.name}
                        </h3>
                        <p>
                          {item.size} · {money(item.product.price)}
                        </p>
                        <div className={`${styles.quantity} mt-3 flex items-center gap-[15px]`}>
                          <button
                            className="border p-[6px]"
                            aria-label={`Remove one ${item.product.name}`}
                            onClick={() => changeQuantity(i, -1)}
                          >
                            <Minus size={14} />
                          </button>
                          <span>{item.quantity}</span>
                          <button
                            className="border p-[6px]"
                            aria-label={`Add one ${item.product.name}`}
                            onClick={() => changeQuantity(i, 1)}
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className={`${styles.total} flex justify-between py-6`}>
                  <span>Subtotal</span>
                  <span>
                    {money(
                      bag.reduce(
                        (total, item) =>
                          total + item.product.price * item.quantity,
                        0,
                      ),
                    )}
                  </span>
                </div>
                <p className={`${styles.demoNote} mb-[23px]`}>
                  This is a concept storefront. Checkout and payments are not
                  enabled.
                </p>
              </>
            ) : (
              <p className="my-[25px]">
                Your bag is waiting for something wicked.
              </p>
            )}
            <button
              className={`${styles.primary} inline-flex items-center justify-center gap-6 border px-[25px] py-[15px]`}
              onClick={() => {
                dialog.current?.close();
                browse("All");
              }}
            >
              Continue exploring <ArrowRight size={18} />
            </button>
          </div>
        )}
      </dialog>
    </div>
  );
}
