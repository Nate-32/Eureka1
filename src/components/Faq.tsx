import {ChevronDown} from 'lucide-react';
import {useState} from 'react';
import {eventData} from '../config/eventData';

export function Faq() {
  const {faq} = eventData;
  const [openId, setOpenId] = useState<string | null>(faq.items[0]?.id ?? null);

  const toggleItem = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="faq" className="relative bg-[#F8FAFD] py-20 sm:py-28">
      <div className="mx-auto max-w-4xl px-5 sm:px-8">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <p className="mb-3 text-xs font-semibold tracking-[0.16em] uppercase text-[#137C75]">
            {faq.eyebrow}
          </p>
          <h2 className="font-display mb-4 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#121A2C] text-balance">
            {faq.heading}
          </h2>
          <p className="text-base sm:text-lg text-[#64748B]">{faq.subtitle}</p>
          <p className="mt-4 text-xs sm:text-sm text-[#64748B]/90">
            {faq.draftNotice}
          </p>
        </div>

        <div className="flex flex-col gap-3.5">
          {faq.items.map((item) => {
            const isOpen = openId === item.id;
            const panelId = `faq-panel-${item.id}`;
            const triggerId = `faq-trigger-${item.id}`;

            return (
              <div
                key={item.id}
                className={`rounded-2xl border bg-white transition-colors duration-200 ${
                  isOpen
                    ? 'border-[#62C9C1] shadow-[0_6px_24px_rgba(18,26,44,0.04)]'
                    : 'border-[#E5EAF1] hover:border-[#CBD5E1]'
                }`}
              >
                <h3>
                  <button
                    id={triggerId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => toggleItem(item.id)}
                    className="flex w-full cursor-pointer items-center justify-between gap-4 px-6 py-5 text-left text-base sm:text-lg font-semibold text-[#121A2C] transition-colors hover:text-[#137C75] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#137C75]"
                  >
                    <span>{item.question}</span>
                    <ChevronDown
                      className={`h-5 w-5 shrink-0 text-[#64748B] transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-[#137C75]' : ''
                      }`}
                      aria-hidden="true"
                    />
                  </button>
                </h3>

                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={triggerId}
                  className={`grid transition-[grid-template-rows,opacity] duration-250 ease-out ${
                    isOpen
                      ? 'grid-rows-[1fr] opacity-100'
                      : 'grid-rows-[0fr] opacity-0'
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="px-6 pb-5 text-sm sm:text-base leading-relaxed text-[#64748B]">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
