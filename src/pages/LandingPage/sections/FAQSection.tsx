import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import Accordion from "@components/Landing/Accordion/Accordion.tsx";
import Reveal from "@components/Landing/Reveal.tsx";
import styles from "./FAQSection.module.css";

const accordionVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.06,
    },
  },
};

export default function FAQSection() {
  const { t } = useTranslation();

  const faqItems = [
    { id: "faq-1", key: "what_is_nota" },
    { id: "faq-2", key: "free_tier" },
    { id: "faq-3", key: "collaboration" },
    { id: "faq-4", key: "platforms" },
    { id: "faq-5", key: "privacy" },
  ];

  const items = faqItems.map((item) => ({
    id: item.id,
    question: t(`faq_${item.key}_q`,
      item.key === "what_is_nota"
        ? "What is Nota?"
        : item.key === "free_tier"
          ? "Is there a free tier?"
          : item.key === "collaboration"
            ? "How does real-time collaboration work?"
            : item.key === "platforms"
              ? "What platforms are supported?"
              : "How does Nota protect my data privacy?"
    ),
    answer: t(`faq_${item.key}_a`,
      item.key === "what_is_nota"
        ? "Nota is an AI-powered note-taking platform that lets you capture ideas, organize knowledge, and collaborate with your team in real time. It fully supports both Arabic and English."
        : item.key === "free_tier"
          ? "Yes! Nota offers a generous free tier that includes unlimited notes and spaces, plus collaboration with up to 3 team members."
          : item.key === "collaboration"
            ? "Real-time collaboration lets you work on the same note with your team simultaneously. You see changes instantly with active user indicators."
            : item.key === "platforms"
              ? "Nota works on all modern web browsers. It is currently available as a web app, with mobile (iOS & Android) and desktop apps on the roadmap."
              : "We take privacy seriously. All data is encrypted in transit and at rest. We never share your data with third parties."
    ),
  }));

  return (
    <section id="faq" className={styles.section}>
      <div className={styles.inner}>
        <Reveal as="header" className={styles.header}>
          <h2 className={styles.title}>{t("faq_title", "Frequently Asked Questions")}</h2>
          <p className={styles.subtitle}>
            {t(
              "faq_subtitle",
              "Have questions? We have answers. If you can not find what you are looking for, feel free to contact us."
            )}
          </p>
        </Reveal>

        <motion.div
          className={styles.accordionWrapper}
          variants={accordionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          <Accordion items={items} />
        </motion.div>
      </div>
    </section>
  );
}
