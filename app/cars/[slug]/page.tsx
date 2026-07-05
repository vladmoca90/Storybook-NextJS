import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { cars, formatMileage, formatPrice } from '@/app/data/cars';
import '@/app/showroom.css';

type CarDetailsPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return cars.map((car) => ({ slug: car.slug }));
}

export async function generateMetadata({ params }: CarDetailsPageProps) {
  const { slug } = await params;
  const car = cars.find((item) => item.slug === slug);

  return {
    title: car ? `${car.year} ${car.make} ${car.model}` : 'Car not found',
    description: car?.description,
  };
}

export default async function CarDetailsPage({ params }: CarDetailsPageProps) {
  const { slug } = await params;
  const car = cars.find((item) => item.slug === slug);

  if (!car) {
    notFound();
  }

  return (
    <main className="detail-page">
      <section className="detail-shell">
        <Link className="back-link" href="/">
          Back to results
        </Link>

        <div className="detail-layout">
          <div>
            <div className="detail-image">
              <Image
                src={car.image}
                alt={`${car.year} ${car.make} ${car.model}`}
                width={1400}
                height={875}
                sizes="(max-width: 900px) 100vw, 760px"
                priority
              />
            </div>
            <div className="detail-copy">
              <h2>Description</h2>
              <p>{car.description}</p>
            </div>
          </div>

          <aside className="detail-sidebar">
            <div className="detail-summary">
              <h1>{car.make} {car.model}</h1>
              <p>{car.trim} · {car.location}</p>
              <strong className="detail-price">{formatPrice(car.price)}</strong>
              <dl className="spec-grid">
                <div><dt>Year</dt><dd>{car.year}</dd></div>
                <div><dt>Mileage</dt><dd>{formatMileage(car.mileage)} mi</dd></div>
                <div><dt>Fuel</dt><dd>{car.fuel}</dd></div>
                <div><dt>Gearbox</dt><dd>{car.transmission}</dd></div>
                <div><dt>Body</dt><dd>{car.body}</dd></div>
                <div><dt>Colour</dt><dd>{car.colour}</dd></div>
              </dl>
            </div>

            <div className="feature-list">
              <h2>Key features</h2>
              <ul>
                {car.features.map((feature) => <li key={feature}>{feature}</li>)}
              </ul>
            </div>

            <div className="dealer-box">
              <h2>Dealer note</h2>
              <p>{car.dealerNote}</p>
              <button className="enquire-button" type="button">Enquire now</button>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
