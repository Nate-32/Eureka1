import {ArrowUpRight, Menu, Moon, Sun, X} from 'lucide-react';
import {useEffect, useState} from 'react';
import type {ThemeMode} from '../App';
import {eventData} from '../config/eventData';

interface NavbarProps {
  onOpenProposal: () => void;
  theme: ThemeMode;
  onToggleTheme: () => void;
}

export function Navbar({onOpenProposal, theme, onToggleTheme}: NavbarProps) {
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

  const isDark = theme === 'dark';

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        scrolled || mobileMenuOpen
          ? 'bg-white/95 dark:bg-[#090B12]/92 backdrop-blur-md border-b border-[#E4E4E7] dark:border-white/10'
          : 'bg-white/60 dark:bg-[#090B12]/60 backdrop-blur-sm border-b border-transparent'
      }`}
    >
      <div className="mx-auto flex max-w-[1200px] items-center justify-between gap-6 px-5 py-3.5 sm:px-8">
        {/* Zone 1: Brand Wordmark */}
        <a
          href="#hero"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({top: 0, behavior: 'smooth'});
            setMobileMenuOpen(false);
          }}
          className="font-display text-lg font-extrabold tracking-[-0.03em] text-[#121A2C] dark:text-white whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0D9488]"
        >
          {eventData.brandName}
          <span className="text-[#0D9488] dark:text-[#62C9C1]">.</span>
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
                    ? 'text-[#121A2C] dark:text-white'
                    : 'text-[#52525B] dark:text-[#A1A1AA] hover:text-[#121A2C] dark:hover:text-white'
                }`}
              >
                {item.label}
                <span
                  aria-hidden="true"
                  className={`absolute left-0 -bottom-0.5 h-[1.5px] w-full bg-[#121A2C] dark:bg-[#62C9C1] transition-transform duration-150 origin-left ${
                    isActive ? 'scale-x-100 opacity-100' : 'scale-x-0 opacity-0'
                  }`}
                />
              </a>
            );
          })}
        </nav>

        {/* Zone 3: Theme Toggle + Primary CTA + Mobile Trigger */}
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            type="button"
            onClick={onToggleTheme}
            aria-label={
              isDark ? 'Switch to light theme' : 'Switch to dark theme'
            }
            title={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
            className="inline-flex h-9 cursor-pointer items-center gap-1.5 rounded-md border border-[#E4E4E7] dark:border-white/15 bg-white/85 dark:bg-white/5 px-3 text-xs font-medium text-[#121A2C] dark:text-[#F4F4F5] transition-colors duration-150 hover:border-[#121A2C] dark:hover:border-[#62C9C1] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0D9488]"
          >
            {isDark ? (
              <>
                <Sun className="h-3.5 w-3.5 text-[#62C9C1]" aria-hidden="true" />
                <span className="hidden sm:inline">Light</span>
              </>
            ) : (
              <>
                <Moon className="h-3.5 w-3.5 text-[#121A2C]" aria-hidden="true" />
                <span className="hidden sm:inline">Dark</span>
              </>
            )}
          </button>

          {eventData.externalProposalFormUrl ? (
            <a
              href={eventData.externalProposalFormUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-9 items-center gap-1.5 rounded-md bg-[#121A2C] dark:bg-white px-4 text-xs sm:text-sm font-semibold text-white dark:text-[#090B12] transition-colors duration-150 hover:bg-[#1E293B] dark:hover:bg-[#E4E4E7] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0D9488]"
            >
              <span>{eventData.submitProposalLabel}</span>
              <ArrowUpRight
                className="h-3.5 w-3.5 text-[#62C9C1] dark:text-[#0D9488]"
                aria-hidden="true"
              />
            </a>
          ) : (
            <button
              type="button"
              onClick={onOpenProposal}
              className="inline-flex h-9 cursor-pointer items-center gap-1.5 rounded-md bg-[#121A2C] dark:bg-white px-4 text-xs sm:text-sm font-semibold text-white dark:text-[#090B12] transition-colors duration-150 hover:bg-[#1E293B] dark:hover:bg-[#E4E4E7] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0D9488]"
            >
              <span>{eventData.submitProposalLabel}</span>
              <ArrowUpRight
                className="h-3.5 w-3.5 text-[#62C9C1] dark:text-[#0D9488]"
                aria-hidden="true"
              />
            </button>
          )}

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-label={
              mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'
            }
            className="inline-flex lg:hidden h-9 w-9 cursor-pointer items-center justify-center rounded-md border border-[#E4E4E7] dark:border-white/15 bg-white dark:bg-white/5 text-[#121A2C] dark:text-white transition-colors hover:border-[#121A2C] dark:hover:border-[#62C9C1] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0D9488]"
          >
            {mobileMenuOpen ? (
              <X className="h-4 w-4" aria-hidden="true" />
            ) : (
              <Menu className="h-4 w-4" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#E4E4E7] dark:border-white/10 bg-white dark:bg-[#0D111D] px-5 py-4">
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
                      ? 'bg-[#F4F4F5] dark:bg-white/10 text-[#121A2C] dark:text-white'
                      : 'text-[#52525B] dark:text-[#A1A1AA] hover:bg-[#FAFAFA] dark:hover:bg-white/5 hover:text-[#121A2C] dark:hover:text-white'
                  }`}
                >
                  <span>{item.label}</span>
                  {isActive && (
                    <span className="text-xs font-medium text-[#0D9488] dark:text-[#62C9C1]">
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
