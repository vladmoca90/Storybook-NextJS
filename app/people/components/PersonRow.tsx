import styles from "../people.module.css";
import type { Person } from "../../data/people";

type PersonRowProps = { person: Person; colorIndex: number };

export default function PersonRow({ person, colorIndex }: PersonRowProps) {
  return (
    <tr>
      <td>
        <div className="flex items-center gap-[1.125rem]">
          <span
            className={`${styles.avatar} grid size-9 shrink-0 place-items-center rounded-full`}
            data-color={colorIndex % 6}
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
  );
}
