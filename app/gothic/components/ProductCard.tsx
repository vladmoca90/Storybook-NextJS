import { ArrowUpRight, Plus } from "lucide-react";
import ProductImage from "./ProductImage";
import { money } from "../utils";
import type { ProductCardProps } from "@/app/data/types/gothic";
import styles from "../gothic.module.css";

export default function ProductCard({
  product,
  openProduct,
}: ProductCardProps) {
  return (
    <button
      className={`${styles.product} min-w-0 border-0 p-0 text-left`}
      onClick={() => openProduct(product)}
    >
      <div className={`${styles.imageWrap} relative overflow-hidden`}>
        <ProductImage product={product} />
        <span
          className={`${styles.quickView} max-[700px]:hidden absolute right-0 bottom-0 left-0 flex justify-between px-[17px] py-[15px]`}
        >
          Take a closer look <Plus size={17} />
        </span>
      </div>
      <div
        className={`${styles.productInfo} mt-[14px] flex items-center justify-between gap-2 max-[700px]:mt-[10px]`}
      >
        <h3>{product.name}</h3>
        <ArrowUpRight className="max-[700px]:hidden" size={16} />
      </div>
      <p>{money(product.price)}</p>
    </button>
  );
}
