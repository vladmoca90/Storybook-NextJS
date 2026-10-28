import styles from "../people.module.css";
import type { Person } from "../data";
import PersonRow from "./PersonRow";

type PeopleTableProps = { people: Person[]; page: number; pageCount: number };

export default function PeopleTable({ people, page, pageCount }: PeopleTableProps) {
  return (
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
          {people.map((person, index) => (
            <PersonRow key={person.id} person={person} colorIndex={index} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
