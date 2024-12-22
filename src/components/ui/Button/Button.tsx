import styles from "./Button.module.scss";

type ButtonProps = {
  text: string;
  color?: "primary" | "secondary" | "warning";
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

const Button: React.FC<ButtonProps> = ({
  text,
  color = "primary",
  disabled = false,
  type = "button",
  onClick,
}) => {
  return (
    <button
      className={`${styles.button} ${styles[color]}`}
      onClick={onClick}
      disabled={disabled}
      type={type}
    >
      {text}
    </button>
  );
};

export default Button;
