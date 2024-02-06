import { Dispatch, SetStateAction } from "react";
import ModalContainer from "@/components/modal/ModalContainer";
import clsx from "clsx";
import styles from "./alertModal.module.scss";
import BaseButton from "@/components/button/baseButton/BaseButton";
import ModalPortal from "../ModalPortal";

interface AlertModalProps {
  setModal: Dispatch<SetStateAction<boolean>>;
  alertMessage: string;
  confirmButton?: string;
  isCancelButton?: boolean;
  onConfirmClick?: () => void;
}

function AlertModal({
  setModal,
  alertMessage,
  confirmButton = "확인",
  isCancelButton,
  onConfirmClick,
}: AlertModalProps) {
  const disableModal = () => {
    setModal(false);
  };

  return (
    <ModalPortal>
      <ModalContainer setIsOpen={setModal}>
        <div className={clsx(styles.modal)}>
          {alertMessage}
          <div className={clsx(styles.buttons)}>
            {isCancelButton && (
              <BaseButton onClick={disableModal} white>
                취소
              </BaseButton>
            )}
            <BaseButton onClick={onConfirmClick}>{confirmButton}</BaseButton>
          </div>
        </div>
      </ModalContainer>
    </ModalPortal>
  );
}

export default AlertModal;
