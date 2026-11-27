"use client";
import { apiBaseUrl } from '@/lib/api';
import { useApiData, withApiData } from '@/lib/api-client';

import { useState } from "react";
import styles from "./people.module.css";
import DirectoryHeader from "./components/DirectoryHeader";
import PeopleIntro from "./components/PeopleIntro";
import PeopleTable from "./components/PeopleTable";
import PeoplePagination from "./components/PeoplePagination";

const peopleUrl = `${apiBaseUrl}/api/people`;

const PAGE_SIZE = 10;

function PeopleDirectory() {
  const people = useApiData('people');
  const pageCount = Math.max(1, Math.ceil(people.length / PAGE_SIZE));
  const [page, setPage] = useState(1);
  const start = (page - 1) * PAGE_SIZE;
  const visiblePeople = people.slice(start, start + PAGE_SIZE);

  return (
    <div className={`${styles.directory} min-h-screen`}>
      <DirectoryHeader title="People directory" />
      <main className="mx-auto mt-[3.75rem] mb-20 max-w-[70.5rem] px-6 max-[40.0625rem]:mt-9 max-[40.0625rem]:px-5">
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
        <p className={`${styles.note} mt-[1.5625rem] mb-0`}>Sample data · {PAGE_SIZE} people per page</p>
      </main>
    </div>
  );
}

export default withApiData(PeopleDirectory, 'people', peopleUrl);
