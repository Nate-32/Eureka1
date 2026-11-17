import {Atom, BrainCircuit, Dna, Globe} from 'lucide-react';
import {eventData, type TrackItem} from '../config/eventData';

function TrackIcon({icon}: {icon: TrackItem['icon']}) {
  switch (icon) {
    case 'atom':
      return <Atom className="h-5 w-5 text-[#137C75]" aria-hidden="true" />;
    case 'brain-circuit':
      return <BrainCircuit className="h-5 w-5 text-[#6D56C1]" aria-hidden="true" />;
    case 'dna':
      return <Dna className="h-5 w-5 text-[#137C75]" aria-hidden="true" />;
    case 'globe':
      return <Globe className="h-5 w-5 text-[#121A2C]" aria-hidden="true" />;
  }
}

export function Tracks() {
  const {tracks} = eventData;

  return (
    <section
      id="tracks"
      className="relative border-y border-[#E5EAF1] bg-[#DCEBFA]/30 py-20 sm:py-28"
    >
      <div className="mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-10">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <p className="mb-3 text-xs font-semibold tracking-[0.16em] uppercase text-[#137C75]">
            {tracks.eyebrow}
          </p>
          <h2 className="font-display mb-4 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#121A2C] text-balance">
            {tracks.heading}
          </h2>
          <p className="text-base sm:text-lg text-[#64748B]">
            {tracks.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {tracks.items.map((track, idx) => (
            <article
              key={track.id}
              className="aurora-pane aurora-pane-interactive relative flex flex-col justify-between rounded-2xl p-7"
            >
              <div className="relative z-20">
                <div className="mb-6 flex items-center justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#E5EAF1] bg-[#F8FAFD]">
                    <TrackIcon icon={track.icon} />
                  </div>
                  <span className="font-mono-tabular text-xs font-medium text-[#64748B]">
                    0{idx + 1}
                  </span>
                </div>

                <p className="mb-2 text-xs font-medium text-[#137C75]">
                  {track.focusArea}
                </p>
                <h3 className="font-display mb-3 text-xl font-bold text-[#121A2C]">
                  {track.title}
                </h3>
                <p className="text-sm leading-relaxed text-[#64748B]">
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
