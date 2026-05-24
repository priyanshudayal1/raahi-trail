import React from "react";

const WHATSAPP_URL =
  "https://wa.me/919999999999?text=Hi%20Raahi%20Trail!%20I%20want%20to%20know%20more%20about%20your%20trips.";

const FloatingWhatsApp: React.FC = () => {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noreferrer"
      data-testid="floating-whatsapp"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-5 right-5 md:bottom-8 md:right-8 z-40 bg-[#25D366] text-white w-14 h-14 md:w-16 md:h-16 rounded-full shadow-[0_8px_32px_rgba(37,211,102,0.45)] hover:scale-110 active:scale-95 transition-transform flex items-center justify-center"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="26"
        height="26"
        viewBox="0 0 24 24"
        fill="#ffffff"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-message-circle"
        aria-hidden="true"
      >
        <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
      </svg>
      <span className="absolute -top-1 -right-1 flex h-3 w-3">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white/60" />
        <span className="relative inline-flex rounded-full h-3 w-3 bg-white" />
      </span>
    </a>
  );
};

export default FloatingWhatsApp;
