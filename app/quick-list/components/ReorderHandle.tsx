import { useRef, useState } from "react";
import type { PointerEvent } from "react";
import styles from "../quick-list.module.css";

type ReorderHandleProps = {
  label: string;
  index: number;
  count: number;
  onMove: (index: number) => void;
};

export default function ReorderHandle({
  label,
  index,
  count,
  onMove,
}: ReorderHandleProps) {
  const drag = useRef<{
    startY: number;
    destination: number;
    row: HTMLElement;
    target: HTMLElement | null;
  } | null>(null);
  const [message, setMessage] = useState("");

  function cancel() {
    if (drag.current) {
      delete drag.current.row.dataset.dragging;
      if (drag.current.target) delete drag.current.target.dataset.dropTarget;
    }
    drag.current = null;
  }

  function move(destination: number) {
    if (destination < 0 || destination >= count || destination === index)
      return;
    
    onMove(destination);
    setMessage(`${label} moved to position ${destination + 1} of ${count}`);
  }

  function update(event: PointerEvent<HTMLButtonElement>) {
    const current = drag.current;
    const list = current?.row.parentElement;

    if (!current || !list || Math.abs(event.clientY - current.startY) < 4)
      return;

    const bounds = list.getBoundingClientRect();

    if (event.clientY < bounds.top + 32) list.scrollTop -= 16;
    if (event.clientY > bounds.bottom - 32) list.scrollTop += 16;

    let distance = Infinity;

    Array.from(list.children).forEach((element, position) => {
      const rect = element.getBoundingClientRect();
      const nextDistance = Math.abs(event.clientY - rect.top - rect.height / 2);

      if (nextDistance < distance) {
        distance = nextDistance;
        current.destination = position;
      }
    });

    if (current.target) delete current.target.dataset.dropTarget;
    current.target = list.children[current.destination] as HTMLElement;

    if (current.destination !== index)
      current.target.dataset.dropTarget = "true";
  }

  return (
    <>
      <button
        type="button"
        className={`${styles.dragHandle} grid h-9 w-6 shrink-0 touch-none cursor-grab place-items-center rounded-md border-0 select-none active:cursor-grabbing`}
        aria-label={`Reorder ${label}. Use up and down arrow keys to move.`}
        title="Drag to reorder, or use ↑ and ↓. Escape cancels."
        onPointerDown={(event) => {
          if (!event.isPrimary || event.button !== 0) return;
          const row = event.currentTarget.closest("li");
          if (!row) return;
          event.currentTarget.focus();
          event.currentTarget.setPointerCapture(event.pointerId);
          row.dataset.dragging = "true";
          drag.current = {
            startY: event.clientY,
            destination: index,
            row,
            target: null,
          };
        }}
        onPointerMove={update}
        onPointerUp={() => {
          const destination = drag.current?.destination;
          cancel();
          if (destination !== undefined) move(destination);
        }}
        onPointerCancel={cancel}
        onLostPointerCapture={cancel}
        onKeyDown={(event) => {
          if (event.key === "Escape") cancel();
          if (event.key === "ArrowUp" || event.key === "ArrowDown") {
            event.preventDefault();
            cancel();
            move(index + (event.key === "ArrowUp" ? -1 : 1));
          }
        }}
      >
        <svg
          className="w-4"
          viewBox="0 0 16 24"
          fill="currentColor"
          aria-hidden="true"
        >
          <circle cx="5" cy="6" r="1.5" />
          <circle cx="11" cy="6" r="1.5" />
          <circle cx="5" cy="12" r="1.5" />
          <circle cx="11" cy="12" r="1.5" />
          <circle cx="5" cy="18" r="1.5" />
          <circle cx="11" cy="18" r="1.5" />
        </svg>
      </button>
      <span role="status" className="sr-only">
        {message}
      </span>
    </>
  );
}
