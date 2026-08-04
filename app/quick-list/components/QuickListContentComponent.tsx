import type { ListItem } from "../../data/quick-list";
import styles from "../quick-list.module.css";

type QuickListContentProps = {
  items: ListItem[];
  onToggleItem: (id: number) => void;
  onDeleteItem: (id: number) => void;
  onClearCompleted: () => void;
};

export default function QuickListContentComponent({
  items,
  onToggleItem,
  onDeleteItem,
  onClearCompleted,
}: QuickListContentProps) {
  const completedCount = items.filter((item) => item.completed).length;

  return (
    <div className={styles.content} aria-live="polite">
      {items.length === 0 ? (
        <div className={styles.empty}>
          <span className={styles.emptyIcon} aria-hidden="true">
            <svg viewBox="0 0 24 24">
              <path d="M8 6h11M8 12h11M8 18h7" />
              <circle cx="4" cy="6" r="1" />
              <circle cx="4" cy="12" r="1" />
              <circle cx="4" cy="18" r="1" />
            </svg>
          </span>

          <h2>Your list is waiting</h2>

          <p>Add your first item above to get started.</p>
        </div>
      ) : (
        <>
          <div className={styles.listHeader}>
            <span>
              {items.length} {items.length === 1 ? "item" : "items"}
            </span>

            {completedCount > 0 && (
              <button type="button" onClick={onClearCompleted}>
                Clear completed
              </button>
            )}
          </div>

          <ul className={styles.list}>
            {items.map((item) => (
              <li
                key={item.id}
                className={item.completed ? styles.completed : undefined}
              >
                <button
                  type="button"
                  className={styles.check}
                  onClick={() => onToggleItem(item.id)}
                  aria-label={
                    item.completed
                      ? `Mark ${item.label} as not completed`
                      : `Mark ${item.label} as completed`
                  }
                  aria-pressed={item.completed}
                >
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="m6 12 4 4 8-9" />
                  </svg>
                </button>

                <span className={styles.itemLabel}>{item.label}</span>

                <button
                  type="button"
                  className={styles.delete}
                  onClick={() => onDeleteItem(item.id)}
                  aria-label={`Delete ${item.label}`}
                >
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M6 6l12 12M18 6 6 18" />
                  </svg>
                </button>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
