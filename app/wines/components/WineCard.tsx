"use client";
import Image from "next/image";
import { useState } from "react";
import type { Wine } from "../../data/types/wine";
import styles from "../wines.module.css";

export default function WineCard({ wine, onAdd }: {
  wine: Wine;
  onAdd: () => void;
}) {
  const [failed, setFailed] = useState(false);
  const illustrative = failed;

  return (
    <article className={`${styles.card} flex flex-col items-center rounded-xl px-4 pb-5 pt-3 text-center`}>
      <div className="relative h-52 w-full sm:h-56">
        <Image src={illustrative ? "/wines/illustrative-bottle.png" : `/wines/${wine.img}`}
          alt={illustrative ? "Illustrative wine bottle; product photo unavailable" : wine.name}
          fill sizes="(max-width: 639px) 90vw, (max-width: 1023px) 45vw, 23vw"
          className="object-contain" onError={() => setFailed(true)} />
      </div>
      <p className={`${styles.category} mt-3`}>{wine.category}</p>
      <h2 className={`${styles.productName} mb-5 mt-1`}>{wine.name}</h2>
      <button type="button" className={`${styles.button} mt-auto min-h-11 w-full max-w-48 cursor-pointer rounded-lg border px-4 py-2`}
        aria-label={`Add ${wine.name} to bag`} onClick={onAdd}>Add to bag</button>
    </article>
  );
}
