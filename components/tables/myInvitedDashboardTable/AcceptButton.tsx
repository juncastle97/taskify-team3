import { useState } from "react";
import styles from "./AcceptButton.module.scss";
import clsx from "clsx";

interface AcceptButtonProps {
  isAccepted: boolean;
}

const AcceptButton = ({ isAccepted: initialValue }: AcceptButtonProps) => {
  const [isAccepted, setIsAccepted] = useState(initialValue);

  const handleButtonClick = (isAccept: boolean) => {
    setIsAccepted(isAccept);
    /** @TODO 수락or거절 API 요청하기 */
  };

  return (
    <div className={styles.wrapper}>
      <button
        className={clsx(styles.button, isAccepted && styles.select)}
        type="button"
        onClick={() => handleButtonClick(true)}
      >
        수락
      </button>
      <button
        className={clsx(styles.button, !isAccepted && styles.select)}
        type="button"
        onClick={() => handleButtonClick(false)}
      >
        거절
      </button>
    </div>
  );
};

export default AcceptButton;
