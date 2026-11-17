import {ArrowRight, ChevronDown, Compass} from 'lucide-react';
import {useEffect, useRef, useState} from 'react';
import {assetUrl, eventData} from '../config/eventData';

interface HeroProps {
  onOpenProposal: () => void;
}

export function Hero({onOpenProposal}: HeroProps) {
  const bgSrc = assetUrl(eventData.assets.heroBackground);
  const typoSrc = assetUrl(eventData.assets.heroTypography);

  const bgRef = useRef<HTMLImageElement>(null);
  const typoRef = useRef<HTMLImageElement>(null);
  const [bgLoaded, setBgLoaded] = useState(false);
  const [typoLoaded, setTypoLoaded] = useState(false);
  const [entranceDone, setEntranceDone] = useState(false);

  useEffect(() => {
    if (bgRef.current?.complete) setBgLoaded(true);
    if (typoRef.current?.complete) setTypoLoaded(true);

    const timer = window.setTimeout(() => {
      setEntranceDone(true);
    }, 2000);
    return () => window.clearTimeout(timer);
  }, []);

  const scrollTo = (selector: string) => {
    const el = document.querySelector(selector);
    if (el) {
      el.scrollIntoView({behavior: 'smooth'});
    }
  };

  return (
    <section
      id="hero"
      className="relative flex min-h-[100svh] w-full flex-col items-center justify-center overflow-hidden bg-[#F8FAFD] pt-24 pb-20 sm:pt-28 sm:pb-24"
    >
      {/* Full-Screen Aurora & Celestial Sphere Background */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden bg-[#EFF4FB]">
        <img
          ref={bgRef}
          src={bgSrc}
          alt="Clean icy-white atmosphere with soft violet and teal aurora above snowy mountains and a translucent celestial sphere on the right"
          width={1920}
          height={1080}
          loading="eager"
          decoding="async"
          fetchPriority="high"
          referrerPolicy="no-referrer"
          onLoad={() => setBgLoaded(true)}
          className={`h-full w-full object-cover object-[74%_42%] sm:object-[68%_center] lg:object-center animate-hero-env transition-opacity duration-500 ${
            bgLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        />

        {/* Gentle central luminous clarity wash so centered text stays crisp without hiding sphere or aurora */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(ellipse_62%_50%_at_50%_48%,rgba(248,250,253,0.58)_0%,rgba(248,250,253,0.22)_62%,transparent_100%)]"
        />

        {/* Smooth airy transition into Cloud White content below */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#F8FAFD] via-[#F8FAFD]/70 to-transparent"
        />
      </div>

      {/* Phase 1 Cinematic Arrival Veil — Plays once on initial page load */}
      {!entranceDone && (
        <div
          aria-hidden="true"
          className="animate-aurora-veil pointer-events-none fixed inset-0 z-40 overflow-hidden bg-[radial-gradient(ellipse_at_center,#FFFFFF_0%,#DCEBFA_65%,#F8FAFD_100%)]"
        >
          <div className="animate-aurora-streak absolute -inset-x-1/4 top-1/4 h-72 rounded-full bg-gradient-to-r from-transparent via-[#62C9C1]/35 to-[#A895E8]/30 blur-3xl" />
        </div>
      )}

      {/* Centered Hero Composition */}
      <div className="relative z-10 mx-auto flex w-full max-w-[1280px] flex-col items-center px-5 text-center sm:px-8 lg:px-10">
        {/* 1. Small Event Label */}
        <div className="animate-hero-kicker mb-5 flex items-center justify-center gap-3 text-xs font-semibold tracking-[0.16em] uppercase text-[#137C75]">
          <span
            className="hidden sm:inline-block h-[1px] w-7 bg-gradient-to-r from-transparent to-[#62C9C1]"
            aria-hidden="true"
          />
          <span>{eventData.heroIdentityLabel}</span>
          <span
            className="hidden sm:inline-block h-[1px] w-7 bg-gradient-to-l from-transparent to-[#A895E8]"
            aria-hidden="true"
          />
        </div>

        {/* 2. Official EUREKA Typography Graphic (Centered, Proportions & Transparency Preserved) */}
        <div className="animate-hero-typo mb-6 w-full max-w-[300px] sm:max-w-[440px] md:max-w-[500px] lg:max-w-[540px]">
          <img
            ref={typoRef}
            src={typoSrc}
            alt="EUREKA — Ignite: Discovery"
            width={1600}
            height={520}
            loading="eager"
            decoding="async"
            fetchPriority="high"
            referrerPolicy="no-referrer"
            onLoad={() => setTypoLoaded(true)}
            className={`mx-auto block h-auto w-full object-contain drop-shadow-[0_8px_24px_rgba(18,26,44,0.08)] transition-opacity duration-300 ${
              typoLoaded ? 'opacity-100' : 'opacity-0'
            }`}
          />
        </div>

        {/* 3. Supporting Event Introduction */}
        <p className="animate-hero-subtitle mb-8 max-w-xl text-base sm:text-lg leading-relaxed text-[#334155]">
          {eventData.heroSubtitle}
        </p>

        {/* 4 & 5. Primary & Secondary CTAs */}
        <div className="animate-hero-actions flex flex-wrap items-center justify-center gap-3.5 sm:gap-4">
          <button
            type="button"
            onClick={() => scrollTo('#about')}
            className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg bg-[#121A2C] px-7 py-3.5 text-sm sm:text-base font-semibold text-white shadow-[0_8px_24px_rgba(18,26,44,0.16)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#1B2742] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#137C75]"
          >
            <span>{eventData.primaryCtaLabel}</span>
            <ArrowRight className="h-4 w-4 text-[#62C9C1]" aria-hidden="true" />
          </button>

          <button
            type="button"
            onClick={() => scrollTo('#tracks')}
            className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-[#E5EAF1] bg-white/90 px-7 py-3.5 text-sm sm:text-base font-semibold text-[#121A2C] backdrop-blur-sm shadow-[0_4px_16px_rgba(18,26,44,0.04)] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#62C9C1] hover:bg-white whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#137C75]"
          >
            <Compass className="h-4 w-4 text-[#137C75]" aria-hidden="true" />
            <span>{eventData.secondaryCtaLabel}</span>
          </button>

          {eventData.externalProposalFormUrl ? (
            <a
              href={eventData.externalProposalFormUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-2 py-2 text-sm font-semibold text-[#121A2C] underline decoration-[#62C9C1] decoration-2 underline-offset-4 transition-colors hover:text-[#137C75] whitespace-nowrap shrink-0"
            >
              {eventData.submitProposalLabel}
            </a>
          ) : (
            <button
              type="button"
              onClick={onOpenProposal}
              className="inline-flex cursor-pointer items-center px-2 py-2 text-sm font-semibold text-[#121A2C] underline decoration-[#62C9C1] decoration-2 underline-offset-4 transition-colors hover:text-[#137C75] whitespace-nowrap shrink-0"
            >
              {eventData.submitProposalLabel}
            </button>
          )}
        </div>
      </div>

      {/* 6. Subtle Scroll Indicator */}
      <button
        type="button"
        onClick={() => scrollTo('#about')}
        aria-label="Scroll to About section"
        className="animate-hero-scroll absolute bottom-7 left-1/2 z-10 -translate-x-1/2 cursor-pointer flex flex-col items-center gap-1.5 text-xs font-medium tracking-wider uppercase text-[#64748B] transition-colors hover:text-[#121A2C] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#137C75]"
      >
        <span>Scroll</span>
        <ChevronDown className="h-4 w-4 text-[#137C75]" aria-hidden="true" />
      </button>
    </section>
  );
}
