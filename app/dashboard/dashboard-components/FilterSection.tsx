import type { Dispatch, SetStateAction } from 'react';
import type { FilterState } from "@/app/data/types/dashboard";

type FilterSectionProps = {
  filters: FilterState;
  uniqueJobs: string[];
  uniqueNationalities: string[];
  uniqueStatuses: string[];
  onFiltersChange: Dispatch<SetStateAction<FilterState>>;
};

const initialFilters: FilterState = {
  searchName: '',
  jobFilter: '',
  nationalityFilter: '',
  maritalStatusFilter: '',
  ageRange: [18, 100],
};

export function FilterSection({
  filters,
  uniqueJobs,
  uniqueNationalities,
  uniqueStatuses,
  onFiltersChange,
}: FilterSectionProps) {
  const updateFilter = <Key extends keyof FilterState>(key: Key, value: FilterState[Key]) => {
    onFiltersChange((previousFilters) => ({
      ...previousFilters,
      [key]: value,
    }));
  };

  return (
    <div className={`filter-section rounded-[0.5rem] p-[1.5rem] mb-[2rem] border-[0.0625rem]`}>
      <h2 className={`filter-title [margin:0_0_1rem_0]`}>Filters</h2>
      <div className={`filter-grid grid [grid-template-columns:repeat(auto-fit,_minmax(12.5rem,_1fr))] gap-[1rem] [@media(max-width:48rem)]:grid-cols-[1fr]`}>
        <div className={`filter-group flex flex-col gap-[0.5rem]`}>
          <label htmlFor="search-name" className={`filter-label`}>
            Search by Name
          </label>
          <input
            id="search-name"
            type="text"
            className={`filter-input p-[0.75rem] border-[0.0625rem] rounded-[0.25rem] [&:focus]:outline-none`}
            placeholder="e.g., Emma"
            value={filters.searchName}
            onChange={(event) => updateFilter('searchName', event.target.value)}
          />
        </div>

        <div className={`filter-group flex flex-col gap-[0.5rem]`}>
          <label htmlFor="job-filter" className={`filter-label`}>
            Job Title
          </label>
          <select
            id="job-filter"
            className={`filter-select p-[0.75rem] border-[0.0625rem] rounded-[0.25rem] [&:focus]:outline-none`}
            value={filters.jobFilter}
            onChange={(event) => updateFilter('jobFilter', event.target.value)}
          >
            <option value="">All Jobs</option>
            {uniqueJobs.map((job) => (
              <option key={job} value={job}>
                {job}
              </option>
            ))}
          </select>
        </div>

        <div className={`filter-group flex flex-col gap-[0.5rem]`}>
          <label htmlFor="nationality-filter" className={`filter-label`}>
            Nationality
          </label>
          <select
            id="nationality-filter"
            className={`filter-select p-[0.75rem] border-[0.0625rem] rounded-[0.25rem] [&:focus]:outline-none`}
            value={filters.nationalityFilter}
            onChange={(event) => updateFilter('nationalityFilter', event.target.value)}
          >
            <option value="">All Nationalities</option>
            {uniqueNationalities.map((nationality) => (
              <option key={nationality} value={nationality}>
                {nationality}
              </option>
            ))}
          </select>
        </div>

        <div className={`filter-group flex flex-col gap-[0.5rem]`}>
          <label htmlFor="status-filter" className={`filter-label`}>
            Marital Status
          </label>
          <select
            id="status-filter"
            className={`filter-select p-[0.75rem] border-[0.0625rem] rounded-[0.25rem] [&:focus]:outline-none`}
            value={filters.maritalStatusFilter}
            onChange={(event) => updateFilter('maritalStatusFilter', event.target.value)}
          >
            <option value="">All Statuses</option>
            {uniqueStatuses.map((status) => (
              <option key={status} value={status}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <div className={`filter-group flex flex-col gap-[0.5rem]`}>
          <label htmlFor="min-age" className={`filter-label`}>
            Min Age: {filters.ageRange[0]}
          </label>
          <input
            id="min-age"
            type="range"
            className={`filter-input p-[0.75rem] border-[0.0625rem] rounded-[0.25rem] [&:focus]:outline-none`}
            min="18"
            max="100"
            value={filters.ageRange[0]}
            onChange={(event) => {
              const minAge = parseInt(event.target.value) || 18;
              updateFilter('ageRange', [Math.max(18, minAge), filters.ageRange[1]]);
            }}
          />
        </div>

        <div className={`filter-group flex flex-col gap-[0.5rem]`}>
          <label htmlFor="max-age" className={`filter-label`}>
            Max Age: {filters.ageRange[1]}
          </label>
          <input
            id="max-age"
            type="range"
            className={`filter-input p-[0.75rem] border-[0.0625rem] rounded-[0.25rem] [&:focus]:outline-none`}
            min="18"
            max="100"
            value={filters.ageRange[1]}
            onChange={(event) => {
              const maxAge = parseInt(event.target.value) || 100;
              updateFilter('ageRange', [filters.ageRange[0], Math.min(100, maxAge)]);
            }}
          />
        </div>
      </div>
      <button className={`clear-filters-btn [padding:0.5rem_1rem] border-[0.0625rem] rounded-[0.25rem] cursor-pointer self-[flex-end] [@media(max-width:48rem)]:self-[stretch]`} onClick={() => onFiltersChange(initialFilters)}>
        Clear All Filters
      </button>
    </div>
  );
}
