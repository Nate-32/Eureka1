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
    <section
      id="faq"
      className="relative bg-white dark:bg-[#090B12] py-20 transition-colors duration-300 sm:py-28"
    >
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Editorial Intro Column */}
          <div className="lg:col-span-5">
            <p className="mb-3 text-xs font-semibold tracking-[0.14em] uppercase text-[#0D9488] dark:text-[#62C9C1]">
              {faq.eyebrow}
            </p>
            <h2 className="font-display mb-4 text-3xl sm:text-4xl font-bold leading-[1.15] tracking-[-0.02em] text-[#121A2C] dark:text-white text-balance">
              {faq.heading}
            </h2>
            <p className="text-base leading-relaxed text-[#52525B] dark:text-[#A1A1AA]">
              {faq.subtitle}
            </p>
            <p className="mt-4 text-xs leading-relaxed text-[#71717A] dark:text-[#71717A]">
              {faq.draftNotice}
            </p>
          </div>

          {/* Hairline-Divided Accordion */}
          <div className="lg:col-span-7 border-t border-[#E4E4E7] dark:border-white/10">
            {faq.items.map((item) => {
              const isOpen = openId === item.id;
              const panelId = `faq-panel-${item.id}`;
              const triggerId = `faq-trigger-${item.id}`;

              return (
                <div
                  key={item.id}
                  className="border-b border-[#E4E4E7] dark:border-white/10"
                >
                  <h3>
                    <button
                      id={triggerId}
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => toggleItem(item.id)}
                      className="flex w-full cursor-pointer items-center justify-between gap-4 py-6 text-left text-base sm:text-lg font-semibold text-[#121A2C] dark:text-white transition-colors hover:text-[#0D9488] dark:hover:text-[#62C9C1] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0D9488]"
                    >
                      <span>{item.question}</span>
                      <ChevronDown
                        className={`h-5 w-5 shrink-0 text-[#71717A] dark:text-[#A1A1AA] transition-transform duration-200 ${
                          isOpen
                            ? 'rotate-180 text-[#121A2C] dark:text-[#62C9C1]'
                            : ''
                        }`}
                        aria-hidden="true"
                      />
                    </button>
                  </h3>

                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={triggerId}
                    className={`grid transition-[grid-template-rows,opacity] duration-200 ease-out ${
                      isOpen
                        ? 'grid-rows-[1fr] opacity-100'
                        : 'grid-rows-[0fr] opacity-0'
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="pb-6 pr-8 text-sm sm:text-base leading-relaxed text-[#52525B] dark:text-[#A1A1AA]">
                        {item.answer}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
