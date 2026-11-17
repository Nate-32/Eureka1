import {Github, Globe, Linkedin} from 'lucide-react';
import {eventData} from '../config/eventData';

interface FooterProps {
  onOpenProposal: () => void;
}

export function Footer({onOpenProposal}: FooterProps) {
  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({behavior: 'smooth'});
    }
  };

  return (
    <footer className="border-t border-white/10 bg-[#121A2C] pt-14 pb-10 text-white">
      <div className="mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-10">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
          {/* Brand Column */}
          <div className="lg:col-span-5">
            <button
              type="button"
              onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}
              className="font-display mb-4 inline-flex cursor-pointer items-center text-xl font-extrabold tracking-tight text-white"
            >
              <span>
                {eventData.brandName}
                <span className="text-[#62C9C1]">.</span>
              </span>
            </button>
            <p className="mb-6 max-w-sm text-sm leading-relaxed text-[#94A3B8]">
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
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/12 bg-[#192338] text-[#CBD5E1] transition-colors hover:border-[#62C9C1] hover:text-[#62C9C1]"
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
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/12 bg-[#192338] text-[#CBD5E1] transition-colors hover:border-[#62C9C1] hover:text-[#62C9C1]"
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
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/12 bg-[#192338] text-[#CBD5E1] transition-colors hover:border-[#62C9C1] hover:text-[#62C9C1]"
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
            <ul className="space-y-2.5 text-sm text-[#94A3B8]">
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
            <ul className="space-y-2.5 text-sm text-[#94A3B8]">
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

        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-6 text-xs text-[#64748B] sm:flex-row sm:items-center">
          <p className="text-[#94A3B8]">
            © {new Date().getFullYear()} {eventData.footer.copyright}
          </p>
          <p className="text-[#94A3B8]">Theme: {eventData.tagline}</p>
        </div>
      </div>
    </footer>
  );
}
