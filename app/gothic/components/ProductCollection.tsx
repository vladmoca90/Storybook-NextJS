import { ArrowRight } from "lucide-react";
import { categories } from "@/app/data/gothic";
import ProductCard from "./ProductCard";
import type { ProductCollectionProps } from "@/app/data/types/gothic";
import styles from "../gothic.module.css";

export default function ProductCollection({
  visible,
  category,
  onCategoryChange,
  openProduct,
  onReset,
}: ProductCollectionProps) {
  return (
    <section
      id="collection"
      className={`${styles.collection} scroll-mt-5 px-[3.1%] pt-8 pb-[42px] max-[700px]:px-[4%] max-[700px]:pt-[31px] max-[700px]:pb-8 min-[1500px]:pt-10`}
    >
      <div
        className={`${styles.collectionHeading} mb-[22px] flex items-center justify-between gap-5 max-[700px]:mb-5 max-[700px]:block`}
      >
        <h2 className="m-0">Objects of obsession</h2>
        <div
          className={`${styles.filters} flex gap-[26px] max-[1000px]:gap-[18px] max-[700px]:mt-3 max-[700px]:gap-[25px]`}
          aria-label="Product categories"
        >
          {categories.map((item) => (
            <button
              key={item}
              className={`border-x-0 border-t-0 border-b px-0 py-2.5 ${
                category === item ? styles.selectedFilter : ""
              }`}
              aria-pressed={item === category}
              onClick={() => onCategoryChange(item)}
            >
              {item}
            </button>
          ))}
        </div>
      </div>
      <div
        className={`${styles.products} grid grid-cols-4 gap-4 max-[700px]:grid-cols-2 max-[700px]:gap-x-3 max-[700px]:gap-y-[25px]`}
      >
        {visible.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            openProduct={openProduct}
          />
        ))}
      </div>
      {visible.length === 0 && (
        <div className={`${styles.empty} py-[60px]`}>
          No matches in the shadows.
          <button
            className="mt-[18px] flex gap-3 border-0"
            onClick={() => {
              onReset();
            }}
          >
            Show the full collection <ArrowRight size={17} />
          </button>
        </div>
      )}
    </section>
  );
}
