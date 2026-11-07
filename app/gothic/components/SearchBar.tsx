import { Search, ArrowRight, X } from "lucide-react";
import type { SearchBarProps } from "@/app/data/types/gothic";
import styles from "../gothic.module.css";

export default function SearchBar({
  query,
  onQueryChange,
  onClose,
}: SearchBarProps) {
  return (
    <form
      className={`${styles.search} flex items-center gap-5 border-b px-[4%] py-[18px] max-[700px]:gap-3`}
      onSubmit={(e) => {
        e.preventDefault();
        document
          .getElementById("collection")
          ?.scrollIntoView({ behavior: "smooth" });
      }}
    >
      <Search size={18} />
      <input
        className="min-w-0 flex-1 border-0"
        autoFocus
        aria-label="Search products"
        placeholder="Find your next obsession…"
        value={query}
        onChange={(e) => {
          onQueryChange(e.target.value);
        }}
      />
      <button className="flex items-center gap-3 border-0" type="submit">
        Search <ArrowRight size={16} />
      </button>
      <button
        className="flex items-center gap-3 border-0"
        type="button"
        aria-label="Close search"
        onClick={() => {
          onClose();
        }}
      >
        <X size={20} />
      </button>
    </form>
  );
}
