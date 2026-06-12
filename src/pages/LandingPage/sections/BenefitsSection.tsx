import { useTranslation } from "react-i18next";
import type { ComponentType, SVGProps } from "react";
import StarIcon from "@assets/icons/star.svg?react";
import LightIcon from "@assets/icons/light.svg?react";
import ChecklistIcon from "@assets/icons/checklist.svg?react";
import styles from "./BenefitsSection.module.css";

interface Benefit {
  key: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  gradient: string;
}

const benefits: Benefit[] = [
  { key: "focus", icon: StarIcon, gradient: "var(--gradient-purple-pink)" },
  { key: "speed", icon: LightIcon, gradient: "var(--gradient-blue-cyan)" },
  { key: "clarity", icon: ChecklistIcon, gradient: "var(--gradient-green)" },
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
          {benefits.map((b) => {
            const Icon = b.icon;
            return (
            <article key={b.key} className={styles.card}>
              <div className={styles.iconBox} style={{ background: b.gradient }}>
                <Icon width="24" height="24" stroke="currentColor" />
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
          );
          })}
        </div>
      </div>
    </section>
  );
}
