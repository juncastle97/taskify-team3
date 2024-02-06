import ModalContainer from "../ModalContainer";
import { Dispatch, SetStateAction, useState } from "react";
import ModalPortal from "../ModalPortal";
import clsx from "clsx";
import style from "./ColumnEditModal.module.scss";
import BaseButton from "@/components/button/baseButton/BaseButton";
import AlertModal from "../alertModal";
import { deleteColumn } from "@/api/columns";

interface ColumnEditdModalProps {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  id: number;
}

function ColumnEditModal({ setIsOpen, id }: ColumnEditdModalProps) {
  const [isAlertOpen, setIsAlertOpen] = useState<boolean>(false);

  const openAlertModal = () => {
    setIsAlertOpen(true);
  };

  const closeAlertModal = () => {
    setIsAlertOpen(false);
  };

  const handleDeleteColumn = async (columnId: number) => {
    try {
      await deleteColumn(columnId);
      closeAlertModal();
      setIsOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ModalPortal>
      <ModalContainer setIsOpen={setIsOpen} isAlertOpen={isAlertOpen}>
        <form>
          {isAlertOpen && (
            <AlertModal
              setModal={setIsAlertOpen}
              alertMessage="컬럼의 모든 카드가 삭제됩니다."
              isCancelButton
              onConfirmClick={() => handleDeleteColumn(id)}
            />
          )}
          <div className={clsx(style.modalWrapper)}>
            <h1>컬럼 관리</h1>
            <div className={clsx(style.nameWrapper)}>
              <p>이름</p>
              <input className={clsx(style.input)} type="text" />
            </div>
            <div className={clsx(style.buttons)}>
              <span className={clsx(style.delText)} onClick={openAlertModal}>
                삭제하기
              </span>
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
