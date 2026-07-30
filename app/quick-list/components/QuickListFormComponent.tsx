import type { SubmitEventHandler } from "react";
import styles from "./quick-list.module.css";

type QuickListFormProps = {
  inputId: string;
  value: string;
  onValueChange: (value: string) => void;
  onSubmit: SubmitEventHandler<HTMLFormElement>;
};

export default function QuickListForm({
  inputId,
  value,
  onValueChange,
  onSubmit,
}: QuickListFormProps) {
  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <label className={styles.srOnly} htmlFor={inputId}>
        New list item
      </label>

      <input
        id={inputId}
        type="text"
        value={value}
        onChange={(event) => onValueChange(event.target.value)}
        placeholder="Type something..."
        autoComplete="off"
        autoFocus
      />

      <button type="submit" disabled={!value.trim()}>
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 5v14M5 12h14" />
        </svg>

        Add
      </button>
    </form>
  );
}