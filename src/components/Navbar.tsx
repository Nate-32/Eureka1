import {ArrowUpRight, Menu, X} from 'lucide-react';
import {useEffect, useState} from 'react';
import {eventData} from '../config/eventData';

interface NavbarProps {
  onOpenProposal: () => void;
}

export function Navbar({onOpenProposal}: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setScrolled(scrollY > 24);

      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress =
        docHeight > 0 ? Math.min(Math.max((scrollY / docHeight) * 100, 0), 100) : 0;
      setScrollProgress(progress);

      const sectionIds = eventData.navLinks.map((item) => item.id);
      let current = '';
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= 160 && rect.bottom >= 120) {
          current = id;
        }
      }
      setActiveSection(current);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, {passive: true});
    window.addEventListener('resize', handleScroll, {passive: true});
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  const scrollToHref = (href: string) => {
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({behavior: 'smooth'});
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || mobileMenuOpen
          ? 'bg-white/92 backdrop-blur-xl border-b border-[#E5EAF1] shadow-[0_4px_24px_rgba(18,26,44,0.05)]'
          : 'bg-[#F8FAFD]/65 backdrop-blur-md border-b border-[#E5EAF1]/50'
      }`}
    >
      <div className="mx-auto flex max-w-[1280px] items-center justify-between gap-8 px-5 py-3.5 sm:px-8 lg:px-10">
        {/* Zone 1: Brand Wordmark */}
        <a
          href="#hero"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({top: 0, behavior: 'smooth'});
            setMobileMenuOpen(false);
          }}
          className="font-display text-lg font-extrabold tracking-tight text-[#121A2C] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#137C75]"
        >
          {eventData.brandName}
          <span className="text-[#62C9C1]">.</span>
        </a>

        {/* Zone 2: Navigation Links */}
        <nav
          aria-label="Primary navigation"
          className="hidden lg:flex items-center gap-7"
        >
          {eventData.navLinks.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToHref(item.href);
                }}
                className={`relative py-1 text-sm font-medium whitespace-nowrap shrink-0 transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#137C75] ${
                  isActive
                    ? 'text-[#121A2C]'
                    : 'text-[#64748B] hover:text-[#121A2C]'
                }`}
              >
                {item.label}
                <span
                  aria-hidden="true"
                  className={`absolute left-0 -bottom-0.5 h-[2px] w-full rounded-full bg-gradient-to-r from-[#62C9C1] to-[#A895E8] transition-transform duration-200 origin-left ${
                    isActive ? 'scale-x-100 opacity-100' : 'scale-x-0 opacity-0'
                  }`}
                />
              </a>
            );
          })}
        </nav>

        {/* Zone 3: Primary Action + Mobile Trigger */}
        <div className="flex items-center gap-3 shrink-0">
          {eventData.externalProposalFormUrl ? (
            <a
              href={eventData.externalProposalFormUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg bg-[#121A2C] px-4 py-2 text-xs sm:text-sm font-semibold text-white transition-all duration-200 hover:bg-[#1C2842] hover:-translate-y-0.5 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#137C75]"
            >
              <span>{eventData.submitProposalLabel}</span>
              <ArrowUpRight className="h-3.5 w-3.5 text-[#62C9C1]" aria-hidden="true" />
            </a>
          ) : (
            <button
              type="button"
              onClick={onOpenProposal}
              className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg bg-[#121A2C] px-4 py-2 text-xs sm:text-sm font-semibold text-white transition-all duration-200 hover:bg-[#1C2842] hover:-translate-y-0.5 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#137C75]"
            >
              <span>{eventData.submitProposalLabel}</span>
              <ArrowUpRight className="h-3.5 w-3.5 text-[#62C9C1]" aria-hidden="true" />
            </button>
          )}

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-label={
              mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'
            }
            className="inline-flex lg:hidden h-10 w-10 cursor-pointer items-center justify-center rounded-lg border border-[#E5EAF1] bg-white text-[#121A2C] transition-colors hover:border-[#62C9C1] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#137C75]"
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Menu className="h-5 w-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#E5EAF1] bg-white/98 backdrop-blur-xl px-5 py-4">
          <nav aria-label="Mobile navigation" className="flex flex-col gap-1">
            {eventData.navLinks.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToHref(item.href);
                  }}
                  className={`flex items-center justify-between rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-[#DCEBFA]/45 text-[#121A2C]'
                      : 'text-[#64748B] hover:bg-[#F8FAFD] hover:text-[#121A2C]'
                  }`}
                >
                  <span>{item.label}</span>
                  {isActive && (
                    <span className="text-xs font-semibold text-[#137C75]">
                      Current
                    </span>
                  )}
                </a>
              );
            })}
          </nav>
        </div>
      )}

      {/* Subtle Scroll Progress Line */}
      <div
        aria-hidden="true"
        className={`absolute bottom-0 left-0 h-[2px] w-full transition-opacity duration-300 ${
          scrolled ? 'opacity-100 bg-[#E5EAF1]/60' : 'opacity-0'
        }`}
      >
        <div
          className="h-full bg-gradient-to-r from-[#62C9C1] via-[#A895E8] to-[#E9B8D7] transition-[width] duration-75 ease-out"
          style={{width: `${scrollProgress}%`}}
        />
      </div>
    </header>
  );
}
