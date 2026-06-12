import { Fragment } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import Reveal from "@components/Landing/Reveal.tsx";
import styles from "./HowItWorksSection.module.css";

const easing = [0.16, 1, 0.3, 1] as const;

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const stepVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: easing },
  },
};

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
        <Reveal as="header" className={styles.header}>
          <h2 className={styles.title}>{t("how_it_works_title", "How It Works")}</h2>
          <p className={styles.subtitle}>
            {t(
              "how_it_works_subtitle",
              "Get started in minutes. Three simple steps to transform your note-taking."
            )}
          </p>
        </Reveal>

        <motion.div
          className={styles.steps}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          {steps.map((step, i) => (
            <Fragment key={step.key}>
              <motion.div className={styles.step} variants={stepVariants}>
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
              </motion.div>
              {i < steps.length - 1 && <div className={styles.connector} aria-hidden="true" />}
            </Fragment>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
