import React, { useEffect, useState } from "react";
import clsx from "clsx";
import styles from "@/styles/pages/MyPage.module.scss";
import ReturnButton from "@/components/button/returnButton/returnButton";
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
