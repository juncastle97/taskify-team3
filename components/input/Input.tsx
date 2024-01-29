import React, { useState } from "react";
import styles from "./Input.module.scss";
import clsx from "clsx";
import Image from "next/image";

const eyeon = require("@/public/input/password-on.svg");
const eyeoff = require("@/public/input/password-off.svg");


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
      <label className={clsx(styles.label)}>
        {type === "email" ? "이메일" : "비밀번호"}
      </label>
      <div className={clsx(styles.inputWrapper)}>
        <input
          className={clsx(styles.input, {
            [styles.disabled]: disabled,
          })}
          {...inputProps}
          placeholder={
            type === "email"
              ? "이메일을 입력해주세요"
              : "비밀번호를 입력해주세요"
          }
        />
        {type === "password" && (
          <button
            className={clsx(styles.togglePasswordButton)}
            onClick={togglePasswordVisibility}
          >
            <Image
              className={clsx(styles.togglePasswordButton)}
              src={showPassword ? eyeon : eyeoff}
              alt={showPassword ? "passworㅌd-on" : "password-off"}
            />
          </button>
        )}
      </div>
    </div>
  );
};

export default Input;
