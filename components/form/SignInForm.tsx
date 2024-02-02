import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "@/lib/axios";
import Image from "next/image";
import styles from "./Form.module.scss";
import clsx from "clsx";
import AuthInput from "../input/AuthInput";
import Button from "../button/baseButton/BaseButton";
import { regEmail, regPassword } from "@/utils/regexp";

interface SignForm {
  email: string;
  nickname?: string;
  password: string;
  passwordConfirm?: string;
}

const SignInForm = () => {
  const {
    register,
    handleSubmit,
    setError,
    watch,
    formState: { errors, isValid },
  } = useForm<SignForm>({ mode: "onBlur" });
  const [passwordInputType, setPasswordInputType] =
    useState<string>("password");

  const watchEmail = watch("email", "");
  const watchPassword = watch("password", "");

  const togglePasswordVisibility = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setPasswordInputType(prev => (prev === "password" ? "text" : "password"));
  };

  const onSubmit = () => {};

  const handleOnKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (!errors.email && !errors.password && isValid) {
        handleSubmit(onSubmit)();
      }
    }
  };

  return (
    <form className={styles.signContainer} onSubmit={handleSubmit(onSubmit)}>
      <div>
        <AuthInput
          label="이메일"
          type="email"
          error={errors.email?.message}
          placeholder="이메일을 입력해 주세요."
          registerConfig={register("email", {
            required: "이메일을 입력해 주세요.",
            pattern: {
              value: regEmail,
              message: "올바른 이메일 주소가 아닙니다.",
            },
          })}
        />
      </div>
      <div className={clsx(styles.wrapper)}>
        <AuthInput
          label="비밀번호"
          type={passwordInputType}
          error={errors.password?.message}
          placeholder="비밀번호를 입력해 주세요."
          onKeyPress={handleOnKeyPress}
          onChangeType={togglePasswordVisibility}
          registerConfig={register("password", {
            required: "비밀번호를 입력해 주세요.",
            pattern: {
              value: regPassword,
              message: "비밀번호는 영문,숫자 조합 8자 이상 입력해 주세요.",
            },
          })}
        />
      </div>
      <div className={clsx(styles.signupBtn)}>
        <Button type="submit" disabled={!watchEmail || !watchPassword || !isValid}>로그인</Button>
      </div>
    </form>
  );
};

export default SignInForm;
