'use client';

import { useMemo, useState } from 'react';

type Country = {
  name: string;
  code: string;
  flag: string;
  capital: string;
  population: number;
};

type PopulationFilter = 'all' | 'small' | 'medium' | 'large';
type SortOption = 'name-asc' | 'name-desc' | 'population-desc' | 'population-asc';

const countries: Country[] = [
  { name: 'Albania', code: 'AL', flag: '🇦🇱', capital: 'Tirana', population: 2402113 },
  { name: 'Andorra', code: 'AD', flag: '🇦🇩', capital: 'Andorra la Vella', population: 87500 },
  { name: 'Armenia', code: 'AM', flag: '🇦🇲', capital: 'Yerevan', population: 3057137 },
  { name: 'Austria', code: 'AT', flag: '🇦🇹', capital: 'Vienna', population: 9198124 },
  { name: 'Azerbaijan', code: 'AZ', flag: '🇦🇿', capital: 'Baku', population: 10180000 },
  { name: 'Belarus', code: 'BY', flag: '🇧🇾', capital: 'Minsk', population: 9109280 },
  { name: 'Belgium', code: 'BE', flag: '🇧🇪', capital: 'Brussels', population: 11825551 },
  { name: 'Bosnia and Herzegovina', code: 'BA', flag: '🇧🇦', capital: 'Sarajevo', population: 3164253 },
  { name: 'Bulgaria', code: 'BG', flag: '🇧🇬', capital: 'Sofia', population: 6445481 },
  { name: 'Croatia', code: 'HR', flag: '🇭🇷', capital: 'Zagreb', population: 3869686 },
  { name: 'Cyprus', code: 'CY', flag: '🇨🇾', capital: 'Nicosia', population: 1358282 },
  { name: 'Czechia', code: 'CZ', flag: '🇨🇿', capital: 'Prague', population: 10900555 },
  { name: 'Denmark', code: 'DK', flag: '🇩🇰', capital: 'Copenhagen', population: 5991368 },
  { name: 'Estonia', code: 'EE', flag: '🇪🇪', capital: 'Tallinn', population: 1374687 },
  { name: 'Finland', code: 'FI', flag: '🇫🇮', capital: 'Helsinki', population: 5635971 },
  { name: 'France', code: 'FR', flag: '🇫🇷', capital: 'Paris', population: 68605616 },
  { name: 'Georgia', code: 'GE', flag: '🇬🇪', capital: 'Tbilisi', population: 3704500 },
  { name: 'Germany', code: 'DE', flag: '🇩🇪', capital: 'Berlin', population: 83577140 },
  { name: 'Greece', code: 'GR', flag: '🇬🇷', capital: 'Athens', population: 10400720 },
  { name: 'Hungary', code: 'HU', flag: '🇭🇺', capital: 'Budapest', population: 9584627 },
  { name: 'Iceland', code: 'IS', flag: '🇮🇸', capital: 'Reykjavík', population: 389444 },
  { name: 'Ireland', code: 'IE', flag: '🇮🇪', capital: 'Dublin', population: 5380300 },
  { name: 'Italy', code: 'IT', flag: '🇮🇹', capital: 'Rome', population: 58989749 },
  { name: 'Kazakhstan', code: 'KZ', flag: '🇰🇿', capital: 'Astana', population: 20370672 },
  { name: 'Kosovo', code: 'XK', flag: '🇽🇰', capital: 'Pristina', population: 1585566 },
  { name: 'Latvia', code: 'LV', flag: '🇱🇻', capital: 'Riga', population: 1859100 },
  { name: 'Liechtenstein', code: 'LI', flag: '🇱🇮', capital: 'Vaduz', population: 40190 },
  { name: 'Lithuania', code: 'LT', flag: '🇱🇹', capital: 'Vilnius', population: 2890000 },
  { name: 'Luxembourg', code: 'LU', flag: '🇱🇺', capital: 'Luxembourg', population: 681973 },
  { name: 'Malta', code: 'MT', flag: '🇲🇹', capital: 'Valletta', population: 574250 },
  { name: 'Moldova', code: 'MD', flag: '🇲🇩', capital: 'Chișinău', population: 2381600 },
  { name: 'Monaco', code: 'MC', flag: '🇲🇨', capital: 'Monaco', population: 38423 },
  { name: 'Montenegro', code: 'ME', flag: '🇲🇪', capital: 'Podgorica', population: 623633 },
  { name: 'Netherlands', code: 'NL', flag: '🇳🇱', capital: 'Amsterdam', population: 18044527 },
  { name: 'North Macedonia', code: 'MK', flag: '🇲🇰', capital: 'Skopje', population: 1822612 },
  { name: 'Norway', code: 'NO', flag: '🇳🇴', capital: 'Oslo', population: 5576976 },
  { name: 'Poland', code: 'PL', flag: '🇵🇱', capital: 'Warsaw', population: 37489000 },
  { name: 'Portugal', code: 'PT', flag: '🇵🇹', capital: 'Lisbon', population: 10639726 },
  { name: 'Romania', code: 'RO', flag: '🇷🇴', capital: 'Bucharest', population: 19036031 },
  { name: 'Russia', code: 'RU', flag: '🇷🇺', capital: 'Moscow', population: 143957079 },
  { name: 'San Marino', code: 'SM', flag: '🇸🇲', capital: 'San Marino', population: 33811 },
  { name: 'Serbia', code: 'RS', flag: '🇷🇸', capital: 'Belgrade', population: 6586561 },
  { name: 'Slovakia', code: 'SK', flag: '🇸🇰', capital: 'Bratislava', population: 5428792 },
  { name: 'Slovenia', code: 'SI', flag: '🇸🇮', capital: 'Ljubljana', population: 2130850 },
  { name: 'Spain', code: 'ES', flag: '🇪🇸', capital: 'Madrid', population: 49153849 },
  { name: 'Sweden', code: 'SE', flag: '🇸🇪', capital: 'Stockholm', population: 10587710 },
  { name: 'Switzerland', code: 'CH', flag: '🇨🇭', capital: 'Bern', population: 8967993 },
  { name: 'Turkey', code: 'TR', flag: '🇹🇷', capital: 'Ankara', population: 85664944 },
  { name: 'Ukraine', code: 'UA', flag: '🇺🇦', capital: 'Kyiv', population: 37860000 },
  { name: 'United Kingdom', code: 'GB', flag: '🇬🇧', capital: 'London', population: 69487000 },
  { name: 'Vatican City', code: 'VA', flag: '🇻🇦', capital: 'Vatican City', population: 882 },
];

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

export default function Home() {
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
            <h1 className="max-w-2xl text-balance text-4xl font-semibold leading-[1.05] tracking-[-0.045em] text-[#173a29] sm:text-6xl lg:text-7xl">
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
