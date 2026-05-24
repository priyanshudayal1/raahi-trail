import React from 'react';
import Link from 'next/link';

const Header: React.FC = () => {
  return (
    <header data-testid="site-navbar" className="fixed top-0 inset-x-0 z-50 transition-all duration-300 bg-gray-900/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link data-testid="logo-link" className="flex items-center gap-2 group" href="/">
            <img 
              alt="Raahi Trail" 
              className="h-10 md:h-11 w-auto rounded-lg object-cover shadow-sm" 
              src="https://customer-assets.emergentagent.com/job_journey-booking-28/artifacts/0mvkbkdr_RAA%E0%A4%B9%E0%A5%80.jpg" 
            />
          </Link>
          
          <nav className="hidden md:flex items-center gap-8">
            <Link data-testid="nav-home" aria-current="page" className="text-sm font-medium transition-colors text-green-400" href="/">
              Home
            </Link>
            <Link data-testid="nav-trips" className="text-sm font-medium transition-colors text-white/90 hover:text-white" href="/trips">
              Trips
            </Link>
            <Link data-testid="nav-about" className="text-sm font-medium transition-colors text-white/90 hover:text-white" href="/about">
              About
            </Link>
            <Link data-testid="nav-contact" className="text-sm font-medium transition-colors text-white/90 hover:text-white" href="/contact">
              Contact
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <Link 
              data-testid="nav-cta-explore" 
              className="hidden md:inline-flex items-center px-5 py-2.5 rounded-full bg-yellow-400 text-gray-900 text-sm font-semibold hover:bg-gray-900 hover:text-yellow-400 transition-all active:scale-95" 
              href="/trips"
            >
              Explore Trips
            </Link>
            <button data-testid="mobile-menu-toggle" className="md:hidden p-2 rounded-full text-white" aria-label="Toggle menu">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-menu" aria-hidden="true">
                <path d="M4 12h16"></path>
                <path d="M4 18h16"></path>
                <path d="M4 6h16"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
