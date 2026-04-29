
import styles from './ToggleButton.module.css';

interface ToggleOption {
  label: string;
  value: string;
}

interface ToggleButtonProps {
  options: ToggleOption[];
  activeValue: string;
  onChange: (value: string) => void;
}

const ToggleButton: React.FC<ToggleButtonProps> = ({ options, activeValue, onChange }) => {
  return (
    <div className={styles.group}>
      {options.map((option) => (
        <button
          key={option.value}
          className={`${styles.button} ${activeValue === option.value ? styles.active : ''}`}
          onClick={() => onChange(option.value)}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
};

export default ToggleButton;