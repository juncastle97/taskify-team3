import React from "react";
import clsx from "clsx";
import styles from "./CommonButton.module.scss";

interface CommonbuttonProps {
  children: React.ReactNode;
  type?: "accept" | "deny";
  size?: "string";
  disabled?: boolean;
  onClick?: () => void;
}

const Commonbutton: React.FC<CommonbuttonProps> = ({
  children,
  type = "accept",
  onClick,
  disabled = false, //accept누르면 deny버튼 비활성화, deny버튼 누르면 accept 버튼 비활성화
  ...props
}) => {
  return (
    <button
      className={clsx({
        [styles.accept]: type === "accept",
        [styles.deny]: type === "deny",
      })}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      <span className={styles.buttonText}>{children}</span>
    </button>
  );
};

export default Commonbutton;
