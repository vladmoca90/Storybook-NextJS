import appearance from "../appearance.module.css";
import { ArrowRight } from "lucide-react";
import { calculateSalePrice } from "../../data/products";
import type { Product } from "../../data/types/products";
import { ProductArt } from "../ProductArt";

const money = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });

type ProductCardProps = {
  product: Product;
  onSelect: (id: number) => void;
};

export default function ProductCard({ product, onSelect }: ProductCardProps) {
  const salePrice = calculateSalePrice(product.price, product.discount);

  return (
    <article className={`group min-w-0`}>
      <div
        className={`relative grid aspect-square place-items-center overflow-hidden`}
        style={{ backgroundColor: `${product.accent}20` }}
      >
        <span
          className={`absolute left-3 top-3 z-20 px-[0.5625rem] py-[0.4375rem] ${appearance.text06875rem} ${appearance.fontExtrabold} ${appearance.textWhite}`}
          style={{ backgroundColor: product.accent }}
        >
          −{product.discount}%
        </span>
        <div
          className={`absolute size-[70%] rounded-full border`}
          style={{ borderColor: `${product.accent}55` }}
        />
        <div className={`z-10 w-[73%] ${appearance.textStoreProductInk} transition-transform duration-300 group-hover:scale-105 group-hover:-rotate-2`}>
          <ProductArt type={product.image} accent={product.accent} />
        </div>
      </div>
      <div>
        <p className={`mb-1.5 mt-4 ${appearance.text05625rem} ${appearance.fontExtrabold} ${appearance.uppercase} ${appearance.tracking15em} ${appearance.textStoreCategory}`}>
          {product.category}
        </p>
        <h3 className={`mb-3 ${appearance.fontSerif} ${appearance.textBase} ${appearance.fontNormal} ${appearance.lgTextLg}`}>{product.name}</h3>
        <div className={`flex items-baseline gap-2`}>
          <strong className={`${appearance.text09375rem}`}>{money.format(salePrice)}</strong>
          <s className={`${appearance.textXs} ${appearance.textStoreStrike}`}>{money.format(product.price)}</s>
        </div>
        <button
          className={`mt-3 flex cursor-pointer items-center gap-2 border-b ${appearance.borderStoreInk} ${appearance.bgTransparent} ${appearance.text06875rem} ${appearance.fontExtrabold}`}
          onClick={() => onSelect(product.id)}
        >
          Try in calculator <ArrowRight size={15} />
        </button>
      </div>
    </article>
  );
}
