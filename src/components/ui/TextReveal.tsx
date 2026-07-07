import React from 'react';
import { motion } from 'framer-motion';

export type TextRevealProps = {
  text: string;
  className?: string;
  style?: React.CSSProperties;
  delay?: number;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span';
  trigger?: 'whileInView' | 'animate';
};

export function TextReveal({
  text,
  className,
  style,
  delay = 0,
  as: Component = 'h2',
  trigger = 'whileInView',
}: TextRevealProps) {
  const lines = text.split('\n');

  const animationProps = {
    initial: { y: '102%' },
    [trigger === 'animate' ? 'animate' : 'whileInView']: { y: 0 },
  };

  return (
    <Component className={className} style={style}>
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden pb-1">
          <motion.span
            className="block"
            {...animationProps}
            viewport={{ once: true, amount: 0.1 }}
            transition={{
              duration: 0.8,
              ease: [0.16, 1, 0.3, 1],
              delay: delay + i * 0.1,
            }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </Component>
  );
}
