import {Github, Globe, Linkedin} from 'lucide-react';
import {assetUrl, eventData} from '../config/eventData';

interface FooterProps {
  onOpenProposal: () => void;
}

export function Footer({onOpenProposal}: FooterProps) {
  const bgBlackPng = assetUrl(eventData.assets.heroBackgroundDark);
  const bgBlackWebp = assetUrl(eventData.assets.heroBackgroundDarkWebp);

  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({behavior: 'smooth'});
    }
  };

  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-[#0A0E19] pt-16 pb-10 text-white">
      {/* Subtle Dark Celestial Horizon Backdrop */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      >
        <picture>
          <source srcSet={bgBlackWebp} type="image/webp" />
          <img
            src={bgBlackPng}
            alt=""
            width={1672}
            height={941}
            loading="lazy"
            decoding="async"
            referrerPolicy="no-referrer"
            className="h-full w-full object-cover object-right opacity-45"
          />
        </picture>
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A0E19] via-[#0A0E19]/85 to-[#0A0E19]/35" />
      </div>

      <div className="relative z-10 mx-auto max-w-[1200px] px-5 sm:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
          {/* Brand Column */}
          <div className="lg:col-span-5">
            <button
              type="button"
              onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}
              className="font-display mb-4 inline-flex cursor-pointer items-center text-xl font-extrabold tracking-[-0.03em] text-white"
            >
              <span>
                {eventData.brandName}
                <span className="text-[#62C9C1]">.</span>
              </span>
            </button>
            <p className="mb-6 max-w-sm text-sm leading-relaxed text-[#A1A1AA]">
              {eventData.footer.description}
            </p>
            <div className="flex items-center gap-3">
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo('#contact');
                }}
                aria-label="Connect with EUREKA Website Contact"
                className="flex h-10 w-10 items-center justify-center rounded-md border border-white/15 bg-white/5 text-[#D4D4D8] transition-colors hover:border-[#62C9C1] hover:text-white"
              >
                <Globe className="h-4 w-4" aria-hidden="true" />
              </a>
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo('#contact');
                }}
                aria-label="EUREKA GitHub Inquiries"
                className="flex h-10 w-10 items-center justify-center rounded-md border border-white/15 bg-white/5 text-[#D4D4D8] transition-colors hover:border-[#62C9C1] hover:text-white"
              >
                <Github className="h-4 w-4" aria-hidden="true" />
              </a>
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo('#contact');
                }}
                aria-label="EUREKA LinkedIn Inquiries"
                className="flex h-10 w-10 items-center justify-center rounded-md border border-white/15 bg-white/5 text-[#D4D4D8] transition-colors hover:border-[#62C9C1] hover:text-white"
              >
                <Linkedin className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Navigation Column */}
          <div className="lg:col-span-3">
            <h4 className="font-display mb-4 text-xs font-semibold tracking-[0.16em] uppercase text-[#62C9C1]">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-sm text-[#A1A1AA]">
              {eventData.navLinks.map((item) => (
                <li key={item.id}>
                  <a
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollTo(item.href);
                    }}
                    className="transition-colors hover:text-white"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Participation Column */}
          <div className="lg:col-span-4">
            <h4 className="font-display mb-4 text-xs font-semibold tracking-[0.16em] uppercase text-[#62C9C1]">
              Participation
            </h4>
            <ul className="space-y-2.5 text-sm text-[#A1A1AA]">
              <li>
                {eventData.externalProposalFormUrl ? (
                  <a
                    href={eventData.externalProposalFormUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-colors hover:text-white"
                  >
                    Submit Proposal
                  </a>
                ) : (
                  <button
                    type="button"
                    onClick={onOpenProposal}
                    className="cursor-pointer transition-colors hover:text-white"
                  >
                    Submit Proposal
                  </button>
                )}
              </li>
              <li>
                <a
                  href="#faq"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollTo('#faq');
                  }}
                  className="transition-colors hover:text-white"
                >
                  Participant Guidelines (Draft)
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollTo('#contact');
                  }}
                  className="transition-colors hover:text-white"
                >
                  Organizing Helpdesk
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-6 text-xs text-[#A1A1AA] sm:flex-row sm:items-center">
          <p>
            © {new Date().getFullYear()} {eventData.footer.copyright}
          </p>
          <p>Theme: {eventData.tagline}</p>
        </div>
      </div>
    </footer>
  );
}
