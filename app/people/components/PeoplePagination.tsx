import styles from "../people.module.css";

type PeoplePaginationProps = {
  page: number;
  pageCount: number;
  pageSize: number;
  totalPeople: number;
  onPageChange: (page: number) => void;
};

export default function PeoplePagination({ page, pageCount, pageSize, totalPeople, onPageChange }: PeoplePaginationProps) {
  return (
    <div className={`${styles.footer} mt-6 flex items-center justify-between gap-5 max-[40.0625rem]:flex-col max-[40.0625rem]:items-start`}>
      <p className="m-0" role="status">
        Showing {(page - 1) * pageSize + 1}–{Math.min(page * pageSize, totalPeople)} of{" "}
        {totalPeople} people
      </p>
      <nav className={`${styles.pagination} flex gap-3 max-[40.0625rem]:w-full max-[40.0625rem]:justify-between max-[40.0625rem]:gap-2 [&_button]:h-11 [&_button]:min-w-11 [&_button]:cursor-pointer [&_button]:rounded-[0.625rem] [&_button]:border-[0.0625rem] [&_button]:px-4 [&_button]:py-0 [&_button]:transition-[background] [&_button]:duration-150 [&_button:disabled]:cursor-not-allowed`} aria-label="People pagination">
        <button
          disabled={page === 1}
          onClick={() => onPageChange(Math.max(1, page - 1))}
        >
          Previous
        </button>
        {Array.from({ length: pageCount }, (_, i) => i + 1).map(
          (number) => (
            <button
              key={number}
              aria-label={`Page ${number}`}
              aria-current={page === number ? "page" : undefined}
              onClick={() => onPageChange(number)}
            >
              {number}
            </button>
          ),
        )}
        <button
          disabled={page === pageCount}
          onClick={() => onPageChange(Math.min(pageCount, page + 1))}
        >
          Next
        </button>
      </nav>
    </div>
  );
}
