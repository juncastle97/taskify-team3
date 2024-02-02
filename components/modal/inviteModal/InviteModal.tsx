import ModalContainer from "../ModalContainer";
import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import ModalPortal from "../ModalPortal";
import clsx from "clsx";
import style from "./InviteModal.module.scss";
// import Input from "@/components/input/Input";
import { useForm } from "react-hook-form";
import { emailRegex } from "@/utils/regexp";
import { inviteDashboard } from "@/api/invitations/postDashboardInvitation";
import BaseButton from "@/components/button/baseButton/BaseButton";

interface InviteModalProps {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

function InviteModal({ setIsOpen }: InviteModalProps) {
  const [errorMsg, setErrorMsg] = useState("");
  const {
    register,
    watch,
    formState: { errors },
  } = useForm({ mode: "onBlur" });
  const email = watch("email");

  const handleInviteClick = async (event?: FormEvent) => {
    if (event) event.preventDefault();

    const confirmed = window.confirm(`${email}님을 초대하시겠습니까?`);
    if (confirmed) {
      const response = await inviteDashboard({ email });
      if (response?.status !== 201) {
        setErrorMsg(response?.data.message);
      }
    }
  };

  return (
    <ModalPortal>
      <form onSubmit={handleInviteClick}>
        <ModalContainer setIsOpen={setIsOpen}>
          <div className={clsx(style.modalWrapper)}>
            <h1>초대하기</h1>
            <div className={clsx(style.emailWrapper)}>
              <p>이메일</p>
              <input
                className={clsx(style.emailInput)}
                type="email"
                placeholder="초대할 이메일을 입력해주세요."
                {...register("email", {
                  required: "이메일을 입력해 주세요.",
                  pattern: {
                    value: emailRegex,
                    message: "올바른 이메일 주소가 아닙니다.",
                  },
                })}
              />
              {errors.email && (
                <p className={style.errorMessage}>
                  {errors?.email?.message?.toString()}
                </p>
              )}
            </div>
            <div className={clsx(style.buttons)}>
              <BaseButton
                type="button"
                onClick={() => setIsOpen(false)}
                small
                white
              >
                취소
              </BaseButton>
              <BaseButton type="submit" small>
                확인
              </BaseButton>
            </div>
          </div>
        </ModalContainer>
      </form>
    </ModalPortal>
  );
}

export default InviteModal;
