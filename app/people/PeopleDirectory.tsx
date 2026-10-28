"use client";
import { useState } from "react";
import { people } from "./data";
import styles from "./people.module.css";

const PAGE_SIZE = 10;
const pageCount = Math.ceil(people.length / PAGE_SIZE);

export default function PeopleDirectory() {
  const [page, setPage] = useState(1);
  const start = (page - 1) * PAGE_SIZE;
  const visiblePeople = people.slice(start, start + PAGE_SIZE);

  return (
    <div className={`${styles.directory} min-h-screen`}>
      <header className={`${styles.header} flex h-14 items-center gap-3 border-b px-[max(24px,5.5vw)]`}>
        <span className={`${styles.mark} size-[18px] rounded-sm`} aria-hidden="true" />
        People directory
      </header>
      <main className="mx-auto mt-[60px] mb-20 max-w-[1128px] px-6 max-[641px]:mt-9 max-[641px]:px-5">
        <div className={`${styles.intro} mb-10 flex items-start justify-between gap-6 max-[641px]:mb-[26px] max-[641px]:gap-3`}>
          <div>
            <h1 className="mt-0 mb-1">People</h1>
            <p className="m-0 max-[641px]:max-w-60">A small directory of people from around the world.</p>
          </div>
          <span className={`${styles.count} pt-5 whitespace-nowrap max-[641px]:pt-3`}>{people.length} people</span>
        </div>
        <div
          className={`${styles.tableWrapper} overflow-x-auto rounded-xl border`}
          tabIndex={0}
          role="region"
          aria-label="People table, scroll horizontally on small screens"
        >
          <table className="w-full border-collapse text-left whitespace-nowrap max-[641px]:min-w-[660px] [&_th]:h-11 [&_th]:px-[22px] [&_th]:py-0 [&_th:first-child]:w-[24%] [&_th:nth-child(2)]:w-[22%] [&_th:nth-child(3)]:w-[14%] [&_th:nth-child(4)]:w-[24%] [&_td]:h-[53px] [&_td]:border-t [&_td]:px-[22px] [&_td]:py-2">
            <caption className="sr-only">
              Fictional people, page {page} of {pageCount}
            </caption>
            <thead>
              <tr>
                {["First name", "Last name", "Age", "Nationality", "ID"].map(
                  (label) => (
                    <th scope="col" key={label}>
                      {label}
                    </th>
                  ),
                )}
              </tr>
            </thead>
            <tbody>
              {visiblePeople.map((person, index) => (
                <tr key={person.id}>
                  <td>
                    <div className="flex items-center gap-[18px]">
                      <span
                        className={`${styles.avatar} grid size-9 shrink-0 place-items-center rounded-full`}
                        data-color={index % 6}
                        aria-hidden="true"
                      >
                        {person.firstName[0]}
                        {person.lastName[0]}
                      </span>
                      {person.firstName}
                    </div>
                  </td>
                  <td>{person.lastName}</td>
                  <td>{person.age}</td>
                  <td>{person.nationality}</td>
                  <td>
                    <code>{person.id}</code>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className={`${styles.footer} mt-6 flex items-center justify-between gap-5 max-[641px]:flex-col max-[641px]:items-start`}>
          <p className="m-0" role="status">
            Showing {start + 1}–{Math.min(start + PAGE_SIZE, people.length)} of{" "}
            {people.length} people
          </p>
          <nav className={`${styles.pagination} flex gap-3 max-[641px]:w-full max-[641px]:justify-between max-[641px]:gap-2 [&_button]:h-11 [&_button]:min-w-11 [&_button]:cursor-pointer [&_button]:rounded-[10px] [&_button]:border [&_button]:px-4 [&_button]:py-0 [&_button]:transition-[background] [&_button]:duration-150 [&_button:disabled]:cursor-not-allowed`} aria-label="People pagination">
            <button
              disabled={page === 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
            >
              Previous
            </button>
            {Array.from({ length: pageCount }, (_, i) => i + 1).map(
              (number) => (
                <button
                  key={number}
                  aria-label={`Page ${number}`}
                  aria-current={page === number ? "page" : undefined}
                  onClick={() => setPage(number)}
                >
                  {number}
                </button>
              ),
            )}
            <button
              disabled={page === pageCount}
              onClick={() => setPage((p) => Math.min(pageCount, p + 1))}
            >
              Next
            </button>
          </nav>
        </div>
        <p className={`${styles.note} mt-[25px] mb-0`}>Sample data · {PAGE_SIZE} people per page</p>
      </main>
    </div>
  );
}
