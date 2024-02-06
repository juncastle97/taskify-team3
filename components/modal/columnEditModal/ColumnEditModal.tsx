import ModalContainer from "../ModalContainer";
import { Dispatch, SetStateAction } from "react";
import ModalPortal from "../ModalPortal";
import clsx from "clsx";
import style from "./ColumnEditModal.module.scss";

import BaseButton from "@/components/button/baseButton/BaseButton";

interface ColumnEditdModalProps {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

function ColumnEditModal({ setIsOpen }: ColumnEditdModalProps) {
  return (
    <ModalPortal>
      <ModalContainer setIsOpen={setIsOpen}>
        <form>
          <div className={clsx(style.modalWrapper)}>
            <h1>컬럼 관리</h1>
            <div className={clsx(style.nameWrapper)}>
              <p>이름</p>
              <input className={clsx(style.input)} type="text" />
            </div>
            <div className={clsx(style.buttons)}>
              <span className={clsx(style.delText)}>삭제하기</span>
              <div className={clsx(style.base)}>
                <BaseButton
                  type="button"
                  onClick={() => setIsOpen(false)}
                  small
                  white
                >
                  취소
                </BaseButton>
                <BaseButton type="submit" small>
                  변경
                </BaseButton>
              </div>
            </div>
          </div>
        </form>
      </ModalContainer>
    </ModalPortal>
  );
}

export default ColumnEditModal;
