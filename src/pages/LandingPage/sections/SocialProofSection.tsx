import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { useInView } from "../../../hooks/useInView";
import styles from "./SocialProofSection.module.css";

const easing = [0.16, 1, 0.3, 1] as const;

const metrics = [
  { value: "10K+", key: "users", label: "users" },
  { value: "50K+", key: "notes_created", label: "Notes Created" },
  { value: "4.9", key: "rating", label: "Average Rating" },
  { value: "99%", key: "uptime", label: "Uptime" },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0,
    },
  },
};

const childVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: easing },
  },
};

export default function SocialProofSection() {
  const { t } = useTranslation();
  const { ref, inView } = useInView();

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <motion.div
          ref={ref}
          className={styles.grid}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {metrics.map((m) => (
            <motion.div key={m.key} className={styles.metric} variants={childVariants}>
              <span className={styles.value}>{m.value}</span>
              <span className={styles.label}>{t(m.key, m.label)}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
