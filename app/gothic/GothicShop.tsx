"use client";
import { useRef, useState } from "react";
import { products } from "@/app/data/gothic";
import type { BagItem, GothicCategory, Product } from "@/app/data/types/gothic";
import AnnouncementBar from "./components/AnnouncementBar";
import ShopHeader from "./components/ShopHeader";
import SearchBar from "./components/SearchBar";
import HeroCarousel from "./components/HeroCarousel";
import ManifestoBar from "./components/ManifestoBar";
import ProductCollection from "./components/ProductCollection";
import ShopFooter from "./components/ShopFooter";
import ShopDialog from "./components/ShopDialog";
import ProductDetails from "./components/ProductDetails";
import ShoppingBag from "./components/ShoppingBag";
import styles from "./gothic.module.css";

export default function GothicShop() {
  const [category, setCategory] = useState<GothicCategory>("All");
  const [query, setQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [selected, setSelected] = useState<Product | null>(null);
  const [size, setSize] = useState("");
  const [bag, setBag] = useState<BagItem[]>([]);
  const [bagOpen, setBagOpen] = useState(false);
  const [notice, setNotice] = useState("");
  const dialog = useRef<HTMLDialogElement>(null);
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
      <a
        className={`${styles.skip} sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-10 focus:p-[15px]`}
        href="#collection"
      >
        Skip to collection
      </a>
      <AnnouncementBar />
      <ShopHeader
        browse={browse}
        searchOpen={searchOpen}
        count={count}
        onToggleSearch={() => setSearchOpen((open) => !open)}
        openBag={openBag}
      />
      {searchOpen && (
        <SearchBar
          query={query}
          onQueryChange={(value) => {
            setQuery(value);
            setCategory("All");
          }}
          onClose={() => {
            setSearchOpen(false);
            setQuery("");
          }}
        />
      )}
      <main>
        <HeroCarousel browse={browse} />
        <ManifestoBar />
        <ProductCollection
          visible={visible}
          category={category}
          onCategoryChange={setCategory}
          openProduct={openProduct}
          onReset={() => {
            setQuery("");
            setCategory("All");
          }}
        />
      </main>
      <ShopFooter />
      <p className="sr-only" role="status">
        {notice}
      </p>
      <ShopDialog
        dialog={dialog}
        label={bagOpen ? "Shopping bag" : (selected?.name ?? "Product details")}
      >
        {selected && (
          <ProductDetails
            selected={selected}
            size={size}
            setSize={setSize}
            addToBag={addToBag}
          />
        )}
        {bagOpen && (
          <ShoppingBag
            bag={bag}
            count={count}
            changeQuantity={changeQuantity}
            onContinue={() => {
              dialog.current?.close();
              browse("All");
            }}
          />
        )}
      </ShopDialog>
    </div>
  );
}
