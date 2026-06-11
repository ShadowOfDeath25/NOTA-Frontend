import { useTranslation } from "react-i18next";
import styles from "./HowItWorksSection.module.css";

export default function HowItWorksSection() {
  const { t } = useTranslation();

  const steps = [
    { key: "create", icon: "1" },
    { key: "organize", icon: "2" },
    { key: "collaborate", icon: "3" },
  ];

  return (
    <section id="how-it-works" className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <h2 className={styles.title}>{t("how_it_works_title", "How It Works")}</h2>
          <p className={styles.subtitle}>
            {t(
              "how_it_works_subtitle",
              "Get started in minutes. Three simple steps to transform your note-taking."
            )}
          </p>
        </div>

        <div className={styles.steps}>
          {steps.map((step, i) => (
            <div key={step.key} className={styles.step}>
              <div className={styles.stepNumber}>
                <span>{step.icon}</span>
              </div>
              <div className={styles.stepContent}>
                <h3 className={styles.stepTitle}>
                  {t(`step_${step.key}_title`,
                    step.key === "create"
                      ? "Create a Note"
                      : step.key === "organize"
                        ? "Organize & Tag"
                        : "Collaborate & Share"
                  )}
                </h3>
                <p className={styles.stepDesc}>
                  {t(`step_${step.key}_desc`,
                    step.key === "create"
                      ? "Start a new note. Write your thoughts, import a PDF, or use AI to generate content."
                      : step.key === "organize"
                        ? "Place notes in spaces, add tags, and use powerful search to find them instantly."
                        : "Invite your team to collaborate in real time on the same notes and spaces."
                  )}
                </p>
              </div>
              {i < steps.length - 1 && <div className={styles.connector} aria-hidden="true" />}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
