import {ArrowRight, ChevronDown, Compass} from 'lucide-react';
import {motion, useReducedMotion} from 'motion/react';
import {useEffect, useRef, useState} from 'react';
import {assetUrl, eventData} from '../config/eventData';

interface HeroProps {
  onOpenProposal: () => void;
}

export function Hero({onOpenProposal}: HeroProps) {
  const bgPngSrc = assetUrl(eventData.assets.heroBackground);
  const bgWebpSrc = assetUrl(eventData.assets.heroBackgroundWebp);
  const typoPngSrc = assetUrl(eventData.assets.heroTypography);
  const typoWebpSrc = assetUrl(eventData.assets.heroTypographyWebp);

  const shouldReduceMotion = useReducedMotion();
  const bgRef = useRef<HTMLImageElement>(null);
  const typoRef = useRef<HTMLImageElement>(null);

  const [bgReady, setBgReady] = useState(false);
  const [typoReady, setTypoReady] = useState(false);
  const [veilRemoved, setVeilRemoved] = useState(false);

  const markImageDecoded = (
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
    if (bgRef.current?.complete && bgRef.current.naturalWidth > 0) {
      markImageDecoded(bgRef.current, setBgReady);
    }
    if (typoRef.current?.complete && typoRef.current.naturalWidth > 0) {
      markImageDecoded(typoRef.current, setTypoReady);
    }

    // Generous safety cap so even offline/throttled environments never stay veiled
    const safetyTimer = window.setTimeout(() => {
      setBgReady(true);
      setTypoReady(true);
    }, 3500);

    return () => window.clearTimeout(safetyTimer);
  }, []);

  const assetsReady = bgReady && typoReady;

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
        <motion.div
          initial={
            shouldReduceMotion ? {opacity: 1, scale: 1} : {opacity: 0, scale: 1.09}
          }
          animate={
            assetsReady
              ? {opacity: 1, scale: 1}
              : {opacity: 0, scale: 1.09}
          }
          transition={
            shouldReduceMotion
              ? {duration: 0}
              : {duration: 2.35, ease: [0.22, 1, 0.36, 1]}
          }
          className="h-full w-full will-change-transform"
        >
          <picture>
            <source srcSet={bgWebpSrc} type="image/webp" />
            <img
              ref={bgRef}
              src={bgPngSrc}
              alt="Clean icy-white atmosphere with soft violet and teal aurora above snowy mountains and a translucent celestial sphere on the right"
              width={1672}
              height={941}
              loading="eager"
              decoding="sync"
              fetchPriority="high"
              referrerPolicy="no-referrer"
              onLoad={(e) => markImageDecoded(e.currentTarget, setBgReady)}
              onError={() => setBgReady(true)}
              className="h-full w-full object-cover object-[74%_42%] sm:object-[68%_center] lg:object-center"
            />
          </picture>
        </motion.div>

        {/* Gentle central luminous clarity wash so centered text stays crisp without hiding sphere or aurora */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(ellipse_62%_50%_at_50%_48%,rgba(248,250,253,0.56)_0%,rgba(248,250,253,0.20)_62%,transparent_100%)]"
        />

        {/* Smooth airy transition into Cloud White content below */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#F8FAFD] via-[#F8FAFD]/70 to-transparent"
        />
      </div>

      {/* Phase 1: Soft Icy Aurora Veil + Light Sweep ("Travelling Through Time") */}
      {!shouldReduceMotion && !veilRemoved && (
        <motion.div
          aria-hidden="true"
          initial={{opacity: 1}}
          animate={assetsReady ? {opacity: 0} : {opacity: 1}}
          transition={{duration: 1.65, delay: 0.15, ease: [0.22, 1, 0.36, 1]}}
          onAnimationComplete={() => {
            if (assetsReady) setVeilRemoved(true);
          }}
          className="pointer-events-none fixed inset-0 z-40 overflow-hidden bg-[radial-gradient(ellipse_at_center,#FFFFFF_0%,#E6F0FC_60%,#F8FAFD_100%)]"
        >
          {/* Sweeping Aurora Teal & Soft Violet light trail */}
          <motion.div
            initial={{x: '-28%', y: '-6%', scaleX: 0.9, opacity: 0.25}}
            animate={
              assetsReady
                ? {x: '32%', y: '6%', scaleX: 1.28, opacity: [0.25, 0.72, 0]}
                : {x: '-28%', y: '-6%', scaleX: 0.9, opacity: 0.35}
            }
            transition={{duration: 1.75, ease: [0.22, 1, 0.36, 1]}}
            className="absolute -inset-x-1/4 top-1/4 h-72 -rotate-6 rounded-full bg-gradient-to-r from-transparent via-[#62C9C1]/40 to-[#A895E8]/35 blur-3xl will-change-transform"
          />
          <motion.div
            initial={{x: '22%', y: '10%', scaleX: 0.95, opacity: 0.15}}
            animate={
              assetsReady
                ? {x: '-26%', y: '-4%', scaleX: 1.2, opacity: [0.15, 0.45, 0]}
                : {x: '22%', y: '10%', scaleX: 0.95, opacity: 0.2}
            }
            transition={{duration: 1.85, delay: 0.08, ease: [0.22, 1, 0.36, 1]}}
            className="absolute -inset-x-1/4 bottom-1/4 h-56 rotate-3 rounded-full bg-gradient-to-r from-transparent via-[#A895E8]/30 to-[#E9B8D7]/30 blur-3xl will-change-transform"
          />
        </motion.div>
      )}

      {/* Centered Hero Composition */}
      <div className="relative z-10 mx-auto flex w-full max-w-[1280px] flex-col items-center px-5 text-center sm:px-8 lg:px-10">
        {/* 1. Small Event Label */}
        <motion.div
          initial={shouldReduceMotion ? {opacity: 1, y: 0} : {opacity: 0, y: 12}}
          animate={assetsReady ? {opacity: 1, y: 0} : {opacity: 0, y: 12}}
          transition={
            shouldReduceMotion
              ? {duration: 0}
              : {duration: 0.95, delay: 0.45, ease: [0.22, 1, 0.36, 1]}
          }
          className="mb-5 flex items-center justify-center gap-3 text-xs font-semibold tracking-[0.16em] uppercase text-[#137C75]"
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
        </motion.div>

        {/* 2. Official EUREKA Typography Graphic — Smooth gradual mist-to-clarity reveal */}
        <motion.div
          initial={
            shouldReduceMotion
              ? {opacity: 1, y: 0, scale: 1, filter: 'blur(0px)'}
              : {opacity: 0, y: 14, scale: 0.96, filter: 'blur(10px)'}
          }
          animate={
            assetsReady
              ? {opacity: 1, y: 0, scale: 1, filter: 'blur(0px)'}
              : {opacity: 0, y: 14, scale: 0.96, filter: 'blur(10px)'}
          }
          transition={
            shouldReduceMotion
              ? {duration: 0}
              : {
                  duration: 1.55,
                  delay: 0.65,
                  ease: [0.32, 0.08, 0.24, 1],
                }
          }
          className="mb-6 w-full max-w-[300px] sm:max-w-[440px] md:max-w-[500px] lg:max-w-[540px] will-change-transform"
        >
          <picture>
            <source srcSet={typoWebpSrc} type="image/webp" />
            <img
              ref={typoRef}
              src={typoPngSrc}
              alt="EUREKA — Ignite: Discovery"
              width={2172}
              height={724}
              loading="eager"
              decoding="sync"
              fetchPriority="high"
              referrerPolicy="no-referrer"
              onLoad={(e) => markImageDecoded(e.currentTarget, setTypoReady)}
              onError={() => setTypoReady(true)}
              className="mx-auto block h-auto w-full object-contain drop-shadow-[0_8px_24px_rgba(18,26,44,0.08)]"
            />
          </picture>
        </motion.div>

        {/* 3. Supporting Event Introduction */}
        <motion.p
          initial={shouldReduceMotion ? {opacity: 1, y: 0} : {opacity: 0, y: 12}}
          animate={assetsReady ? {opacity: 1, y: 0} : {opacity: 0, y: 12}}
          transition={
            shouldReduceMotion
              ? {duration: 0}
              : {duration: 1.0, delay: 1.3, ease: [0.22, 1, 0.36, 1]}
          }
          className="mb-8 max-w-xl text-base sm:text-lg leading-relaxed text-[#334155]"
        >
          {eventData.heroSubtitle}
        </motion.p>

        {/* 4 & 5. Primary & Secondary CTAs */}
        <motion.div
          initial={shouldReduceMotion ? {opacity: 1, y: 0} : {opacity: 0, y: 12}}
          animate={assetsReady ? {opacity: 1, y: 0} : {opacity: 0, y: 12}}
          transition={
            shouldReduceMotion
              ? {duration: 0}
              : {duration: 0.95, delay: 1.55, ease: [0.22, 1, 0.36, 1]}
          }
          className="flex flex-wrap items-center justify-center gap-3.5 sm:gap-4"
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
        </motion.div>
      </div>

      {/* 6. Subtle Scroll Indicator */}
      <motion.button
        type="button"
        onClick={() => scrollTo('#about')}
        aria-label="Scroll to About section"
        initial={shouldReduceMotion ? {opacity: 1, y: 0} : {opacity: 0, y: 8}}
        animate={assetsReady ? {opacity: 1, y: 0} : {opacity: 0, y: 8}}
        transition={
          shouldReduceMotion
            ? {duration: 0}
            : {duration: 0.85, delay: 1.85, ease: [0.22, 1, 0.36, 1]}
        }
        className="absolute bottom-7 left-1/2 z-10 -translate-x-1/2 cursor-pointer flex flex-col items-center gap-1.5 text-xs font-medium tracking-wider uppercase text-[#64748B] transition-colors hover:text-[#121A2C] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#137C75]"
      >
        <span>Scroll</span>
        <ChevronDown className="h-4 w-4 text-[#137C75]" aria-hidden="true" />
      </motion.button>
    </section>
  );
}
