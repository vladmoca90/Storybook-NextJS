'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useMemo, useState } from 'react';
import { cars, formatMileage, formatPrice } from '@/app/data/cars';
import './showroom.css';

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
    <main className="showroom-shell">
      <section className="showroom-hero">
        <div>
          <p className="eyebrow">Used cars in stock</p>
          <h1>Find your next car</h1>
          <p className="hero-copy">
            Browse ten hand-picked cars with clear prices, helpful filters, and full vehicle details.
          </p>
        </div>
        <div className="hero-panel" aria-label="Showroom highlights">
          <span>{cars.length} cars</span>
          <span>Warranty options</span>
          <span>Part exchange</span>
        </div>
      </section>

      <section className="search-panel" aria-label="Search and filters">
        <div className="search-row">
          <label className="search-field" htmlFor="car-search">
            <span>Search</span>
            <input
              id="car-search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Make, model, colour, or location"
            />
          </label>
          <label htmlFor="sort-cars">
            <span>Sort</span>
            <select id="sort-cars" value={sort} onChange={(event) => setSort(event.target.value as SortOption)}>
              <option value="recommended">Recommended</option>
              <option value="price-low">Price: low to high</option>
              <option value="price-high">Price: high to low</option>
              <option value="mileage-low">Mileage: lowest first</option>
              <option value="newest">Newest first</option>
            </select>
          </label>
        </div>

        <div className="filter-row">
          <label htmlFor="make-filter">
            <span>Make</span>
            <select id="make-filter" value={make} onChange={(event) => setMake(event.target.value)}>
              <option value="">Any make</option>
              {makes.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </label>
          <label htmlFor="fuel-filter">
            <span>Fuel</span>
            <select id="fuel-filter" value={fuel} onChange={(event) => setFuel(event.target.value)}>
              <option value="">Any fuel</option>
              {fuels.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </label>
          <label htmlFor="body-filter">
            <span>Body</span>
            <select id="body-filter" value={body} onChange={(event) => setBody(event.target.value)}>
              <option value="">Any body</option>
              {bodies.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </label>
          <label htmlFor="transmission-filter">
            <span>Gearbox</span>
            <select
              id="transmission-filter"
              value={transmission}
              onChange={(event) => setTransmission(event.target.value)}
            >
              <option value="">Any gearbox</option>
              {transmissions.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </label>
          <label className="price-range" htmlFor="price-filter">
            <span>Max price {formatPrice(Number(maxPrice))}</span>
            <input
              id="price-filter"
              type="range"
              min="12000"
              max="40000"
              step="500"
              value={maxPrice}
              onChange={(event) => setMaxPrice(event.target.value)}
            />
          </label>
          <button type="button" className="reset-button" onClick={resetFilters}>
            Clear filters
          </button>
        </div>
      </section>

      <section className="results-head" aria-live="polite">
        <div>
          <strong>{filteredCars.length}</strong> of <strong>{cars.length}</strong> cars available
        </div>
      </section>

      {filteredCars.length > 0 ? (
        <section className="car-grid" aria-label="Car results">
          {filteredCars.map((car) => (
            <article className="car-card" key={car.id}>
              <Link href={`/cars/${car.slug}`} className="car-image-link" aria-label={`View ${car.make} ${car.model}`}>
                <Image
                  src={car.image}
                  alt={`${car.year} ${car.make} ${car.model}`}
                  width={1200}
                  height={800}
                  sizes="(max-width: 620px) 100vw, (max-width: 1180px) 50vw, 380px"
                />
              </Link>
              <div className="car-card-body">
                <div className="car-title-row">
                  <div>
                    <h2>
                      {car.make} {car.model}
                    </h2>
                    <p>{car.trim}</p>
                  </div>
                  <strong>{formatPrice(car.price)}</strong>
                </div>
                <dl className="spec-grid">
                  <div>
                    <dt>Year</dt>
                    <dd>{car.year}</dd>
                  </div>
                  <div>
                    <dt>Mileage</dt>
                    <dd>{formatMileage(car.mileage)} mi</dd>
                  </div>
                  <div>
                    <dt>Fuel</dt>
                    <dd>{car.fuel}</dd>
                  </div>
                  <div>
                    <dt>Gearbox</dt>
                    <dd>{car.transmission}</dd>
                  </div>
                </dl>
                <div className="card-footer">
                  <span>{car.location}</span>
                  <Link href={`/cars/${car.slug}`} className="details-button">
                    View details
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </section>
      ) : (
        <section className="empty-results">
          <h2>No matching cars</h2>
          <p>Try widening the price or clearing one of the filters.</p>
          <button type="button" onClick={resetFilters}>
            Clear filters
          </button>
        </section>
      )}
    </main>
  );
}
