import { ChangeEvent } from "react";
import Input from "@/components/input/Input";
import Image from "next/image";
import Head from "next/head";
import styles from "@/styles/pages/Login.module.scss";
import clsx from "clsx";
import Button from "@/components/button/BaseButton/BaseButton";
import Link from "next/link";

export default function Login() {
  return (
    <div>
      <Head>
        <title>Login</title>
      </Head>
      <div className={clsx(styles.body)}>
        <header className={clsx(styles.header)}>
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
          <p className={clsx(styles.hello)}>오늘도 만나서 반가워요!</p>
        </header>
        <form className={clsx(styles.form)}>
          <Input
            type="email"
            onChange={(e: ChangeEvent<HTMLInputElement>): void => {}}
          />
          <Input
            type="password"
            onChange={(e: ChangeEvent<HTMLInputElement>): void => {}}
          />
          <Button>로그인</Button>
          <div className={clsx(styles.loginText)}>
            <span>회원이 아니신가요?</span>
            <Link href="/signup" className={clsx(styles.signup)}>
              회원가입하기
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
