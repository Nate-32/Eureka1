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
  const [bgReady, setBgReady] = useState(false);
  const [typoReady, setTypoReady] = useState(false);
  const [revealStarted, setRevealStarted] = useState(false);
  const [entranceDone, setEntranceDone] = useState(false);

  const markImageReady = (
    img: HTMLImageElement | null,
    setter: (ready: boolean) => void,
  ) => {
    if (!img) return;
    if (typeof img.decode === 'function') {
      img
        .decode()
        .then(() => setter(true))
        .catch(() => setter(true));
    } else {
      setter(true);
    }
  };

  useEffect(() => {
    if (bgRef.current?.complete) {
      markImageReady(bgRef.current, setBgReady);
    }
    if (typoRef.current?.complete) {
      markImageReady(typoRef.current, setTypoReady);
    }

    // Safety fallback so slow networks never stall the hero reveal
    const fallbackTimer = window.setTimeout(() => {
      setBgReady(true);
      setTypoReady(true);
    }, 2200);

    return () => window.clearTimeout(fallbackTimer);
  }, []);

  useEffect(() => {
    if (!bgReady || !typoReady || revealStarted) return;
    setRevealStarted(true);

    const endTimer = window.setTimeout(() => {
      setEntranceDone(true);
    }, 2500);

    return () => window.clearTimeout(endTimer);
  }, [bgReady, typoReady, revealStarted]);

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
          decoding="sync"
          fetchPriority="high"
          referrerPolicy="no-referrer"
          onLoad={(e) => markImageReady(e.currentTarget, setBgReady)}
          onError={() => setBgReady(true)}
          className={`h-full w-full object-cover object-[74%_42%] sm:object-[68%_center] lg:object-center transition-opacity duration-500 ${
            revealStarted ? 'animate-hero-env opacity-100' : 'opacity-0'
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

      {/* Phase 1 Cinematic Arrival Veil — Holds gently until hero assets are decoded, then plays once */}
      {!entranceDone && (
        <div
          aria-hidden="true"
          className={`pointer-events-none fixed inset-0 z-40 overflow-hidden bg-[radial-gradient(ellipse_at_center,#FFFFFF_0%,#DCEBFA_65%,#F8FAFD_100%)] ${
            revealStarted ? 'animate-aurora-veil' : 'opacity-100'
          }`}
        >
          <div
            className={`absolute -inset-x-1/4 top-1/4 h-72 rounded-full bg-gradient-to-r from-transparent via-[#62C9C1]/35 to-[#A895E8]/30 blur-3xl ${
              revealStarted ? 'animate-aurora-streak' : 'opacity-40'
            }`}
          />
        </div>
      )}

      {/* Centered Hero Composition */}
      <div className="relative z-10 mx-auto flex w-full max-w-[1280px] flex-col items-center px-5 text-center sm:px-8 lg:px-10">
        {/* 1. Small Event Label */}
        <div
          className={`mb-5 flex items-center justify-center gap-3 text-xs font-semibold tracking-[0.16em] uppercase text-[#137C75] ${
            revealStarted ? 'animate-hero-kicker' : 'opacity-0'
          }`}
        >
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

        {/* 2. Official EUREKA Typography Graphic (Decoded cleanly before reveal) */}
        <div
          className={`mb-6 w-full max-w-[300px] sm:max-w-[440px] md:max-w-[500px] lg:max-w-[540px] ${
            revealStarted ? 'animate-hero-typo' : 'opacity-0'
          }`}
        >
          <img
            ref={typoRef}
            src={typoSrc}
            alt="EUREKA — Ignite: Discovery"
            width={1600}
            height={520}
            loading="eager"
            decoding="sync"
            fetchPriority="high"
            referrerPolicy="no-referrer"
            onLoad={(e) => markImageReady(e.currentTarget, setTypoReady)}
            onError={() => setTypoReady(true)}
            className="mx-auto block h-auto w-full object-contain drop-shadow-[0_8px_24px_rgba(18,26,44,0.08)]"
          />
        </div>

        {/* 3. Supporting Event Introduction */}
        <p
          className={`mb-8 max-w-xl text-base sm:text-lg leading-relaxed text-[#334155] ${
            revealStarted ? 'animate-hero-subtitle' : 'opacity-0'
          }`}
        >
          {eventData.heroSubtitle}
        </p>

        {/* 4 & 5. Primary & Secondary CTAs */}
        <div
          className={`flex flex-wrap items-center justify-center gap-3.5 sm:gap-4 ${
            revealStarted ? 'animate-hero-actions' : 'opacity-0'
          }`}
        >
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
        className={`absolute bottom-7 left-1/2 z-10 -translate-x-1/2 cursor-pointer flex flex-col items-center gap-1.5 text-xs font-medium tracking-wider uppercase text-[#64748B] transition-colors hover:text-[#121A2C] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#137C75] ${
          revealStarted ? 'animate-hero-scroll' : 'opacity-0'
        }`}
      >
        <span>Scroll</span>
        <ChevronDown className="h-4 w-4 text-[#137C75]" aria-hidden="true" />
      </button>
    </section>
  );
}
