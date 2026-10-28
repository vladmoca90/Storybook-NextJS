import type { SubmitEventHandler } from "react";
import styles from "../quick-list.module.css";

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
    <form className={`${styles.form} flex gap-2.5 rounded-[0.9375rem] border-[0.0625rem] p-[0.4375rem] [&_input]:min-w-0 [&_input]:flex-1 [&_input]:border-0 [&_input]:px-[0.8125rem] [&_input]:py-[0.6875rem] [&_input]:outline-0 [&_button]:inline-flex [&_button]:cursor-pointer [&_button]:items-center [&_button]:gap-[0.4375rem] [&_button]:rounded-[0.625rem] [&_button]:border-0 [&_button]:px-[1.1875rem] [&_button]:py-0 [&_button:disabled]:cursor-not-allowed max-[37.5rem]:[&_button]:px-3.5 [&_svg]:w-[1.0625rem]`} onSubmit={onSubmit}>
      <label className="sr-only" htmlFor={inputId}>
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