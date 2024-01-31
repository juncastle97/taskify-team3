import React, { useEffect, useState } from "react";
import clsx from "clsx";
import styles from "@/styles/pages/MyPage.module.scss";
import Image from "next/image";
import { useForm, FieldError, FieldValues } from "react-hook-form";
import Button from "@/components/button/BaseButton/BaseButton";
import ReturnButton from "@/components/button/returnButton/returnButton";

function MyPage() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors, isSubmitted },
    watch,
    setError,
    clearErrors,
    getValues,
  } = useForm<FieldValues>({});

  const passwordInputs = ["currentPassword", "newPassword", "newPasswordCheck"];

  const [isButtonDisabled, setButtonDisabled] = useState(true);

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

  const handleSaveButtonClick = () => {
    // Save 버튼이 클릭되었을 때의 동작 처리
    handleSubmit(data => {
      alert("Save 버튼이 클릭되었습니다. 데이터: " + JSON.stringify(data));
      // Save 버튼에 대한 추가 동작 구현
      // ...
    })();
  };

  const handleChangeButtonClick = () => {
    // Change 버튼이 클릭되었을 때의 동작 처리
    handleSubmit(data => {
      alert("Change 버튼이 클릭되었습니다. 데이터: " + JSON.stringify(data));
      // Change 버튼에 대한 추가 동작 구현
      // ...
    })();
  };
  return (
    <div className={clsx(styles.all)}>
      <div className={clsx(styles.sideBar)}>사이드바</div>
      <div className={clsx(styles.PageContainer)}>
        <nav className={clsx(styles.nav)}>
          <span>계정관리</span>
        </nav>
        <main>
          <div className={clsx(styles.back)}>
            <ReturnButton />
          </div>
          <section className={clsx(styles.section1)}>
            <div className={clsx(styles.profile)}>프로필</div>
            <div className={clsx(styles.section1Contents)}>
              <Image
                src="/myPage/addImage.png"
                alt="이미지 추가 버튼"
                width={182}
                height={182}
                priority
              />
              <form
                onSubmit={e => {
                  e.preventDefault(); // 기본 동작 막기
                  handleSubmit(data => alert(JSON.stringify(data)))(e);
                }}
              >
                <label htmlFor="email">이메일</label>
                <input
                  id="email"
                  type="email"
                  readOnly
                  placeholder="test@email.com"
                />

                <label
                  className={clsx(styles.nickNameLabel)}
                  htmlFor="nickName"
                >
                  닉네임
                </label>
                <input
                  className={clsx(styles.nickName, {
                    [styles.error]: errors.nickName,
                  })}
                  id="nickName"
                  type="text"
                  defaultValue="코드잇"
                  {...register("nickName", {
                    required: "닉네임을 입력해 주세요.",
                    maxLength: {
                      value: 10,
                      message: "열 자 이하로 작성해 주세요.",
                    },
                  })}
                />
                {isSubmitted && errors.nickName && (
                  <small key="nickName-error" role="alert">
                    {(errors.nickName as FieldError).message}
                  </small>
                )}

                <Button onClick={() => handleSaveButtonClick()}>저장</Button>
              </form>
            </div>
          </section>
          <section className={clsx(styles.section2)}>
            <div className={clsx(styles.changePassword)}>비밀번호 변경 </div>
            <form
              onSubmit={e => {
                e.preventDefault(); // 기본 동작 막기
                handleSubmit(data => alert(JSON.stringify(data)))(e);
              }}
            >
              <label htmlFor="currentPassword">현재 비밀번호</label>
              <input
                className={clsx(styles.currentPassword, {
                  [styles.error]: errors.currentPassword,
                })}
                id="currentPassword"
                type="password"
                placeholder="현재 비밀번호 입력"
                {...register("currentPassword", {
                  required: "현재 비밀번호를 입력해 주세요.",
                  minLength: {
                    value: 8,
                    message: "비밀번호는 8자리 이상입니다.",
                  },
                })}
                aria-invalid={
                  isSubmitted
                    ? errors.currentPassword
                      ? "true"
                      : "false"
                    : undefined
                }
              />
              {isSubmitted && errors.currentPassword && (
                <small key="currentPassword-error" role="alert">
                  {(errors.currentPassword as FieldError).message}
                </small>
              )}

              <label
                className={clsx(styles.newPasswordLabel)}
                htmlFor="newPassword"
              >
                새 비밀번호
              </label>
              <input
                className={clsx(styles.newPassword, {
                  [styles.error]: errors.newPassword,
                })}
                id="newPassword"
                type="password"
                placeholder="새 비밀번호 입력"
                {...register("newPassword", {
                  required: "새 비밀번호를 입력해 주세요.",
                  minLength: {
                    value: 8,
                    message: "비밀번호는 8자리 이상입니다.",
                  },
                })}
                aria-invalid={
                  isSubmitted
                    ? errors.newPassword
                      ? "true"
                      : "false"
                    : undefined
                }
              />
              {isSubmitted && errors.newPassword && (
                <small key="newPassword-error" role="alert">
                  {(errors.newPassword as FieldError).message}
                </small>
              )}

              <label
                className={clsx(styles.newPasswordCheckLable)}
                htmlFor="newPasswordCheck"
              >
                새 비밀번호 확인
              </label>
              <input
                className={clsx(styles.newPasswordCheck, {
                  [styles.error]: errors.newPasswordCheck,
                })}
                id="newPasswordCheck"
                type="password"
                placeholder="새 비밀번호 입력"
                {...register("newPasswordCheck", {
                  validate: {
                    matchNewPassword: value => {
                      const { newPassword } = getValues();
                      return newPassword === value || "일치하지 않습니다.";
                    },
                  },

                  required: "새 비밀번호를 입력해 주세요.",
                  minLength: {
                    value: 8,
                    message: "비밀번호는 8자리 이상입니다.",
                  },
                })}
                aria-invalid={
                  isSubmitted
                    ? errors.newPasswordCheck
                      ? "true"
                      : "false"
                    : undefined
                }
              />
              {isSubmitted && errors.newPasswordCheck && (
                <small key="newPasswordCheck-error" role="alert">
                  {(errors.newPasswordCheck as FieldError).message}
                </small>
              )}

              <Button
                onClick={() => handleSaveButtonClick()}
                disabled={isSubmitting || isButtonDisabled}
              >
                변경
              </Button>
            </form>
          </section>
        </main>
      </div>
    </div>
  );
}

export default MyPage;
