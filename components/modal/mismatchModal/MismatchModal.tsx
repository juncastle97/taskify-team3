import { ReactNode } from "react";
import ModalContainer from "@/components/modal/ModalContainer";
import clsx from "clsx";
import styles from "./MismatchModal.module.scss";
import Button from "@/components/button/baseButton/BaseButton";

interface MismatchModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  children: React.ReactNode;
}

function MismatchModal({ isOpen, setIsOpen, children }: MismatchModalProps) {
  return (
    <>
      {isOpen && (
        <ModalContainer setIsOpen={() => setIsOpen(false)}>
          <div className={clsx(styles.modal)}>
            {children}
            <Button onClick={() => setIsOpen(false)}>확인</Button>
          </div>
        </ModalContainer>
      )}
    </>
  );
}

export default MismatchModal;
