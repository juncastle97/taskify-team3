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

function ProfileChangeForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({});

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
        // console.log("이전 userInfo:", userInfo);
        setUserInfo({ email, nickname, profileImageUrl });
        // console.log("새로운 userInfo:", { email, nickname, profileImageUrl });
      } catch (error) {
        console.error(error);
      }
    };
    getUserInfo();
  }, []);

  const handleImageUpload = (imgUrl: string) => {
    console.log(imgUrl);
    setUserInfo(prevUserInfo => ({
      ...prevUserInfo,
      profileImageUrl: imgUrl,
    }));
  };

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

  const handleSaveButtonClick = async () => {
    try {
      await handleSubmit(async data => {
        alert("Save 버튼이 클릭되었습니다. 데이터: " + JSON.stringify(data));
        const updatedData = {
          nickname: data.nickname || userInfo.nickname,
          profileImageUrl: userInfo.profileImageUrl,
        };
        await PutUserInfo(updatedData);
      })();
    } catch (error) {
      console.error("데이터 처리 중 에러:", error);
      // 에러 처리 로직 추가
    }
  };

  return (
    <form
      className={clsx(styles.form)}
      onSubmit={handleSubmit(data => alert(JSON.stringify(data)))}
    >
      <div className={clsx(styles.addImage)}>
        <AddImage
          profileImageUrl={userInfo.profileImageUrl}
          onImageUpload={handleImageUpload}
        />
      </div>
      <div className={clsx(styles.formContents)}>
        <div className={clsx(styles.inputs)}>
          <AuthInput
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
            label="닉네임"
            id="nickName"
            type="text"
            error={errors.nickname?.message as string}
            defaultValue={userInfo.nickname}
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
          <BaseButton onClick={handleSaveButtonClick}>저장</BaseButton>
        </div>
      </div>
    </form>
  );
}
export default ProfileChangeForm;
