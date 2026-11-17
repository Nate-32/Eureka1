import {ArrowUpRight} from 'lucide-react';
import {eventData} from '../config/eventData';

interface FinalCtaProps {
  onOpenProposal: () => void;
}

export function FinalCta({onOpenProposal}: FinalCtaProps) {
  const {finalCta} = eventData;

  return (
    <section
      id="proposal"
      className="relative border-y border-[#E4E4E7] bg-[#FAFAFA] py-20 sm:py-28"
    >
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="mb-3 text-xs font-semibold tracking-[0.16em] uppercase text-[#0D9488]">
            {eventData.tagline}
          </p>
          <h2 className="font-display mb-5 text-3xl sm:text-5xl font-bold leading-[1.1] tracking-[-0.025em] text-[#121A2C] text-balance">
            {finalCta.heading}
          </h2>
          <p className="mx-auto mb-9 max-w-xl text-base sm:text-lg leading-relaxed text-[#52525B]">
            {finalCta.description}
          </p>

          {eventData.externalProposalFormUrl ? (
            <a
              href={eventData.externalProposalFormUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-md bg-[#121A2C] px-7 py-3.5 text-sm sm:text-base font-semibold text-white transition-colors duration-150 hover:bg-[#1E293B] whitespace-nowrap"
            >
              <span>{finalCta.ctaLabel}</span>
              <ArrowUpRight className="h-4 w-4 text-[#62C9C1]" aria-hidden="true" />
            </a>
          ) : (
            <button
              type="button"
              onClick={onOpenProposal}
              className="inline-flex cursor-pointer items-center gap-2 rounded-md bg-[#121A2C] px-7 py-3.5 text-sm sm:text-base font-semibold text-white transition-colors duration-150 hover:bg-[#1E293B] whitespace-nowrap"
            >
              <span>{finalCta.ctaLabel}</span>
              <ArrowUpRight className="h-4 w-4 text-[#62C9C1]" aria-hidden="true" />
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
