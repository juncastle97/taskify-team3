import Image from "next/image";
import Head from "next/head";
import Link from "next/link";
import clsx from "clsx";
import styles from "@/styles/pages/Signup.module.scss";
import SignInForm from "@/components/form/SignInForm";
import { useRouter } from "next/router";
import { useAuth } from "@/contexts/AuthProvider";
import { SetStateAction, useEffect } from "react";
import ColumnAddModal from "@/components/modal/columnAddModal/ColumnAddModal";

export interface SignForm {
  email: string;
  nickname?: string;
  password: string;
  passwordConfirm?: string;
}

const index = () => {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) router.replace("/mydashboard");
  });

  return (
    <>
      <Head>
        <title>Signin</title>
      </Head>
      <div className={clsx(styles.body)}>
        <header className={clsx(styles.header)}>
          <Link href="/">
            <div className={clsx(styles.wrapHeader)}>
              <Image
                className={clsx(styles.logo)}
                src="/logo/logo.svg"
                alt="로고"
                width={164}
                height={189}
                priority
              />
              <Image
                className={clsx(styles.taskify)}
                src="/logo/Taskify.svg"
                alt="Taskify"
                width={198}
                height={55}
                priority
              />
            </div>
          </Link>
          <p className={clsx(styles.hello)}>오늘도 만나서 반가워요!</p>
        </header>
        <SignInForm />
        <div className={clsx(styles.loginText)}>
          <span>회원이 아니신가요?</span>
          <Link href="/signup" className={clsx(styles.login)}>
            회원가입하기
          </Link>
        </div>
      </div>
    </>
  );
};

export default index;
