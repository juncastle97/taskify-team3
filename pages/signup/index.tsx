import Image from "next/image";
import Head from "next/head";
import Link from "next/link";
import clsx from "clsx";
import styles from "@/styles/pages/Signup.module.scss";
import SignUpForm from "@/components/form/SignUpForm";
import { useRouter } from "next/router";

export interface SignForm {
  email: string;
  nickname?: string;
  password: string;
  passwordConfirm?: string;
}

const index = () => {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Signup</title>
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
          <p className={clsx(styles.hello)}>첫 방문을 환영합니다!</p>
        </header>
        <SignUpForm />
        <div className={clsx(styles.loginText)}>
          <span>이미 가입하셨나요?</span>
          <Link href="/login" className={clsx(styles.login)}>
            로그인하기
          </Link>
        </div>
      </div>
    </>
  );
};

export default index;
