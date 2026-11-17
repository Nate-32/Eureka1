import {ArrowUpRight, Check} from 'lucide-react';
import {eventData} from '../config/eventData';

interface PrizesProps {
  onOpenProposal: () => void;
}

export function Prizes({onOpenProposal}: PrizesProps) {
  const {prizes} = eventData;

  return (
    <section
      id="prizes"
      className="relative bg-white dark:bg-[#090B12] py-20 transition-colors duration-300 sm:py-28"
    >
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
        <div className="mb-14 grid grid-cols-1 items-end gap-6 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="mb-3 text-xs font-semibold tracking-[0.14em] uppercase text-[#0D9488] dark:text-[#62C9C1]">
              {prizes.eyebrow}
            </p>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-[2.75rem] font-bold leading-[1.12] tracking-[-0.02em] text-[#121A2C] dark:text-white text-balance">
              {prizes.heading}
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p className="text-base leading-relaxed text-[#52525B] dark:text-[#A1A1AA]">
              {prizes.subtitle}
            </p>
            <p className="mt-2.5 text-xs text-[#71717A] dark:text-[#71717A]">
              {prizes.sampleNotice}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:items-stretch">
          {prizes.tiers.map((tier) => {
            const isFeatured = Boolean(tier.featured);

            return (
              <article
                key={tier.id}
                className={`flex flex-col justify-between rounded-xl border p-8 transition-colors duration-150 ${
                  isFeatured
                    ? 'border-[#121A2C] dark:border-[#62C9C1]/45 bg-[#121A2C] dark:bg-[#161F33] text-white'
                    : 'border-[#E4E4E7] dark:border-white/10 bg-[#FAFAFA] dark:bg-[#111726] text-[#121A2C] dark:text-white hover:border-[#D4D4D8] dark:hover:border-white/20'
                }`}
              >
                <div>
                  <p
                    className={`mb-3 text-xs font-semibold tracking-[0.12em] uppercase ${
                      isFeatured
                        ? 'text-[#62C9C1]'
                        : 'text-[#0D9488] dark:text-[#62C9C1]'
                    }`}
                  >
                    {tier.rankLabel}
                  </p>
                  <h3
                    className={`font-display mb-2 text-2xl font-bold tracking-[-0.015em] ${
                      isFeatured
                        ? 'text-white'
                        : 'text-[#121A2C] dark:text-white'
                    }`}
                  >
                    {tier.title}
                  </h3>
                  <div
                    className={`font-display font-mono-tabular mb-4 text-2xl font-bold ${
                      isFeatured
                        ? 'text-white'
                        : 'text-[#121A2C] dark:text-white'
                    }`}
                  >
                    {tier.amountPlaceholder}
                  </div>
                  <p
                    className={`mb-6 text-sm leading-relaxed ${
                      isFeatured
                        ? 'text-[#D4D4D8]'
                        : 'text-[#52525B] dark:text-[#A1A1AA]'
                    }`}
                  >
                    {tier.summary}
                  </p>

                  <div
                    className={`mb-8 border-t pt-5 ${
                      isFeatured
                        ? 'border-white/15'
                        : 'border-[#E4E4E7] dark:border-white/10'
                    }`}
                  >
                    <ul
                      className={`space-y-3 text-sm ${
                        isFeatured
                          ? 'text-[#E4E4E7]'
                          : 'text-[#3F3F46] dark:text-[#D4D4D8]'
                      }`}
                    >
                      {tier.perks.map((perk) => (
                        <li key={perk} className="flex items-start gap-2.5">
                          <Check
                            className={`mt-0.5 h-4 w-4 shrink-0 ${
                              isFeatured
                                ? 'text-[#62C9C1]'
                                : 'text-[#0D9488] dark:text-[#62C9C1]'
                            }`}
                            aria-hidden="true"
                          />
                          <span>{perk}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {eventData.externalProposalFormUrl ? (
                  <a
                    href={eventData.externalProposalFormUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex w-full items-center justify-center gap-2 rounded-md px-5 py-3 text-sm font-semibold transition-colors duration-150 whitespace-nowrap ${
                      isFeatured
                        ? 'bg-white text-[#121A2C] hover:bg-[#F4F4F5]'
                        : 'border border-[#E4E4E7] dark:border-white/15 bg-white dark:bg-white/5 text-[#121A2C] dark:text-white hover:border-[#121A2C] dark:hover:border-[#62C9C1]'
                    }`}
                  >
                    <span>{eventData.submitProposalLabel}</span>
                    <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </a>
                ) : (
                  <button
                    type="button"
                    onClick={onOpenProposal}
                    className={`inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-md px-5 py-3 text-sm font-semibold transition-colors duration-150 whitespace-nowrap ${
                      isFeatured
                        ? 'bg-white text-[#121A2C] hover:bg-[#F4F4F5]'
                        : 'border border-[#E4E4E7] dark:border-white/15 bg-white dark:bg-white/5 text-[#121A2C] dark:text-white hover:border-[#121A2C] dark:hover:border-[#62C9C1]'
                    }`}
                  >
                    <span>{eventData.submitProposalLabel}</span>
                    <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </button>
                )}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
