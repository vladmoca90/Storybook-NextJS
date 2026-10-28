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
    <div className={styles.directory}>
      <header className={styles.header}>
        <span className={styles.mark} aria-hidden="true" />
        People directory
      </header>
      <main className={styles.main}>
        <div className={styles.intro}>
          <div>
            <h1>People</h1>
            <p>A small directory of people from around the world.</p>
          </div>
          <span className={styles.count}>{people.length} people</span>
        </div>
        <div
          className={styles.tableWrapper}
          tabIndex={0}
          role="region"
          aria-label="People table, scroll horizontally on small screens"
        >
          <table>
            <caption className={styles.srOnly}>
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
                    <div className={styles.name}>
                      <span
                        className={styles.avatar}
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
        <div className={styles.footer}>
          <p role="status">
            Showing {start + 1}–{Math.min(start + PAGE_SIZE, people.length)} of{" "}
            {people.length} people
          </p>
          <nav className={styles.pagination} aria-label="People pagination">
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
        <p className={styles.note}>Sample data · {PAGE_SIZE} people per page</p>
      </main>
    </div>
  );
}
