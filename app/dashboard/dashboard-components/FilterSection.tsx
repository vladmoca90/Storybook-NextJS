import type { Dispatch, SetStateAction } from 'react';
import type { FilterState } from '../types';

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
    <div className="filter-section">
      <h2 className="filter-title">Filters</h2>
      <div className="filter-grid">
        <div className="filter-group">
          <label htmlFor="search-name" className="filter-label">
            Search by Name
          </label>
          <input
            id="search-name"
            type="text"
            className="filter-input"
            placeholder="e.g., Emma"
            value={filters.searchName}
            onChange={(event) => updateFilter('searchName', event.target.value)}
          />
        </div>

        <div className="filter-group">
          <label htmlFor="job-filter" className="filter-label">
            Job Title
          </label>
          <select
            id="job-filter"
            className="filter-select"
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

        <div className="filter-group">
          <label htmlFor="nationality-filter" className="filter-label">
            Nationality
          </label>
          <select
            id="nationality-filter"
            className="filter-select"
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

        <div className="filter-group">
          <label htmlFor="status-filter" className="filter-label">
            Marital Status
          </label>
          <select
            id="status-filter"
            className="filter-select"
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

        <div className="filter-group">
          <label htmlFor="min-age" className="filter-label">
            Min Age: {filters.ageRange[0]}
          </label>
          <input
            id="min-age"
            type="range"
            className="filter-input"
            min="18"
            max="100"
            value={filters.ageRange[0]}
            onChange={(event) => {
              const minAge = parseInt(event.target.value) || 18;
              updateFilter('ageRange', [Math.max(18, minAge), filters.ageRange[1]]);
            }}
          />
        </div>

        <div className="filter-group">
          <label htmlFor="max-age" className="filter-label">
            Max Age: {filters.ageRange[1]}
          </label>
          <input
            id="max-age"
            type="range"
            className="filter-input"
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
      <button className="clear-filters-btn" onClick={() => onFiltersChange(initialFilters)}>
        Clear All Filters
      </button>
    </div>
  );
}
