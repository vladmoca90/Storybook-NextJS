import type { ProductImageProps } from "@/app/data/types/gothic";
import styles from "../gothic.module.css";

export default function ProductImage({
  product,
  className = "",
}: ProductImageProps) {
  return (
    <div
      role="img"
      aria-label={product.name}
      className={`${styles.productImage} ${className}`}
      style={{ backgroundPosition: `${(product.id * 100) / 3}% center` }}
    />
  );
}
