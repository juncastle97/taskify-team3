import ModalContainer from "../ModalContainer";
import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import ModalPortal from "../ModalPortal";
import clsx from "clsx";
import style from "./ColumnAddModal.module.scss";
// import Input from "@/components/input/Input";
import { useForm } from "react-hook-form";

import BaseButton from "@/components/button/baseButton/BaseButton";

interface ColumnAddModalProps {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

function ColumnAddModal({ setIsOpen }: ColumnAddModalProps) {
  const [errorMsg, setErrorMsg] = useState("");
  // const {
  //   register,
  //   watch,
  //   formState: { errors },
  // } = useForm({ mode: "onBlur" });
  //const email = watch("email");

  // const handleICreateClick = async (event?: FormEvent) => {
  //   if (event) event.preventDefault();
  // };

  return (
    <ModalPortal>
      <ModalContainer setIsOpen={setIsOpen}>
        <form>
          <div className={clsx(style.modalWrapper)}>
            <h1>새 컬럼 생성</h1>
            <div className={clsx(style.nameWrapper)}>
              <p>이름</p>
              <input
                className={clsx(style.nameInput)}
                type="text"
                placeholder="새로운 프로젝트"
                /* 중복된 칼럼 이름 유효성 검사 수정
                {...register("email", {
                  required: "이메일을 입력해 주세요.",
                  pattern: {
                    value: emailRegex,
                    message: "올바른 이메일 주소가 아닙니다.",
                  },
                })}*/
              />
              {/* {errors.email && (
                <p className={style.errorMessage}>
                  {errors?.email?.message?.toString()}
                </p>
              )} */}
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
                생성
              </BaseButton>
            </div>
          </div>
        </form>
      </ModalContainer>
    </ModalPortal>
  );
}

export default ColumnAddModal;
