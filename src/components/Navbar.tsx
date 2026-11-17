import {ArrowUpRight, Menu, X} from 'lucide-react';
import {useEffect, useState} from 'react';
import {eventData} from '../config/eventData';

interface NavbarProps {
  onOpenProposal: () => void;
}

export function Navbar({onOpenProposal}: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24);

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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        scrolled || mobileMenuOpen
          ? 'bg-white/95 backdrop-blur-md border-b border-[#E4E4E7]'
          : 'bg-white/55 backdrop-blur-sm border-b border-transparent'
      }`}
    >
      <div className="mx-auto flex max-w-[1200px] items-center justify-between gap-8 px-5 py-3.5 sm:px-8">
        {/* Zone 1: Brand Wordmark */}
        <a
          href="#hero"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({top: 0, behavior: 'smooth'});
            setMobileMenuOpen(false);
          }}
          className="font-display text-lg font-extrabold tracking-[-0.03em] text-[#121A2C] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0D9488]"
        >
          {eventData.brandName}
          <span className="text-[#0D9488]">.</span>
        </a>

        {/* Zone 2: Navigation Links */}
        <nav
          aria-label="Primary navigation"
          className="hidden lg:flex items-center gap-8"
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
                className={`relative py-1 text-sm font-medium whitespace-nowrap shrink-0 transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0D9488] ${
                  isActive
                    ? 'text-[#121A2C]'
                    : 'text-[#52525B] hover:text-[#121A2C]'
                }`}
              >
                {item.label}
                <span
                  aria-hidden="true"
                  className={`absolute left-0 -bottom-0.5 h-[1.5px] w-full bg-[#121A2C] transition-transform duration-150 origin-left ${
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
              className="inline-flex items-center gap-1.5 rounded-md bg-[#121A2C] px-4 py-2 text-xs sm:text-sm font-semibold text-white transition-colors duration-150 hover:bg-[#1E293B] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0D9488]"
            >
              <span>{eventData.submitProposalLabel}</span>
              <ArrowUpRight className="h-3.5 w-3.5 text-[#62C9C1]" aria-hidden="true" />
            </a>
          ) : (
            <button
              type="button"
              onClick={onOpenProposal}
              className="inline-flex cursor-pointer items-center gap-1.5 rounded-md bg-[#121A2C] px-4 py-2 text-xs sm:text-sm font-semibold text-white transition-colors duration-150 hover:bg-[#1E293B] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0D9488]"
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
            className="inline-flex lg:hidden h-10 w-10 cursor-pointer items-center justify-center rounded-md border border-[#E4E4E7] bg-white text-[#121A2C] transition-colors hover:border-[#121A2C] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0D9488]"
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
        <div className="lg:hidden border-t border-[#E4E4E7] bg-white px-5 py-4">
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
                  className={`flex items-center justify-between rounded-md px-3.5 py-2.5 text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-[#F4F4F5] text-[#121A2C]'
                      : 'text-[#52525B] hover:bg-[#FAFAFA] hover:text-[#121A2C]'
                  }`}
                >
                  <span>{item.label}</span>
                  {isActive && (
                    <span className="text-xs font-medium text-[#0D9488]">
                      Active
                    </span>
                  )}
                </a>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
}
