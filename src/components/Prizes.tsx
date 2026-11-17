import {ArrowUpRight, Check} from 'lucide-react';
import {eventData} from '../config/eventData';

interface PrizesProps {
  onOpenProposal: () => void;
}

export function Prizes({onOpenProposal}: PrizesProps) {
  const {prizes} = eventData;

  return (
    <section id="prizes" className="relative bg-[#F8FAFD] py-20 sm:py-28">
      <div className="mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-10">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <p className="mb-3 text-xs font-semibold tracking-[0.16em] uppercase text-[#6D56C1]">
            {prizes.eyebrow}
          </p>
          <h2 className="font-display mb-4 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#121A2C] text-balance">
            {prizes.heading}
          </h2>
          <p className="text-base sm:text-lg text-[#64748B]">
            {prizes.subtitle}
          </p>
          <p className="mt-4 text-xs sm:text-sm text-[#64748B]/90">
            {prizes.sampleNotice}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:items-stretch">
          {prizes.tiers.map((tier) => {
            const isFeatured = Boolean(tier.featured);

            return (
              <article
                key={tier.id}
                className={`relative flex flex-col justify-between rounded-2xl p-8 transition-all duration-200 ${
                  isFeatured
                    ? 'bg-[#121A2C] text-white border border-[#1E293B] shadow-[0_20px_56px_rgba(18,26,44,0.16)] lg:-my-3'
                    : 'aurora-pane aurora-pane-interactive text-[#121A2C]'
                }`}
              >
                {isFeatured && (
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-0 top-0 h-1 rounded-t-2xl bg-gradient-to-r from-[#62C9C1] via-[#A895E8] to-[#E9B8D7]"
                  />
                )}

                <div className="relative z-20">
                  <p
                    className={`mb-3 text-xs font-semibold tracking-[0.14em] uppercase ${
                      isFeatured ? 'text-[#62C9C1]' : 'text-[#137C75]'
                    }`}
                  >
                    {tier.rankLabel}
                  </p>
                  <h3
                    className={`font-display mb-2 text-2xl sm:text-3xl font-bold ${
                      isFeatured ? 'text-white' : 'text-[#121A2C]'
                    }`}
                  >
                    {tier.title}
                  </h3>
                  <div
                    className={`font-display font-mono-tabular mb-3 text-2xl sm:text-3xl font-extrabold ${
                      isFeatured
                        ? 'bg-gradient-to-r from-white via-[#DCEBFA] to-[#62C9C1] bg-clip-text text-transparent'
                        : 'text-[#121A2C]'
                    }`}
                  >
                    {tier.amountPlaceholder}
                  </div>
                  <p
                    className={`mb-6 text-sm leading-relaxed ${
                      isFeatured ? 'text-[#CBD5E1]' : 'text-[#64748B]'
                    }`}
                  >
                    {tier.summary}
                  </p>

                  <div
                    className={`mb-8 border-t pt-5 ${
                      isFeatured ? 'border-white/12' : 'border-[#E5EAF1]'
                    }`}
                  >
                    <ul
                      className={`space-y-3 text-sm ${
                        isFeatured ? 'text-[#E2E8F0]' : 'text-[#334155]'
                      }`}
                    >
                      {tier.perks.map((perk) => (
                        <li key={perk} className="flex items-start gap-2.5">
                          <Check
                            className={`mt-0.5 h-4 w-4 shrink-0 ${
                              isFeatured ? 'text-[#62C9C1]' : 'text-[#137C75]'
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
                    className={`relative z-20 inline-flex w-full items-center justify-center gap-2 rounded-lg px-6 py-3 text-sm font-semibold transition-all duration-200 whitespace-nowrap ${
                      isFeatured
                        ? 'bg-[#62C9C1] text-[#121A2C] hover:bg-[#7AD6CE] hover:-translate-y-0.5'
                        : 'border border-[#E5EAF1] bg-[#F8FAFD] text-[#121A2C] hover:border-[#62C9C1] hover:bg-white'
                    }`}
                  >
                    <span>{eventData.submitProposalLabel}</span>
                    <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </a>
                ) : (
                  <button
                    type="button"
                    onClick={onOpenProposal}
                    className={`relative z-20 inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg px-6 py-3 text-sm font-semibold transition-all duration-200 whitespace-nowrap ${
                      isFeatured
                        ? 'bg-[#62C9C1] text-[#121A2C] hover:bg-[#7AD6CE] hover:-translate-y-0.5'
                        : 'border border-[#E5EAF1] bg-[#F8FAFD] text-[#121A2C] hover:border-[#62C9C1] hover:bg-white'
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
