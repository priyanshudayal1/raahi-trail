"use client";

import Image from "next/image";
import {
  useMemo,
  useState,
  type ReactNode,
  type SVGProps,
} from "react";

type Trip = {
  slug: string;
  title: string;
  region: string;
  destination: string;
  tagline: string;
  image: string;
  durationDays: number;
  durationNights: number;
  groupSize: string;
  date: string;
  price: number;
  originalPrice: number;
};

const trips: Trip[] = [
  {
    slug: "kedarkantha-winter-trek",
    title: "Kedarkantha Winter Trek",
    region: "Uttarakhand",
    destination: "Sankri",
    tagline: "Snow, summit and the best sunrise of your life",
    image: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=1600",
    durationDays: 6,
    durationNights: 5,
    groupSize: "12-20",
    date: "15 Jan 2027",
    price: 8999,
    originalPrice: 10999,
  },
  {
    slug: "spiti-valley-circuit",
    title: "Spiti Valley Circuit",
    region: "Himachal Pradesh",
    destination: "Spiti",
    tagline: "Middle-land of monks, moonscapes and maddening views",
    image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=1600",
    durationDays: 8,
    durationNights: 7,
    groupSize: "8-14",
    date: "12 Jun 2026",
    price: 18999,
    originalPrice: 22999,
  },
  {
    slug: "ladakh-road-trip",
    title: "Ladakh Road Trip",
    region: "Ladakh",
    destination: "Leh",
    tagline: "High passes, higher dopamine",
    image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=1600",
    durationDays: 9,
    durationNights: 8,
    groupSize: "8-12",
    date: "10 Jul 2026",
    price: 24999,
    originalPrice: 29999,
  },
  {
    slug: "meghalaya-monsoon-trail",
    title: "Meghalaya Monsoon Trail",
    region: "Meghalaya",
    destination: "Cherrapunji",
    tagline: "Living root bridges, rain songs and cloud-soft mornings",
    image: "https://images.unsplash.com/photo-1598324789736-4861f89564a0?w=1600",
    durationDays: 7,
    durationNights: 6,
    groupSize: "10-16",
    date: "22 Aug 2026",
    price: 21999,
    originalPrice: 25999,
  },
  {
    slug: "tirthan-valley-retreat",
    title: "Tirthan Valley Retreat",
    region: "Himachal Pradesh",
    destination: "Tirthan",
    tagline: "Riverside cabins, forest walks and slow mountain days",
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1600",
    durationDays: 4,
    durationNights: 3,
    groupSize: "10-18",
    date: "18 Sep 2026",
    price: 9999,
    originalPrice: 12499,
  },
  {
    slug: "goa-workation-escape",
    title: "Goa Workation Escape",
    region: "Goa",
    destination: "Assagao",
    tagline: "Emails by day, sunsets by design",
    image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=1600",
    durationDays: 5,
    durationNights: 4,
    groupSize: "8-14",
    date: "07 Oct 2026",
    price: 14999,
    originalPrice: 17999,
  },
  {
    slug: "zanskar-frozen-river",
    title: "Zanskar Winter Expedition",
    region: "Ladakh",
    destination: "Zanskar",
    tagline: "Frozen trails, monastery stays and serious bragging rights",
    image: "https://images.unsplash.com/photo-1581793746485-04698e79a4e8?w=1600",
    durationDays: 8,
    durationNights: 7,
    groupSize: "6-10",
    date: "05 Feb 2027",
    price: 28999,
    originalPrice: 34999,
  },
  {
    slug: "rishikesh-river-weekend",
    title: "Rishikesh River Weekend",
    region: "Uttarakhand",
    destination: "Rishikesh",
    tagline: "Rafting, cafes and a quick reset by the Ganga",
    image: "https://images.unsplash.com/photo-1586257244039-acc6f8c9d30b?w=1600",
    durationDays: 3,
    durationNights: 2,
    groupSize: "12-24",
    date: "14 Nov 2026",
    price: 6999,
    originalPrice: 8499,
  },
  {
    slug: "andaman-blue-trail",
    title: "Andaman Blue Trail",
    region: "Andaman",
    destination: "Havelock",
    tagline: "Clear water, quiet beaches and no spreadsheet energy",
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1600",
    durationDays: 6,
    durationNights: 5,
    groupSize: "8-14",
    date: "12 Dec 2026",
    price: 26999,
    originalPrice: 31999,
  },
];

const tripsPerPage = 6;

export default function TripsSection() {
  const [query, setQuery] = useState("");
  const [destination, setDestination] = useState("all");
  const [budget, setBudget] = useState("all");
  const [duration, setDuration] = useState("all");
  const [page, setPage] = useState(1);

  const destinations = useMemo(
    () => Array.from(new Set(trips.map((trip) => trip.destination))).sort(),
    [],
  );

  const filteredTrips = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return trips.filter((trip) => {
      const searchable = [
        trip.title,
        trip.region,
        trip.destination,
        trip.tagline,
      ]
        .join(" ")
        .toLowerCase();
      const matchesQuery =
        normalizedQuery.length === 0 || searchable.includes(normalizedQuery);
      const matchesDestination =
        destination === "all" || trip.destination === destination;
      const matchesBudget =
        budget === "all" ||
        (budget === "under-10000" && trip.price < 10000) ||
        (budget === "10000-20000" &&
          trip.price >= 10000 &&
          trip.price <= 20000) ||
        (budget === "over-20000" && trip.price > 20000);
      const matchesDuration =
        duration === "all" ||
        (duration === "short" && trip.durationDays <= 4) ||
        (duration === "medium" &&
          trip.durationDays >= 5 &&
          trip.durationDays <= 7) ||
        (duration === "long" && trip.durationDays >= 8);

      return (
        matchesQuery && matchesDestination && matchesBudget && matchesDuration
      );
    });
  }, [budget, destination, duration, query]);

  const pageCount = Math.max(1, Math.ceil(filteredTrips.length / tripsPerPage));
  const visibleTrips = filteredTrips.slice(
    (page - 1) * tripsPerPage,
    page * tripsPerPage,
  );

  function resetFilters() {
    setQuery("");
    setDestination("all");
    setBudget("all");
    setDuration("all");
    setPage(1);
  }

  function updateQuery(value: string) {
    setQuery(value);
    setPage(1);
  }

  function updateDestination(value: string) {
    setDestination(value);
    setPage(1);
  }

  function updateBudget(value: string) {
    setBudget(value);
    setPage(1);
  }

  function updateDuration(value: string) {
    setDuration(value);
    setPage(1);
  }

  return (
    <section id="trips" className="bg-brand-paper">
      <section className="sticky top-16 md:top-20 z-30 bg-white/85 backdrop-blur-xl border-b border-black/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col lg:flex-row gap-3">
            <div className="relative flex-1">
              <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-ink/40" />
              <input
                data-testid="trip-search-input"
                placeholder="Search by destination, vibe..."
                className="w-full pl-11 pr-4 py-3 rounded-full border border-black/10 bg-white focus:border-brand-ink focus:ring-0 outline-none text-sm"
                value={query}
                onChange={(event) => updateQuery(event.target.value)}
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 lg:w-auto">
              <SelectField
                testId="filter-destination"
                value={destination}
                onChange={updateDestination}
                options={[
                  { value: "all", label: "All destinations" },
                  ...destinations.map((item) => ({
                    value: item,
                    label: item,
                  })),
                ]}
              />
              <SelectField
                testId="filter-budget"
                value={budget}
                onChange={updateBudget}
                options={[
                  { value: "all", label: "Any budget" },
                  { value: "under-10000", label: "Under ₹10k" },
                  { value: "10000-20000", label: "₹10k-₹20k" },
                  { value: "over-20000", label: "₹20k+" },
                ]}
              />
              <SelectField
                testId="filter-duration"
                value={duration}
                onChange={updateDuration}
                options={[
                  { value: "all", label: "Any length" },
                  { value: "short", label: "2-4 days" },
                  { value: "medium", label: "5-7 days" },
                  { value: "long", label: "8+ days" },
                ]}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] font-bold text-brand-green mb-3">
                * Featured escapes
              </p>
              <h2 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-brand-ink tracking-tight leading-none">
                The ones <em className="not-italic text-brand-green">everyone</em>
                <br /> is packing for.
              </h2>
            </div>
            <button
              data-testid="featured-see-all"
              className="inline-flex items-center gap-2 text-brand-ink font-semibold hover:text-brand-green"
              type="button"
              onClick={resetFilters}
            >
              See all trips <ArrowRightIcon width={16} height={16} />
            </button>
          </div>

          {visibleTrips.length > 0 ? (
            <div
              id="trips-grid"
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
            >
              {visibleTrips.map((trip) => (
                <TripCard key={trip.slug} trip={trip} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-3xl border border-black/5 p-10 text-center">
              <h3 className="font-display font-bold text-2xl text-brand-ink">
                No trips match that search.
              </h3>
              <p className="text-brand-ink/60 mt-2">
                Try a different destination, budget, or trip length.
              </p>
              <button
                className="mt-6 px-6 py-3 rounded-full bg-brand-yellow text-brand-ink font-semibold hover:bg-brand-ink hover:text-brand-yellow transition"
                type="button"
                onClick={resetFilters}
              >
                Reset filters
              </button>
            </div>
          )}

          {filteredTrips.length > tripsPerPage && (
            <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-sm text-brand-ink/60">
                Showing {(page - 1) * tripsPerPage + 1}-
                {Math.min(page * tripsPerPage, filteredTrips.length)} of{" "}
                {filteredTrips.length} trips
              </p>
              <div className="flex items-center gap-2">
                <PaginationButton
                  disabled={page === 1}
                  onClick={() => setPage((current) => Math.max(1, current - 1))}
                >
                  Previous
                </PaginationButton>
                {Array.from({ length: pageCount }, (_, index) => index + 1).map(
                  (pageNumber) => (
                    <PaginationButton
                      key={pageNumber}
                      active={pageNumber === page}
                      onClick={() => setPage(pageNumber)}
                    >
                      {pageNumber}
                    </PaginationButton>
                  ),
                )}
                <PaginationButton
                  disabled={page === pageCount}
                  onClick={() =>
                    setPage((current) => Math.min(pageCount, current + 1))
                  }
                >
                  Next
                </PaginationButton>
              </div>
            </div>
          )}
        </div>
      </section>
    </section>
  );
}

function TripCard({ trip }: { trip: Trip }) {
  const saved = Math.round(
    ((trip.originalPrice - trip.price) / trip.originalPrice) * 100,
  );

  return (
    <article
      data-testid={`trip-card-${trip.slug}`}
      className="group block bg-white rounded-3xl overflow-hidden border border-black/5 hover:border-black/10 transition-all hover:-translate-y-1 hover:shadow-2xl duration-500"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          alt={trip.title}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
          className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
          src={trip.image}
        />
        <div className="absolute inset-0 ink-gradient opacity-60 group-hover:opacity-75 transition-opacity" />
        <div className="absolute top-4 left-4 flex flex-wrap gap-2">
          <span className="px-3 py-1 rounded-full bg-white/95 backdrop-blur text-brand-ink text-xs font-bold tracking-wide">
            {trip.region}
          </span>
          <span className="px-3 py-1 rounded-full bg-brand-green text-white text-xs font-bold">
            Save {saved}%
          </span>
        </div>
        <div className="absolute bottom-4 left-4 right-4">
          <p className="text-white/80 text-xs uppercase tracking-[0.2em] mb-1">
            {trip.destination}
          </p>
          <h3 className="text-white font-display font-bold text-2xl leading-tight">
            {trip.title}
          </h3>
        </div>
      </div>
      <div className="p-5 md:p-6">
        <p className="text-brand-ink/60 text-sm mb-4 line-clamp-2">
          {trip.tagline}
        </p>
        <div className="flex flex-wrap items-center gap-4 text-xs text-brand-ink/60 mb-5">
          <span className="inline-flex items-center gap-1.5">
            <CalendarIcon /> {trip.durationDays}D / {trip.durationNights}N
          </span>
          <span className="inline-flex items-center gap-1.5">
            <UsersIcon /> {trip.groupSize}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <MapPinIcon /> {trip.date}
          </span>
        </div>
        <div className="flex items-end justify-between gap-4 pt-4 border-t border-black/5">
          <div>
            <p className="text-xs text-brand-ink/50">Starting from</p>
            <div className="flex items-baseline gap-2">
              <span className="font-display font-bold text-2xl text-brand-ink">
                {formatCurrency(trip.price)}
              </span>
              <span className="text-sm text-brand-ink/40 line-through">
                {formatCurrency(trip.originalPrice)}
              </span>
            </div>
          </div>
          <span className="px-4 py-2 rounded-full bg-brand-ink text-white text-xs font-bold group-hover:bg-brand-green transition-colors">
            View
          </span>
        </div>
      </div>
    </article>
  );
}

function SelectField({
  testId,
  value,
  onChange,
  options,
}: {
  testId: string;
  value: string;
  onChange: (value: string) => void;
  options: Array<{ value: string; label: string }>;
}) {
  return (
    <div className="relative">
      <select
        data-testid={testId}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="flex w-full appearance-none items-center justify-between whitespace-nowrap border shadow-sm focus:outline-none rounded-full px-5 py-3 h-12 border-black/10 bg-white text-sm min-w-[140px] pr-10"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <ChevronDownIcon className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 opacity-50" />
    </div>
  );
}

function PaginationButton({
  active,
  disabled,
  onClick,
  children,
}: {
  active?: boolean;
  disabled?: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={[
        "min-w-10 rounded-full px-4 py-2 text-sm font-semibold transition",
        active
          ? "bg-brand-ink text-white"
          : "bg-white text-brand-ink border border-black/10 hover:border-brand-ink",
        disabled ? "cursor-not-allowed opacity-40 hover:border-black/10" : "",
      ].join(" ")}
    >
      {children}
    </button>
  );
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
}

function ArrowRightIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
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

function SearchIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="m21 21-4.34-4.34" />
      <circle cx="11" cy="11" r="8" />
    </svg>
  );
}

function ChevronDownIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

function CalendarIcon(props: SVGProps<SVGSVGElement>) {
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
      <path d="M8 2v4" />
      <path d="M16 2v4" />
      <rect width="18" height="18" x="3" y="4" rx="2" />
      <path d="M3 10h18" />
    </svg>
  );
}

function UsersIcon(props: SVGProps<SVGSVGElement>) {
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
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <path d="M16 3.128a4 4 0 0 1 0 7.744" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <circle cx="9" cy="7" r="4" />
    </svg>
  );
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
