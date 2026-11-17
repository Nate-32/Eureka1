/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import {MotionConfig} from 'motion/react';
import {useEffect, useState} from 'react';
import {About} from './components/About';
import {Contact} from './components/Contact';
import {Faq} from './components/Faq';
import {FinalCta} from './components/FinalCta';
import {Footer} from './components/Footer';
import {Hero} from './components/Hero';
import {Navbar} from './components/Navbar';
import {Prizes} from './components/Prizes';
import {ProposalModal} from './components/ProposalModal';
import {SectionReveal} from './components/SectionReveal';
import {Tracks} from './components/Tracks';

export type ThemeMode = 'light' | 'dark';

function getInitialTheme(): ThemeMode {
  if (typeof window === 'undefined') return 'light';
  try {
    const saved = window.localStorage.getItem('eureka-theme');
    if (saved === 'dark' || saved === 'light') return saved;
  } catch {
    // Ignore storage errors
  }
  return 'light';
}

export default function App() {
  const [proposalOpen, setProposalOpen] = useState(false);
  const [theme, setTheme] = useState<ThemeMode>(getInitialTheme);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    try {
      window.localStorage.setItem('eureka-theme', theme);
    } catch {
      // Ignore storage errors
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const openProposal = () => setProposalOpen(true);

  return (
    <MotionConfig reducedMotion="user">
      <div className="relative min-h-screen overflow-x-clip bg-white dark:bg-[#090B12] text-[#121A2C] dark:text-[#F4F4F5] transition-colors duration-300">
        <Navbar
          onOpenProposal={openProposal}
          theme={theme}
          onToggleTheme={toggleTheme}
        />

        <main>
          <Hero onOpenProposal={openProposal} theme={theme} />

          <SectionReveal>
            <About />
          </SectionReveal>

          <SectionReveal>
            <Tracks />
          </SectionReveal>

          <SectionReveal>
            <Prizes onOpenProposal={openProposal} />
          </SectionReveal>

          <SectionReveal>
            <FinalCta onOpenProposal={openProposal} />
          </SectionReveal>

          <SectionReveal>
            <Faq />
          </SectionReveal>

          <SectionReveal>
            <Contact />
          </SectionReveal>
        </main>

        <Footer onOpenProposal={openProposal} />

        <ProposalModal
          isOpen={proposalOpen}
          onClose={() => setProposalOpen(false)}
        />
      </div>
    </MotionConfig>
  );
}
