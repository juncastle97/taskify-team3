import React, { useEffect, useState } from "react";
import clsx from "clsx";
import styles from "@/styles/pages/MyPage.module.scss";
import axios from "@/lib/axios";
import { useForm, FieldError, FieldValues } from "react-hook-form";
import Button from "@/components/button/baseButton/BaseButton";
import ReturnButton from "@/components/button/returnButton/returnButton";
import AddImage from "@/components/mypage/AddImage";
import { GetUserInfoType } from "@/types/users";
import authInstance from "@/lib/axios";
import { PutUserInfoProps } from "@/types/users";
import { PutPasswordInfoProps } from "@/types/users";
import ModalContainer from "@/components/modal/ModalContainer";
function MyPage() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors, isSubmitted },
  } = useForm<FieldValues>({});

  const {
    register: register2,
    handleSubmit: handleSubmit2,
    formState: {
      isSubmitting: isSubmitting2,
      errors: errors2,
      isSubmitted: isSubmitted2,
    },
    watch,
    setError: setError2,
    clearErrors: clearErrors2,
    getValues: getValues2,
    setValue,
  } = useForm<FieldValues>({ mode: "onBlur" });

  const [errorMessage, setErrorMessage] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const passwordInputs = ["password", "newPassword", "newPasswordCheck"];
  const passwordValue = watch("password");
  const newPasswordValue = watch("newPassword");
  const newPasswordCheckValue = watch("newPasswordCheck");

  errors.password || errors.newPassword || errors.newPasswordCheck;
  const [isButtonDisabled, setButtonDisabled] = useState(true);
  //Put Password API

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
      setError2("newPasswordCheck", {
        type: "manual",
        message: "새 비밀번호가 일치하지 않습니다.",
      });
    } else {
      clearErrors2("newPasswordCheck");
    }
  }, [newPassword, newPasswordCheck, setError2, clearErrors2]);

  const handleSaveButtonClick = async () => {
    try {
      await handleSubmit(async data => {
        alert("Save 버튼이 클릭되었습니다. 데이터: " + JSON.stringify(data));
        // Save 버튼에 대한 추가 동작 구현
        // ...
        const updatedData = {
          nickname: data.nickName || userInfo.nickname,
          profileImageUrl:
            dataToUpdate.profileImageUrl || userInfo.profileImageUrl,
        };
        await PutUserInfo(updatedData);
        console.log(updatedData);
      })();
    } catch (error) {
      console.error("데이터 처리 중 에러:", error);
      // 에러 처리 로직 추가
    }
  };

  const handleChangeButtonClick = async () => {
    try {
      await handleSubmit2(async data => {
        const response = await editPassword({
          password: data.password,
          newPassword: data.newPassword,
        });

        if (response.status === 400) {
          // 실패 시 처리
          // alert(response.data.message);
          setIsOpen(true);
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
  //GetApi
  const [userInfo, setUserInfo] = useState<GetUserInfoType>({
    email: "",
    nickname: "",
    profileImageUrl: "",
  });
  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const response = await axios.get("users/me");
        const { email, nickname, profileImageUrl } = response.data;
        setUserInfo({ email, nickname, profileImageUrl });
      } catch (error) {
        console.error(error);
      }
    };
    getUserInfo();
  }, []);

  //PutApi
  const [dataToUpdate, setDataToUpdate] = useState<PutUserInfoProps>({
    nickname: userInfo.nickname,
    profileImageUrl: userInfo.profileImageUrl,
  });

  const PutUserInfo = async (data: PutUserInfoProps) => {
    try {
      const response = await authInstance.put(`users/me`, data);

      if (response.status === 200) {
        setUserInfo(prevUserInfo => ({
          ...prevUserInfo,

          profileImageUrl: data.profileImageUrl || prevUserInfo.profileImageUrl,
        }));
        axios.get("users/me");
      } else {
        console.error("PUT 요청 실패:", response.status);
      }
    } catch (error) {
      console.error("PUT 요청 에러:", error);
      throw error;
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setDataToUpdate({ nickname: value }); // 수정된 닉네임을 상태로 유지
  };

  const handleImageUpload = (imgUrl: string) => {
    setDataToUpdate(prevData => ({
      ...prevData,
      profileImageUrl: imgUrl,
    }));
  };
  // putPassword Api

  return (
    <div className={clsx(styles.all)}>
      <div className={clsx(styles.PageContainer)}>
        <main>
          {isOpen && (
            <ModalContainer setIsOpen={setIsOpen}>
              <div className={clsx(styles.modal)}>
                현재 비밀번호가 틀렸습니다.
                <Button onClick={() => setIsOpen(false)}>확인</Button>
              </div>
            </ModalContainer>
          )}

          <div className={clsx(styles.back)}>
            <ReturnButton />
          </div>
          <section className={clsx(styles.section1)}>
            <div className={clsx(styles.profile)}>프로필</div>
            <div className={clsx(styles.section1Contents)}>
              <AddImage
                profileImageUrl={userInfo.profileImageUrl}
                onImageUpload={handleImageUpload}
              />
              <form
                onSubmit={handleSubmit(data => alert(JSON.stringify(data)))}
              >
                <label htmlFor="email">이메일</label>
                <input
                  id="email"
                  type="email"
                  readOnly
                  placeholder={userInfo.email}
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
                  defaultValue={userInfo.nickname}
                  {...register("nickName", {
                    required: "닉네임을 입력해 주세요.",
                    maxLength: {
                      value: 10,
                      message: "열 자 이하로 작성해 주세요.",
                    },
                  })}
                  onChange={handleInputChange}
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
            <form onSubmit={handleSubmit2(data => alert(JSON.stringify(data)))}>
              <label htmlFor="password">현재 비밀번호</label>
              <input
                className={clsx(styles.password, {
                  [styles.error]: errors2.password,
                })}
                id="password"
                type="password"
                placeholder="현재 비밀번호 입력"
                {...register2("password", {
                  required: "현재 비밀번호를 입력해 주세요.",
                  minLength: {
                    value: 8,
                    message: "비밀번호는 8자리 이상입니다.",
                  },
                })}
                aria-invalid={
                  isSubmitted2
                    ? errors2.password
                      ? "true"
                      : "false"
                    : undefined
                }
              />
              {isSubmitted2 && errors2.password && (
                <small key="password-error" role="alert">
                  {(errors2.password as FieldError).message}
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
                  [styles.error]: errors2.newPassword,
                })}
                id="newPassword"
                type="password"
                placeholder="새 비밀번호 입력"
                {...register2("newPassword", {
                  required: "새 비밀번호를 입력해 주세요.",
                  minLength: {
                    value: 8,
                    message: "비밀번호는 8자리 이상입니다.",
                  },
                })}
                aria-invalid={
                  isSubmitted2
                    ? errors2.newPassword
                      ? "true"
                      : "false"
                    : undefined
                }
              />
              {isSubmitted2 && errors2.newPassword && (
                <small key="newPassword-error2" role="alert">
                  {(errors2.newPassword as FieldError).message}
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
                  [styles.error]: errors2.newPasswordCheck,
                })}
                id="newPasswordCheck"
                type="password"
                placeholder="새 비밀번호 입력"
                {...register2("newPasswordCheck", {
                  validate: {
                    matchNewPassword: value => {
                      const { newPassword } = getValues2();
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
                  isSubmitted2
                    ? errors2.newPasswordCheck
                      ? "true"
                      : "false"
                    : undefined
                }
              />
              {isSubmitted2 && errors2.newPasswordCheck && (
                <small key="newPasswordCheck-error" role="alert">
                  {(errors2.newPasswordCheck as FieldError).message}
                </small>
              )}

              <Button
                onClick={() => handleChangeButtonClick()}
                disabled={isSubmitting2 || isButtonDisabled}
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
