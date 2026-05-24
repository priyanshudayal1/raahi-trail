import type { CSSProperties, SVGProps } from "react";

const testimonials = [
  {
    quote:
      "Best decision of 2025. Strangers se dost bante hai yahan - literally true.",
    name: "Aanya Mehra",
    trip: "Spiti Circuit",
  },
  {
    quote: "Trek leader was legendary. Food was unreal. 10/10 would do again.",
    name: "Rohan Gupta",
    trip: "Kashmir Great Lakes",
  },
  {
    quote: "First solo trip. Felt safe, cared for, and came back with a crew.",
    name: "Saanvi Patel",
    trip: "Kedarkantha",
  },
  {
    quote: "Every bend had a new view. Raahi Trail made the chaos feel easy.",
    name: "Kabir Singh",
    trip: "Ladakh Road Trip",
  },
  {
    quote: "Effortless logistics. I just had to show up and soak it all in.",
    name: "Isha Kapoor",
    trip: "Meghalaya",
  },
  {
    quote: "Weekend banned the Monday blues. Already booked my next one.",
    name: "Yash Thakur",
    trip: "Kheerganga",
  },
];

const marqueeContainerStyle = {
  "--pause-on-hover": "paused",
  "--pause-on-click": "paused",
  "--width": "100%",
  "--transform": "none",
} as CSSProperties;

const marqueeStyle = {
  "--play": "running",
  "--direction": "normal",
  "--duration": "77.48571428571428s",
  "--delay": "0s",
  "--iteration-count": "infinite",
  "--min-width": "100%",
} as CSSProperties;

const childStyle = {
  "--transform": "none",
} as CSSProperties;

export default function TestimonialsSection() {
  return (
    <section className="py-20 md:py-28 bg-brand-paper overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <p className="text-xs uppercase tracking-[0.2em] font-bold text-brand-green mb-3">
          ✶ Real raahis, real stories
        </p>
        <h2 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-brand-ink tracking-tight leading-none">
          Their words, not ours.
        </h2>
      </div>

      <div className="rfm-marquee-container" style={marqueeContainerStyle}>
        <MarqueeTrack />
        <MarqueeTrack />
      </div>
    </section>
  );
}

function MarqueeTrack() {
  return (
    <div className="rfm-marquee" style={marqueeStyle}>
      <div className="rfm-initial-child-container">
        {testimonials.map((testimonial) => (
          <div
            key={`${testimonial.name}-${testimonial.trip}`}
            className="rfm-child"
            style={childStyle}
          >
            <TestimonialCard testimonial={testimonial} />
          </div>
        ))}
      </div>
    </div>
  );
}

function TestimonialCard({
  testimonial,
}: {
  testimonial: (typeof testimonials)[number];
}) {
  return (
    <div className="mx-4 w-[320px] md:w-[420px] bg-white p-7 rounded-3xl border border-black/5 shrink-0">
      <div className="flex gap-0.5 text-brand-green mb-4">
        {Array.from({ length: 5 }).map((_, index) => (
          <StarIcon key={index} />
        ))}
      </div>
      <p className="font-display text-lg md:text-xl text-brand-ink leading-relaxed mb-5">
        &quot;{testimonial.quote}&quot;
      </p>
      <div>
        <p className="font-semibold text-brand-ink">{testimonial.name}</p>
        <p className="text-sm text-brand-ink/50">{testimonial.trip}</p>
      </div>
    </div>
  );
}

function StarIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="currentColor"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" />
    </svg>
  );
}
