import { useEffect, useState } from "react";
import { useForm, FieldValues } from "react-hook-form";
import clsx from "clsx";
import styles from "./PasswordChangeForm.module.scss";
import { regPassword } from "@/utils/regexp";
import AlertModal from "@/components/modal/alertModal";
import BaseButton from "@/components/button/baseButton/BaseButton";
import AuthInput from "@/components/input/AuthInput";
import { editPassword } from "@/api/mypage";

function PasswordChangeForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitted },
    watch,
    setValue,
  } = useForm<FieldValues>({ mode: "onBlur" });
  const password = watch("password");
  const newPassword = watch("newPassword");
  const newPasswordCheck = watch("newPasswordCheck");
  const [isAlertOpen, setIsAlertOpen] = useState<boolean>(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const openAlertModal = (error: string) => {
    setIsAlertOpen(true);
    setErrorMessage(error);
  };
  const closeAlertModal = () => {
    setIsAlertOpen(false);
    setErrorMessage("");
  };

  const openConfirmModal = () => {
    setIsConfirmOpen(true);
  };
  const closeConfirmModal = () => {
    setIsConfirmOpen(false);
  };

  const handleChangeButtonClick = async () => {
    try {
      await handleSubmit(async data => {
        await editPassword({
          password: data.password,
          newPassword: data.newPassword,
        });
        openConfirmModal();
        setValue("password", "");
        setValue("newPassword", "");
        setValue("newPasswordCheck", "");
      })();
    } catch (error: any) {
      if (error.response) {
        openAlertModal(error.response.data.message);
        setValue("password", "");
        setValue("newPassword", "");
        setValue("newPasswordCheck", "");
      }
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(data => alert(JSON.stringify(data)))}>
        {isAlertOpen && (
          <AlertModal
            setModal={setIsAlertOpen}
            alertMessage={errorMessage}
            onConfirmClick={closeAlertModal}
          />
        )}
        {isConfirmOpen && (
          <AlertModal
            setModal={setIsConfirmOpen}
            alertMessage="비밀번호가 변경되었습니다."
            onConfirmClick={closeConfirmModal}
          />
        )}
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
            error={errors.newPassword?.message as string}
            placeholder="새 비밀번호 입력"
            registerConfig={{
              ...register("newPassword", {
                required: " 새 비밀번호를 입력해 주세요.",
                minLength: {
                  value: 8,
                  message: "비밀번호는 영문,숫자 조합 8자 이상 입력해 주세요.",
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
            error={errors.newPasswordCheck?.message as string}
            registerConfig={register("newPasswordCheck", {
              required: "새 비밀번호를 입력해 주세요.",
              pattern: {
                value: regPassword,
                message: "비밀번호는 영문,숫자 조합 8자 이상 입력해 주세요.",
              },
              validate: value =>
                value === newPassword || "비밀번호가 일치하지 않습니다.",
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
              disabled={!password || !newPassword || !newPasswordCheck}
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
