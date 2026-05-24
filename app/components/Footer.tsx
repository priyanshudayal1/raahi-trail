import Image from "next/image";
import Link from "next/link";
import React from "react";

const Footer: React.FC = () => {
  return (
    <footer data-testid="site-footer" className="bg-brand-ink text-white mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="grid md:grid-cols-12 gap-12">
          <div className="md:col-span-5">
            <div className="mb-6">
              <Image
                alt="Raahi Trail"
                className="h-14 w-auto rounded-xl object-cover"
                src="https://customer-assets.emergentagent.com/job_journey-booking-28/artifacts/0mvkbkdr_RAA%E0%A4%B9%E0%A5%80.jpg"
                width={140}
                height={56}
                style={{ width: "auto" }}
              />
            </div>
            <p className="text-white/70 text-lg leading-relaxed max-w-md font-display">
              Plan mat karo. <span className="text-brand-yellow">Bas nikal jao.</span>
            </p>
            <p className="text-white/50 text-sm mt-4 max-w-md leading-relaxed">
              Curated group trips & treks across India for young travelers who want experiences, not itineraries.
            </p>
          </div>

          <div className="md:col-span-3">
            <h4 className="text-xs uppercase tracking-[0.2em] text-brand-green font-bold mb-5">Explore</h4>
            <ul className="space-y-3">
              <li>
                <Link className="text-white/80 hover:text-white transition" href="/trips">All Trips</Link>
              </li>
              <li>
                <Link className="text-white/80 hover:text-white transition" href="/about">About us</Link>
              </li>
              <li>
                <Link className="text-white/80 hover:text-white transition" href="/contact">Contact</Link>
              </li>
              <li>
                <a href="https://wa.me/919999999999?text=Hi%20Raahi%20Trail!%20I%20want%20to%20know%20more%20about%20your%20trips." target="_blank" rel="noreferrer" className="text-white/80 hover:text-white transition">WhatsApp community</a>
              </li>
            </ul>
          </div>

          <div className="md:col-span-4">
            <h4 className="text-xs uppercase tracking-[0.2em] text-brand-green font-bold mb-5">Reach out</h4>
            <ul className="space-y-3 text-white/80">
              <li className="flex items-center gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-phone" aria-hidden="true">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                +91 99999 99999
              </li>
              <li className="flex items-center gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-mail" aria-hidden="true">
                  <path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7" />
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                </svg>
                hello@raahitrail.com
              </li>
              <li className="flex items-center gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-map-pin" aria-hidden="true">
                  <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                New Delhi, India
              </li>
              <li>
                <a href="https://instagram.com/raahitrail" target="_blank" rel="noreferrer" data-testid="footer-instagram" className="inline-flex items-center gap-2 mt-2 px-4 py-2 rounded-full border border-white/15 hover:bg-white hover:text-brand-ink transition">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-instagram" aria-hidden="true">
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                  </svg>
                  @<span>raahitrail</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <p className="text-white/50 text-sm">
            &copy; {new Date().getFullYear()} Raahi Trail. Made with chai in India.
          </p>
          <p className="text-white/50 text-sm font-display">
            Yeh trip nahi, <span className="text-brand-yellow">experience hai.</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
