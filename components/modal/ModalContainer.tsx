import clsx from "clsx";
import styles from "./ModalContainer.module.scss";
import { Dispatch, SetStateAction, useRef } from "react";
import { useOnClickOutside } from "usehooks-ts";

interface ModalContainerProps {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  children: React.ReactNode;
  isAlertOpen?: boolean;
}

function ModalContainer({
  setIsOpen,
  children,
  isAlertOpen,
}: ModalContainerProps) {
  const modalRef = useRef(null);

  const handleClickOutside = () => {
    if (!isAlertOpen) {
      setIsOpen(false);
    }
  };

  useOnClickOutside(modalRef, handleClickOutside);

  return (
    <div className={clsx(styles.wrapper)}>
      <div ref={modalRef} className={clsx(styles.container)}>
        {children}
      </div>
    </div>
  );
}

export default ModalContainer;
