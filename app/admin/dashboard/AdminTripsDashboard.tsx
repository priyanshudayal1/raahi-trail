"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState, type ReactNode, type SVGProps } from "react";
import { formatCurrency, type Trip } from "../../lib/trips";
import type { TripQueryResult } from "../../lib/tripsDb";

const tripsPerPage = 6;

export default function AdminTripsDashboard({
  destinations,
  initialResult,
  username,
}: {
  destinations: string[];
  initialResult: TripQueryResult;
  username: string;
}) {
  const [trips, setTrips] = useState(initialResult.trips);
  const [page, setPage] = useState(initialResult.page);
  const [total, setTotal] = useState(initialResult.total);
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [destination, setDestination] = useState("all");
  const [budget, setBudget] = useState("all");
  const [duration, setDuration] = useState("all");
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const pageCount = Math.max(1, Math.ceil(total / tripsPerPage));
  const averagePrice = useMemo(
    () =>
      trips.length > 0
        ? Math.round(trips.reduce((sum, trip) => sum + trip.price, 0) / trips.length)
        : 0,
    [trips],
  );

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      setDebouncedQuery(query);
      setPage(1);
    }, 350);

    return () => window.clearTimeout(timeout);
  }, [query]);

  useEffect(() => {
    let ignore = false;

    async function fetchTrips() {
      setIsLoading(true);
      setError("");

      const params = new URLSearchParams({
        budget,
        destination,
        duration,
        page: String(page),
        pageSize: String(tripsPerPage),
        search: debouncedQuery,
      });
      const response = await fetch(`/api/admin/trips?${params.toString()}`);
      const data = (await response.json()) as TripQueryResult & { error?: string };

      if (ignore) {
        return;
      }

      setIsLoading(false);

      if (!response.ok) {
        setError(data.error ?? "Unable to fetch trips.");
        return;
      }

      setTrips(data.trips);
      setTotal(data.total);
    }

    void fetchTrips();

    return () => {
      ignore = true;
    };
  }, [budget, debouncedQuery, destination, duration, page]);

  async function resetSeedData() {
    setError("");
    setStatus("Seeding trips...");

    const response = await fetch("/api/admin/trips/seed", { method: "POST" });
    const data = (await response.json()) as { trips?: Trip[]; error?: string };

    if (!response.ok || !data.trips) {
      setStatus("");
      setError(data.error ?? "Unable to seed trips.");
      return;
    }

    setTrips(data.trips.slice(0, tripsPerPage));
    setTotal(data.trips.length);
    setPage(1);
    setStatus("Seed data saved to Firebase.");
  }

  async function deleteTrip(slug: string) {
    setError("");
    setStatus("Deleting trip...");

    const response = await fetch(`/api/admin/trips/${encodeURIComponent(slug)}`, {
      method: "DELETE",
    });
    const data = (await response.json()) as { error?: string };

    if (!response.ok) {
      setStatus("");
      setError(data.error ?? "Unable to delete trip.");
      return;
    }

    setTrips((current) => current.filter((trip) => trip.slug !== slug));
    setTotal((current) => Math.max(0, current - 1));
    setStatus("Trip deleted from Firebase.");
  }

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    window.location.href = "/admin/login";
  }

  return (
    <div data-testid="admin-dashboard-page" className="pb-16">
      <section className="border-b border-black/10 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] font-bold text-brand-green mb-3">
                Trip operations
              </p>
              <h1 className="font-display font-bold text-4xl md:text-5xl text-brand-ink tracking-tight">
                Admin dashboard
              </h1>
              <p className="mt-3 text-brand-ink/60 max-w-2xl">
                Signed in as <span className="font-semibold">{username}</span>.
                Manage trips from Firebase, with Cloudinary-backed media cleanup.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/admin/dashboard/trips/new"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-brand-yellow text-brand-ink font-semibold hover:bg-brand-ink hover:text-brand-yellow transition"
              >
                <PlusIcon /> Add trip
              </Link>
              <button
                type="button"
                onClick={resetSeedData}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white border border-black/10 text-brand-ink font-semibold hover:border-brand-ink transition"
              >
                <RefreshIcon /> Seed trips
              </button>
              <button
                type="button"
                onClick={logout}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white border border-black/10 text-brand-ink font-semibold hover:border-brand-ink transition"
              >
                Logout
              </button>
            </div>
          </div>

          <div className="grid sm:grid-cols-3 gap-4 mt-8">
            <Stat label="Trips" value={`${total} matching`} />
            <Stat label="Average price" value={formatCurrency(averagePrice)} />
            <Stat
              label="Page"
              value={`${Math.min(page, pageCount)} of ${pageCount}`}
            />
          </div>

          {status || error ? (
            <p
              className={`mt-5 rounded-2xl px-4 py-3 text-sm font-semibold ${
                error ? "bg-red-50 text-red-600" : "bg-green-50 text-green-700"
              }`}
            >
              {error || status}
            </p>
          ) : null}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 rounded-3xl border border-black/5 bg-white/80 p-3">
          <div className="flex flex-col lg:flex-row gap-3">
            <div className="relative flex-1">
              <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-ink/40" />
              <input
                placeholder="Search trips..."
                className="w-full pl-11 pr-4 py-3 rounded-full border border-black/10 bg-white focus:border-brand-ink outline-none text-sm"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
              />
            </div>
            <div className="grid sm:grid-cols-3 gap-3">
              <SelectField
                value={destination}
                onChange={(value) => {
                  setDestination(value);
                  setPage(1);
                }}
                options={[
                  { value: "all", label: "All destinations" },
                  ...destinations.map((item) => ({ value: item, label: item })),
                ]}
              />
              <SelectField
                value={budget}
                onChange={(value) => {
                  setBudget(value);
                  setPage(1);
                }}
                options={[
                  { value: "all", label: "Any budget" },
                  { value: "under-10000", label: "Under Rs 10k" },
                  { value: "10000-20000", label: "Rs 10k-Rs 20k" },
                  { value: "over-20000", label: "Rs 20k+" },
                ]}
              />
              <SelectField
                value={duration}
                onChange={(value) => {
                  setDuration(value);
                  setPage(1);
                }}
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

        {isLoading ? (
          <p className="mb-6 text-sm font-semibold text-brand-ink/60">
            Loading trips...
          </p>
        ) : null}

        {trips.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {trips.map((trip) => (
              <AdminTripCard
                key={trip.slug}
                trip={trip}
                onDelete={() => deleteTrip(trip.slug)}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-3xl border border-black/5 bg-white p-10 text-center">
            <h2 className="font-display font-bold text-2xl text-brand-ink">
              No trips yet.
            </h2>
            <p className="text-brand-ink/60 mt-2">
              Add your first trip or seed the existing frontend data.
            </p>
          </div>
        )}

        {total > tripsPerPage ? (
          <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-brand-ink/60">
              Showing {(page - 1) * tripsPerPage + 1}-
              {Math.min(page * tripsPerPage, total)} of {total} trips
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
        ) : null}
      </section>
    </div>
  );
}

function AdminTripCard({
  onDelete,
  trip,
}: {
  onDelete: () => void;
  trip: Trip;
}) {
  const saved =
    trip.originalPrice > 0
      ? Math.round(((trip.originalPrice - trip.price) / trip.originalPrice) * 100)
      : 0;

  return (
    <article className="group bg-white rounded-3xl overflow-hidden border border-black/5 transition-all hover:-translate-y-1 hover:shadow-2xl duration-500">
      <div className="relative aspect-[4/3] overflow-hidden">
        {trip.image ? (
          <Image
            alt={trip.title}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
            className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
            src={trip.image}
          />
        ) : (
          <div className="absolute inset-0 bg-brand-green-subtle" />
        )}
        <div className="absolute inset-0 ink-gradient opacity-70" />
        <div className="absolute top-4 left-4 flex flex-wrap gap-2">
          <span className="px-3 py-1 rounded-full bg-white/95 backdrop-blur text-brand-ink text-xs font-bold tracking-wide">
            {trip.region}
          </span>
          {saved > 0 ? (
            <span className="px-3 py-1 rounded-full bg-brand-green text-white text-xs font-bold">
              Save {saved}%
            </span>
          ) : null}
        </div>
        <div className="absolute bottom-4 left-4 right-4">
          <p className="text-white/80 text-xs uppercase tracking-[0.2em] mb-1">
            {trip.destination}
          </p>
          <h2 className="text-white font-display font-bold text-2xl leading-tight">
            {trip.title}
          </h2>
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
        </div>
        <div className="mt-5 grid grid-cols-3 gap-2">
          <Link
            href={`/admin/dashboard/trips/${trip.slug}/edit`}
            className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-full bg-brand-ink text-white text-xs font-semibold hover:bg-brand-green transition"
          >
            <EditIcon /> Edit
          </Link>
          <Link
            href={`/trips/${trip.slug}`}
            className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-full bg-brand-paper text-xs font-semibold text-brand-ink/70 hover:text-brand-ink"
          >
            <ExternalIcon /> View
          </Link>
          <button
            type="button"
            onClick={onDelete}
            className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-full bg-red-50 text-xs font-semibold text-red-600 hover:bg-red-100"
          >
            <TrashIcon /> Delete
          </button>
        </div>
      </div>
    </article>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-black/5 bg-brand-paper p-5">
      <p className="text-xs uppercase tracking-widest text-brand-ink/50">
        {label}
      </p>
      <p className="font-display font-bold text-2xl text-brand-ink mt-1">
        {value}
      </p>
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

function SelectField({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (value: string) => void;
  options: Array<{ value: string; label: string }>;
}) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="flex h-12 w-full min-w-[150px] appearance-none items-center justify-between rounded-full border border-black/10 bg-white px-5 py-3 pr-10 text-sm shadow-sm focus:outline-none"
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

function PlusIcon(props: SVGProps<SVGSVGElement>) {
  return <Icon {...props}><path d="M5 12h14" /><path d="M12 5v14" /></Icon>;
}

function RefreshIcon(props: SVGProps<SVGSVGElement>) {
  return <Icon {...props}><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" /><path d="M3 21v-5h5" /><path d="M3 12a9 9 0 0 1 15.74-6.26L21 8" /><path d="M16 8h5V3" /></Icon>;
}

function SearchIcon(props: SVGProps<SVGSVGElement>) {
  return <Icon {...props}><path d="m21 21-4.34-4.34" /><circle cx="11" cy="11" r="8" /></Icon>;
}

function ChevronDownIcon(props: SVGProps<SVGSVGElement>) {
  return <Icon {...props}><path d="m6 9 6 6 6-6" /></Icon>;
}

function CalendarIcon(props: SVGProps<SVGSVGElement>) {
  return <Icon {...props}><path d="M8 2v4" /><path d="M16 2v4" /><rect width="18" height="18" x="3" y="4" rx="2" /><path d="M3 10h18" /></Icon>;
}

function UsersIcon(props: SVGProps<SVGSVGElement>) {
  return <Icon {...props}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><path d="M16 3.128a4 4 0 0 1 0 7.744" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><circle cx="9" cy="7" r="4" /></Icon>;
}

function MapPinIcon(props: SVGProps<SVGSVGElement>) {
  return <Icon {...props}><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" /><circle cx="12" cy="10" r="3" /></Icon>;
}

function EditIcon(props: SVGProps<SVGSVGElement>) {
  return <Icon {...props}><path d="M12 20h9" /><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" /></Icon>;
}

function TrashIcon(props: SVGProps<SVGSVGElement>) {
  return <Icon {...props}><path d="M3 6h18" /><path d="M8 6V4h8v2" /><path d="M19 6l-1 14H6L5 6" /><path d="M10 11v6" /><path d="M14 11v6" /></Icon>;
}

function ExternalIcon(props: SVGProps<SVGSVGElement>) {
  return <Icon {...props}><path d="M15 3h6v6" /><path d="M10 14 21 3" /><path d="M21 14v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5" /></Icon>;
}

function Icon({ children, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  );
}
