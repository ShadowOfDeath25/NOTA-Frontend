import { useTranslation } from "react-i18next";
import styles from "./TestimonialsSection.module.css";

const gradientMap: Record<string, string> = {
  purple: "var(--gradient-purple-pink)",
  blue: "var(--gradient-blue-cyan)",
  green: "var(--gradient-green)",
};

const testimonials = [
  {
    key: "sarah",
    gradient: "purple",
  },
  {
    key: "marcus",
    gradient: "blue",
  },
  {
    key: "elena",
    gradient: "green",
  },
];

function InitialsCircle({ initials, gradient }: { initials: string; gradient: string }) {
  return (
    <div className={styles.avatar} style={{ background: gradient }}>
      <span>{initials}</span>
    </div>
  );
}

export default function TestimonialsSection() {
  const { t } = useTranslation();

  return (
    <section id="testimonials" className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <h2 className={styles.title}>{t("testimonials_title", "Loved by Teams Everywhere")}</h2>
          <p className={styles.subtitle}>
            {t(
              "testimonials_subtitle",
              "See what our users say about their experience with Nota."
            )}
          </p>
        </div>

        <div className={styles.grid}>
          {testimonials.map((t_) => (
            <article key={t_.key} className={styles.card}>
              <div className={styles.stars} aria-label="5 stars">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path d="M8 1L10.2 5.6L15 6.3L11.5 9.7L12.4 14.5L8 12.2L3.6 14.5L4.5 9.7L1 6.3L5.8 5.6L8 1Z" fill="#9810fa" />
                  </svg>
                ))}
              </div>
              <blockquote className={styles.quote}>
                &ldquo;{t(`testimonial_${t_.key}_quote`,
                  t_.key === "sarah"
                    ? "Nota transformed how our team works. The real-time collaboration and AI feature save us hours every week."
                    : t_.key === "marcus"
                      ? "Best note-taking platform I have ever used. The organization and search are incredible. Highly recommend."
                      : "Research writing requires meticulous organization. Nota makes tracking sources, ideas, and collaborating with peers effortless."
                )}&rdquo;
              </blockquote>
              <div className={styles.author}>
                <InitialsCircle
                  initials={t(`testimonial_${t_.key}_initials`,
                    t_.key === "sarah" ? "SK" : t_.key === "marcus" ? "MJ" : "EC"
                  )}
                  gradient={gradientMap[t_.gradient]}
                />
                <div className={styles.authorInfo}>
                  <span className={styles.authorName}>
                    {t(`testimonial_${t_.key}_name`,
                      t_.key === "sarah" ? "Sarah K." : t_.key === "marcus" ? "Marcus J." : "Elena C."
                    )}
                  </span>
                  <span className={styles.authorRole}>
                    {t(`testimonial_${t_.key}_role`,
                      t_.key === "sarah"
                        ? "Product Manager"
                        : t_.key === "marcus"
                          ? "Software Developer"
                          : "Researcher"
                    )}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
