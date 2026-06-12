import { type ReactNode } from "react";
import { motion } from "framer-motion";

const easing = [0.16, 1, 0.3, 1] as const;

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

interface HeroEntranceProps {
  children: ReactNode;
  className?: string;
}

export function HeroEntrance({ children, className }: HeroEntranceProps) {
  return (
    <motion.div
      className={className}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {children}
    </motion.div>
  );
}

interface HeroItemProps {
  children: ReactNode;
  className?: string;
  distance?: number;
  duration?: number;
}

export function HeroItem({
  children,
  className,
  distance = 20,
  duration = 0.6,
}: HeroItemProps) {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: distance },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration,
            ease: easing,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
}
