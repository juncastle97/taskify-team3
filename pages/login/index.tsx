import Image from "next/image";
import Head from "next/head";
import styles from "@/styles/pages/Login.module.scss";
import clsx from "clsx";
import Button from "@/components/button/baseButton/BaseButton";
import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";
import { emailRegex, passwordRegex } from "@/utils/regexp";
import Input from "@/components/input/Input";
interface FormData {
  email: string;
  password: string;
}

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>(); // useForm 제네릭에 FormData를 전달

  const onSubmit: SubmitHandler<FormData> = data => {
    alert(JSON.stringify(data));
  };

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <div className={clsx(styles.body)}>
        <header className={clsx(styles.header)}>
          <div className={clsx(styles.wrapHeader)}>
            <Link href={"/login"}>
              <Image
                className={clsx(styles.logo)}
                src="/logo/logo.svg"
                alt="로고"
                width={164}
                height={189}
                priority
              />
            </Link>
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
        <form
          noValidate
          onSubmit={handleSubmit(onSubmit)}
          className={clsx(styles.form)}
        >
          <label htmlFor="email" className={clsx(styles.label)}>
            이메일
          </label>
          <Input
            className={clsx(styles.input, {
              [styles.error]: errors.email,
            })}
            type="email"
            placeholder="이메일을 입력해주세요"
            {...register("email", {
              required: "이메일을 입력해주세요",
              pattern: {
                value: emailRegex,
                message: "올바른 이메일 주소를 입력해주세요.",
              },
            })}
            aria-invalid={errors.email ? "true" : "false"}
          />
          {errors.email && (
            <small className={clsx(styles.errorMessage)}>
              {errors.email.message}
            </small>
          )}
          <label htmlFor="password" className={clsx(styles.label)}>
            비밀번호
          </label>
          <Input
            className={clsx(styles.input, {
              [styles.error]: errors.password,
            })}
            type="password"
            placeholder="비밀번호를 입력해주세요"
            {...register("password", {
              required: "비밀번호를 입력해 주세요",
              minLength: {
                value: 8,
                message: "8자리 이상 입력해 주세요",
              },
            })}
          />
          {errors.password && (
            <small className={clsx(styles.errorMessage)}>
              {errors.password.message}
            </small>
          )}
          <div className={clsx(styles.loginBtn)}>
            <Button type="submit">로그인</Button>
          </div>
          <div className={clsx(styles.wrapText)}>
            <span>회원이 아니신가요?</span>
            <Link href="/signup" className={clsx(styles.signupText)}>
              회원가입하기
            </Link>
          </div>
        </form>
      </div>
    </>
  );
}
