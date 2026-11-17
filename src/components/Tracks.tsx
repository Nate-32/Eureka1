import {Atom, BrainCircuit, Dna, Globe} from 'lucide-react';
import {eventData, type TrackItem} from '../config/eventData';

function TrackIcon({icon}: {icon: TrackItem['icon']}) {
  switch (icon) {
    case 'atom':
      return (
        <Atom
          className="h-5 w-5 text-[#0D9488] dark:text-[#62C9C1]"
          aria-hidden="true"
        />
      );
    case 'brain-circuit':
      return (
        <BrainCircuit
          className="h-5 w-5 text-[#121A2C] dark:text-[#A895E8]"
          aria-hidden="true"
        />
      );
    case 'dna':
      return (
        <Dna
          className="h-5 w-5 text-[#0D9488] dark:text-[#62C9C1]"
          aria-hidden="true"
        />
      );
    case 'globe':
      return (
        <Globe
          className="h-5 w-5 text-[#121A2C] dark:text-[#E9B8D7]"
          aria-hidden="true"
        />
      );
  }
}

export function Tracks() {
  const {tracks} = eventData;

  return (
    <section
      id="tracks"
      className="relative border-y border-[#E4E4E7] dark:border-white/10 bg-[#FAFAFA] dark:bg-[#0D111D] py-20 transition-colors duration-300 sm:py-28"
    >
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
        <div className="mb-12 grid grid-cols-1 items-end gap-6 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="mb-3 text-xs font-semibold tracking-[0.14em] uppercase text-[#0D9488] dark:text-[#62C9C1]">
              {tracks.eyebrow}
            </p>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-[2.75rem] font-bold leading-[1.12] tracking-[-0.02em] text-[#121A2C] dark:text-white text-balance">
              {tracks.heading}
            </h2>
          </div>
          <p className="lg:col-span-5 text-base leading-relaxed text-[#52525B] dark:text-[#A1A1AA]">
            {tracks.subtitle}
          </p>
        </div>

        {/* Architectural 2x2 Hairline-Ruled Grid */}
        <div className="grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-[#E4E4E7] dark:border-white/10 bg-[#E4E4E7] dark:bg-white/10 md:grid-cols-2">
          {tracks.items.map((track, idx) => (
            <article
              key={track.id}
              className="group flex flex-col justify-between bg-white dark:bg-[#111726] p-8 sm:p-10 transition-colors duration-150 hover:bg-[#FAFAFA] dark:hover:bg-[#151D30]"
            >
              <div>
                <div className="mb-8 flex items-center justify-between">
                  <span className="font-mono-tabular text-xs font-medium text-[#71717A] dark:text-[#A1A1AA]">
                    0{idx + 1}
                  </span>
                  <TrackIcon icon={track.icon} />
                </div>

                <p className="mb-2 text-xs font-medium text-[#0D9488] dark:text-[#62C9C1]">
                  {track.focusArea}
                </p>
                <h3 className="font-display mb-3 text-xl sm:text-2xl font-bold tracking-[-0.015em] text-[#121A2C] dark:text-white">
                  {track.title}
                </h3>
                <p className="text-sm sm:text-base leading-relaxed text-[#52525B] dark:text-[#A1A1AA]">
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
