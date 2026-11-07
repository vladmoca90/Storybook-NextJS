import { ArrowRight, Plus, Minus } from "lucide-react";
import ProductImage from "./ProductImage";
import { money } from "../utils";
import type { ShoppingBagProps } from "@/app/data/types/gothic";
import styles from "../gothic.module.css";

export default function ShoppingBag({
  bag,
  count,
  changeQuantity,
  onContinue,
}: ShoppingBagProps) {
  return (
    <div
      className={`${styles.bag} min-h-[270px] p-[35px] max-[700px]:p-[25px]`}
    >
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
                  <h3 className="mb-[9px]">{item.product.name}</h3>
                  <p>
                    {item.size} · {money(item.product.price)}
                  </p>
                  <div
                    className={`${styles.quantity} mt-3 flex items-center gap-[15px]`}
                  >
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
                  (total, item) => total + item.product.price * item.quantity,
                  0,
                ),
              )}
            </span>
          </div>
          <p className={`${styles.demoNote} mb-[23px]`}>
            This is a concept storefront. Checkout and payments are not enabled.
          </p>
        </>
      ) : (
        <p className="my-[25px]">Your bag is waiting for something wicked.</p>
      )}
      <button
        className={`${styles.primary} inline-flex items-center justify-center gap-6 border px-[25px] py-[10px]`}
        onClick={() => {
          onContinue();
        }}
      >
        Continue exploring <ArrowRight size={18} />
      </button>
    </div>
  );
}
