import { type ReactNode, type ElementType } from "react";
import { motion } from "framer-motion";

const easing = [0.16, 1, 0.3, 1] as const;

interface FadeUpProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  distance?: number;
  as?: ElementType;
}

export default function FadeUp({
  children,
  className,
  delay = 0,
  duration = 0.6,
  distance = 24,
  as: Component = "div",
}: FadeUpProps) {
  const MotionComponent = motion(Component);

  return (
    <MotionComponent
      className={className}
      initial={{ opacity: 0, y: distance }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration,
        delay,
        ease: easing,
      }}
    >
      {children}
    </MotionComponent>
  );
}
