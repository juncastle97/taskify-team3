import React, { useEffect, useState } from "react";
import clsx from "clsx";
import styles from "./PasswordChangeForm.module.scss";
import axios from "@/lib/axios";
import { useForm, FieldError, FieldValues } from "react-hook-form";
import authInstance from "@/lib/axios";
import { PutPasswordInfoProps } from "@/types/users";
import MismatchModal from "@/components/modal/mismatchModal/MismatchModal";
import BaseButton from "@/components/button/baseButton/BaseButton";
import AuthInput from "@/components/input/AuthInput";
import { regPassword } from "@/utils/regexp";
function PasswordChangeForm() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors, isSubmitted },
    watch,
    setError,
    clearErrors,
    getValues,
    setValue,
  } = useForm<FieldValues>({ mode: "onBlur" });

  const passwordInputs = ["password", "newPassword", "newPasswordCheck"];
  const [isButtonDisabled, setButtonDisabled] = useState(true);

  // Put Password API
  const editPassword = async (data: PutPasswordInfoProps) => {
    try {
      const response = await authInstance.put("auth/password", data);
      return response.data;
    } catch (error: any) {
      return error.response;
    }
  };

  useEffect(() => {
    const inputChangeHandler = () => {
      const areInputsValid = passwordInputs.every(id => {
        const inputElement = document.getElementById(id) as HTMLInputElement;
        return inputElement && inputElement.value.trim() !== "";
      });

      setButtonDisabled(!areInputsValid);
    };

    passwordInputs.forEach(id => {
      const inputElement = document.getElementById(id);

      if (inputElement) {
        inputElement.addEventListener("input", inputChangeHandler, false);
      }
    });

    return () => {
      passwordInputs.forEach(id => {
        const inputElement = document.getElementById(id);
        if (inputElement) {
          inputElement.removeEventListener("input", inputChangeHandler);
        }
      });
    };
  }, [watch]);

  // 새 비밀번호 확인
  const password = watch("password");
  const newPassword = watch("newPassword");
  const newPasswordCheck = watch("newPasswordCheck");

  useEffect(() => {
    if (newPassword !== newPasswordCheck && newPasswordCheck) {
      setError("newPasswordCheck", {
        type: "manual",
        message: "새 비밀번호가 일치하지 않습니다.",
      });
    } else {
      clearErrors("newPasswordCheck");
    }
  }, [newPassword, newPasswordCheck, setError, clearErrors]);

  const handleChangeButtonClick = async () => {
    try {
      await handleSubmit(async data => {
        const response = await editPassword({
          password: data.password,
          newPassword: data.newPassword,
        });

        if (response.status === 400) {
          setIsModalOpen(true);
        } else {
          // 성공 시 처리
          alert("비밀번호가 변경되었습니다.");
          setValue("password", "");
          setValue("newPassword", "");
          setValue("newPasswordCheck", "");
        }
      })();
    } catch (error) {
      console.error("데이터 처리 중 에러:", error);
      // 에러 처리 로직 추가
    }
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleModalOpen = () => {
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <MismatchModal isOpen={isModalOpen} setIsOpen={handleCloseModal}>
        현재 비밀번호가 틀렸습니다.
      </MismatchModal>

      <form onSubmit={handleSubmit(data => alert(JSON.stringify(data)))}>
        <div className={clsx(styles.inputs)}>
          <AuthInput
            label="현재 비밀번호"
            id="password"
            type="password"
            placeholder="현재 비밀번호 입력"
            error={errors.password?.message as string}
            registerConfig={{
              ...register("password", {
                required: "현재 비밀번호를 입력해 주세요.",
                minLength: {
                  value: 8,
                  message: "비밀번호는 8자리 이상입니다.",
                },
              }),
            }}
            aria-invalid={
              isSubmitted ? (errors.password ? "true" : "false") : undefined
            }
          />
        </div>
        <div className={clsx(styles.inputs)}>
          <AuthInput
            label="새 비밀번호"
            id="newPassword"
            type="password"
            error={errors.newpassword?.message as string}
            placeholder="새 비밀번호 입력"
            registerConfig={{
              ...register("newpassword", {
                required: " 새 비밀번호를 입력해 주세요.",
                minLength: {
                  value: 8,
                  message: "비밀번호는 8자리 이상입니다.",
                },
              }),
            }}
            aria-invalid={
              isSubmitted ? (errors.newPassword ? "true" : "false") : undefined
            }
          />
        </div>

        <div className={clsx(styles.inputs)}>
          <AuthInput
            label="새 비밀번호 확인"
            id="newPasswordCheck"
            type="password"
            placeholder="새 비밀번호 입력"
            error={errors.passwordConfirm?.message as string}
            registerConfig={register("passwordConfirm", {
              required: "새 비밀번호를 입력해 주세요.",
              pattern: {
                value: regPassword,
                message: "비밀번호는 영문,숫자 조합 8자 이상 입력해 주세요.",
              },
              validate: value =>
                watch("newPassword") === value ||
                "비밀번호가 일치하지 않습니다.",
            })}
            aria-invalid={
              isSubmitted
                ? errors.passwordConfirm
                  ? "true"
                  : "false"
                : undefined
            }
          />
          <div className={clsx(styles.button)}>
            <BaseButton
              small
              onClick={() => handleChangeButtonClick()}
              disabled={isSubmitting || isButtonDisabled}
            >
              변경
            </BaseButton>
          </div>
        </div>
      </form>
    </>
  );
}

export default PasswordChangeForm;
