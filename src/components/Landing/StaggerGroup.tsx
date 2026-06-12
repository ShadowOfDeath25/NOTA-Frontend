import { type ReactNode, type ElementType } from "react";
import { motion } from "framer-motion";
import { useInView } from "../../hooks/useInView";

const easing = [0.16, 1, 0.3, 1] as const;

interface StaggerGroupProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
  distance?: number;
  duration?: number;
  as?: ElementType;
}

export default function StaggerGroup({
  children,
  className,
  staggerDelay = 0.08,
  distance = 24,
  duration = 0.5,
  as: Component = "div",
}: StaggerGroupProps) {
  const { ref, inView } = useInView();
  const MotionComponent = motion(Component);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: staggerDelay,
      },
    },
  };

  const childVariants = {
    hidden: { opacity: 0, y: distance },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration, ease: easing },
    },
  };

  return (
    <MotionComponent
      ref={ref}
      className={className}
      variants={containerVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
    >
      {Array.isArray(children)
        ? children.map((child, i) => (
            <motion.div key={i} variants={childVariants}>
              {child}
            </motion.div>
          ))
        : children}
    </MotionComponent>
  );
}

export function StaggerChild({
  children,
  className,
  distance = 24,
  duration = 0.5,
}: {
  children: ReactNode;
  className?: string;
  distance?: number;
  duration?: number;
}) {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: distance },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration, ease: easing },
        },
      }}
    >
      {children}
    </motion.div>
  );
}
