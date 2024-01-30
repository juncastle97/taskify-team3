import clsx from "clsx";
import styles from "@/styles/pages/MyPage.module.scss";
import Image from "next/image";
import { useForm, FieldError } from "react-hook-form";
import Button from "@/components/button/BaseButton/BaseButton";

function MyPage() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors, isSubmitted },
  } = useForm();

  return (
    <div className={clsx(styles.all)}>
      <div className={clsx(styles.sideBar)}>사이드바</div>
      <div className={clsx(styles.PageContainer)}>
        <nav className={clsx(styles.nav)}>
          <span>계정관리</span>
        </nav>
        <main>
          <div className={clsx(styles.back)}>
            <Image
              src="/myPage/backIcon.png"
              alt="돌아가기 아이콘"
              width={20}
              height={20}
              priority
            />
            <span>돌아가기</span>
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
                onSubmit={handleSubmit(data => alert(JSON.stringify(data)))}
              >
                <label htmlFor="email">이메일</label>
                <input
                  id="email"
                  type="email"
                  placeholder="test@email.com"
                  {...register("email", {
                    required: "이메일을 입력해 주세요.",
                    pattern: {
                      value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                      message: "이메일 형식에 맞지 않습니다.",
                    },
                  })}
                  aria-invalid={
                    isSubmitted ? (errors.email ? "true" : "false") : undefined
                  }
                />
                {errors.email && (
                  <small key="email-error" role="alert">
                    {(errors.email as FieldError).message}
                  </small>
                )}

                <label htmlFor="nickName">닉네임</label>
                <input
                  id="nickName"
                  type="text"
                  placeholder="코드잇"
                  {...register("nickName")}
                />

                <Button type="submit" disabled={isSubmitting}>
                  저장
                </Button>
              </form>
            </div>
          </section>
          <section className={clsx(styles.section2)}>
            <div className={clsx(styles.changePassword)}>비밀번호 변경 </div>
            <form onSubmit={handleSubmit(data => alert(JSON.stringify(data)))}>
              <label htmlFor="currentPassword">현재 비밀번호</label>
              <input
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
              {errors.currentPassword && (
                <small key="currentPassword-error" role="alert">
                  {(errors.currentPassword as FieldError).message}
                </small>
              )}

              <label htmlFor="newPassword">새 비밀번호</label>
              <input
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
              {errors.newPassword && (
                <small key="newPassword-error" role="alert">
                  {(errors.newPassword as FieldError).message}
                </small>
              )}

              <label htmlFor="newPasswordCheck">새 비밀번호 확인</label>
              <input
                id="newPasswordCheck"
                type="password"
                placeholder="새 비밀번호 입력"
                {...register("newPasswordCheck", {
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
              {errors.newPasswordCheck && (
                <small key="newPasswordCheck-error" role="alert">
                  {(errors.newPasswordCheck as FieldError).message}
                </small>
              )}

              <Button type="submit" disabled={isSubmitting}>
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
