import { useTranslation } from "react-i18next";
import type { ComponentType, SVGProps } from "react";
import { motion } from "framer-motion";
import AiIcon from "@assets/icons/ai.svg?react";
import CloudIcon from "@assets/icons/cloud.svg?react";
import FilesIcon from "@assets/icons/files.svg?react";
import CollaborateIcon from "@assets/icons/collaborate.svg?react";
import PenIcon from "@assets/icons/pen.svg?react";
import WorldIcon from "@assets/icons/world.svg?react";
import Reveal from "@components/Landing/Reveal.tsx";
import styles from "./FeaturesSection.module.css";

const easing = [0.16, 1, 0.3, 1] as const;

interface Feature {
  key: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  gradient: string;
}

const features: Feature[] = [
  { key: "ai_powered", icon: AiIcon, gradient: "var(--gradient-purple-pink)" },
  { key: "real_time", icon: CloudIcon, gradient: "var(--gradient-blue-cyan)" },
  { key: "organization", icon: FilesIcon, gradient: "var(--gradient-green)" },
  { key: "collaboration", icon: CollaborateIcon, gradient: "var(--gradient-purple-pink)" },
  { key: "rich_text", icon: PenIcon, gradient: "var(--gradient-blue-cyan)" },
  { key: "cross_platform", icon: WorldIcon, gradient: "var(--gradient-green)" },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: easing },
  },
};

function FeatureIcon({ icon: Icon, gradient }: { icon: ComponentType<SVGProps<SVGSVGElement>>; gradient: string }) {
  return (
    <div className={styles.iconBox} style={{ background: gradient }}>
      <Icon width="20" height="20" stroke="currentColor" />
    </div>
  );
}

export default function FeaturesSection() {
  const { t } = useTranslation();

  return (
    <section id="features" className={styles.section}>
      <div className={styles.inner}>
        <Reveal as="header" className={styles.header}>
          <h2 className={styles.title}>{t("features_title", "Everything You Need to Stay Organized")}</h2>
          <p className={styles.subtitle}>
            {t(
              "features_subtitle",
              "Powerful features designed to help you capture, organize, and share your knowledge effortlessly."
            )}
          </p>
        </Reveal>

        <motion.div
          className={styles.grid}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          {features.map((f) => (
            <motion.article key={f.key} className={styles.card} variants={cardVariants}>
              <FeatureIcon icon={f.icon} gradient={f.gradient} />
              <h3 className={styles.cardTitle}>
                {t(`feature_${f.key}_title`, f.key.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()))}
              </h3>
              <p className={styles.cardDesc}>
                {t(`feature_${f.key}_desc`,
                  f.key === "ai_powered"
                    ? "Get smart summaries and deep analysis of your note content with one click."
                    : f.key === "real_time"
                      ? "Work with your team on the same note simultaneously with instant synchronization."
                      : f.key === "organization"
                        ? "Organize notes into spaces and categories with smart tagging and powerful search."
                        : f.key === "collaboration"
                          ? "Share notes and spaces with team members with granular permission controls."
                          : f.key === "rich_text"
                            ? "Write with rich formatting including headings, lists, tables, and more."
                            : "Access your notes from any device, anytime, with secure cloud sync."
                )}
              </p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
