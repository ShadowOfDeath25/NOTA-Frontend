import { useTranslation } from "react-i18next";
import styles from "./FeaturesSection.module.css";

interface Feature {
  key: string;
  icon: "purple" | "blue" | "green";
  gradient: string;
}

const features: Feature[] = [
  { key: "ai_powered", icon: "purple", gradient: "var(--gradient-purple-pink)" },
  { key: "real_time", icon: "blue", gradient: "var(--gradient-blue-cyan)" },
  { key: "organization", icon: "green", gradient: "var(--gradient-green)" },
  { key: "collaboration", icon: "purple", gradient: "var(--gradient-purple-pink)" },
  { key: "markdown", icon: "blue", gradient: "var(--gradient-blue-cyan)" },
  { key: "cross_platform", icon: "green", gradient: "var(--gradient-green)" },
];

function FeatureIcon({ gradient }: { gradient: string }) {
  return (
    <div className={styles.iconBox} style={{ background: gradient }}>
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <path d="M4 10L8 14L16 6" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

export default function FeaturesSection() {
  const { t } = useTranslation();

  return (
    <section id="features" className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <h2 className={styles.title}>{t("features_title", "Everything You Need to Stay Organized")}</h2>
          <p className={styles.subtitle}>
            {t(
              "features_subtitle",
              "Powerful features designed to help you capture, organize, and share your knowledge effortlessly."
            )}
          </p>
        </div>

        <div className={styles.grid}>
          {features.map((f) => (
            <article key={f.key} className={styles.card}>
              <FeatureIcon gradient={f.gradient} />
              <h3 className={styles.cardTitle}>
                {t(`feature_${f.key}_title`, f.key.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()))}
              </h3>
              <p className={styles.cardDesc}>
                {t(
                  `feature_${f.key}_desc`,
                  `Description for ${f.key.replace(/_/g, " ")} feature.`
                )}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
