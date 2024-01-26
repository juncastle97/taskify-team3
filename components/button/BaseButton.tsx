import React from "react";
import clsx from "clsx";
import styles from "./BaseButton.module.scss";

interface ButtonProps {
  children: React.ReactNode;
  type?: "button" | "submit";
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  type = "button",
  disabled = false,
  ...props
}) => {
  const buttonProps = { type, disabled, ...props };

  return (
    <button className={clsx(styles["button-wrapper"])} {...buttonProps}>
      <span className={clsx(styles["button-text"])}>{children}</span>
    </button>
  );
};

export default Button;
