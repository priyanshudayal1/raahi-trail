import type { SVGProps } from "react";

export const metadata = {
  title: "Contact Us | Raahi Trail",
  description: "Get in touch with Raahi Trail for your next adventure.",
};

const phoneDisplay = "+91 99999 99999";
const phoneHref = "tel:+919999999999";
const whatsappHref =
  "https://wa.me/919999999999?text=Hi%20Raahi%20Trail!%20I%20want%20to%20know%20more%20about%20your%20trips.";

const contactLinks = [
  {
    title: "Call",
    value: phoneDisplay,
    href: phoneHref,
    Icon: PhoneIcon,
  },
  {
    title: "Email",
    value: "hello@raahitrail.com",
    href: "mailto:hello@raahitrail.com",
    Icon: MailIcon,
  },
  {
    title: "Instagram",
    value: "@raahitrail",
    href: "https://instagram.com/raahitrail",
    Icon: InstagramIcon,
  },
];

export default function ContactPage() {
  return (
    <div data-testid="contact-page" className="pt-16 md:pt-20">
      <section className="bg-white py-20 md:py-28 border-b border-black/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs uppercase tracking-[0.2em] font-bold text-brand-green mb-3">
            * Get in touch
          </p>
          <h1 className="font-display font-bold text-5xl md:text-6xl lg:text-7xl text-brand-ink tracking-tight leading-[0.95] max-w-4xl">
            Baat karni hai?{" "}
            <em className="not-italic text-brand-green">Hum yahi hai.</em>
          </h1>
          <p className="mt-6 text-lg text-brand-ink/70 max-w-xl">
            WhatsApp fastest. Form works too. Either way, a real human replies.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-brand-paper">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-12 gap-8">
          <a
            href={whatsappHref}
            target="_blank"
            rel="noreferrer"
            data-testid="contact-wa-card"
            className="lg:col-span-5 group bg-[#25D366] text-white rounded-3xl p-8 md:p-10 flex flex-col justify-between hover:scale-[1.01] transition-transform min-h-[320px]"
          >
            <div>
              <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur px-3 py-1 rounded-full text-xs uppercase tracking-widest font-bold">
                Fastest way -&gt;
              </div>
              <h2 className="font-display font-bold text-4xl md:text-5xl mt-6 leading-[0.95] tracking-tight">
                Ping us on
                <br /> WhatsApp.
              </h2>
              <p className="mt-4 text-white/85 max-w-sm">
                Plan mat karo, bas text bhej do. Replies within 2 working
                hours. Real human, not a bot.
              </p>
            </div>
            <div className="flex items-center justify-between gap-5 mt-8">
              <p className="font-display font-bold text-2xl">{phoneDisplay}</p>
              <span className="w-14 h-14 shrink-0 rounded-full bg-white text-[#25D366] flex items-center justify-center group-hover:rotate-12 transition-transform">
                <SendIcon />
              </span>
            </div>
          </a>

          <div className="lg:col-span-7 bg-white rounded-3xl p-8 md:p-10 border border-black/5">
            <h2 className="font-display font-bold text-3xl text-brand-ink mb-2 tracking-tight">
              Or leave a note.
            </h2>
            <p className="text-brand-ink/60 mb-6 text-sm">
              We&apos;ll read it with our morning chai.
            </p>
            <form className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <Field
                  label="Name"
                  type="text"
                  testId="contact-name"
                  required
                />
                <Field label="Phone" type="tel" testId="contact-phone" />
              </div>
              <Field
                label="Email"
                type="email"
                testId="contact-email"
                required
              />
              <div>
                <label className="text-xs uppercase tracking-widest font-bold text-brand-ink/60 mb-2 block">
                  Message
                </label>
                <textarea
                  data-testid="contact-message"
                  rows={5}
                  required
                  className="w-full px-4 py-3 rounded-2xl border border-black/10 bg-brand-paper focus:border-brand-ink focus:bg-white outline-none text-sm"
                />
              </div>
              <button
                data-testid="contact-submit"
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-brand-yellow text-brand-ink font-semibold hover:bg-brand-ink hover:text-brand-yellow transition active:scale-95 disabled:opacity-60"
              >
                Send message
              </button>
            </form>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-3 gap-4 mt-8">
          {contactLinks.map(({ title, value, href, Icon }) => (
            <a
              key={title}
              href={href}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-4 p-5 bg-white rounded-3xl border border-black/5 hover:border-brand-ink transition group"
            >
              <div className="w-12 h-12 rounded-full bg-brand-green-subtle text-brand-green flex items-center justify-center group-hover:bg-brand-green group-hover:text-white transition">
                <Icon />
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest text-brand-ink/50">
                  {title}
                </p>
                <p className="font-semibold text-brand-ink">{value}</p>
              </div>
            </a>
          ))}
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
          <div className="rounded-3xl overflow-hidden border border-black/5 bg-white">
            <iframe
              title="Raahi Trail office"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d224346.4052!2d77.04417!3d28.527281!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd5b347eb62d%3A0x52c2b7494e204dce!2sNew%20Delhi%2C%20Delhi!5e0!3m2!1sen!2sin!4v1700000000000"
              width="100%"
              height="350"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              data-testid="contact-map"
              className="border-0"
            />
          </div>
        </div>
      </section>
    </div>
  );
}

function Field({
  label,
  type,
  testId,
  required,
}: {
  label: string;
  type: string;
  testId: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="text-xs uppercase tracking-widest font-bold text-brand-ink/60 mb-2 block">
        {label}
      </label>
      <input
        data-testid={testId}
        required={required}
        className="w-full px-4 py-3 rounded-2xl border border-black/10 bg-brand-paper focus:border-brand-ink focus:bg-white outline-none text-sm"
        type={type}
      />
    </div>
  );
}

function SendIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z" />
      <path d="m21.854 2.147-10.94 10.939" />
    </svg>
  );
}

function PhoneIcon(props: SVGProps<SVGSVGElement>) {
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
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function MailIcon(props: SVGProps<SVGSVGElement>) {
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
      <path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7" />
      <rect x="2" y="4" width="20" height="16" rx="2" />
    </svg>
  );
}

function InstagramIcon(props: SVGProps<SVGSVGElement>) {
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
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}
