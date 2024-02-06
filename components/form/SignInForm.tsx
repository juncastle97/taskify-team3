import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import styles from "./Form.module.scss";
import clsx from "clsx";
import AuthInput from "../input/AuthInput";
import Button from "../button/baseButton/BaseButton";
import { regEmail, regPassword } from "@/utils/regexp";
import axios from "@/lib/axios";
import { useAuth } from "@/contexts/AuthProvider";
import AlertModal from "../modal/alertModal";

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
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const { login } = useAuth();

  const watchEmail = watch("email", "");
  const watchPassword = watch("password", "");

  const openModal = (error: string) => {
    setIsOpen(true);
    setErrorMessage(error);
  };

  const closeModal = () => {
    setIsOpen(false);
    setErrorMessage("");
  };

  const togglePasswordVisibility = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setPasswordInputType(prev => (prev === "password" ? "text" : "password"));
  };

  const onSubmit: SubmitHandler<SignForm> = async data => {
    try {
      await login(data);
    } catch (error: any) {
      if (error.response) {
        openModal(error.response.data.message);
      } else {
        openModal("로그인 실패");
      }
    }
  };

  const handleOnKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (!errors.email && !errors.password && isValid) {
        handleSubmit(onSubmit);
      }
    }
  };

  return (
    <form className={styles.signContainer} onSubmit={handleSubmit(onSubmit)}>
      {isOpen && (
        <AlertModal
          setModal={setIsOpen}
          alertMessage={errorMessage}
          onConfirmClick={closeModal}
        />
      )}
      <div>
        <div className={clsx(styles.inputs)}>
          <AuthInput
            label="이메일"
            type="email"
            error={errors.email?.message}
            placeholder="이메일을 입력해 주세요."
            registerConfig={{
              ...register("email", {
                required: "이메일을 입력해 주세요.",
                pattern: {
                  value: regEmail,
                  message: "올바른 이메일 주소가 아닙니다.",
                },
              }),
              readOnly: false,
            }}
          />
        </div>
        <div className={clsx(styles.wrapper)}>
          <div className={clsx(styles.inputs)}>
            <AuthInput
              label="비밀번호"
              type={passwordInputType}
              error={errors.password?.message}
              placeholder="비밀번호를 입력해 주세요."
              onKeyPress={handleOnKeyPress}
              onChangeType={togglePasswordVisibility}
              registerConfig={{
                ...register("password", {
                  required: "비밀번호를 입력해 주세요.",
                  pattern: {
                    value: regPassword,
                    message:
                      "비밀번호는 영문,숫자 조합 8자 이상 입력해 주세요.",
                  },
                }),
                readOnly: false,
              }}
            />
          </div>
        </div>
        <div className={clsx(styles.signupBtn)}>
          <Button
            type="submit"
            disabled={!watchEmail || !watchPassword || !isValid}
          >
            로그인
          </Button>
        </div>
      </div>
    </form>
  );
};

export default SignInForm;
