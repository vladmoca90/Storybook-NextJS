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
    <main className="detail-page min-h-screen p-6 max-[620px]:p-4">
      <section className="detail-shell mx-auto grid w-full max-w-[1180px] gap-5">
        <Link className="back-link inline-flex min-h-auto items-center justify-center justify-self-start rounded-md font-extrabold no-underline" href="/cars">
          Back to results
        </Link>

        <div className="detail-layout grid grid-cols-[minmax(0,1.35fr)_minmax(320px,0.65fr)] gap-[22px] max-[900px]:grid-cols-1">
          <div>
            <div className="detail-image aspect-[16/10] overflow-hidden rounded-lg">
              <Image
                src={car.image}
                alt={`${car.year} ${car.make} ${car.model}`}
                className="h-full w-full object-cover"
                width={1400}
                height={875}
                sizes="(max-width: 900px) 100vw, 760px"
                priority
              />
            </div>
            <div className="detail-copy rounded-lg border p-5">
              <h2 className="mb-2.5 mt-0">Description</h2>
              <p className="m-0 leading-[1.65]">{car.description}</p>
            </div>
          </div>

          <aside className="detail-sidebar">
            <div className="detail-summary rounded-lg border p-5">
              <h1 className="mb-2 mt-0 leading-[1.04]">{car.make} {car.model}</h1>
              <p className="m-0">{car.trim} · {car.location}</p>
              <strong className="detail-price my-[18px] block">{formatPrice(car.price)}</strong>
              <dl className="spec-grid m-0 grid grid-cols-2 gap-2.5">
                <div className="rounded-md p-2.5"><dt className="mb-1 font-extrabold uppercase">Year</dt><dd className="m-0 font-[750]">{car.year}</dd></div>
                <div className="rounded-md p-2.5"><dt className="mb-1 font-extrabold uppercase">Mileage</dt><dd className="m-0 font-[750]">{formatMileage(car.mileage)} mi</dd></div>
                <div className="rounded-md p-2.5"><dt className="mb-1 font-extrabold uppercase">Fuel</dt><dd className="m-0 font-[750]">{car.fuel}</dd></div>
                <div className="rounded-md p-2.5"><dt className="mb-1 font-extrabold uppercase">Gearbox</dt><dd className="m-0 font-[750]">{car.transmission}</dd></div>
                <div className="rounded-md p-2.5"><dt className="mb-1 font-extrabold uppercase">Body</dt><dd className="m-0 font-[750]">{car.body}</dd></div>
                <div className="rounded-md p-2.5"><dt className="mb-1 font-extrabold uppercase">Colour</dt><dd className="m-0 font-[750]">{car.colour}</dd></div>
              </dl>
            </div>

            <div className="feature-list rounded-lg border p-5">
              <h2 className="mb-2.5 mt-0">Key features</h2>
              <ul className="m-0 grid list-none gap-2 p-0">
                {car.features.map((feature) => <li className="rounded-md px-3 py-2.5 font-bold" key={feature}>{feature}</li>)}
              </ul>
            </div>

            <div className="dealer-box rounded-lg border p-5">
              <h2 className="mb-2.5 mt-0">Dealer note</h2>
              <p className="m-0 leading-[1.65]">{car.dealerNote}</p>
              <button className="enquire-button mt-[18px] inline-flex min-h-11 min-w-[124px] w-full items-center justify-center rounded-md border-0 px-[14px] font-extrabold" type="button">Enquire now</button>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
