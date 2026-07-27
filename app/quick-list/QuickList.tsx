"use client";
import { useId, useState } from "react";
import type { FormEvent } from "react";
import type { ListItem } from "../data/quick-list";
import styles from "./quick-list.module.css";

export default function QuickList() {
  const [value, setValue] = useState("");
  const [items, setItems] = useState<ListItem[]>([]);
  const inputId = useId();

  function addItem(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const label = value.trim();

    if (!label) {
      return;
    }

    const newItem: ListItem = {
      id: Date.now(),
      label,
      completed: false,
    };

    setItems((currentItems) => [...currentItems, newItem]);
    setValue("");
  }

  function toggleItem(id: number) {
    setItems((currentItems) =>
      currentItems.map((item) =>
        item.id === id
          ? {
              ...item,
              completed: !item.completed,
            }
          : item,
      ),
    );
  }

  function deleteItem(id: number) {
    setItems((currentItems) =>
      currentItems.filter((item) => item.id !== id),
    );
  }

  function clearCompletedItems() {
    setItems((currentItems) =>
      currentItems.filter((item) => !item.completed),
    );
  }

  const completedCount = items.filter(
    (item) => item.completed,
  ).length;

  return (
    <main className={styles.page}>
      <div className={styles.glow} aria-hidden="true" />

      <section
        className={styles.app}
        aria-labelledby="list-title"
      >
        <header className={styles.header}>
          <div className={styles.brand}>
            <span className={styles.logo} aria-hidden="true">
              <svg viewBox="0 0 24 24">
                <path d="m5 12 4 4L19 6" />
              </svg>
            </span>

            <span>Quick List</span>
          </div>

          <div className={styles.eyebrow}>
            A little space for big plans
          </div>

          <h1 id="list-title">
            What&apos;s on your mind?
          </h1>

          <p className={styles.intro}>
            Add anything you want to remember. One thought at a
            time.
          </p>
        </header>

        <form className={styles.form} onSubmit={addItem}>
          <label className={styles.srOnly} htmlFor={inputId}>
            New list item
          </label>

          <input
            id={inputId}
            type="text"
            value={value}
            onChange={(event) => setValue(event.target.value)}
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

        <div className={styles.content} aria-live="polite">
          {items.length === 0 ? (
            <div className={styles.empty}>
              <span
                className={styles.emptyIcon}
                aria-hidden="true"
              >
                <svg viewBox="0 0 24 24">
                  <path d="M8 6h11M8 12h11M8 18h7" />
                  <circle cx="4" cy="6" r="1" />
                  <circle cx="4" cy="12" r="1" />
                  <circle cx="4" cy="18" r="1" />
                </svg>
              </span>

              <h2>Your list is waiting</h2>

              <p>
                Add your first item above to get started.
              </p>
            </div>
          ) : (
            <>
              <div className={styles.listHeader}>
                <span>
                  {items.length}{" "}
                  {items.length === 1 ? "item" : "items"}
                </span>

                {completedCount > 0 && (
                  <button
                    type="button"
                    onClick={clearCompletedItems}
                  >
                    Clear completed
                  </button>
                )}
              </div>

              <ul className={styles.list}>
                {items.map((item) => (
                  <li
                    key={item.id}
                    className={
                      item.completed ? styles.completed : undefined
                    }
                  >
                    <button
                      type="button"
                      className={styles.check}
                      onClick={() => toggleItem(item.id)}
                      aria-label={
                        item.completed
                          ? `Mark ${item.label} as not completed`
                          : `Mark ${item.label} as completed`
                      }
                      aria-pressed={item.completed}
                    >
                      <svg
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path d="m6 12 4 4 8-9" />
                      </svg>
                    </button>

                    <span className={styles.itemLabel}>
                      {item.label}
                    </span>

                    <button
                      type="button"
                      className={styles.delete}
                      onClick={() => deleteItem(item.id)}
                      aria-label={`Delete ${item.label}`}
                    >
                      <svg
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path d="M6 6l12 12M18 6 6 18" />
                      </svg>
                    </button>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>

        <footer>
          Press <kbd>Enter</kbd> to add an item
        </footer>
      </section>
    </main>
  );
}