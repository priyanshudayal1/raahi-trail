import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import {
  formatCurrency,
  getTripBySlug,
  trips,
  type Trip,
} from "../../../lib/trips";

type TripPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

type IconProps = {
  className?: string;
};

export function generateStaticParams() {
  return trips.map((trip) => ({
    slug: trip.slug,
  }));
}

export async function generateMetadata({
  params,
}: TripPageProps): Promise<Metadata> {
  const { slug } = await params;
  const trip = getTripBySlug(slug);

  if (!trip) {
    return {
      title: "Trip not found - Raahi Trail",
    };
  }

  return {
    title: `${trip.title} - Raahi Trail`,
    description: trip.tagline,
  };
}

export default async function TripDetailPage({ params }: TripPageProps) {
  const { slug } = await params;
  const trip = getTripBySlug(slug);

  if (!trip) {
    notFound();
  }

  const whatsappText = encodeURIComponent(
    `Hi Raahi Trail! I'm interested in ${trip.title}. Can you share more details?`,
  );
  const whatsappHref = `https://wa.me/919999999999?text=${whatsappText}`;

  return (
    <div
      className="pt-16 md:pt-20"
      data-testid={`trip-detail-${trip.slug}`}
    >
      <section className="relative h-[60vh] md:h-[80vh] overflow-hidden bg-brand-ink">
        <Image
          alt={trip.title}
          className="object-cover"
          fill
          priority
          sizes="100vw"
          src={trip.image}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/20" />

        <div className="relative z-10 h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-end pb-12 md:pb-16">
          <Link
            className="inline-flex items-center gap-2 text-white/80 text-sm mb-6 hover:text-white transition-colors"
            href="/trips"
          >
            <ArrowLeftIcon className="h-3.5 w-3.5" />
            All trips
          </Link>

          <div className="flex flex-wrap gap-2 mb-4">
            <span className="px-3 py-1 rounded-full bg-brand-green text-white text-xs font-bold">
              {trip.region}
            </span>
            <span className="px-3 py-1 rounded-full bg-white/15 backdrop-blur text-white text-xs font-semibold border border-white/20">
              {trip.difficulty}
            </span>
          </div>

          <h1 className="font-display font-bold text-white text-4xl md:text-6xl lg:text-7xl tracking-tight leading-[0.95] max-w-4xl">
            {trip.title}
          </h1>
          <p className="mt-5 text-white/85 text-lg md:text-xl max-w-2xl font-display">
            {trip.tagline}
          </p>
        </div>
      </section>

      <section className="bg-white border-b border-black/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 grid grid-cols-2 md:grid-cols-4 gap-5">
          <InfoStat
            icon={<ClockIcon />}
            label="Duration"
            value={`${trip.durationDays}D / ${trip.durationNights}N`}
          />
          <InfoStat icon={<CalendarIcon />} label="Starts" value={trip.date} />
          <InfoStat
            icon={<UsersIcon />}
            label="Group size"
            value={trip.groupSize}
          />
          <InfoStat
            icon={<MountainIcon />}
            label="Difficulty"
            value={trip.difficulty}
          />
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 grid lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8 space-y-16">
          <TripHighlights trip={trip} />
          <TripItinerary trip={trip} />

          <div className="grid md:grid-cols-2 gap-6">
            <ChecklistCard
              icon="check"
              items={trip.included}
              title="What's included"
            />
            <ChecklistCard
              icon="x"
              items={trip.excluded}
              title="What's not"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <InfoCard title="Stay details" text={trip.stay} />
            <InfoCard title="Meeting point" text={trip.meetingPoint} />
          </div>

          <TripGallery trip={trip} />
        </div>

        <aside className="lg:col-span-4">
          <div className="lg:sticky lg:top-28 bg-white rounded-3xl border border-black/5 p-6 md:p-7 shadow-xl">
            <p className="text-xs uppercase tracking-[0.2em] font-bold text-brand-green mb-2">
              Starting from
            </p>
            <div className="flex items-baseline gap-3 mb-1">
              <span className="font-display font-bold text-4xl text-brand-ink">
                {formatCurrency(trip.price)}
              </span>
              <span className="text-lg text-brand-ink/40 line-through">
                {formatCurrency(trip.originalPrice)}
              </span>
            </div>
            <p className="text-xs text-brand-ink/50 mb-6">
              per person · triple sharing
            </p>

            <button
              className="w-full py-4 rounded-full bg-brand-yellow text-brand-ink font-semibold hover:bg-brand-ink hover:text-brand-yellow transition-all active:scale-95"
              data-testid="open-booking-form"
              type="button"
            >
              Book this trip
            </button>
            <a
              className="mt-3 w-full py-4 rounded-full bg-[#25D366] text-white font-semibold flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform"
              data-testid="trip-whatsapp-cta"
              href={whatsappHref}
              rel="noreferrer"
              target="_blank"
            >
              <MessageCircleIcon className="h-[18px] w-[18px]" />
              Ask on WhatsApp
            </a>

            <div className="mt-6 pt-6 border-t border-black/5 space-y-2 text-sm text-brand-ink/70">
              <p className="flex items-center gap-2">
                <MapPinIcon className="h-3.5 w-3.5 text-brand-green shrink-0" />
                {trip.destination}, {trip.region}
              </p>
              <p className="flex items-center gap-2">
                <CalendarIcon className="h-3.5 w-3.5 text-brand-green shrink-0" />
                Next batch: {trip.date}
              </p>
              <p className="flex items-center gap-2">
                <UsersIcon className="h-3.5 w-3.5 text-brand-green shrink-0" />
                Group of {trip.groupSize}
              </p>
            </div>
          </div>
        </aside>
      </section>

      <div className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-xl border-t border-black/5 p-3 flex gap-2">
        <div className="flex-1 px-3">
          <p className="text-[10px] uppercase tracking-widest text-brand-ink/50">
            From
          </p>
          <p className="font-display font-bold text-lg text-brand-ink leading-none">
            {formatCurrency(trip.price)}
          </p>
        </div>
        <button
          className="px-6 py-3 rounded-full bg-brand-yellow text-brand-ink font-semibold text-sm"
          data-testid="mobile-book-btn"
          type="button"
        >
          Book now
        </button>
        <a
          aria-label={`Ask about ${trip.title} on WhatsApp`}
          className="px-4 py-3 rounded-full bg-[#25D366] text-white flex items-center justify-center"
          data-testid="mobile-wa-btn"
          href={whatsappHref}
          rel="noreferrer"
          target="_blank"
        >
          <MessageCircleIcon className="h-[18px] w-[18px]" />
        </a>
      </div>
    </div>
  );
}

function InfoStat({
  icon,
  label,
  value,
}: {
  icon: ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 rounded-full bg-brand-green-subtle text-brand-green flex items-center justify-center shrink-0">
        {icon}
      </div>
      <div>
        <p className="text-[10px] uppercase tracking-widest text-brand-ink/50">
          {label}
        </p>
        <p className="font-semibold text-brand-ink text-sm">{value}</p>
      </div>
    </div>
  );
}

function TripHighlights({ trip }: { trip: Trip }) {
  return (
    <div>
      <h2 className="font-display font-bold text-3xl md:text-4xl text-brand-ink mb-6 tracking-tight">
        Trip highlights
      </h2>
      <div className="grid sm:grid-cols-2 gap-3">
        {trip.highlights.map((highlight, index) => (
          <div
            className="flex gap-3 p-4 bg-brand-paper rounded-2xl border border-black/5"
            key={highlight}
          >
            <span className="text-brand-green font-bold">
              {String(index + 1).padStart(2, "0")}
            </span>
            <p className="text-brand-ink/80 text-sm leading-relaxed">
              {highlight}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

function TripItinerary({ trip }: { trip: Trip }) {
  return (
    <div>
      <h2 className="font-display font-bold text-3xl md:text-4xl text-brand-ink mb-8 tracking-tight">
        Day-by-day itinerary
      </h2>
      <div className="relative pl-8">
        <div className="absolute left-3 top-2 bottom-2 w-px bg-black/10" />
        {trip.itinerary.map((day) => (
          <div className="relative mb-8 last:mb-0" key={day.day}>
            <div className="absolute -left-8 top-1 w-6 h-6 rounded-full bg-brand-green text-white text-xs font-bold flex items-center justify-center">
              {day.day}
            </div>
            <p className="text-xs uppercase tracking-[0.2em] text-brand-green font-bold mb-1">
              Day {day.day}
            </p>
            <h3 className="font-display font-bold text-xl text-brand-ink mb-2">
              {day.title}
            </h3>
            <p className="text-brand-ink/70 leading-relaxed">
              {day.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

function ChecklistCard({
  icon,
  items,
  title,
}: {
  icon: "check" | "x";
  items: string[];
  title: string;
}) {
  return (
    <div className="bg-white p-6 md:p-8 rounded-3xl border border-black/5">
      <h3 className="font-display font-bold text-2xl text-brand-ink mb-5">
        {title}
      </h3>
      <ul className="space-y-3">
        {items.map((item) => (
          <li className="flex gap-3 text-sm text-brand-ink/80" key={item}>
            {icon === "check" ? (
              <CheckIcon className="h-[18px] w-[18px] text-green-600 shrink-0 mt-0.5" />
            ) : (
              <XIcon className="h-[18px] w-[18px] text-red-500 shrink-0 mt-0.5" />
            )}
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

function InfoCard({ text, title }: { text: string; title: string }) {
  return (
    <div className="bg-white p-6 md:p-8 rounded-3xl border border-black/5">
      <h3 className="font-display font-bold text-xl text-brand-ink mb-3">
        {title}
      </h3>
      <p className="text-brand-ink/70 leading-relaxed">{text}</p>
    </div>
  );
}

function TripGallery({ trip }: { trip: Trip }) {
  return (
    <div>
      <h2 className="font-display font-bold text-3xl md:text-4xl text-brand-ink mb-6 tracking-tight">
        A glimpse
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {trip.gallery.map((image, index) => (
          <div
            className="relative aspect-square rounded-2xl overflow-hidden bg-gray-100"
            key={`${image}-${index}`}
          >
            <Image
              alt={`${trip.title} glimpse ${index + 1}`}
              className="object-cover hover:scale-110 transition-transform duration-700"
              fill
              loading="lazy"
              sizes="(min-width: 768px) 260px, 50vw"
              src={image}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

function ArrowLeftIcon({ className }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <path d="m12 19-7-7 7-7" />
      <path d="M19 12H5" />
    </svg>
  );
}

function CalendarIcon({ className = "h-[18px] w-[18px]" }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <path d="M8 2v4" />
      <path d="M16 2v4" />
      <rect height="18" rx="2" width="18" x="3" y="4" />
      <path d="M3 10h18" />
    </svg>
  );
}

function CheckIcon({ className }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

function ClockIcon({ className = "h-[18px] w-[18px]" }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function MapPinIcon({ className }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function MessageCircleIcon({ className }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
    </svg>
  );
}

function MountainIcon({ className = "h-[18px] w-[18px]" }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  );
}

function UsersIcon({ className = "h-[18px] w-[18px]" }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <path d="M16 3.128a4 4 0 0 1 0 7.744" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <circle cx="9" cy="7" r="4" />
    </svg>
  );
}

function XIcon({ className }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}
