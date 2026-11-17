import {ArrowRight, ChevronDown} from 'lucide-react';
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
      className="relative flex min-h-[100svh] w-full flex-col items-center justify-center overflow-hidden bg-white pt-24 pb-20 sm:pt-28 sm:pb-24"
    >
      {/* Full-Screen Aurora & Celestial Sphere Background */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden bg-white">
        <motion.div
          initial={
            shouldReduceMotion ? {opacity: 1, scale: 1} : {opacity: 0, scale: 1.08}
          }
          animate={
            assetsReady
              ? {opacity: 1, scale: 1}
              : {opacity: 0, scale: 1.08}
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
              alt="Clean atmosphere with aurora above snowy mountains and a translucent celestial sphere on the right"
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

        {/* Subtle bottom transition straight into crisp Pure White content */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-white via-white/75 to-transparent"
        />
      </div>

      {/* Phase 1: Pure Neutral Luminous Veil + Light Trail */}
      {!shouldReduceMotion && !veilRemoved && (
        <motion.div
          aria-hidden="true"
          initial={{opacity: 1}}
          animate={assetsReady ? {opacity: 0} : {opacity: 1}}
          transition={{duration: 1.65, delay: 0.15, ease: [0.22, 1, 0.36, 1]}}
          onAnimationComplete={() => {
            if (assetsReady) setVeilRemoved(true);
          }}
          className="pointer-events-none fixed inset-0 z-40 overflow-hidden bg-white"
        >
          <motion.div
            initial={{x: '-28%', y: '-6%', scaleX: 0.9, opacity: 0.2}}
            animate={
              assetsReady
                ? {x: '32%', y: '6%', scaleX: 1.28, opacity: [0.2, 0.65, 0]}
                : {x: '-28%', y: '-6%', scaleX: 0.9, opacity: 0.25}
            }
            transition={{duration: 1.75, ease: [0.22, 1, 0.36, 1]}}
            className="absolute -inset-x-1/4 top-1/4 h-72 -rotate-6 rounded-full bg-gradient-to-r from-transparent via-[#62C9C1]/30 to-[#A895E8]/25 blur-3xl will-change-transform"
          />
        </motion.div>
      )}

      {/* Centered Hero Composition */}
      <div className="relative z-10 mx-auto flex w-full max-w-[1200px] flex-col items-center px-5 text-center sm:px-8">
        {/* 1. Quiet Editorial Label */}
        <motion.p
          initial={shouldReduceMotion ? {opacity: 1, y: 0} : {opacity: 0, y: 10}}
          animate={assetsReady ? {opacity: 1, y: 0} : {opacity: 0, y: 10}}
          transition={
            shouldReduceMotion
              ? {duration: 0}
              : {duration: 0.9, delay: 0.45, ease: [0.22, 1, 0.36, 1]}
          }
          className="mb-5 text-xs font-medium tracking-[0.14em] uppercase text-[#52525B]"
        >
          {eventData.heroIdentityLabel}
        </motion.p>

        {/* 2. Official EUREKA Typography Graphic */}
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
          className="mb-6 w-full max-w-[300px] sm:max-w-[430px] md:max-w-[490px] lg:max-w-[530px] will-change-transform"
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
              className="mx-auto block h-auto w-full object-contain"
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
          className="mb-8 max-w-xl text-base sm:text-lg leading-relaxed text-[#3F3F46]"
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
          className="flex flex-wrap items-center justify-center gap-3.5"
        >
          <button
            type="button"
            onClick={() => scrollTo('#about')}
            className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-md bg-[#121A2C] px-6 py-3 text-sm font-semibold text-white transition-colors duration-150 hover:bg-[#1E293B] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0D9488]"
          >
            <span>{eventData.primaryCtaLabel}</span>
            <ArrowRight className="h-4 w-4 text-[#62C9C1]" aria-hidden="true" />
          </button>

          <button
            type="button"
            onClick={() => scrollTo('#tracks')}
            className="inline-flex cursor-pointer items-center justify-center rounded-md border border-[#E4E4E7] bg-white/90 px-6 py-3 text-sm font-semibold text-[#121A2C] backdrop-blur-sm transition-colors duration-150 hover:border-[#121A2C] hover:bg-white whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0D9488]"
          >
            {eventData.secondaryCtaLabel}
          </button>

          {eventData.externalProposalFormUrl ? (
            <a
              href={eventData.externalProposalFormUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-3 py-2 text-sm font-medium text-[#52525B] transition-colors hover:text-[#121A2C] whitespace-nowrap shrink-0"
            >
              {eventData.submitProposalLabel}
            </a>
          ) : (
            <button
              type="button"
              onClick={onOpenProposal}
              className="inline-flex cursor-pointer items-center px-3 py-2 text-sm font-medium text-[#52525B] transition-colors hover:text-[#121A2C] whitespace-nowrap shrink-0"
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
        className="absolute bottom-7 left-1/2 z-10 -translate-x-1/2 cursor-pointer flex flex-col items-center gap-1 text-xs font-medium tracking-wider uppercase text-[#71717A] transition-colors hover:text-[#121A2C] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0D9488]"
      >
        <span>Scroll</span>
        <ChevronDown className="h-4 w-4" aria-hidden="true" />
      </motion.button>
    </section>
  );
}
