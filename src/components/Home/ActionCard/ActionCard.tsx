import styles from './ActionCard.module.css';

import type React from "react";

type ActionCardProps = {
    title: string,
    description: string,
    icon: React.FC<React.SVGProps<SVGSVGElement>>,
    iconColorClass: "blueIcon" | "greenIcon" | "purpleIcon",
    onClick: () => void,
}
const ActionCard = ({title, description, icon: Icon, iconColorClass, onClick}: ActionCardProps) => {
    return (
        <button className={`${styles.card}`} onClick={onClick}>
            <div className={`${styles.iconContainer} ${styles[iconColorClass]}`}>
                <Icon />
            </div>
            <div className={styles.textContainer}>
                <h3 className={`${styles.title} bodyText`}>{title}</h3>
                <p className={`${styles.description} bodyTextSm`}>{description}</p>
            </div>
        </button>
    );
};

export default ActionCard;