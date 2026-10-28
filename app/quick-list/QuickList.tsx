"use client";
import { useId, useState } from "react";
import type { SubmitEvent } from "react";
import type { ListItem } from "@/app/data/types/quick-list";
import QuickListContent from "./components/QuickListContentComponent";
import QuickListForm from "./components/QuickListFormComponent";
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

  function moveItem(id: number, destination: number) {
    setItems((current) => {
      const from = current.findIndex((item) => item.id === id);
      if (from < 0 || destination < 0 || destination >= current.length || from === destination) return current;
      const reordered = [...current];
      const [moved] = reordered.splice(from, 1);
      reordered.splice(destination, 0, moved);
      return reordered;
    });
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
    <main className={`${styles.page} relative grid min-h-screen place-items-center overflow-hidden px-5 py-12 before:pointer-events-none before:absolute before:inset-0 max-[37.5rem]:items-start max-[37.5rem]:px-3 max-[37.5rem]:py-[1.125rem]`}>
      <div className={`${styles.glow} absolute -right-[8.75rem] -bottom-[9.375rem] size-90 rounded-full`} aria-hidden="true" />

      <section
        className={`${styles.app} relative w-full max-w-[41.875rem] min-h-[40.625rem] rounded-[1.75rem] border-[0.0625rem] px-13 pt-12 pb-7 max-[37.5rem]:min-h-[calc(100vh-2.25rem)] max-[37.5rem]:rounded-[1.375rem] max-[37.5rem]:px-5 max-[37.5rem]:pt-8 max-[37.5rem]:pb-[1.375rem] [&_footer]:mt-6 [&_footer]:text-center [&_kbd]:rounded-[0.3125rem] [&_kbd]:border-[0.0625rem] [&_kbd]:border-b-[0.125rem] [&_kbd]:px-1.5 [&_kbd]:py-0.5`}
        aria-labelledby="list-title"
      >
        <header className={`${styles.header} text-center [&_h1]:m-0`}>
          <div className={`${styles.brand} mb-[2.1875rem] inline-flex items-center gap-2.5 max-[37.5rem]:mb-7`}>
            <span className={`${styles.logo} grid size-[1.8125rem] place-items-center rounded-[0.5625rem] [&_svg]:w-[1.0625rem]`} aria-hidden="true">
              <svg viewBox="0 0 24 24">
                <path d="m5 12 4 4L19 6" />
              </svg>
            </span>

            <span>Quick List</span>
          </div>

          <div className={`${styles.eyebrow} mb-2.5`}>
            A little space for big plans
          </div>

          <h1 id="list-title">
            What&apos;s on your mind?
          </h1>

          <p className={`${styles.intro} mt-[0.9375rem] mb-[1.875rem] max-[37.5rem]:mb-6`}>
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
          onMoveItem={moveItem}
        />

        <footer>
          Press <kbd>Enter</kbd> to add an item
        </footer>
      </section>
    </main>
  );
}
