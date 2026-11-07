import { Moon } from "lucide-react";
import styles from "../gothic.module.css";

export default function ShopFooter() {
  return (
    <footer
      className={`${styles.footer} flex items-center justify-between gap-6 border-t px-[3.1%] py-[30px] max-[700px]:flex-wrap max-[700px]:gap-[18px] max-[700px]:px-[4%] max-[700px]:py-[25px]`}
    >
      <a className={styles.logo} href="#">
        NOCTURNE
      </a>
      <p className="max-[700px]:order-3 max-[700px]:w-full max-[700px]:m-0">
        Wear your own kind of strange.
      </p>
      <Moon className="max-[700px]:w-[21px]" size={23} strokeWidth={1} />
      <span className="max-[1000px]:hidden">
        © {new Date().getFullYear()} Nocturne
      </span>
    </footer>
  );
}
