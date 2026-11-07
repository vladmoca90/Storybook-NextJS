import { X } from "lucide-react";
import type { ShopDialogProps } from "@/app/data/types/gothic";
import styles from "../gothic.module.css";

export default function ShopDialog({
  dialog,
  label,
  children,
}: ShopDialogProps) {
  return (
    <dialog
      aria-label={label}
      className={`${styles.modal} fixed inset-0 m-auto max-h-[90dvh] w-[calc(100%_-_36px)] max-w-[850px] overflow-auto border px-0 py-0`}
      ref={dialog}
      onClick={(e) => {
        if (e.target === e.currentTarget) dialog.current?.close();
      }}
    >
      <button
        className={`${styles.close} absolute top-3 right-3 z-[2] border-0 p-[5px]`}
        aria-label="Close dialog"
        onClick={() => dialog.current?.close()}
      >
        <X size={22} />
      </button>
      {children}
    </dialog>
  );
}
