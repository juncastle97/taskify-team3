import { ReactNode, MouseEvent } from "react";
import styles from "./BaseButton.module.scss";
import clsx from "clsx";

interface BaseButtonProps {
  children: ReactNode;
  type?: "button" | "submit";
  disabled?: boolean;
  small?: boolean;
  white?: boolean;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void; // 새로 추가된 프로퍼티
}

const BaseButton: React.FC<BaseButtonProps> = ({
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
        {...buttonProps}
      >
        {children}
      </span>
    </button>
  );
};

export default BaseButton;
