import Link from "next/link";
import Image from "next/image";
import type { SVGProps } from "react";

export const metadata = {
  title: "About Raahi Trail",
  description:
    "Meet Raahi Trail, a community-first travel company curating honest group trips, treks and offbeat experiences across India.",
  alternates: {
    canonical: "/about",
  },
};

const whatsappHref =
  "https://wa.me/919999999999?text=Hi%20Raahi%20Trail!%20I%20want%20to%20know%20more%20about%20your%20trips.";

const values = [
  {
    title: "Real human care",
    text: "Every raahi has a direct line to their trip lead. No bots. No call centers.",
    Icon: HeartIcon,
  },
  {
    title: "Offbeat over obvious",
    text: "If it's on every Instagram reel, we've probably already moved on. We chase quieter views.",
    Icon: CompassIcon,
  },
  {
    title: "Local first, always",
    text: "We stay with locals, eat with locals, hire locals. Tourism that gives back.",
    Icon: GlobeIcon,
  },
];

export default function AboutPage() {
  return (
    <div data-testid="about-page" className="pt-16 md:pt-20">
      <section className="bg-brand-ink text-white py-24 md:py-36 relative overflow-hidden grain">
        <div className="absolute inset-0 opacity-20">
          <Image
            alt=""
            fill
            loading="eager"
            sizes="100vw"
            className="object-cover"
            src="https://images.unsplash.com/photo-1641701966318-784c10e9ac4e?w=1920"
          />
        </div>
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs uppercase tracking-[0.2em] font-bold text-brand-green mb-4">
            &#10038; Our story
          </p>
          <h1 className="font-display font-bold text-5xl md:text-7xl lg:text-[6rem] tracking-tight leading-[0.95] max-w-4xl">
            We built Raahi Trail because{" "}
            <em className="not-italic text-brand-yellow">
              the mountains called
            </em>{" "}
            and the corporate calendar said no.
          </h1>
        </div>
      </section>

      <section className="py-20 md:py-32 bg-brand-paper">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-12 gap-10">
          <div className="md:col-span-4">
            <p className="text-xs uppercase tracking-[0.2em] font-bold text-brand-green mb-3">
              &#10038; Our mission
            </p>
            <h2 className="font-display font-bold text-3xl md:text-4xl text-brand-ink leading-tight tracking-tight">
              Make travel{" "}
              <em className="not-italic text-brand-green">simple</em>, honest,
              and unforgettable.
            </h2>
          </div>
          <div className="md:col-span-8 text-lg text-brand-ink/75 space-y-5 leading-relaxed">
            <p>
              Travel shouldn&apos;t be a 47-tab research project. It
              shouldn&apos;t cost a fortune. And it definitely shouldn&apos;t
              feel like you&apos;re being herded from one selfie-point to
              another.
            </p>
            <p>
              We design trips for the way we love to travel &mdash; small
              groups, real stays, hidden corners, no cookie-cutter itineraries.
              Just show up with curiosity. We&apos;ll handle the rest.
            </p>
            <p className="font-display text-brand-ink text-2xl md:text-3xl leading-tight">
              <span className="text-brand-green">&quot;Yeh trip nahi,</span>{" "}
              experience hai.&quot;
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-32 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-12 items-center">
          <div className="relative aspect-4/5 rounded-3xl overflow-hidden">
            <Image
              alt="Founder"
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
              src="https://images.unsplash.com/photo-1676623386862-f884e1e4223c?w=1200"
            />
            <div className="absolute bottom-5 left-5 bg-white px-4 py-2 rounded-full text-sm font-semibold">
              &mdash; Arjun, Founder
            </div>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.2em] font-bold text-brand-green mb-3">
              &#10038; Founder&apos;s note
            </p>
            <h2 className="font-display font-bold text-4xl md:text-5xl text-brand-ink tracking-tight leading-tight mb-6">
              Solo trip se shuruat. Community tak pahunche.
            </h2>
            <div className="space-y-4 text-brand-ink/75 leading-relaxed">
              <p>
                It started in 2022 with a solo backpack to Spiti, a broken
                bike, and strangers who became family in 48 hours. That trip
                changed everything.
              </p>
              <p>
                Back home, friends kept asking &quot;Bhai, agli trip kab plan
                kar raha hai?&quot; &mdash; and I realized most people don&apos;t
                hate travel; they hate planning it. So I stopped saying no and
                started running small group trips. One became ten. Ten became
                Raahi Trail.
              </p>
              <p>
                Today we&apos;re a crew of travelers, trek leaders, chefs, and
                locals. Our only job? Make sure you come back with stories
                &mdash; not receipts.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-32 bg-brand-ink text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs uppercase tracking-[0.2em] font-bold text-brand-green mb-3">
            &#10038; What we stand for
          </p>
          <h2 className="font-display font-bold text-4xl md:text-6xl tracking-tight mb-14 max-w-3xl leading-[0.95]">
            Three things we&apos;ll{" "}
            <em className="not-italic text-brand-yellow">never compromise</em>{" "}
            on.
          </h2>
          <div className="grid md:grid-cols-3 gap-5">
            {values.map(({ title, text, Icon }) => (
              <div
                key={title}
                className="bg-white/5 border border-white/10 p-8 rounded-3xl"
              >
                <Icon className="text-brand-green mb-5" />
                <h3 className="font-display font-bold text-2xl mb-3">
                  {title}
                </h3>
                <p className="text-white/65 leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 md:py-32 bg-brand-paper">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display font-bold text-4xl md:text-6xl text-brand-ink tracking-tight leading-none">
            Ready to meet your{" "}
            <span className="text-brand-green">next favorite people?</span>
          </h2>
          <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-brand-yellow text-brand-ink font-semibold hover:bg-brand-ink hover:text-brand-yellow transition active:scale-95"
              href="/trips"
            >
              Browse upcoming trips <ArrowRightIcon />
            </Link>
            <a
              href={whatsappHref}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white border border-black/10 text-brand-ink font-semibold hover:border-brand-ink transition"
            >
              Say hi on WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

function HeartIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </svg>
  );
}

function CompassIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="m16.24 7.76-1.804 5.411a2 2 0 0 1-1.265 1.265L7.76 16.24l1.804-5.411a2 2 0 0 1 1.265-1.265z" />
      <circle cx="12" cy="12" r="10" />
    </svg>
  );
}

function GlobeIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
      <path d="M2 12h20" />
    </svg>
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
