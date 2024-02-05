import styles from "./AcceptButton.module.scss";
import clsx from "clsx";

interface AcceptButtonProps {
  onClick: () => void;
}

const AcceptButton = ({ onClick }: AcceptButtonProps) => {
  const handleButtonClick = (isAccept: boolean) => {
    /** @TODO 수락or거절 API 요청하기 */
    onClick();
  };

  return (
    <div className={styles.wrapper}>
      <button
        className={clsx(styles.button, styles.accept)}
        type="button"
        onClick={() => handleButtonClick(true)}
      >
        수락
      </button>
      <button
        className={clsx(styles.button, styles.deny)}
        type="button"
        onClick={() => handleButtonClick(false)}
      >
        거절
      </button>
    </div>
  );
};

export default AcceptButton;
