"use client";
import { useState } from "react";
import { people } from "./data";
import styles from "./people.module.css";
import DirectoryHeader from "./components/DirectoryHeader";
import PeopleIntro from "./components/PeopleIntro";
import PeopleTable from "./components/PeopleTable";
import PeoplePagination from "./components/PeoplePagination";

const PAGE_SIZE = 10;
const pageCount = Math.ceil(people.length / PAGE_SIZE);

export default function PeopleDirectory() {
  const [page, setPage] = useState(1);
  const start = (page - 1) * PAGE_SIZE;
  const visiblePeople = people.slice(start, start + PAGE_SIZE);

  return (
    <div className={`${styles.directory} min-h-screen`}>
      <DirectoryHeader title="People directory" />
      <main className="mx-auto mt-[60px] mb-20 max-w-[1128px] px-6 max-[641px]:mt-9 max-[641px]:px-5">
        <PeopleIntro
          title="People"
          description="A small directory of people from around the world."
          totalPeople={people.length}
        />
        <PeopleTable people={visiblePeople} page={page} pageCount={pageCount} />
        <PeoplePagination
          page={page}
          pageCount={pageCount}
          pageSize={PAGE_SIZE}
          totalPeople={people.length}
          onPageChange={setPage}
        />
        <p className={`${styles.note} mt-[25px] mb-0`}>Sample data · {PAGE_SIZE} people per page</p>
      </main>
    </div>
  );
}
