'use client';

import { useState, useMemo } from 'react';
import { peopleData } from '@/app/data/people';
import { filterPeople } from '@/app/utils/validation';
import './dashboard.css';

type FilterState = {
  searchName: string;
  jobFilter: string;
  nationalityFilter: string;
  maritalStatusFilter: string;
  ageRange: [number, number];
};

export default function Dashboard() {
  const [filters, setFilters] = useState<FilterState>({
    searchName: '',
    jobFilter: '',
    nationalityFilter: '',
    maritalStatusFilter: '',
    ageRange: [18, 100],
  });

  // Get unique values for filter dropdowns
  const uniqueJobs = useMemo(() => [...new Set(peopleData.map((p) => p.job))], []);
  const uniqueNationalities = useMemo(() => [...new Set(peopleData.map((p) => p.nationality))], []);
  const uniqueStatuses = useMemo(
    () => [...new Set(peopleData.map((p) => p.maritalStatus))],
    []
  );

  // Filter people based on current filter state
  const filteredPeople = useMemo(() => {
    return filterPeople(peopleData, {
      searchName: filters.searchName,
      jobFilter: filters.jobFilter || undefined,
      nationalityFilter: filters.nationalityFilter || undefined,
      maritalStatusFilter: filters.maritalStatusFilter || undefined,
      ageRange: filters.ageRange,
    });
  }, [filters]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters((prev) => ({ ...prev, searchName: e.target.value }));
  };

  const handleJobFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilters((prev) => ({ ...prev, jobFilter: e.target.value }));
  };

  const handleNationalityFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilters((prev) => ({ ...prev, nationalityFilter: e.target.value }));
  };

  const handleStatusFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilters((prev) => ({ ...prev, maritalStatusFilter: e.target.value }));
  };

  const handleMinAgeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const minAge = parseInt(e.target.value) || 18;
    setFilters((prev) => ({
      ...prev,
      ageRange: [Math.max(18, minAge), prev.ageRange[1]],
    }));
  };

  const handleMaxAgeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const maxAge = parseInt(e.target.value) || 100;
    setFilters((prev) => ({
      ...prev,
      ageRange: [prev.ageRange[0], Math.min(100, maxAge)],
    }));
  };

  const handleClearFilters = () => {
    setFilters({
      searchName: '',
      jobFilter: '',
      nationalityFilter: '',
      maritalStatusFilter: '',
      ageRange: [18, 100],
    });
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1 className="dashboard-title">People Dashboard</h1>
        <p className="dashboard-description">Browse and filter our team of professionals</p>
      </div>

      {/* Filter Section */}
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
              onChange={handleSearchChange}
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
              onChange={handleJobFilterChange}
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
              onChange={handleNationalityFilterChange}
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
              onChange={handleStatusFilterChange}
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
              onChange={handleMinAgeChange}
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
              onChange={handleMaxAgeChange}
            />
          </div>
        </div>
        <button className="clear-filters-btn" onClick={handleClearFilters}>
          Clear All Filters
        </button>
      </div>

      {/* Results Info */}
      <div className="results-info">
        Showing <span className="results-count">{filteredPeople.length}</span> of{' '}
        <span className="results-count">{peopleData.length}</span> people
      </div>

      {/* People Grid */}
      {filteredPeople.length > 0 ? (
        <div className="people-grid">
          {filteredPeople.map((person) => (
            <div key={person.id} className="person-card">
              <div className="person-card-header">
                <div className="person-avatar">{getInitials(person.name)}</div>
                <h3 className="person-name">{person.name}</h3>
              </div>

              <div className="person-detail">
                <span className="detail-label">Age:</span>
                <span className="detail-value">{person.age} years</span>
              </div>

              <div className="person-detail">
                <span className="detail-label">Job:</span>
                <span className="detail-value">{person.job}</span>
              </div>

              <div className="person-detail">
                <span className="detail-label">Nationality:</span>
                <span className="detail-value">{person.nationality}</span>
              </div>

              <div className="person-detail">
                <span className="detail-label">Status:</span>
                <span className={`detail-value status ${person.maritalStatus}`}>
                  {person.maritalStatus.charAt(0).toUpperCase() + person.maritalStatus.slice(1)}
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <div className="empty-state-icon">🔍</div>
          <p className="empty-state-text">No people match your filter criteria</p>
        </div>
      )}
    </div>
  );
}
