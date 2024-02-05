import styles from "./AuthInput.module.scss";
import clsx from "clsx";
import Image from "next/image";

interface AuthInputProps {
  className?: string;
  label: string;
  type: string;
  error?: string | undefined;
  placeholder?: string;
  id?: string;
  value?: string;
  onKeyPress?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onChangeType?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  defaultValue?: string;
  registerConfig: {
    readOnly?: boolean;
    onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
    ref?: React.RefCallback<HTMLInputElement>;
    name?: string;
  };
}

const AuthInput = ({
  label,
  type,
  error,
  id,
  placeholder,
  value,
  defaultValue,
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
          id={id}
          placeholder={placeholder}
          value={value}
          defaultValue={defaultValue}
          onKeyPress={onKeyPress}
          {...registerConfig}
        />
        {(type === "password" || type === "text") && onChangeType && (
          <button
            className={styles.imgWrapper}
            onClick={onChangeType}
            type="button"
            tabIndex={-1}
          >
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
