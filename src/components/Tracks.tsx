import {Atom, BrainCircuit, Dna, Globe} from 'lucide-react';
import {eventData, type TrackItem} from '../config/eventData';

function TrackIcon({icon}: {icon: TrackItem['icon']}) {
  switch (icon) {
    case 'atom':
      return <Atom className="h-5 w-5 text-[#0D9488]" aria-hidden="true" />;
    case 'brain-circuit':
      return (
        <BrainCircuit className="h-5 w-5 text-[#121A2C]" aria-hidden="true" />
      );
    case 'dna':
      return <Dna className="h-5 w-5 text-[#0D9488]" aria-hidden="true" />;
    case 'globe':
      return <Globe className="h-5 w-5 text-[#121A2C]" aria-hidden="true" />;
  }
}

export function Tracks() {
  const {tracks} = eventData;

  return (
    <section
      id="tracks"
      className="relative border-y border-[#E4E4E7] bg-[#FAFAFA] py-20 sm:py-28"
    >
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
        <div className="mb-12 grid grid-cols-1 items-end gap-6 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="mb-3 text-xs font-semibold tracking-[0.14em] uppercase text-[#0D9488]">
              {tracks.eyebrow}
            </p>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-[2.75rem] font-bold leading-[1.12] tracking-[-0.02em] text-[#121A2C] text-balance">
              {tracks.heading}
            </h2>
          </div>
          <p className="lg:col-span-5 text-base leading-relaxed text-[#52525B]">
            {tracks.subtitle}
          </p>
        </div>

        {/* Architectural 2x2 Hairline-Ruled Grid */}
        <div className="grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-[#E4E4E7] bg-[#E4E4E7] md:grid-cols-2">
          {tracks.items.map((track, idx) => (
            <article
              key={track.id}
              className="group flex flex-col justify-between bg-white p-8 sm:p-10 transition-colors duration-150 hover:bg-[#FAFAFA]"
            >
              <div>
                <div className="mb-8 flex items-center justify-between">
                  <span className="font-mono-tabular text-xs font-medium text-[#71717A]">
                    0{idx + 1}
                  </span>
                  <TrackIcon icon={track.icon} />
                </div>

                <p className="mb-2 text-xs font-medium text-[#0D9488]">
                  {track.focusArea}
                </p>
                <h3 className="font-display mb-3 text-xl sm:text-2xl font-bold tracking-[-0.015em] text-[#121A2C]">
                  {track.title}
                </h3>
                <p className="text-sm sm:text-base leading-relaxed text-[#52525B]">
                  {track.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
