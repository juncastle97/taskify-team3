// BaseButton.tsx

import React, { ReactNode, MouseEvent } from "react";
import styles from "./BaseButton.module.scss";
import clsx from "clsx";

interface BaseButtonProps {
  children: ReactNode;
  type?: "button" | "submit";
  disabled?: boolean;
  small?: boolean;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void; // 새로 추가된 프로퍼티
}

const BaseButton: React.FC<BaseButtonProps> = ({
  children,
  type = "button",
  disabled = false,
  small = false,
  onClick,
  ...props
}) => {
  const buttonProps = { type, disabled, ...props };

  return (
    <button
      className={clsx(styles["button-wrapper"])}
      onClick={onClick}
      {...buttonProps}
    >
      <span className={clsx(styles["button-text"], small && styles.small)}>
        {children}
      </span>
    </button>
  );
};

export default BaseButton;
