'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useMemo, useState } from 'react';
import { cars, formatMileage, formatPrice } from '@/app/data/cars';
import '@/app/cars/showroom.css';

type SortOption = 'recommended' | 'price-low' | 'price-high' | 'mileage-low' | 'newest';

const makes = [...new Set(cars.map((car) => car.make))].sort();
const fuels = [...new Set(cars.map((car) => car.fuel))].sort();
const bodies = [...new Set(cars.map((car) => car.body))].sort();
const transmissions = [...new Set(cars.map((car) => car.transmission))].sort();

export default function Home() {
  const [query, setQuery] = useState('');
  const [make, setMake] = useState('');
  const [fuel, setFuel] = useState('');
  const [body, setBody] = useState('');
  const [transmission, setTransmission] = useState('');
  const [maxPrice, setMaxPrice] = useState('40000');
  const [sort, setSort] = useState<SortOption>('recommended');

  const filteredCars = useMemo(() => {
    const search = query.trim().toLowerCase();

    return cars
      .filter((car) => {
        const searchable = `${car.make} ${car.model} ${car.trim} ${car.location} ${car.colour}`.toLowerCase();
        return (
          (!search || searchable.includes(search)) &&
          (!make || car.make === make) &&
          (!fuel || car.fuel === fuel) &&
          (!body || car.body === body) &&
          (!transmission || car.transmission === transmission) &&
          car.price <= Number(maxPrice)
        );
      })
      .sort((a, b) => {
        if (sort === 'price-low') return a.price - b.price;
        if (sort === 'price-high') return b.price - a.price;
        if (sort === 'mileage-low') return a.mileage - b.mileage;
        if (sort === 'newest') return b.year - a.year;
        return a.id - b.id;
      });
  }, [body, fuel, make, maxPrice, query, sort, transmission]);

  const resetFilters = () => {
    setQuery('');
    setMake('');
    setFuel('');
    setBody('');
    setTransmission('');
    setMaxPrice('40000');
    setSort('recommended');
  };

  return (
    <main className="showroom-shell min-h-screen p-6 max-[620px]:p-4">
      <section className="showroom-hero mx-auto grid w-full max-w-[1180px] grid-cols-[minmax(0,1fr)_auto] items-end gap-6 pt-[26px] pb-5 max-[900px]:grid-cols-1">
        <div>
          <p className="eyebrow mb-2 font-extrabold tracking-normal uppercase">Used cars in stock</p>
          <h1 className="m-0 font-[850] leading-[0.98]">Find your next car</h1>
          <p className="hero-copy mt-[14px] max-w-[620px] leading-[1.6]">
            Browse ten hand-picked cars with clear prices, helpful filters, and full vehicle details.
          </p>
        </div>
        <div className="hero-panel flex items-center gap-2.5 rounded-lg border p-3 max-[900px]:flex-wrap" aria-label="Showroom highlights">
          <span className="rounded-md px-[11px] py-[9px] font-bold whitespace-nowrap">{cars.length} cars</span>
          <span className="rounded-md px-[11px] py-[9px] font-bold whitespace-nowrap">Warranty options</span>
          <span className="rounded-md px-[11px] py-[9px] font-bold whitespace-nowrap">Part exchange</span>
        </div>
      </section>

      <section className="search-panel mx-auto w-full max-w-[1180px] rounded-lg border p-4" aria-label="Search and filters">
        <div className="search-row mb-3 grid grid-cols-[minmax(240px,1fr)_220px] gap-3 max-[900px]:grid-cols-2 max-[620px]:grid-cols-1">
          <label className="flex flex-col gap-1.5" htmlFor="car-search">
            <span className="font-extrabold uppercase">Search</span>
            <input
              id="car-search"
              className="min-h-11 rounded-md border px-3 focus:outline-none"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Make, model, colour, or location"
            />
          </label>
          <label className="flex flex-col gap-1.5" htmlFor="sort-cars">
            <span className="font-extrabold uppercase">Sort</span>
            <select className="min-h-11 rounded-md border px-3 focus:outline-none" id="sort-cars" value={sort} onChange={(event) => setSort(event.target.value as SortOption)}>
              <option value="recommended">Recommended</option>
              <option value="price-low">Price: low to high</option>
              <option value="price-high">Price: high to low</option>
              <option value="mileage-low">Mileage: lowest first</option>
              <option value="newest">Newest first</option>
            </select>
          </label>
        </div>

        <div className="filter-row grid grid-cols-[repeat(4,minmax(140px,1fr))_minmax(210px,1.2fr)_auto] items-end gap-3 max-[900px]:grid-cols-2 max-[620px]:grid-cols-1">
          <label className="flex flex-col gap-1.5" htmlFor="make-filter">
            <span className="font-extrabold uppercase">Make</span>
            <select className="min-h-11 rounded-md border px-3 focus:outline-none" id="make-filter" value={make} onChange={(event) => setMake(event.target.value)}>
              <option value="">Any make</option>
              {makes.map((item) => (
                <option key={item} value={item}>{item}</option>
              ))}
            </select>
          </label>
          <label className="flex flex-col gap-1.5" htmlFor="fuel-filter">
            <span className="font-extrabold uppercase">Fuel</span>
            <select className="min-h-11 rounded-md border px-3 focus:outline-none" id="fuel-filter" value={fuel} onChange={(event) => setFuel(event.target.value)}>
              <option value="">Any fuel</option>
              {fuels.map((item) => (
                <option key={item} value={item}>{item}</option>
              ))}
            </select>
          </label>
          <label className="flex flex-col gap-1.5" htmlFor="body-filter">
            <span className="font-extrabold uppercase">Body</span>
            <select className="min-h-11 rounded-md border px-3 focus:outline-none" id="body-filter" value={body} onChange={(event) => setBody(event.target.value)}>
              <option value="">Any body</option>
              {bodies.map((item) => (
                <option key={item} value={item}>{item}</option>
              ))}
            </select>
          </label>
          <label className="flex flex-col gap-1.5" htmlFor="transmission-filter">
            <span className="font-extrabold uppercase">Gearbox</span>
            <select className="min-h-11 rounded-md border px-3 focus:outline-none" id="transmission-filter" value={transmission} onChange={(event) => setTransmission(event.target.value)}>
              <option value="">Any gearbox</option>
              {transmissions.map((item) => (
                <option key={item} value={item}>{item}</option>
              ))}
            </select>
          </label>
          <label className="price-range flex flex-col gap-1.5" htmlFor="price-filter">
            <span className="font-extrabold uppercase">Max price {formatPrice(Number(maxPrice))}</span>
            <input
              id="price-filter"
              className="min-h-11 rounded-md border p-0"
              type="range"
              min="12000"
              max="40000"
              step="500"
              value={maxPrice}
              onChange={(event) => setMaxPrice(event.target.value)}
            />
          </label>
          <button type="button" className="reset-button inline-flex min-h-11 items-center justify-center rounded-md border px-4 font-extrabold whitespace-nowrap max-[620px]:w-full" onClick={resetFilters}>Clear filters</button>
        </div>
      </section>

      <section className="results-head mx-auto w-full max-w-[1180px] pt-[18px] pb-3" aria-live="polite">
        <div><strong>{filteredCars.length}</strong> of <strong>{cars.length}</strong> cars available</div>
      </section>

      {filteredCars.length > 0 ? (
        <section className="car-grid mx-auto grid w-full max-w-[1180px] grid-cols-[repeat(auto-fill,minmax(320px,1fr))] gap-[18px] max-[620px]:grid-cols-1" aria-label="Car results">
          {filteredCars.map((car) => (
            <article className="car-card overflow-hidden rounded-lg border transition-[box-shadow,transform] duration-[180ms] ease-[ease] hover:-translate-y-0.5 hover:shadow-[0_16px_38px_rgba(15,23,42,0.12)]" key={car.id}>
              <Link href={`/cars/${car.slug}`} className="car-image-link block h-[210px] overflow-hidden max-[620px]:h-[190px]" aria-label={`View ${car.make} ${car.model}`}>
                <Image
                  src={car.image}
                  alt={`${car.year} ${car.make} ${car.model}`}
                  className="h-full w-full object-cover"
                  width={1200}
                  height={800}
                  sizes="(max-width: 620px) 100vw, (max-width: 1180px) 50vw, 380px"
                />
              </Link>
              <div className="car-card-body p-4">
                <div className="car-title-row mb-[14px] grid grid-cols-[1fr_auto] gap-3 max-[620px]:grid-cols-1">
                  <div>
                    <h2 className="mb-1 mt-0 font-bold">{car.make} {car.model}</h2>
                    <p className="m-0">{car.trim}</p>
                  </div>
                  <strong className="whitespace-nowrap">{formatPrice(car.price)}</strong>
                </div>
                <dl className="spec-grid m-0 grid grid-cols-2 gap-2.5">
                  <div className="rounded-md p-2.5"><dt className="mb-1 font-extrabold uppercase">Year</dt><dd className="m-0 font-[750]">{car.year}</dd></div>
                  <div className="rounded-md p-2.5"><dt className="mb-1 font-extrabold uppercase">Mileage</dt><dd className="m-0 font-[750]">{formatMileage(car.mileage)} mi</dd></div>
                  <div className="rounded-md p-2.5"><dt className="mb-1 font-extrabold uppercase">Fuel</dt><dd className="m-0 font-[750]">{car.fuel}</dd></div>
                  <div className="rounded-md p-2.5"><dt className="mb-1 font-extrabold uppercase">Gearbox</dt><dd className="m-0 font-[750]">{car.transmission}</dd></div>
                </dl>
                <div className="card-footer mt-4 flex items-center justify-between border-t pt-[14px] max-[620px]:flex-col max-[620px]:items-stretch max-[620px]:gap-3">
                  <span>{car.location}</span>
                  <Link href={`/cars/${car.slug}`} className="details-button inline-flex min-h-11 min-w-[124px] items-center justify-center rounded-md px-[14px] font-extrabold no-underline max-[620px]:w-full">View details</Link>
                </div>
              </div>
            </article>
          ))}
        </section>
      ) : (
        <section className="empty-results mx-auto w-full max-w-[1180px] rounded-lg border p-8 text-center">
          <h2 className="mb-2 mt-0">No matching cars</h2>
          <p className="mb-[18px] mt-0">Try widening the price or clearing one of the filters.</p>
          <button className="inline-flex min-h-11 items-center justify-center rounded-md px-[18px] font-extrabold" type="button" onClick={resetFilters}>Clear filters</button>
        </section>
      )}
    </main>
  );
}
