'use client';
import { useMemo, useState } from 'react';
import { countries } from '../data/countries';
import type { PopulationFilter, SortOption } from '../types';

const populationFormatter = new Intl.NumberFormat('en-GB');
const compactFormatter = new Intl.NumberFormat('en-GB', { notation: 'compact', maximumFractionDigits: 1 });

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true" className="h-5 w-5">
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.2-3.2" />
    </svg>
  );
}

function ChevronIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true" className="h-4 w-4">
      <path d="m7 10 5 5 5-5" />
    </svg>
  );
}

export default function CountriesExplorer() {
  const [query, setQuery] = useState('');
  const [population, setPopulation] = useState<PopulationFilter>('all');
  const [sort, setSort] = useState<SortOption>('name-asc');

  const totalPopulation = useMemo(() => countries.reduce((sum, country) => sum + country.population, 0), []);

  const visibleCountries = useMemo(() => {
    const term = query.trim().toLocaleLowerCase();

    return countries
      .filter((country) => {
        const matchesSearch = `${country.name} ${country.capital} ${country.code}`.toLocaleLowerCase().includes(term);
        const matchesPopulation =
          population === 'all' ||
          (population === 'small' && country.population < 1_000_000) ||
          (population === 'medium' && country.population >= 1_000_000 && country.population < 10_000_000) ||
          (population === 'large' && country.population >= 10_000_000);

        return matchesSearch && matchesPopulation;
      })
      .sort((a, b) => {
        if (sort === 'name-desc') return b.name.localeCompare(a.name);
        if (sort === 'population-desc') return b.population - a.population;
        if (sort === 'population-asc') return a.population - b.population;
        return a.name.localeCompare(b.name);
      });
  }, [population, query, sort]);

  const clearFilters = () => {
    setQuery('');
    setPopulation('all');
    setSort('name-asc');
  };

  return (
    <main className="min-h-screen bg-[#f7f8f4] text-[#18251d]">
      <section className="relative overflow-hidden border-b border-[#dfe4da] bg-[#eef2e9]">
        <div className="pointer-events-none absolute -right-24 -top-32 h-96 w-96 rounded-full bg-[#dbe5d3] blur-3xl" />
        <div className="pointer-events-none absolute -bottom-40 left-1/3 h-80 w-80 rounded-full bg-[#e4ddc8] opacity-70 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 pb-12 pt-7 sm:px-6 sm:pb-16 lg:px-8 lg:pt-9">
          <nav className="mb-14 flex items-center justify-between sm:mb-20" aria-label="Primary navigation">
            <a href="#country-table" className="flex items-center gap-3 text-sm font-semibold tracking-tight">
              <span className="grid h-9 w-9 place-items-center rounded-full bg-[#1f4b35] text-base text-white shadow-sm">E</span>
              <span>Europe Atlas</span>
            </a>
            <span className="rounded-full border border-[#cdd7c8] bg-white/60 px-3 py-1.5 text-xs font-medium text-[#526157] backdrop-blur-sm">
              Reference guide
            </span>
          </nav>

          <div className="max-w-3xl">
            <div className="mb-5 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#3d7458]">
              <span className="h-px w-8 bg-[#3d7458]" />
              The continent at a glance
            </div>
            <h1 className="max-w-3xl text-balance text-4xl font-semibold leading-[1.05] tracking-[-0.045em] text-[#173a29] sm:text-6xl lg:text-7xl">
              Every country in Europe, one clear view.
            </h1>
            <p className="mt-6 max-w-xl text-base leading-7 text-[#59665d] sm:text-lg">
              Browse capitals, flags, and population estimates across Europe’s 51 countries, including transcontinental states.
            </p>
          </div>

          <div className="mt-10 grid max-w-2xl grid-cols-2 gap-3 sm:mt-14 sm:grid-cols-3">
            <div className="rounded-2xl border border-white/70 bg-white/55 p-4 backdrop-blur-sm sm:p-5">
              <p className="text-2xl font-semibold tracking-tight text-[#173a29] sm:text-3xl">{countries.length}</p>
              <p className="mt-1 text-xs font-medium uppercase tracking-wider text-[#6a756e]">Countries</p>
            </div>
            <div className="rounded-2xl border border-white/70 bg-white/55 p-4 backdrop-blur-sm sm:p-5">
              <p className="text-2xl font-semibold tracking-tight text-[#173a29] sm:text-3xl">{compactFormatter.format(totalPopulation)}</p>
              <p className="mt-1 text-xs font-medium uppercase tracking-wider text-[#6a756e]">People</p>
            </div>
            <div className="col-span-2 rounded-2xl border border-white/70 bg-white/55 p-4 backdrop-blur-sm sm:col-span-1 sm:p-5">
              <p className="text-2xl font-semibold tracking-tight text-[#173a29] sm:text-3xl">51</p>
              <p className="mt-1 text-xs font-medium uppercase tracking-wider text-[#6a756e]">Capital cities</p>
            </div>
          </div>
        </div>
      </section>

      <section id="country-table" className="mx-auto max-w-7xl scroll-mt-4 px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-16">
        <div className="mb-7 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#3d7458]">Directory</p>
            <h2 className="mt-2 text-2xl font-semibold tracking-[-0.025em] text-[#173a29] sm:text-3xl">Explore the countries</h2>
          </div>
          <p className="text-sm text-[#718077]" aria-live="polite">
            Showing <strong className="font-semibold text-[#294533]">{visibleCountries.length}</strong> of {countries.length}
          </p>
        </div>

        <div className="mb-5 grid gap-3 rounded-2xl border border-[#dde3d9] bg-white p-3 shadow-[0_10px_35px_rgba(39,62,45,0.05)] sm:grid-cols-2 lg:grid-cols-[1fr_220px_220px_auto]">
          <label className="relative sm:col-span-2 lg:col-span-1" htmlFor="country-search">
            <span className="sr-only">Search by country or capital</span>
            <span className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-[#718077]">
              <SearchIcon />
            </span>
            <input
              id="country-search"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search country, capital or code..."
              className="h-12 w-full rounded-xl border border-[#dbe1d7] bg-[#fafbf8] pl-12 pr-4 text-sm text-[#1d2f24] outline-none transition placeholder:text-[#98a29b] focus:border-[#6d9279] focus:ring-3 focus:ring-[#dce8df]"
            />
          </label>

          <label className="relative" htmlFor="population-filter">
            <span className="sr-only">Filter by population</span>
            <select
              id="population-filter"
              value={population}
              onChange={(event) => setPopulation(event.target.value as PopulationFilter)}
              className="h-12 w-full appearance-none rounded-xl border border-[#dbe1d7] bg-[#fafbf8] px-4 pr-10 text-sm text-[#34463a] outline-none transition focus:border-[#6d9279] focus:ring-3 focus:ring-[#dce8df]"
            >
              <option value="all">All populations</option>
              <option value="small">Under 1 million</option>
              <option value="medium">1–10 million</option>
              <option value="large">10 million+</option>
            </select>
            <span className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-[#718077]">
              <ChevronIcon />
            </span>
          </label>

          <label className="relative" htmlFor="sort-countries">
            <span className="sr-only">Sort countries</span>
            <select
              id="sort-countries"
              value={sort}
              onChange={(event) => setSort(event.target.value as SortOption)}
              className="h-12 w-full appearance-none rounded-xl border border-[#dbe1d7] bg-[#fafbf8] px-4 pr-10 text-sm text-[#34463a] outline-none transition focus:border-[#6d9279] focus:ring-3 focus:ring-[#dce8df]"
            >
              <option value="name-asc">Name: A to Z</option>
              <option value="name-desc">Name: Z to A</option>
              <option value="population-desc">Population: high to low</option>
              <option value="population-asc">Population: low to high</option>
            </select>
            <span className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-[#718077]">
              <ChevronIcon />
            </span>
          </label>

          <button
            type="button"
            onClick={clearFilters}
            disabled={!query && population === 'all' && sort === 'name-asc'}
            className="h-12 rounded-xl border border-[#dbe1d7] px-5 text-sm font-semibold text-[#355b44] transition hover:border-[#aac0b0] hover:bg-[#f1f5ef] disabled:cursor-not-allowed disabled:opacity-40 sm:col-span-2 lg:col-span-1"
          >
            Reset
          </button>
        </div>

        <div className="overflow-hidden rounded-2xl border border-[#dde3d9] bg-white shadow-[0_18px_50px_rgba(39,62,45,0.07)]">
          {visibleCountries.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left">
                <caption className="sr-only">European countries with their flags, capitals, and estimated populations</caption>
                <thead className="border-b border-[#dfe5dc] bg-[#f3f6f1]">
                  <tr className="text-xs font-semibold uppercase tracking-[0.12em] text-[#718077]">
                    <th scope="col" className="w-16 px-4 py-4 text-center sm:w-24 sm:px-6">Flag</th>
                    <th scope="col" className="min-w-48 px-3 py-4 sm:px-6">Country</th>
                    <th scope="col" className="min-w-44 px-3 py-4 sm:px-6">Capital</th>
                    <th scope="col" className="min-w-40 px-4 py-4 text-right sm:px-8">Population</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#edf0eb]">
                  {visibleCountries.map((country) => (
                    <tr key={country.code} className="group transition-colors hover:bg-[#f7faf5]">
                      <td className="px-4 py-4 text-center sm:px-6 sm:py-5">
                        <span className="inline-grid h-10 w-10 place-items-center rounded-full border border-[#e1e6de] bg-[#f7f8f5] text-2xl shadow-sm transition-transform group-hover:scale-105" role="img" aria-label={`${country.name} flag`}>
                          {country.flag}
                        </span>
                      </td>
                      <th scope="row" className="px-3 py-4 sm:px-6 sm:py-5">
                        <span className="block text-sm font-semibold text-[#203629] sm:text-base">{country.name}</span>
                        <span className="mt-0.5 block text-xs font-medium tracking-widest text-[#8a958e]">{country.code}</span>
                      </th>
                      <td className="px-3 py-4 text-sm text-[#536359] sm:px-6 sm:py-5 sm:text-base">{country.capital}</td>
                      <td className="px-4 py-4 text-right font-mono text-sm font-medium tabular-nums text-[#294533] sm:px-8 sm:py-5 sm:text-base">
                        {populationFormatter.format(country.population)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="grid min-h-72 place-items-center px-6 py-16 text-center">
              <div>
                <span className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-[#eef3eb] text-[#52705c]">
                  <SearchIcon />
                </span>
                <h3 className="mt-4 text-lg font-semibold text-[#203629]">No countries found</h3>
                <p className="mt-2 text-sm text-[#718077]">Try another search or broaden the population range.</p>
                <button type="button" onClick={clearFilters} className="mt-5 rounded-lg bg-[#1f4b35] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#173c2a]">
                  Clear filters
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="mt-5 flex flex-col gap-2 text-xs leading-5 text-[#7a877f] sm:flex-row sm:items-center sm:justify-between">
          <p>Population figures are recent rounded estimates and may vary by source.</p>
          <p>Broad geographic definition · Updated 2026</p>
        </div>
      </section>

      <footer className="border-t border-[#dfe4da] bg-[#eef2e9]">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-7 text-xs text-[#67756c] sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p className="font-semibold text-[#355442]">Europe Atlas</p>
          <p>A simple reference for a complex continent.</p>
        </div>
      </footer>
    </main>
  );
}
