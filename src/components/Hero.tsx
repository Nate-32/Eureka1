import {ArrowRight, ChevronDown} from 'lucide-react';
import {motion, useReducedMotion} from 'motion/react';
import {useEffect, useRef, useState} from 'react';
import type {ThemeMode} from '../App';
import {assetUrl, eventData} from '../config/eventData';

interface HeroProps {
  onOpenProposal: () => void;
  theme: ThemeMode;
}

export function Hero({onOpenProposal, theme}: HeroProps) {
  const bgWhitePng = assetUrl(eventData.assets.heroBackground);
  const bgWhiteWebp = assetUrl(eventData.assets.heroBackgroundWebp);
  const bgBlackPng = assetUrl(eventData.assets.heroBackgroundDark);
  const bgBlackWebp = assetUrl(eventData.assets.heroBackgroundDarkWebp);
  const typoPng = assetUrl(eventData.assets.heroTypography);
  const typoWebp = assetUrl(eventData.assets.heroTypographyWebp);

  const shouldReduceMotion = useReducedMotion();
  const bgWhiteRef = useRef<HTMLImageElement>(null);
  const bgBlackRef = useRef<HTMLImageElement>(null);
  const typoRef = useRef<HTMLImageElement>(null);

  const [bgWhiteReady, setBgWhiteReady] = useState(false);
  const [bgBlackReady, setBgBlackReady] = useState(false);
  const [typoReady, setTypoReady] = useState(false);
  const [entranceFinished, setEntranceFinished] = useState(false);

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
    if (bgWhiteRef.current?.complete && bgWhiteRef.current.naturalWidth > 0) {
      markImageDecoded(bgWhiteRef.current, setBgWhiteReady);
    }
    if (bgBlackRef.current?.complete && bgBlackRef.current.naturalWidth > 0) {
      markImageDecoded(bgBlackRef.current, setBgBlackReady);
    }
    if (typoRef.current?.complete && typoRef.current.naturalWidth > 0) {
      markImageDecoded(typoRef.current, setTypoReady);
    }

    const safetyTimer = window.setTimeout(() => {
      setBgWhiteReady(true);
      setBgBlackReady(true);
      setTypoReady(true);
    }, 3500);

    return () => window.clearTimeout(safetyTimer);
  }, []);

  const assetsReady = bgWhiteReady && bgBlackReady && typoReady;
  const isDark = theme === 'dark';

  const scrollTo = (selector: string) => {
    const el = document.querySelector(selector);
    if (el) {
      el.scrollIntoView({behavior: 'smooth'});
    }
  };

  return (
    <section
      id="hero"
      className="relative flex min-h-[100svh] w-full flex-col items-center justify-center overflow-hidden bg-white dark:bg-[#090B12] pt-24 pb-20 transition-colors duration-300 sm:pt-28 sm:pb-24"
    >
      {/* Full-Screen Environment: Switches seamlessly between BG_white (Light) and BG_Black (Dark) */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden bg-white dark:bg-[#090B12]">
        <motion.div
          initial={shouldReduceMotion ? {scale: 1} : {scale: 1.09}}
          animate={assetsReady ? {scale: 1} : {scale: 1.09}}
          transition={
            shouldReduceMotion
              ? {duration: 0}
              : {duration: 2.6, ease: [0.22, 1, 0.36, 1]}
          }
          className="relative h-full w-full will-change-transform"
        >
          {/* Daylight / Clean White Aurora Environment */}
          <picture>
            <source srcSet={bgWhiteWebp} type="image/webp" />
            <img
              ref={bgWhiteRef}
              src={bgWhitePng}
              alt="Clean luminous atmosphere with upper-left violet and teal aurora and a translucent celestial sphere on the right"
              width={1671}
              height={941}
              loading="eager"
              decoding="sync"
              fetchPriority="high"
              referrerPolicy="no-referrer"
              onLoad={(e) => markImageDecoded(e.currentTarget, setBgWhiteReady)}
              onError={() => setBgWhiteReady(true)}
              className={`h-full w-full object-cover object-[74%_42%] sm:object-[68%_center] lg:object-center transition-opacity duration-500 ${
                isDark ? 'opacity-0' : 'opacity-100'
              }`}
            />
          </picture>

          {/* Dark Space Aurora Environment: Also drives initial "From Darkness to Clarity" arrival in Light mode */}
          <motion.div
            aria-hidden="true"
            initial={false}
            animate={
              isDark
                ? {opacity: 1}
                : shouldReduceMotion || entranceFinished
                  ? {opacity: 0}
                  : assetsReady
                    ? {opacity: 0}
                    : {opacity: 1}
            }
            transition={
              isDark || entranceFinished || shouldReduceMotion
                ? {duration: 0.5, ease: [0.22, 1, 0.36, 1]}
                : {duration: 1.35, delay: 0.1, ease: [0.22, 1, 0.36, 1]}
            }
            onAnimationComplete={() => {
              if (assetsReady) setEntranceFinished(true);
            }}
            className="absolute inset-0 will-change-opacity"
          >
            <picture>
              <source srcSet={bgBlackWebp} type="image/webp" />
              <img
                ref={bgBlackRef}
                src={bgBlackPng}
                alt=""
                width={1672}
                height={941}
                loading="eager"
                decoding="sync"
                fetchPriority="high"
                referrerPolicy="no-referrer"
                onLoad={(e) =>
                  markImageDecoded(e.currentTarget, setBgBlackReady)
                }
                onError={() => setBgBlackReady(true)}
                className="h-full w-full object-cover object-[74%_42%] sm:object-[68%_center] lg:object-center"
              />
            </picture>

            {/* Initial arrival aurora streak (only during opening sweep) */}
            {!shouldReduceMotion && !entranceFinished && (
              <motion.div
                initial={{x: '-30%', y: '-8%', scaleX: 0.9, opacity: 0.25}}
                animate={
                  assetsReady
                    ? {x: '35%', y: '6%', scaleX: 1.3, opacity: [0.25, 0.75, 0]}
                    : {x: '-30%', y: '-8%', scaleX: 0.9, opacity: 0.25}
                }
                transition={{duration: 1.45, ease: [0.22, 1, 0.36, 1]}}
                className="absolute -inset-x-1/4 top-1/4 h-72 -rotate-6 rounded-full bg-gradient-to-r from-transparent via-[#62C9C1]/35 to-[#A895E8]/30 blur-3xl will-change-transform"
              />
            )}
          </motion.div>
        </motion.div>

        {/* Bottom horizon blend into active theme background */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-white via-white/80 dark:from-[#090B12] dark:via-[#090B12]/80 to-transparent transition-colors duration-300"
        />
      </div>

      {/* Centered Hero Composition */}
      <div className="relative z-10 mx-auto flex w-full max-w-[1200px] flex-col items-center px-5 text-center sm:px-8">
        {/* 1. Quiet Editorial Label */}
        <motion.p
          initial={shouldReduceMotion ? {opacity: 1, y: 0} : {opacity: 0, y: 10}}
          animate={assetsReady ? {opacity: 1, y: 0} : {opacity: 0, y: 10}}
          transition={
            shouldReduceMotion
              ? {duration: 0}
              : {duration: 0.9, delay: 0.65, ease: [0.22, 1, 0.36, 1]}
          }
          className="mb-5 text-xs font-medium tracking-[0.14em] uppercase text-[#52525B] dark:text-[#62C9C1]"
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
                  duration: 1.5,
                  delay: 0.8,
                  ease: [0.32, 0.08, 0.24, 1],
                }
          }
          className="mb-6 w-full max-w-[300px] sm:max-w-[430px] md:max-w-[490px] lg:max-w-[530px] will-change-transform"
        >
          <picture>
            <source srcSet={typoWebp} type="image/webp" />
            <img
              ref={typoRef}
              src={typoPng}
              alt="EUREKA — Ignite: Discovery"
              width={2172}
              height={724}
              loading="eager"
              decoding="sync"
              fetchPriority="high"
              referrerPolicy="no-referrer"
              onLoad={(e) => markImageDecoded(e.currentTarget, setTypoReady)}
              onError={() => setTypoReady(true)}
              className="mx-auto block h-auto w-full object-contain transition-[filter] duration-300 dark:invert dark:hue-rotate-180 dark:brightness-125 dark:drop-shadow-[0_0_28px_rgba(98,201,193,0.22)]"
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
              : {duration: 1.0, delay: 1.5, ease: [0.22, 1, 0.36, 1]}
          }
          className="mb-8 max-w-xl text-base sm:text-lg leading-relaxed text-[#3F3F46] dark:text-[#D4D4D8]"
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
              : {duration: 0.95, delay: 1.75, ease: [0.22, 1, 0.36, 1]}
          }
          className="flex flex-wrap items-center justify-center gap-3.5"
        >
          <button
            type="button"
            onClick={() => scrollTo('#about')}
            className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-md bg-[#121A2C] dark:bg-white px-6 py-3 text-sm font-semibold text-white dark:text-[#090B12] transition-colors duration-150 hover:bg-[#1E293B] dark:hover:bg-[#E4E4E7] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0D9488]"
          >
            <span>{eventData.primaryCtaLabel}</span>
            <ArrowRight
              className="h-4 w-4 text-[#62C9C1] dark:text-[#0D9488]"
              aria-hidden="true"
            />
          </button>

          <button
            type="button"
            onClick={() => scrollTo('#tracks')}
            className="inline-flex cursor-pointer items-center justify-center rounded-md border border-[#E4E4E7] dark:border-white/20 bg-white/90 dark:bg-white/5 px-6 py-3 text-sm font-semibold text-[#121A2C] dark:text-white backdrop-blur-sm transition-colors duration-150 hover:border-[#121A2C] dark:hover:border-[#62C9C1] hover:bg-white dark:hover:bg-white/10 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0D9488]"
          >
            {eventData.secondaryCtaLabel}
          </button>

          {eventData.externalProposalFormUrl ? (
            <a
              href={eventData.externalProposalFormUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-3 py-2 text-sm font-medium text-[#52525B] dark:text-[#A1A1AA] transition-colors hover:text-[#121A2C] dark:hover:text-white whitespace-nowrap shrink-0"
            >
              {eventData.submitProposalLabel}
            </a>
          ) : (
            <button
              type="button"
              onClick={onOpenProposal}
              className="inline-flex cursor-pointer items-center px-3 py-2 text-sm font-medium text-[#52525B] dark:text-[#A1A1AA] transition-colors hover:text-[#121A2C] dark:hover:text-white whitespace-nowrap shrink-0"
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
            : {duration: 0.85, delay: 2.0, ease: [0.22, 1, 0.36, 1]}
        }
        className="absolute bottom-7 left-1/2 z-10 -translate-x-1/2 cursor-pointer flex flex-col items-center gap-1 text-xs font-medium tracking-wider uppercase text-[#71717A] dark:text-[#A1A1AA] transition-colors hover:text-[#121A2C] dark:hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0D9488]"
      >
        <span>Scroll</span>
        <ChevronDown className="h-4 w-4" aria-hidden="true" />
      </motion.button>
    </section>
  );
}
