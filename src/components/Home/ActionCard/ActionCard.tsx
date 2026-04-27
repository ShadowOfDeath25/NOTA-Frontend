import styles from './ActionCard.module.css';

type ActionCardProps = {
    title: string,
    description: string,
    icon: string,
    iconColorClass: "blueIcon" | "greenIcon" | "purpleIcon",
    onClick: () => void,
}
const ActionCard = ({title, description, icon, iconColorClass, onClick}: ActionCardProps) => {
    return (
        <button className={`${styles.card}`} onClick={onClick}>
            <div className={`${styles.iconContainer} ${styles[iconColorClass]}`}>
                <img src={icon} alt="add icon"/>
            </div>
            <div className={styles.textContainer}>
                <h3 className={`${styles.title} bodyText`}>{title}</h3>
                <p className={`${styles.description} bodyTextSm`}>{description}</p>
            </div>
        </button>
    );
};

export default ActionCard;