import { ShoppingBag } from "lucide-react";
import ProductImage from "./ProductImage";
import { money } from "../utils";
import type { ProductDetailsProps } from "@/app/data/types/gothic";
import styles from "../gothic.module.css";

export default function ProductDetails({
  selected,
  size,
  setSize,
  addToBag,
}: ProductDetailsProps) {
  return (
    <div
      className={`${styles.detail} grid grid-cols-2 max-[700px]:grid-cols-1`}
    >
      <ProductImage product={selected} className="max-[700px]:mx-auto" />
      <div
        className={`${styles.detailCopy} px-8 pt-[55px] pb-[30px] max-[700px]:p-[25px]`}
      >
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
          className={`${styles.primary} inline-flex items-center justify-center gap-6 border px-[25px] py-[10px]`}
          onClick={addToBag}
        >
          Add to bag <ShoppingBag size={18} />
        </button>
        <small className="mt-[15px] block">
          Concept collection · illustrative products
        </small>
      </div>
    </div>
  );
}
