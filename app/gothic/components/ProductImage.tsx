import type { ProductImageProps } from "@/app/data/types/gothic";
import styles from "../gothic.module.css";

export default function ProductImage({
  product,
  className = "w-full",
}: ProductImageProps) {
  return (
    <div
      role="img"
      aria-label={product.name}
      className={`${styles.productImage} aspect-[3/4] min-[1500px]:aspect-[4/5] ${className}`}
      style={{ backgroundPosition: `${(product.id * 100) / 3}% center` }}
    />
  );
}
