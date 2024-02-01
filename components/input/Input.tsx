//input
import { forwardRef } from "react";
import styles from "./Input.module.scss";
import clsx from "clsx";
import Image from "next/image";
import React from "react";

const eyeon = require("@/public/input/password-on.svg");
const eyeoff = require("@/public/input/password-off.svg");

interface InputProps {
  value?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: "email" | "password" | "text";
  placeholder?: string;
  //disabled?: boolean;
}

const Input: React.ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
  { type = "email", ...props },
  ref,
) => {
  const [showPassword, setShowPassword] = React.useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(prevShowPassword => !prevShowPassword);
  };

  const inputProps = {
    type: showPassword ? "text" : type,
    // disabled,
    ...props,
    ref: ref,
  };

  return (
    <div className={clsx(styles.inputContainer)}>
      <div className={clsx(styles.inputWrapper)}>
        <input
          // className={clsx(styles.input, {
          //   [styles.disabled]: disabled,
          // })}
          {...inputProps}
        />
        {type === "password" && (
          <button
            className={clsx(styles.togglePasswordButton)}
            onClick={togglePasswordVisibility}
          >
            <Image
              className={clsx(styles.togglePasswordButton)}
              src={showPassword ? eyeon : eyeoff}
              alt={showPassword ? "password-on" : "password-off"}
            />
          </button>
        )}
      </div>
    </div>
  );
};

export default forwardRef(Input);
