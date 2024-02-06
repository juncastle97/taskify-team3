import ModalContainer from "../ModalContainer";
import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import ModalPortal from "../ModalPortal";
import clsx from "clsx";
import style from "./InvitationModal.module.scss";
import AuthInput from "@/components/input/AuthInput";
import { useForm } from "react-hook-form";
import { regEmail } from "@/utils/regexp";
import { checkEmailExists, inviteDashboard } from "@/api/invitations";
import BaseButton from "@/components/button/baseButton/BaseButton";
import { useRouter } from "next/router";

interface InviteModalProps {
  setModal: Dispatch<SetStateAction<boolean>>;
}

function InvitationModal({ setModal }: InviteModalProps) {
  const router = useRouter();
  const { id } = router.query;
  const dashboardId = Number(id);
  const {
    register,
    watch,
    setError,
    formState: { errors },
  } = useForm({ mode: "onBlur" });
  const email = watch("email");

  const closeModal = () => {
    setModal(false);
  };

  const handleInviteClick = async (e: FormEvent) => {
    if (e) {
      e.preventDefault();
    }
    if (email) {
      const emailExists = await checkEmailExists(dashboardId);
      const invitationExists = emailExists.invitations.some(
        (invitation: { invitee: { email: string } }) =>
          invitation.invitee.email === email,
      );
      if (invitationExists) {
        setError("email", {
          message: "이미 등록된 이메일입니다. 다른 이메일을 사용해주세요.",
        });
      } else {
        try {
          await inviteDashboard(dashboardId, { email });
          closeModal();
        } catch (error) {
          setError("email", {
            message: "이메일을 확인해주세요.",
          });
        }
      }
    }
  };

  return (
    <ModalPortal>
      <form onSubmit={handleInviteClick}>
        <ModalContainer setIsOpen={setModal}>
          <div className={clsx(style.modalWrapper)}>
            <h1>초대하기</h1>
            <div className={clsx(style.emailWrapper)}>
              <AuthInput
                label="이메일"
                type="email"
                error={errors.email?.message?.toString()}
                placeholder="이메일을 입력해 주세요."
                registerConfig={register("email", {
                  required: "이메일을 입력해 주세요.",
                  pattern: {
                    value: regEmail,
                    message: "올바른 이메일 주소가 아닙니다.",
                  },
                })}
              />
            </div>
          </div>
          <div className={clsx(style.buttons)}>
            <BaseButton type="button" onClick={closeModal} small white>
              취소
            </BaseButton>
            <BaseButton type="submit" small>
              확인
            </BaseButton>
          </div>
        </ModalContainer>
      </form>
    </ModalPortal>
  );
}

export default InvitationModal;
