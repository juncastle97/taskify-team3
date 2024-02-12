import React, { useEffect, useState } from "react";
import clsx from "clsx";
import styles from "./ProfileChangeForm.module.scss";
import axios from "@/lib/axios";
import { useForm, FieldValues } from "react-hook-form";
import { GetUserInfoType } from "@/types/users";
import authInstance from "@/lib/axios";
import { PutUserInfoProps } from "@/types/users";
import BaseButton from "@/components/button/baseButton/BaseButton";
import AddImage from "@/components/mypage/AddImage";
import AuthInput from "@/components/input/AuthInput";
import { getUserInfo } from "@/api/mypage/index";
import { updateUserProfile } from "@/api/mypage/index";
import AlertModal from "@/components/modal/alertModal";
function ProfileChangeForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm<FieldValues>({});

  const [userInfo, setUserInfo] = useState<GetUserInfoType>({
    email: "",
    nickname: "",
    profileImageUrl: "",
  });
  const [nickname, setNickname] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const openModal = (error: string) => {
    setIsOpen(true);
    setErrorMessage(error);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
  };

  useEffect(() => {
    const getUserData = async () => {
      try {
        const userData = await getUserInfo();
        setUserInfo(userData);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };
    getUserData();
  }, []);

  const handleImageUpload = (imgUrl: string) => {
    console.log(imgUrl);
    setUserInfo(prevUserInfo => ({
      ...prevUserInfo,
      profileImageUrl: imgUrl,
    }));
  };

  const handleSaveButtonClick = async () => {
    try {
      await handleSubmit(async data => {
        openModal("정보가 변경되었습니다.");
        const updatedData = {
          nickname: data.nickname || userInfo.nickname,
          profileImageUrl: userInfo.profileImageUrl,
        };

        await updateUserProfile(updatedData);
      })();
    } catch (error: any) {
      openModal(error.response.data.message);
    }
  };

  return (
    <form className={clsx(styles.form)} onSubmit={handleSaveButtonClick}>
      {isOpen && (
        <AlertModal
          setModal={setIsOpen}
          alertMessage={errorMessage}
          onConfirmClick={closeModal}
        />
      )}
      <div className={clsx(styles.addImage)}>
        <AddImage
          profileImageUrl={userInfo.profileImageUrl}
          onImageUpload={handleImageUpload}
        />
      </div>
      <div className={clsx(styles.formContents)}>
        <div className={clsx(styles.inputs)}>
          <AuthInput
            className={clsx(styles.input)}
            label="이메일"
            id="email"
            type="email"
            placeholder={userInfo.email}
            registerConfig={{
              readOnly: true,
            }}
          />
        </div>
        <div className={clsx(styles.inputs)}>
          <AuthInput
            className={clsx(styles.input)}
            label="닉네임"
            id="nickName"
            type="text"
            error={errors.nickname?.message as string}
            value={nickname}
            defaultValue={userInfo.nickname}
            onChange={handleNicknameChange}
            registerConfig={register("nickname", {
              required: "닉네임을 입력해 주세요.",
              maxLength: {
                value: 10,
                message: "열 자 이하로 작성해 주세요.",
              },
            })}
          />
        </div>

        <div className={clsx(styles.button)}>
          <BaseButton
            disabled={!isDirty || !isValid}
            onClick={handleSaveButtonClick}
          >
            저장
          </BaseButton>
        </div>
      </div>
    </form>
  );
}
export default ProfileChangeForm;
