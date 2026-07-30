"use client";
import { useId, useState } from "react";
import type { SubmitEvent } from "react";
import type { ListItem } from "../data/quick-list";
import QuickListContent from "./components/QuickListContent";
import QuickListForm from "./components/QuickListForm";
import styles from "./quick-list.module.css";

export default function QuickList() {
  const [value, setValue] = useState("");
  const [items, setItems] = useState<ListItem[]>([]);
  const inputId = useId();

  function addItem(event: SubmitEvent<HTMLFormElement>) {
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

        <QuickListForm
          inputId={inputId}
          value={value}
          onValueChange={setValue}
          onSubmit={addItem}
        />

        <QuickListContent
          items={items}
          onToggleItem={toggleItem}
          onDeleteItem={deleteItem}
          onClearCompleted={clearCompletedItems}
        />

        <footer>
          Press <kbd>Enter</kbd> to add an item
        </footer>
      </section>
    </main>
  );
}
