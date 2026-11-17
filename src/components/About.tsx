import {eventData} from '../config/eventData';

export function About() {
  const {about} = eventData;

  return (
    <section id="about" className="relative bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Editorial Narrative */}
          <div className="lg:col-span-6">
            <p className="mb-3 text-xs font-semibold tracking-[0.14em] uppercase text-[#0D9488]">
              {about.eyebrow}
            </p>
            <h2 className="font-display mb-6 text-3xl sm:text-4xl lg:text-[2.75rem] font-bold leading-[1.12] tracking-[-0.02em] text-[#121A2C] text-balance">
              {about.heading}
            </h2>
            <p className="mb-5 text-base sm:text-lg leading-relaxed text-[#3F3F46]">
              {about.leadParagraph}
            </p>
            <p className="text-sm sm:text-base leading-relaxed text-[#71717A]">
              {about.secondaryParagraph}
            </p>
          </div>

          {/* Unboxed Hairline-Divided Pillars */}
          <div className="lg:col-span-6 border-t border-[#E4E4E7]">
            {about.highlights.map((item, idx) => (
              <div
                key={item.id}
                className="grid grid-cols-12 gap-4 border-b border-[#E4E4E7] py-6 sm:py-7"
              >
                <span className="col-span-2 sm:col-span-1 font-mono-tabular text-xs font-medium text-[#71717A] pt-1">
                  0{idx + 1}
                </span>
                <div className="col-span-10 sm:col-span-11">
                  <h3 className="font-display mb-1.5 text-lg font-semibold tracking-[-0.01em] text-[#121A2C]">
                    {item.title}
                  </h3>
                  <p className="text-sm sm:text-base leading-relaxed text-[#52525B]">
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
