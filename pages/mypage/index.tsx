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
import MismatchModal from "@/components/modal/mismatchModal/MismatchModal";
import ProfileChangeForm from "@/components/mypage/form/ProfileChangeForm";
import PasswordChangeForm from "@/components/mypage/form/PasswordChangeForm";
function MyPage() {
  return (
    <div className={clsx(styles.all)}>
      <div className={clsx(styles.wrapper)}>
        <div className={clsx(styles.back)}>
          <ReturnButton />
        </div>

        <main>
          <section>
            <div className={clsx(styles.title)}>프로필</div>
            <ProfileChangeForm />
          </section>

          <section>
            <div className={clsx(styles.title)}>비밀번호 변경 </div>
            <PasswordChangeForm />
          </section>
        </main>
      </div>
    </div>
  );
}

export default MyPage;
