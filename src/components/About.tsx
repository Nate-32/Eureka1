import {Compass, Layers, Sparkles} from 'lucide-react';
import {eventData, type AboutHighlight} from '../config/eventData';

function HighlightIcon({icon}: {icon: AboutHighlight['icon']}) {
  switch (icon) {
    case 'sparkles':
      return <Sparkles className="h-5 w-5 text-[#137C75]" aria-hidden="true" />;
    case 'layers':
      return <Layers className="h-5 w-5 text-[#6D56C1]" aria-hidden="true" />;
    case 'compass':
      return <Compass className="h-5 w-5 text-[#121A2C]" aria-hidden="true" />;
  }
}

export function About() {
  const {about} = eventData;

  return (
    <section id="about" className="relative bg-[#F8FAFD] py-20 sm:py-28">
      <div className="mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-10">
        <div className="aurora-pane relative rounded-2xl p-7 sm:p-11 lg:p-14">
          <div className="relative z-20 grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-14">
            {/* Editorial Narrative */}
            <div className="lg:col-span-7">
              <p className="mb-3 text-xs font-semibold tracking-[0.16em] uppercase text-[#137C75]">
                {about.eyebrow}
              </p>
              <h2 className="font-display mb-6 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#121A2C] text-balance">
                {about.heading}
              </h2>
              <p className="mb-5 text-base sm:text-lg leading-relaxed text-[#334155]">
                {about.leadParagraph}
              </p>
              <p className="text-sm sm:text-base leading-relaxed text-[#64748B]">
                {about.secondaryParagraph}
              </p>
            </div>

            {/* Structured Highlight List */}
            <div className="lg:col-span-5 flex flex-col divide-y divide-[#E5EAF1] rounded-xl border border-[#E5EAF1] bg-[#F8FAFD]">
              {about.highlights.map((item) => (
                <div key={item.id} className="flex items-start gap-4 p-5 sm:p-6">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-[#E5EAF1] bg-white">
                    <HighlightIcon icon={item.icon} />
                  </div>
                  <div>
                    <h3 className="font-display mb-1 text-base font-semibold text-[#121A2C]">
                      {item.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-[#64748B]">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
