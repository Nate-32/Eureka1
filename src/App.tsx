/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import {MotionConfig} from 'motion/react';
import {useState} from 'react';
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

export default function App() {
  const [proposalOpen, setProposalOpen] = useState(false);

  const openProposal = () => setProposalOpen(true);

  return (
    <MotionConfig reducedMotion="user">
      <div className="relative min-h-screen overflow-x-clip bg-white text-[#121A2C]">
        <Navbar onOpenProposal={openProposal} />

        <main>
          <Hero onOpenProposal={openProposal} />

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
