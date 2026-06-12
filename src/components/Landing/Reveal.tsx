import { type ReactNode, type ElementType } from "react";
import { motion } from "framer-motion";
import { useInView } from "../../hooks/useInView";

const easing = [0.16, 1, 0.3, 1] as const;

interface RevealProps {
  children: ReactNode;
  className?: string;
  direction?: "up" | "down" | "none";
  distance?: number;
  duration?: number;
  delay?: number;
  as?: ElementType;
}

const directionMap = {
  up: 30,
  down: -30,
  none: 0,
};

export default function Reveal({
  children,
  className,
  direction = "up",
  distance,
  duration = 0.6,
  delay = 0,
  as: Component = "div",
}: RevealProps) {
  const { ref, inView } = useInView();
  const MotionComponent = motion(Component);

  const offset = distance ?? directionMap[direction];

  return (
    <MotionComponent
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: offset }}
      animate={
        inView
          ? { opacity: 1, y: 0 }
          : { opacity: 0, y: offset }
      }
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
