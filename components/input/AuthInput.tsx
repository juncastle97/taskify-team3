import styles from "./AuthInput.module.scss";
import clsx from "clsx";
import Image from "next/image";

interface AuthInputProps {
  label: string;
  type: string;
  error: string | undefined;
  placeholder: string;
  onKeyPress?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onChangeType?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  registerConfig: any;
}

const AuthInput = ({
  label,
  type,
  error,
  placeholder,
  onKeyPress,
  onChangeType,
  registerConfig,
}: AuthInputProps) => {
  return (
    <>
      <label className={clsx(styles.label)} htmlFor={label}>
        {label}
      </label>
      <div className={clsx(styles.inputBox)}>
        <input
          className={clsx(styles.input, { [styles.error]: error })}
          type={type}
          placeholder={placeholder}
          onKeyPress={onKeyPress}
          {...registerConfig}
        />
        {(type === "password" || type === "text") && onChangeType && (
        <button className={styles.imgWrapper} onClick={onChangeType} type="button" tabIndex={-1}>
          <Image
            src={`/input/password-${type === "password" ? "off" : "on"}.svg`}
            alt="eye-icon"
            width={24}
            height={24}
          />
        </button>
      )}
      </div>
      {error && <p className={clsx(styles.errorMessage)}>{error}</p>}
    </>
  );
};

export default AuthInput;
