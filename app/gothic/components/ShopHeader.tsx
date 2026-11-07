import { Search, ShoppingBag } from "lucide-react";
import type { ShopHeaderProps } from "@/app/data/types/gothic";
import styles from "../gothic.module.css";

export default function ShopHeader({
  browse,
  searchOpen,
  count,
  onToggleSearch,
  openBag,
}: ShopHeaderProps) {
  return (
    <header
      className={`${styles.header} flex h-[81px] items-center justify-between gap-[25px] border-b px-[3.1%] max-[700px]:h-auto max-[700px]:min-h-[104px] max-[700px]:flex-wrap max-[700px]:gap-4 max-[700px]:px-[4%] max-[700px]:pt-[19px]`}
    >
      <a className={styles.logo} href="#">
        NOCTURNE
      </a>
      <nav
        className="flex gap-8 max-[1000px]:gap-5 max-[700px]:order-3 max-[700px]:w-full max-[700px]:justify-between max-[700px]:gap-3"
        aria-label="Main navigation"
      >
        <button
          className="border-0 py-3 max-[700px]:pt-2 max-[700px]:pb-[15px]"
          onClick={() => browse("All")}
        >
          Shop all
        </button>
        <button
          className="border-0 py-3 max-[700px]:pt-2 max-[700px]:pb-[15px]"
          onClick={() => browse("Clothing")}
        >
          Gothic clothing
        </button>
        <button
          className="border-0 py-3 max-[700px]:pt-2 max-[700px]:pb-[15px]"
          onClick={() => browse("Costumes")}
        >
          Halloween
        </button>
        <button
          className="border-0 py-3 max-[700px]:pt-2 max-[700px]:pb-[15px]"
          onClick={() => browse("Accessories")}
        >
          Accessories
        </button>
      </nav>
      <div
        className={`${styles.headerActions} flex gap-6 max-[1000px]:gap-[15px] max-[700px]:gap-4`}
      >
        <button
          className="relative border-0 p-[5px]"
          aria-label="Search collection"
          aria-expanded={searchOpen}
          onClick={() => {
            onToggleSearch();
          }}
        >
          <Search size={21} />
        </button>
        <button
          className="relative border-0 p-[5px]"
          aria-label={`Shopping bag, ${count} items`}
          onClick={openBag}
        >
          <ShoppingBag size={21} />
          {count > 0 && (
            <span
              className={`${styles.count} absolute -top-1 -right-1.5 rounded-full px-[5px] py-[3px]`}
            >
              {count}
            </span>
          )}
        </button>
      </div>
    </header>
  );
}
