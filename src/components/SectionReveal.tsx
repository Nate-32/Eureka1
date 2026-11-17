import type {ReactNode} from 'react';
import {motion} from 'motion/react';

interface SectionRevealProps {
  children: ReactNode;
}

export function SectionReveal({children}: SectionRevealProps) {
  return (
    <motion.div
      initial={{opacity: 0, y: 16}}
      whileInView={{opacity: 1, y: 0}}
      viewport={{once: true, amount: 0.08}}
      transition={{duration: 0.5, ease: [0.16, 1, 0.3, 1]}}
    >
      {children}
    </motion.div>
  );
}
