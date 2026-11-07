"use client";
import { useRef, useState } from "react";
import { Minus, Plus, Search, ShoppingBag, X } from "lucide-react";
import { allWines, WineCategory } from "../data/wines";
import type { WineBag } from "../data/types/wine";
import WineCard from "./components/WineCard";
import styles from "./wines.module.css";

export default function WineShop({ availableImages = [] }: { availableImages?: string[] }) {
  const [category, setCategory] = useState<WineCategory | "All wines">("All wines");
  const [query, setQuery] = useState("");
  const [bag, setBag] = useState<WineBag>({});
  const [announcement, setAnnouncement] = useState("");
  const dialog = useRef<HTMLDialogElement>(null);
  const count = Object.values(bag).reduce((sum, quantity) => sum + quantity, 0);
  const visible = allWines.filter((wine) =>
    (category === "All wines" || wine.category === category) &&
    wine.name.toLowerCase().includes(query.trim().toLowerCase()),
  );

  function changeQuantity(img: string, amount: number) {
    setBag((current) => ({ ...current, [img]: Math.max(0, (current[img] ?? 0) + amount) }));
  }

  return (
    <main className={`${styles.shop} min-h-screen px-5 sm:px-10`}>
      <header className="mx-auto flex max-w-7xl items-center justify-between gap-4 border-b py-5">
        <a href="/wines" className={styles.logo}>The Wine Edit</a>
        <a href="#collection" className="hidden sm:block">Collection</a>
        <button type="button" className={`${styles.button} flex min-h-11 cursor-pointer items-center gap-2 rounded-lg px-2 py-2`}
          onClick={() => dialog.current?.showModal()}><ShoppingBag size={18} aria-hidden="true" />Bag ({count})</button>
      </header>

      <section className="mx-auto max-w-7xl py-10 text-center sm:py-12">
        <h1 className={styles.heading}>A world of wine.</h1>
        <p className={`${styles.intro} mt-3`}>Seven wines. Find your next favourite.</p>
      </section>

      <section id="collection" aria-label="Wine collection" className="mx-auto max-w-7xl pb-10">
        <div className="mb-6 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap gap-2" role="group" aria-label="Wine category">
            {(["All wines", ...Object.values(WineCategory)] as const).map((item) => (
              <button key={item} type="button" aria-pressed={category === item} onClick={() => setCategory(item)}
                className={`${styles.button} ${category === item ? styles.selected : ""} min-h-11 cursor-pointer rounded-lg border px-5 py-2`}>{item}</button>
            ))}
          </div>
          <label className={`${styles.search} flex min-h-11 items-center gap-3 rounded-lg border px-4 py-2 md:w-80`}>
            <Search size={18} aria-hidden="true" /><span className="sr-only">Search wines</span>
            <input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search wines" className="min-w-0 w-full" />
          </label>
        </div>
        <p className="sr-only" role="status">{visible.length} wines found</p>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {visible.map((wine) => <WineCard key={wine.img} wine={wine} hasImage={availableImages.includes(wine.img)} onAdd={() => {
            changeQuantity(wine.img, 1);
            setAnnouncement(`${wine.name} added to bag.`);
          }} />)}
        </div>
        {visible.length === 0 && <div className="py-16 text-center">
          <h2 className={styles.productName}>No wines found</h2>
          <p className="my-3">Try another name or explore the full collection.</p>
          <button type="button" className={`${styles.button} cursor-pointer rounded-lg border px-5 py-3`} onClick={() => { setQuery(""); setCategory("All wines"); }}>Clear filters</button>
        </div>}
        <div className={`${styles.note} mt-5 flex flex-col justify-between gap-2 sm:flex-row`}>
          <p>Illustrative bottles shown where product photos are unavailable.</p>
          <p role="status" aria-live="polite">{announcement}</p>
        </div>
      </section>

      <footer className={`${styles.footer} mx-auto max-w-7xl border-t py-6 text-center`}>A little discovery in every bottle.</footer>

      <dialog ref={dialog} aria-labelledby="wine-bag-title" className={`${styles.bag} fixed inset-0 m-auto max-h-[85dvh] w-[calc(100%-2rem)] max-w-lg overflow-y-auto rounded-xl border p-6 sm:p-8`}>
        <div className="mb-6 flex items-center justify-between gap-4">
          <h2 id="wine-bag-title" className={styles.logo}>Your bag ({count})</h2>
          <button type="button" autoFocus aria-label="Close bag" onClick={() => dialog.current?.close()} className={`${styles.button} flex size-11 cursor-pointer items-center justify-center rounded-lg`}><X size={22} /></button>
        </div>
        {count === 0 ? <p className="py-8">Your bag is empty. Find a new favourite in the collection.</p> : <>
          <ul>{allWines.filter((wine) => bag[wine.img] > 0).map((wine) => <li key={wine.img} className="border-t py-4">
            <h3 className={styles.productName}>{wine.name}</h3>
            <div className="mt-3 flex items-center justify-between gap-3">
              <div className="flex items-center gap-4">
                <button type="button" aria-label={`Decrease ${wine.name} quantity`} className={`${styles.button} flex size-11 cursor-pointer items-center justify-center rounded-lg border`} onClick={() => changeQuantity(wine.img, -1)}><Minus size={16} /></button>
                <span aria-label={`${wine.name} quantity`} role="status">{bag[wine.img]}</span>
                <button type="button" aria-label={`Increase ${wine.name} quantity`} className={`${styles.button} flex size-11 cursor-pointer items-center justify-center rounded-lg border`} onClick={() => changeQuantity(wine.img, 1)}><Plus size={16} /></button>
              </div>
              <button type="button" className={`${styles.button} min-h-11 cursor-pointer rounded-lg px-2 underline`} aria-label={`Remove ${wine.name}`} onClick={() => setBag((current) => ({ ...current, [wine.img]: 0 }))}>Remove</button>
            </div>
          </li>)}</ul>
          <p className={`${styles.note} border-t pt-4`}>Your selection is saved for this visit. Pricing and checkout are not available yet.</p>
        </>}
        <button type="button" className={`${styles.button} ${styles.selected} mt-6 min-h-11 w-full cursor-pointer rounded-lg px-5 py-3`} onClick={() => dialog.current?.close()}>Continue exploring</button>
      </dialog>
    </main>
  );
}
