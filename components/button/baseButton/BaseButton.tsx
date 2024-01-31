import React from "react";
import clsx from "clsx";
import styles from "./BaseButton.module.scss";

interface ButtonProps {
  children: React.ReactNode;
  type?: "button" | "submit";
  disabled?: boolean;
  small?: boolean;
  white?: boolean;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({
  children,
  type = "button",
  disabled = false,
  small = false,
  white = false,
  onClick,
  ...props
}) => {
  const buttonProps = { type, disabled, ...props };

  return (
    <button
      className={clsx(styles.buttonWrapper, white && styles.white)}
      {...buttonProps}
    >
      <span
        className={clsx(
          styles.buttonText,
          small && styles.small,
          white && styles.white,
        )}
        onClick={onClick}
      >
        {children}
      </span>
    </button>
  );
};

export default Button;
