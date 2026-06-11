import { useTranslation } from "react-i18next";
import styles from "./BenefitsSection.module.css";

const gradientMap: Record<string, string> = {
  purple: "var(--gradient-purple-pink)",
  blue: "var(--gradient-blue-cyan)",
  green: "var(--gradient-green)",
};

const benefits = [
  {
    key: "focus",
    icon: "purple",
  },
  {
    key: "speed",
    icon: "blue",
  },
  {
    key: "clarity",
    icon: "green",
  },
];

export default function BenefitsSection() {
  const { t } = useTranslation();

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <h2 className={styles.title}>{t("benefits_title", "Why Teams Choose Nota")}</h2>
          <p className={styles.subtitle}>
            {t(
              "benefits_subtitle",
              "We focus on outcomes that matter to your productivity and peace of mind."
            )}
          </p>
        </div>

        <div className={styles.grid}>
          {benefits.map((b) => (
            <article key={b.key} className={styles.card}>
              <div className={styles.iconBox} style={{ background: gradientMap[b.icon] }}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                  <path d="M10 2L12.9 8.1L19 9L14.5 13.2L16 20L10 16.5L4 20L5.5 13.2L1 9L7.1 8.1L10 2Z" stroke="#fff" strokeWidth="1.5" strokeLinejoin="round" />
                </svg>
              </div>
              <h3 className={styles.cardTitle}>
                {t(`benefit_${b.key}_title`,
                  b.key === "focus"
                    ? "Focus on What Matters"
                    : b.key === "speed"
                      ? "Work Faster"
                      : "Achieve Clarity"
                )}
              </h3>
              <p className={styles.cardDesc}>
                {t(`benefit_${b.key}_desc`,
                  b.key === "focus"
                    ? "Say goodbye to tool sprawl. Everything you need in one place keeps you focused on your work."
                    : b.key === "speed"
                      ? "With AI, you can summarize and analyze notes in seconds, saving hours of manual work."
                      : "Structured knowledge ensures your ideas and projects are always clear and easy to navigate."
                )}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
