import {ArrowUpRight} from 'lucide-react';
import {eventData} from '../config/eventData';

interface FinalCtaProps {
  onOpenProposal: () => void;
}

export function FinalCta({onOpenProposal}: FinalCtaProps) {
  const {finalCta} = eventData;

  return (
    <section id="proposal" className="relative border-t border-[#E5EAF1] bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-[1100px] px-5 sm:px-8">
        <div className="relative rounded-2xl border border-[#DCEBFA] bg-gradient-to-br from-[#F8FAFD] via-white to-[#DCEBFA]/45 px-7 py-14 text-center shadow-[0_12px_40px_rgba(18,26,44,0.04)] sm:px-14 sm:py-18">
          {/* Subtle Aurora Accent Glow */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl"
          >
            <div className="absolute -top-24 -left-16 h-56 w-56 rounded-full bg-[#62C9C1]/12 blur-3xl" />
            <div className="absolute -bottom-24 -right-16 h-56 w-56 rounded-full bg-[#A895E8]/14 blur-3xl" />
          </div>

          <div className="relative z-20">
            <p className="mb-3 text-xs font-semibold tracking-[0.18em] uppercase text-[#137C75]">
              {eventData.tagline}
            </p>
            <h2 className="font-display mx-auto mb-5 max-w-2xl text-3xl sm:text-5xl font-extrabold tracking-tight text-[#121A2C] text-balance">
              {finalCta.heading}
            </h2>
            <p className="mx-auto mb-9 max-w-xl text-base sm:text-lg leading-relaxed text-[#64748B]">
              {finalCta.description}
            </p>

            {eventData.externalProposalFormUrl ? (
              <a
                href={eventData.externalProposalFormUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 rounded-lg bg-[#121A2C] px-8 py-4 text-base font-semibold text-white shadow-[0_10px_28px_rgba(18,26,44,0.16)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#1B2742] whitespace-nowrap"
              >
                <span>{finalCta.ctaLabel}</span>
                <ArrowUpRight className="h-5 w-5 text-[#62C9C1]" aria-hidden="true" />
              </a>
            ) : (
              <button
                type="button"
                onClick={onOpenProposal}
                className="inline-flex cursor-pointer items-center gap-2.5 rounded-lg bg-[#121A2C] px-8 py-4 text-base font-semibold text-white shadow-[0_10px_28px_rgba(18,26,44,0.16)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#1B2742] whitespace-nowrap"
              >
                <span>{finalCta.ctaLabel}</span>
                <ArrowUpRight className="h-5 w-5 text-[#62C9C1]" aria-hidden="true" />
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
