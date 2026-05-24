import Image from "next/image";
import Link from "next/link";
import type { SVGProps } from "react";

const whatsappHref =
  "https://wa.me/919999999999?text=Hi%20Raahi%20Trail!%20I%20want%20to%20join%20the%20travel%20community.";

const communityStats = [
  { value: "3.2k+", label: "Travelers" },
  { value: "28+", label: "Cities" },
  { value: "120+", label: "Meetups" },
];

const communityPerks = [
  {
    title: "Find your trip crew",
    text: "Meet solo travelers, weekend explorers, photographers, and first-time trekkers before you leave.",
    Icon: UsersIcon,
  },
  {
    title: "Get honest trail notes",
    text: "Packing lists, weather alerts, hidden food stops, and real tips from people who just came back.",
    Icon: MessageIcon,
  },
  {
    title: "Join offline hangouts",
    text: "City meetups, chai circles, photo walks, and reunion nights after the trip stories settle in.",
    Icon: MapPinIcon,
  },
];

export default function CommunitySection() {
  return (
    <section className="bg-brand-paper py-20 md:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          <div className="lg:col-span-5">
            <p className="text-xs uppercase tracking-[0.2em] font-bold text-brand-green mb-3">
              * The Raahi community
            </p>
            <h2 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-brand-ink tracking-tight leading-[1.02]">
              Trips end.
              <br />
              <span className="text-brand-green">The group chat does not.</span>
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-brand-ink/65 max-w-xl">
              A warm travel circle for people who would rather collect
              sunrises, stories, and new dost than just another itinerary.
            </p>

            <div className="mt-8 grid grid-cols-3 gap-3 max-w-lg">
              {communityStats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-3xl bg-white border border-black/5 p-4"
                >
                  <p className="font-display text-2xl md:text-3xl font-bold text-brand-ink">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-xs uppercase tracking-widest text-brand-ink/50">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-9 flex flex-col sm:flex-row gap-3">
              <a
                href={whatsappHref}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full bg-brand-ink text-white font-semibold hover:bg-brand-green transition-all active:scale-95"
              >
                Join the community <ArrowRightIcon />
              </a>
              <Link
                className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full bg-white text-brand-ink border border-black/10 font-semibold hover:border-brand-ink transition-all active:scale-95"
                href="/trips"
              >
                Explore group trips
              </Link>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="grid md:grid-cols-5 gap-5 items-stretch">
              <div className="relative min-h-[420px] md:col-span-3 rounded-3xl overflow-hidden bg-brand-ink">
                <Image
                  alt="Travel community sitting together in the mountains"
                  fill
                  sizes="(min-width: 1024px) 42vw, 100vw"
                  className="object-cover"
                  src="https://images.pexels.com/photos/6271625/pexels-photo-6271625.jpeg?w=1200"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/10 to-black/80" />
                <div className="absolute left-5 right-5 bottom-5 rounded-3xl bg-white/12 border border-white/20 p-5 text-white backdrop-blur-xl">
                  <p className="text-xs uppercase tracking-[0.2em] text-white/60 mb-2">
                    Next community moment
                  </p>
                  <h3 className="font-display font-bold text-2xl">
                    Sunday sunrise hike and breakfast circle
                  </h3>
                  <p className="mt-2 text-sm text-white/70">
                    Meet travelers nearby before your next big escape.
                  </p>
                </div>
              </div>

              <div className="md:col-span-2 space-y-4">
                {communityPerks.map(({ title, text, Icon }) => (
                  <div
                    key={title}
                    className="rounded-3xl bg-white border border-black/5 p-6 shadow-sm"
                  >
                    <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-brand-green/10 text-brand-green">
                      <Icon />
                    </div>
                    <h3 className="font-display font-bold text-xl text-brand-ink">
                      {title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-brand-ink/60">
                      {text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
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

function UsersIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
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

function MessageIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z" />
      <path d="M8 9h8" />
      <path d="M8 13h6" />
    </svg>
  );
}

function MapPinIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
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
