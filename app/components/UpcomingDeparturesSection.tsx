import type { SVGProps } from "react";

const upcoming = [
  {
    slug: "ladakh-road-trip",
    day: "10",
    month: "Jun",
    title: "Ladakh Road Trip",
    region: "Ladakh",
    durationDays: 9,
    durationNights: 8,
    difficulty: "Moderate",
    price: 24999,
  },
  {
    slug: "kashmir-great-lakes",
    day: "5",
    month: "Jul",
    title: "Kashmir Great Lakes Trek",
    region: "Kashmir",
    durationDays: 7,
    durationNights: 6,
    difficulty: "Moderate-Difficult",
    price: 16499,
  },
  {
    slug: "ziro-music-valley",
    day: "24",
    month: "Sept",
    title: "Ziro Music Valley",
    region: "Arunachal Pradesh",
    durationDays: 7,
    durationNights: 6,
    difficulty: "Easy",
    price: 19999,
  },
  {
    slug: "meghalaya-living-roots",
    day: "5",
    month: "Oct",
    title: "Meghalaya Living Roots",
    region: "Meghalaya",
    durationDays: 6,
    durationNights: 5,
    difficulty: "Easy-Moderate",
    price: 15999,
  },
  {
    slug: "goa-offbeat-north",
    day: "22",
    month: "Dec",
    title: "Goa Offbeat North",
    region: "Goa",
    durationDays: 5,
    durationNights: 4,
    difficulty: "Easy",
    price: 9999,
  },
];

export default function UpcomingDeparturesSection() {
  return (
    <section className="py-20 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] font-bold text-brand-green mb-3">
              ✶ Upcoming departures
            </p>
            <h2 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-brand-ink tracking-tight leading-none">
              Kab nikalna hai?
              <br />
              <em className="not-italic text-brand-green">Ab nikalna hai.</em>
            </h2>
          </div>
        </div>

        <div className="space-y-3">
          {upcoming.map((trip) => (
            <a
              key={trip.slug}
              data-testid={`upcoming-${trip.slug}`}
              className="group grid grid-cols-12 items-center gap-4 p-4 md:p-6 rounded-2xl border border-black/5 hover:border-brand-ink hover:bg-brand-paper transition-all"
              href={`/trips/${trip.slug}`}
            >
              <div className="col-span-12 sm:col-span-2 flex sm:flex-col items-center sm:items-start gap-3 sm:gap-0">
                <p className="font-display text-4xl font-bold text-brand-ink leading-none">
                  {trip.day}
                </p>
                <p className="text-sm uppercase tracking-widest text-brand-ink/60">
                  {trip.month}
                </p>
              </div>

              <div className="col-span-12 sm:col-span-6">
                <h3 className="font-display font-bold text-xl md:text-2xl text-brand-ink group-hover:text-brand-green transition-colors">
                  {trip.title}
                </h3>
                <p className="text-sm text-brand-ink/60 mt-1 flex flex-wrap gap-x-4 gap-y-1">
                  <span className="inline-flex items-center gap-1.5">
                    <MapPinIcon /> {trip.region}
                  </span>
                  <span>
                    {trip.durationDays}D / {trip.durationNights}N
                  </span>
                  <span>{trip.difficulty}</span>
                </p>
              </div>

              <div className="col-span-6 sm:col-span-2 text-right sm:text-left">
                <p className="text-xs text-brand-ink/50">From</p>
                <p className="font-display font-bold text-xl text-brand-ink">
                  {formatCurrency(trip.price)}
                </p>
              </div>

              <div className="col-span-6 sm:col-span-2 text-right">
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-ink text-white text-sm font-semibold group-hover:bg-brand-green transition">
                  Book <ArrowRightIcon />
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
}

function MapPinIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function ArrowRightIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}
