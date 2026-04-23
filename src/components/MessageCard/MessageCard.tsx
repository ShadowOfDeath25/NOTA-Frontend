import styles from "./MessageCard.module.css";

interface MessageCardProps {
  message: string;
}

const MessageCard = ({ message }: MessageCardProps) => {
  if (!message) return null;

  return (
    <div className={`${styles.alert}`}>
      <p className="bodyText">{message}</p>
    </div>
  );
};

export default MessageCard;