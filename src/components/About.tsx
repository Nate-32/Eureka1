import {eventData} from '../config/eventData';

export function About() {
  const {about} = eventData;

  return (
    <section
      id="about"
      className="relative bg-white dark:bg-[#090B12] py-20 transition-colors duration-300 sm:py-28"
    >
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Editorial Narrative */}
          <div className="lg:col-span-6">
            <p className="mb-3 text-xs font-semibold tracking-[0.14em] uppercase text-[#0D9488] dark:text-[#62C9C1]">
              {about.eyebrow}
            </p>
            <h2 className="font-display mb-6 text-3xl sm:text-4xl lg:text-[2.75rem] font-bold leading-[1.12] tracking-[-0.02em] text-[#121A2C] dark:text-white text-balance">
              {about.heading}
            </h2>
            <p className="mb-5 text-base sm:text-lg leading-relaxed text-[#3F3F46] dark:text-[#D4D4D8]">
              {about.leadParagraph}
            </p>
            <p className="text-sm sm:text-base leading-relaxed text-[#71717A] dark:text-[#A1A1AA]">
              {about.secondaryParagraph}
            </p>
          </div>

          {/* Unboxed Hairline-Divided Pillars */}
          <div className="lg:col-span-6 border-t border-[#E4E4E7] dark:border-white/10">
            {about.highlights.map((item, idx) => (
              <div
                key={item.id}
                className="grid grid-cols-12 gap-4 border-b border-[#E4E4E7] dark:border-white/10 py-6 sm:py-7"
              >
                <span className="col-span-2 sm:col-span-1 font-mono-tabular text-xs font-medium text-[#71717A] dark:text-[#62C9C1] pt-1">
                  0{idx + 1}
                </span>
                <div className="col-span-10 sm:col-span-11">
                  <h3 className="font-display mb-1.5 text-lg font-semibold tracking-[-0.01em] text-[#121A2C] dark:text-white">
                    {item.title}
                  </h3>
                  <p className="text-sm sm:text-base leading-relaxed text-[#52525B] dark:text-[#A1A1AA]">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
