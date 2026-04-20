'use client';

import { motion, useReducedMotion, type Variants } from 'framer-motion';
import { type ReactNode } from 'react';

type Props = {
  children: ReactNode;
  delay?: number;
  className?: string;
  stagger?: boolean;
  amount?: number;
};

export function SectionReveal({ children, delay = 0, className, stagger = false, amount = 0.2 }: Props) {
  const reduce = useReducedMotion();

  const variants: Variants = reduce
    ? { hidden: { opacity: 1 }, show: { opacity: 1 } }
    : {
        hidden: { opacity: 0, y: 24 },
        show: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1],
            delay,
            ...(stagger && { staggerChildren: 0.08 }),
          },
        },
      };

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount }}
      variants={variants}
    >
      {children}
    </motion.div>
  );
}
