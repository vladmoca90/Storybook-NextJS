import type { ListItem } from "@/app/data/types/quick-list";
import ReorderHandle from "./ReorderHandle";
import styles from "../quick-list.module.css";

type QuickListContentProps = {
  items: ListItem[];
  onToggleItem: (id: number) => void;
  onDeleteItem: (id: number) => void;
  onClearCompleted: () => void;
  onMoveItem: (id: number, destination: number) => void;
};

export default function QuickListContentComponent({
  items,
  onToggleItem,
  onDeleteItem,
  onClearCompleted,
  onMoveItem,
}: QuickListContentProps) {
  const completedCount = items.filter((item) => item.completed).length;

  return (
    <div className={"mt-7"} aria-live="polite">
      {items.length === 0 ? (
        <div className={`${styles.empty} flex min-h-[15.3125rem] flex-col items-center justify-center rounded-[1.0625rem] border-[0.0625rem] border-dashed text-center [&_h2]:m-0 [&_p]:mt-[0.4375rem] [&_p]:mb-0`}>
          <span className={`${styles.emptyIcon} mb-[1.0625rem] grid size-[3.375rem] place-items-center rounded-full [&_svg]:w-[1.5625rem]`} aria-hidden="true">
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
          <div className={`${styles.listHeader} mx-1 mt-0 mb-2.5 flex items-center justify-between [&_button]:cursor-pointer [&_button]:border-0 [&_button]:p-1`}>
            <span>
              {items.length} {items.length === 1 ? "item" : "items"}
            </span>

            {completedCount > 0 && (
              <button type="button" onClick={onClearCompleted}>
                Clear completed
              </button>
            )}
          </div>

          <ul className={`${styles.list} m-0 grid max-h-[18.125rem] list-none gap-[0.5625rem] overflow-y-auto p-0 [&_li]:flex [&_li]:min-h-[3.4375rem] [&_li]:items-center [&_li]:gap-3 [&_li]:rounded-[0.8125rem] [&_li]:border-[0.0625rem] [&_li]:px-[0.6875rem] [&_li]:py-[0.5625rem]`}>
            {items.map((item, index) => (
              <li
                key={item.id}
                className={item.completed ? styles.completed : undefined}
              >
                <ReorderHandle label={item.label} index={index} count={items.length} onMove={(destination) => onMoveItem(item.id, destination)} />
                <button
                  type="button"
                  className={`${styles.check} grid size-[1.6875rem] flex-none cursor-pointer place-items-center rounded-lg border-[0.09375rem] [&_svg]:w-[1.0625rem]`}
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

                <span className={`${styles.itemLabel} min-w-0 flex-1 [overflow-wrap:anywhere]`}>{item.label}</span>

                <button
                  type="button"
                  className={`${styles.delete} grid size-8 flex-none cursor-pointer place-items-center rounded-lg border-0 [&_svg]:w-[1.0625rem]`}
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
