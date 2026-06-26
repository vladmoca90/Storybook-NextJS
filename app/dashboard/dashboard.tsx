'use client';

import { useMemo, useState } from 'react';
import { peopleData } from '@/app/data/people';
import { filterPeople } from '@/app/utils/validation';
import { DashboardHeader } from './dashboard-components/DashboardHeader';
import { EmptyState } from './dashboard-components/EmptyState';
import { FilterSection } from './dashboard-components/FilterSection';
import { PeopleGrid } from './dashboard-components/PeopleGrid';
import { ResultsInfo } from './dashboard-components/ResultsInfo';
import { FilterState } from './types';
import './dashboard.css';

export default function Dashboard() {
  const [filters, setFilters] = useState<FilterState>({
    searchName: '',
    jobFilter: '',
    nationalityFilter: '',
    maritalStatusFilter: '',
    ageRange: [18, 100],
  });

  const uniqueJobs = useMemo(() => [...new Set(peopleData.map((person) => person.job))], []);

  const uniqueNationalities = useMemo(
    () => [...new Set(peopleData.map((person) => person.nationality))],
    []
  );

  const uniqueStatuses = useMemo(
    () => [...new Set(peopleData.map((person) => person.maritalStatus))],
    []
  );

  const filteredPeople = useMemo(() => {
    return filterPeople(peopleData, {
      searchName: filters.searchName,
      jobFilter: filters.jobFilter || undefined,
      nationalityFilter: filters.nationalityFilter || undefined,
      maritalStatusFilter: filters.maritalStatusFilter || undefined,
      ageRange: filters.ageRange,
    });
  }, [filters]);

  return (
    <div className="dashboard-container">
      <DashboardHeader />

      <FilterSection
        filters={filters}
        uniqueJobs={uniqueJobs}
        uniqueNationalities={uniqueNationalities}
        uniqueStatuses={uniqueStatuses}
        onFiltersChange={setFilters}
      />

      <ResultsInfo filteredCount={filteredPeople.length} totalCount={peopleData.length} />

      {filteredPeople.length > 0 ? <PeopleGrid people={filteredPeople} /> : <EmptyState />}
    </div>
  );
}
