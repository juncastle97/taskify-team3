import React, { useState } from "react";
import styles from "./Input.module.scss";
import clsx from "clsx";

interface InputProps {
  value?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: "email" | "password";
  placeholder?: string;
  disabled?: boolean;
}

const Input: React.FC<InputProps> = ({
  type = "email",
  disabled = false,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isError, setIsError] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(prevShowPassword => !prevShowPassword);
  };

  const inputProps = {
    type: showPassword ? "text" : type,
    disabled,
    ...props,
  };

  return (
    <div className={clsx(styles.inputContainer)}>
      <label>{type === "email" ? "이메일" : "비밀번호"}</label>
      <input
        className={clsx(styles.input, {
          [styles.disabled]: disabled,
        })}
        {...inputProps}
        placeholder={
          type === "email" ? "이메일을 입력해주세요" : "비밀번호를 입력해주세요"
        }
      />
      {type === "password" && (
        <button
          type="button"
          className={styles.togglePasswordButton}
          onClick={togglePasswordVisibility}
        >
          {showPassword ? "password-on" : "password-off"}
        </button>
      )}
    </div>
  );
};

export default Input;
