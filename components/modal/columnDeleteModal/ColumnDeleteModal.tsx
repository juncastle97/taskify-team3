import ModalContainer from "../ModalContainer";
import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import ModalPortal from "../ModalPortal";
import clsx from "clsx";
import style from "./ColumnDeleteModal.module.scss";
// import Input from "@/components/input/Input";
import { useForm } from "react-hook-form";

import Button from "@/components/button/baseButton/BaseButton";

interface ColumnEditdModalProps {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

function ColumnEditModal({ setIsOpen }: ColumnEditdModalProps) {
  return (
    <ModalPortal>
      <ModalContainer setIsOpen={setIsOpen}>
        <form>
          <div className={clsx(style.modalWrapper)}>
            <div className={clsx(style.textWrapper)}>
              <span className={clsx(style.text)}>
                컬럼의 모든 카드가 삭제됩니다.
              </span>
              <div className={clsx(style.buttons)}>
                <Button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  small
                  white
                >
                  취소
                </Button>
                <Button type="submit" small>
                  삭제
                </Button>
              </div>
            </div>
          </div>
        </form>
      </ModalContainer>
    </ModalPortal>
  );
}

export default ColumnEditModal;
