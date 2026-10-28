'use client';
import appearance from "../appearance.module.css";
import { useMemo, useState } from 'react';
import { countries } from "@/app/data/countries";
import type { PopulationFilter, SortOption } from "@/app/data/types/countries";

const populationFormatter = new Intl.NumberFormat('en-GB');
const compactFormatter = new Intl.NumberFormat('en-GB', { notation: 'compact', maximumFractionDigits: 1 });

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true" className={`h-5 w-5`}>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.2-3.2" />
    </svg>
  );
}

function ChevronIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true" className={`h-4 w-4`}>
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
    <main className={`min-h-screen ${appearance.bgF7f8f4} ${appearance.text18251d}`}>
      <section className={`relative overflow-hidden border-b ${appearance.borderDfe4da} ${appearance.bgEef2e9}`}>
        <div className={`pointer-events-none absolute -right-24 -top-32 h-96 w-96 rounded-full ${appearance.bgDbe5d3} blur-3xl`} />
        <div className={`pointer-events-none absolute -bottom-40 left-1/3 h-80 w-80 rounded-full ${appearance.bgE4ddc8} opacity-70 blur-3xl`} />

        <div className={`relative mx-auto max-w-7xl px-4 pb-12 pt-7 sm:px-6 sm:pb-16 lg:px-8 lg:pt-9`}>
          <nav className={`mb-14 flex items-center justify-between sm:mb-20`} aria-label="Primary navigation">
            <a href="#country-table" className={`flex items-center gap-3 ${appearance.textSm} ${appearance.fontSemibold} ${appearance.trackingTight}`}>
              <span className={`grid h-9 w-9 place-items-center rounded-full ${appearance.bg1f4b35} ${appearance.textBase} ${appearance.textWhite} ${appearance.shadowSm}`}>E</span>
              <span>Europe Atlas</span>
            </a>
            <span className={`rounded-full border ${appearance.borderCdd7c8} ${appearance.bgWhite60} px-3 py-1.5 ${appearance.textXs} ${appearance.fontMedium} ${appearance.text526157} backdrop-blur-sm`}>
              Reference guide
            </span>
          </nav>

          <div className={`max-w-3xl`}>
            <div className={`mb-5 flex items-center gap-3 ${appearance.textXs} ${appearance.fontSemibold} ${appearance.uppercase} ${appearance.tracking02em} ${appearance.text3d7458}`}>
              <span className={`h-[0.0625rem] w-8 ${appearance.bg3d7458}`} />
              The continent at a glance
            </div>
            <h1 className={`max-w-3xl text-balance ${appearance.text4xl} ${appearance.fontSemibold} ${appearance.leading105} ${appearance.tracking0045em} ${appearance.text173a29} ${appearance.smText6xl} ${appearance.lgText7xl}`}>
              Every country in Europe, one clear view.
            </h1>
            <p className={`mt-6 max-w-xl ${appearance.textBase} ${appearance.leading7} ${appearance.text59665d} ${appearance.smTextLg}`}>
              Browse capitals, flags, and population estimates across Europe’s 51 countries, including transcontinental states.
            </p>
          </div>

          <div className={`mt-10 grid max-w-2xl grid-cols-2 gap-3 sm:mt-14 sm:grid-cols-3`}>
            <div className={`rounded-2xl border ${appearance.borderWhite70} ${appearance.bgWhite55} p-4 backdrop-blur-sm sm:p-5`}>
              <p className={`${appearance.text2xl} ${appearance.fontSemibold} ${appearance.trackingTight} ${appearance.text173a29} ${appearance.smText3xl}`}>{countries.length}</p>
              <p className={`mt-1 ${appearance.textXs} ${appearance.fontMedium} ${appearance.uppercase} ${appearance.trackingWider} ${appearance.text6a756e}`}>Countries</p>
            </div>
            <div className={`rounded-2xl border ${appearance.borderWhite70} ${appearance.bgWhite55} p-4 backdrop-blur-sm sm:p-5`}>
              <p className={`${appearance.text2xl} ${appearance.fontSemibold} ${appearance.trackingTight} ${appearance.text173a29} ${appearance.smText3xl}`}>{compactFormatter.format(totalPopulation)}</p>
              <p className={`mt-1 ${appearance.textXs} ${appearance.fontMedium} ${appearance.uppercase} ${appearance.trackingWider} ${appearance.text6a756e}`}>People</p>
            </div>
            <div className={`col-span-2 rounded-2xl border ${appearance.borderWhite70} ${appearance.bgWhite55} p-4 backdrop-blur-sm sm:col-span-1 sm:p-5`}>
              <p className={`${appearance.text2xl} ${appearance.fontSemibold} ${appearance.trackingTight} ${appearance.text173a29} ${appearance.smText3xl}`}>51</p>
              <p className={`mt-1 ${appearance.textXs} ${appearance.fontMedium} ${appearance.uppercase} ${appearance.trackingWider} ${appearance.text6a756e}`}>Capital cities</p>
            </div>
          </div>
        </div>
      </section>

      <section id="country-table" className={`mx-auto max-w-7xl scroll-mt-4 px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-16`}>
        <div className={`mb-7 flex flex-col justify-between gap-3 sm:flex-row sm:items-end`}>
          <div>
            <p className={`${appearance.textXs} ${appearance.fontSemibold} ${appearance.uppercase} ${appearance.tracking018em} ${appearance.text3d7458}`}>Directory</p>
            <h2 className={`mt-2 ${appearance.text2xl} ${appearance.fontSemibold} ${appearance.tracking0025em} ${appearance.text173a29} ${appearance.smText3xl}`}>Explore the countries</h2>
          </div>
          <p className={`${appearance.textSm} ${appearance.text718077}`} aria-live="polite">
            Showing <strong className={`${appearance.fontSemibold} ${appearance.text294533}`}>{visibleCountries.length}</strong> of {countries.length}
          </p>
        </div>

        <div className={`mb-5 grid gap-3 rounded-2xl border ${appearance.borderDde3d9} ${appearance.bgWhite} p-3 ${appearance.shadow00625rem21875remRgba396245005} sm:grid-cols-2 lg:grid-cols-[1fr_13.75rem_13.75rem_auto]`}>
          <label className={`relative sm:col-span-2 lg:col-span-1`} htmlFor="country-search">
            <span className={`sr-only`}>Search by country or capital</span>
            <span className={`pointer-events-none absolute inset-y-0 left-4 flex items-center ${appearance.text718077}`}>
              <SearchIcon />
            </span>
            <input
              id="country-search"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search country, capital or code..."
              className={`h-12 w-full rounded-xl border ${appearance.borderDbe1d7} ${appearance.bgFafbf8} pl-12 pr-4 ${appearance.textSm} ${appearance.text1d2f24} outline-none transition ${appearance.placeholderText98a29b} ${appearance.focusBorder6d9279} focus:ring-3 ${appearance.focusRingDce8df}`}
            />
          </label>

          <label className={`relative`} htmlFor="population-filter">
            <span className={`sr-only`}>Filter by population</span>
            <select
              id="population-filter"
              value={population}
              onChange={(event) => setPopulation(event.target.value as PopulationFilter)}
              className={`h-12 w-full appearance-none rounded-xl border ${appearance.borderDbe1d7} ${appearance.bgFafbf8} px-4 pr-10 ${appearance.textSm} ${appearance.text34463a} outline-none transition ${appearance.focusBorder6d9279} focus:ring-3 ${appearance.focusRingDce8df}`}
            >
              <option value="all">All populations</option>
              <option value="small">Under 1 million</option>
              <option value="medium">1–10 million</option>
              <option value="large">10 million+</option>
            </select>
            <span className={`pointer-events-none absolute inset-y-0 right-4 flex items-center ${appearance.text718077}`}>
              <ChevronIcon />
            </span>
          </label>

          <label className={`relative`} htmlFor="sort-countries">
            <span className={`sr-only`}>Sort countries</span>
            <select
              id="sort-countries"
              value={sort}
              onChange={(event) => setSort(event.target.value as SortOption)}
              className={`h-12 w-full appearance-none rounded-xl border ${appearance.borderDbe1d7} ${appearance.bgFafbf8} px-4 pr-10 ${appearance.textSm} ${appearance.text34463a} outline-none transition ${appearance.focusBorder6d9279} focus:ring-3 ${appearance.focusRingDce8df}`}
            >
              <option value="name-asc">Name: A to Z</option>
              <option value="name-desc">Name: Z to A</option>
              <option value="population-desc">Population: high to low</option>
              <option value="population-asc">Population: low to high</option>
            </select>
            <span className={`pointer-events-none absolute inset-y-0 right-4 flex items-center ${appearance.text718077}`}>
              <ChevronIcon />
            </span>
          </label>

          <button
            type="button"
            onClick={clearFilters}
            disabled={!query && population === 'all' && sort === 'name-asc'}
            className={`h-12 rounded-xl border ${appearance.borderDbe1d7} px-5 ${appearance.textSm} ${appearance.fontSemibold} ${appearance.text355b44} transition ${appearance.hoverBorderAac0b0} ${appearance.hoverBgF1f5ef} disabled:cursor-not-allowed disabled:opacity-40 sm:col-span-2 lg:col-span-1`}
          >
            Reset
          </button>
        </div>

        <div className={`overflow-hidden rounded-2xl border ${appearance.borderDde3d9} ${appearance.bgWhite} ${appearance.shadow01125rem3125remRgba396245007}`}>
          {visibleCountries.length > 0 ? (
            <div className={`overflow-x-auto`}>
              <table className={`w-full border-collapse text-left`}>
                <caption className={`sr-only`}>European countries with their flags, capitals, and estimated populations</caption>
                <thead className={`border-b ${appearance.borderDfe5dc} ${appearance.bgF3f6f1}`}>
                  <tr className={`${appearance.textXs} ${appearance.fontSemibold} ${appearance.uppercase} ${appearance.tracking012em} ${appearance.text718077}`}>
                    <th scope="col" className={`w-16 px-4 py-4 text-center sm:w-24 sm:px-6`}>Flag</th>
                    <th scope="col" className={`min-w-48 px-3 py-4 sm:px-6`}>Country</th>
                    <th scope="col" className={`min-w-44 px-3 py-4 sm:px-6`}>Capital</th>
                    <th scope="col" className={`min-w-40 px-4 py-4 text-right sm:px-8`}>Population</th>
                  </tr>
                </thead>
                <tbody className={`divide-y ${appearance.divideEdf0eb}`}>
                  {visibleCountries.map((country) => (
                    <tr key={country.code} className={`group transition-colors ${appearance.hoverBgF7faf5}`}>
                      <td className={`px-4 py-4 text-center sm:px-6 sm:py-5`}>
                        <span className={`inline-grid h-10 w-10 place-items-center rounded-full border ${appearance.borderE1e6de} ${appearance.bgF7f8f5} ${appearance.text2xl} ${appearance.shadowSm} transition-transform group-hover:scale-105`} role="img" aria-label={`${country.name} flag`}>
                          {country.flag}
                        </span>
                      </td>
                      <th scope="row" className={`px-3 py-4 sm:px-6 sm:py-5`}>
                        <span className={`block ${appearance.textSm} ${appearance.fontSemibold} ${appearance.text203629} ${appearance.smTextBase}`}>{country.name}</span>
                        <span className={`mt-0.5 block ${appearance.textXs} ${appearance.fontMedium} ${appearance.trackingWidest} ${appearance.text8a958e}`}>{country.code}</span>
                      </th>
                      <td className={`px-3 py-4 ${appearance.textSm} ${appearance.text536359} sm:px-6 sm:py-5 ${appearance.smTextBase}`}>{country.capital}</td>
                      <td className={`px-4 py-4 text-right ${appearance.fontMono} ${appearance.textSm} ${appearance.fontMedium} tabular-nums ${appearance.text294533} sm:px-8 sm:py-5 ${appearance.smTextBase}`}>
                        {populationFormatter.format(country.population)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className={`grid min-h-72 place-items-center px-6 py-16 text-center`}>
              <div>
                <span className={`mx-auto grid h-12 w-12 place-items-center rounded-full ${appearance.bgEef3eb} ${appearance.text52705c}`}>
                  <SearchIcon />
                </span>
                <h3 className={`mt-4 ${appearance.textLg} ${appearance.fontSemibold} ${appearance.text203629}`}>No countries found</h3>
                <p className={`mt-2 ${appearance.textSm} ${appearance.text718077}`}>Try another search or broaden the population range.</p>
                <button type="button" onClick={clearFilters} className={`mt-5 rounded-lg ${appearance.bg1f4b35} px-4 py-2.5 ${appearance.textSm} ${appearance.fontSemibold} ${appearance.textWhite} transition ${appearance.hoverBg173c2a}`}>
                  Clear filters
                </button>
              </div>
            </div>
          )}
        </div>

        <div className={`mt-5 flex flex-col gap-2 ${appearance.textXs} ${appearance.leading5} ${appearance.text7a877f} sm:flex-row sm:items-center sm:justify-between`}>
          <p>Population figures are recent rounded estimates and may vary by source.</p>
          <p>Broad geographic definition · Updated 2026</p>
        </div>
      </section>

      <footer className={`border-t ${appearance.borderDfe4da} ${appearance.bgEef2e9}`}>
        <div className={`mx-auto flex max-w-7xl flex-col gap-2 px-4 py-7 ${appearance.textXs} ${appearance.text67756c} sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8`}>
          <p className={`${appearance.fontSemibold} ${appearance.text355442}`}>Europe Atlas</p>
          <p>A simple reference for a complex continent.</p>
        </div>
      </footer>
    </main>
  );
}
