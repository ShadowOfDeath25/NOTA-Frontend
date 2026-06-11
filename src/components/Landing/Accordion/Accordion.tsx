import { useState, useId, type ReactNode } from "react";
import styles from "./Accordion.module.css";

interface AccordionItem {
  id: string;
  question: string;
  answer: ReactNode;
}

interface AccordionProps {
  items: AccordionItem[];
}

export default function Accordion({ items }: AccordionProps) {
  const baseId = useId();
  const [openId, setOpenId] = useState<string | null>(null);

  function toggle(id: string) {
    setOpenId((prev) => (prev === id ? null : id));
  }

  return (
    <div className={styles.accordion} role="region">
      {items.map((item) => {
        const isOpen = openId === item.id;
        const headingId = `${baseId}-heading-${item.id}`;
        const panelId = `${baseId}-panel-${item.id}`;

        return (
          <div key={item.id} className={styles.item}>
            <h3 className={styles.heading}>
              <button
                id={headingId}
                className={styles.trigger}
                onClick={() => toggle(item.id)}
                aria-expanded={isOpen}
                aria-controls={panelId}
              >
                <span>{item.question}</span>
                <svg
                  className={`${styles.chevron} ${isOpen ? styles.chevronOpen : ""}`}
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M4 6L8 10L12 6"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={headingId}
              className={`${styles.panel} ${isOpen ? styles.panelOpen : ""}`}
              hidden={!isOpen}
            >
              <div className={styles.panelContent}>{item.answer}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
