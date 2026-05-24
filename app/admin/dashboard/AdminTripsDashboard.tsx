"use client";

import Link from "next/link";
import { useMemo, useState, type FormEvent, type SVGProps } from "react";
import { formatCurrency, trips as seedTrips, type Trip } from "../../lib/trips";

type TripDraft = {
  slug: string;
  title: string;
  region: string;
  destination: string;
  tagline: string;
  image: string;
  durationDays: string;
  durationNights: string;
  groupSize: string;
  date: string;
  price: string;
  originalPrice: string;
  difficulty: string;
  stay: string;
  meetingPoint: string;
  highlights: string;
  included: string;
  excluded: string;
  itinerary: string;
  gallery: string;
};

const emptyDraft: TripDraft = {
  slug: "",
  title: "",
  region: "",
  destination: "",
  tagline: "",
  image: "",
  durationDays: "3",
  durationNights: "2",
  groupSize: "8-14",
  date: "",
  price: "",
  originalPrice: "",
  difficulty: "Easy",
  stay: "",
  meetingPoint: "",
  highlights: "",
  included: "",
  excluded: "",
  itinerary: "1 | Arrival and briefing | Meet the crew, settle in, and get the trip briefing.",
  gallery: "",
};

export default function AdminTripsDashboard() {
  const [trips, setTrips] = useState<Trip[]>(seedTrips);
  const [selectedSlug, setSelectedSlug] = useState(seedTrips[0]?.slug ?? "");
  const [draft, setDraft] = useState<TripDraft>(() => tripToDraft(seedTrips[0]));

  const selectedTrip = useMemo(
    () => trips.find((trip) => trip.slug === selectedSlug),
    [selectedSlug, trips],
  );

  const totalSeatsLabel = `${trips.length} active trip${trips.length === 1 ? "" : "s"}`;
  const averagePrice =
    trips.length > 0
      ? Math.round(trips.reduce((sum, trip) => sum + trip.price, 0) / trips.length)
      : 0;

  function updateDraft(field: keyof TripDraft, value: string) {
    setDraft((current) => ({ ...current, [field]: value }));
  }

  function selectTrip(trip: Trip) {
    setSelectedSlug(trip.slug);
    setDraft(tripToDraft(trip));
  }

  function startNewTrip() {
    setSelectedSlug("");
    setDraft(emptyDraft);
  }

  function resetSeedData() {
    setTrips(seedTrips);
    setSelectedSlug(seedTrips[0]?.slug ?? "");
    setDraft(tripToDraft(seedTrips[0]));
  }

  function deleteTrip(slug: string) {
    const nextTrips = trips.filter((trip) => trip.slug !== slug);
    setTrips(nextTrips);

    if (selectedSlug === slug) {
      setSelectedSlug(nextTrips[0]?.slug ?? "");
      setDraft(nextTrips[0] ? tripToDraft(nextTrips[0]) : emptyDraft);
    }
  }

  function saveTrip(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trip = draftToTrip(draft);
    const exists = trips.some((item) => item.slug === selectedSlug);
    const nextTrips = exists
      ? trips.map((item) => (item.slug === selectedSlug ? trip : item))
      : [trip, ...trips];

    setTrips(nextTrips);
    setSelectedSlug(trip.slug);
    setDraft(tripToDraft(trip));
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
                Manage the same trip details shown on the public trip listing
                and trip detail pages. This is local state for now, ready for a
                Firebase save layer later.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={startNewTrip}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-brand-yellow text-brand-ink font-semibold hover:bg-brand-ink hover:text-brand-yellow transition"
              >
                <PlusIcon /> Add trip
              </button>
              <button
                type="button"
                onClick={resetSeedData}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white border border-black/10 text-brand-ink font-semibold hover:border-brand-ink transition"
              >
                <RefreshIcon /> Reset
              </button>
            </div>
          </div>

          <div className="grid sm:grid-cols-3 gap-4 mt-8">
            <Stat label="Trips" value={totalSeatsLabel} />
            <Stat label="Average price" value={formatCurrency(averagePrice)} />
            <Stat
              label="Selected"
              value={selectedTrip?.title ?? "New trip draft"}
            />
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid xl:grid-cols-12 gap-6">
        <aside className="xl:col-span-4 space-y-3">
          {trips.map((trip) => (
            <div
              key={trip.slug}
              className={`bg-white border p-4 rounded-2xl transition ${
                selectedSlug === trip.slug ? "border-brand-green" : "border-black/5"
              }`}
            >
              <button
                type="button"
                onClick={() => selectTrip(trip)}
                className="w-full text-left"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="font-display font-bold text-lg text-brand-ink leading-tight">
                      {trip.title}
                    </h2>
                    <p className="text-sm text-brand-ink/60 mt-1">
                      {trip.destination}, {trip.region}
                    </p>
                  </div>
                  <span className="text-xs font-bold text-brand-green whitespace-nowrap">
                    {formatCurrency(trip.price)}
                  </span>
                </div>
              </button>
              <div className="flex items-center gap-2 mt-4">
                <Link
                  href={`/trips/${trip.slug}`}
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-full bg-brand-paper text-xs font-semibold text-brand-ink/70 hover:text-brand-ink"
                >
                  <ExternalIcon /> View
                </Link>
                <button
                  type="button"
                  onClick={() => deleteTrip(trip.slug)}
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-full bg-red-50 text-xs font-semibold text-red-600 hover:bg-red-100"
                >
                  <TrashIcon /> Delete
                </button>
              </div>
            </div>
          ))}
        </aside>

        <form
          onSubmit={saveTrip}
          className="xl:col-span-8 bg-white border border-black/5 rounded-3xl p-5 sm:p-7 md:p-8"
        >
          <div className="flex items-start justify-between gap-4 mb-8">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] font-bold text-brand-green mb-2">
                {selectedSlug ? "Edit trip" : "Add trip"}
              </p>
              <h2 className="font-display font-bold text-3xl text-brand-ink tracking-tight">
                Public trip details
              </h2>
            </div>
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-brand-ink text-white font-semibold hover:bg-brand-green transition"
            >
              <SaveIcon /> Save
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <Field label="Title" value={draft.title} onChange={(value) => updateDraft("title", value)} required />
            <Field label="Slug" value={draft.slug} onChange={(value) => updateDraft("slug", slugify(value))} required />
            <Field label="Region" value={draft.region} onChange={(value) => updateDraft("region", value)} required />
            <Field label="Destination" value={draft.destination} onChange={(value) => updateDraft("destination", value)} required />
            <Field label="Date" value={draft.date} onChange={(value) => updateDraft("date", value)} required />
            <Field label="Difficulty" value={draft.difficulty} onChange={(value) => updateDraft("difficulty", value)} required />
            <Field label="Duration days" type="number" value={draft.durationDays} onChange={(value) => updateDraft("durationDays", value)} required />
            <Field label="Duration nights" type="number" value={draft.durationNights} onChange={(value) => updateDraft("durationNights", value)} required />
            <Field label="Group size" value={draft.groupSize} onChange={(value) => updateDraft("groupSize", value)} required />
            <Field label="Price" type="number" value={draft.price} onChange={(value) => updateDraft("price", value)} required />
            <Field label="Original price" type="number" value={draft.originalPrice} onChange={(value) => updateDraft("originalPrice", value)} required />
            <Field label="Hero image URL" value={draft.image} onChange={(value) => updateDraft("image", value)} required />
          </div>

          <div className="mt-4 space-y-4">
            <TextArea label="Tagline" value={draft.tagline} onChange={(value) => updateDraft("tagline", value)} rows={2} required />
            <TextArea label="Stay details" value={draft.stay} onChange={(value) => updateDraft("stay", value)} rows={2} required />
            <TextArea label="Meeting point" value={draft.meetingPoint} onChange={(value) => updateDraft("meetingPoint", value)} rows={2} required />
          </div>

          <div className="grid md:grid-cols-2 gap-4 mt-4">
            <TextArea label="Highlights" hint="One highlight per line" value={draft.highlights} onChange={(value) => updateDraft("highlights", value)} rows={6} />
            <TextArea label="Gallery URLs" hint="One image URL per line" value={draft.gallery} onChange={(value) => updateDraft("gallery", value)} rows={6} />
            <TextArea label="Included" hint="One inclusion per line" value={draft.included} onChange={(value) => updateDraft("included", value)} rows={6} />
            <TextArea label="Excluded" hint="One exclusion per line" value={draft.excluded} onChange={(value) => updateDraft("excluded", value)} rows={6} />
          </div>

          <div className="mt-4">
            <TextArea
              label="Itinerary"
              hint="One day per line: day | title | description"
              value={draft.itinerary}
              onChange={(value) => updateDraft("itinerary", value)}
              rows={8}
            />
          </div>
        </form>
      </section>
    </div>
  );
}

function tripToDraft(trip?: Trip): TripDraft {
  if (!trip) {
    return emptyDraft;
  }

  return {
    slug: trip.slug,
    title: trip.title,
    region: trip.region,
    destination: trip.destination,
    tagline: trip.tagline,
    image: trip.image,
    durationDays: String(trip.durationDays),
    durationNights: String(trip.durationNights),
    groupSize: trip.groupSize,
    date: trip.date,
    price: String(trip.price),
    originalPrice: String(trip.originalPrice),
    difficulty: trip.difficulty,
    stay: trip.stay,
    meetingPoint: trip.meetingPoint,
    highlights: trip.highlights.join("\n"),
    included: trip.included.join("\n"),
    excluded: trip.excluded.join("\n"),
    itinerary: trip.itinerary
      .map((day) => `${day.day} | ${day.title} | ${day.description}`)
      .join("\n"),
    gallery: trip.gallery.join("\n"),
  };
}

function draftToTrip(draft: TripDraft): Trip {
  const title = draft.title.trim() || "Untitled Trip";
  const image = draft.image.trim();

  return {
    slug: draft.slug.trim() || slugify(title),
    title,
    region: draft.region.trim(),
    destination: draft.destination.trim(),
    tagline: draft.tagline.trim(),
    image,
    durationDays: toNumber(draft.durationDays, 1),
    durationNights: toNumber(draft.durationNights, 0),
    groupSize: draft.groupSize.trim(),
    date: draft.date.trim(),
    price: toNumber(draft.price, 0),
    originalPrice: toNumber(draft.originalPrice, toNumber(draft.price, 0)),
    difficulty: draft.difficulty.trim(),
    stay: draft.stay.trim(),
    meetingPoint: draft.meetingPoint.trim(),
    highlights: toLines(draft.highlights),
    included: toLines(draft.included),
    excluded: toLines(draft.excluded),
    itinerary: toItinerary(draft.itinerary),
    gallery: toLines(draft.gallery).length > 0 ? toLines(draft.gallery) : [image],
  };
}

function Field({
  label,
  onChange,
  required,
  type = "text",
  value,
}: {
  label: string;
  onChange: (value: string) => void;
  required?: boolean;
  type?: string;
  value: string;
}) {
  const id = label.toLowerCase().replaceAll(" ", "-");

  return (
    <div>
      <label
        htmlFor={id}
        className="text-xs uppercase tracking-widest font-bold text-brand-ink/60 mb-2 block"
      >
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        required={required}
        onChange={(event) => onChange(event.target.value)}
        className="w-full px-4 py-3 rounded-2xl border border-black/10 bg-brand-paper focus:border-brand-ink focus:bg-white outline-none text-sm"
      />
    </div>
  );
}

function TextArea({
  hint,
  label,
  onChange,
  required,
  rows,
  value,
}: {
  hint?: string;
  label: string;
  onChange: (value: string) => void;
  required?: boolean;
  rows: number;
  value: string;
}) {
  const id = label.toLowerCase().replaceAll(" ", "-");

  return (
    <div>
      <div className="flex items-end justify-between gap-3 mb-2">
        <label
          htmlFor={id}
          className="text-xs uppercase tracking-widest font-bold text-brand-ink/60 block"
        >
          {label}
        </label>
        {hint ? <span className="text-xs text-brand-ink/45">{hint}</span> : null}
      </div>
      <textarea
        id={id}
        rows={rows}
        value={value}
        required={required}
        onChange={(event) => onChange(event.target.value)}
        className="w-full px-4 py-3 rounded-2xl border border-black/10 bg-brand-paper focus:border-brand-ink focus:bg-white outline-none text-sm leading-relaxed"
      />
    </div>
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

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function toLines(value: string) {
  return value
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

function toNumber(value: string, fallback: number) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function toItinerary(value: string): Trip["itinerary"] {
  const days = value
    .split("\n")
    .map((line, index) => {
      const [day, title, description] = line.split("|").map((part) => part.trim());
      return {
        day: toNumber(day, index + 1),
        title: title || `Day ${index + 1}`,
        description: description || "Trip experience details.",
      };
    })
    .filter((day) => day.title || day.description);

  return days.length > 0
    ? days
    : [{ day: 1, title: "Arrival", description: "Meet the crew and settle in." }];
}

function PlusIcon(props: SVGProps<SVGSVGElement>) {
  return <Icon {...props}><path d="M5 12h14" /><path d="M12 5v14" /></Icon>;
}

function RefreshIcon(props: SVGProps<SVGSVGElement>) {
  return <Icon {...props}><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" /><path d="M3 21v-5h5" /><path d="M3 12a9 9 0 0 1 15.74-6.26L21 8" /><path d="M16 8h5V3" /></Icon>;
}

function SaveIcon(props: SVGProps<SVGSVGElement>) {
  return <Icon {...props}><path d="M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z" /><path d="M17 21v-7H7v7" /><path d="M7 3v5h8" /></Icon>;
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
