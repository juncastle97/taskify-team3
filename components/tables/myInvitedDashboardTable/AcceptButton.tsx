import { respondInvitation } from "@/api/invitations";
import styles from "./AcceptButton.module.scss";
import clsx from "clsx";

interface AcceptButtonProps {
  onClick: () => void;
  invitationId: number;
}

const AcceptButton = ({ onClick, invitationId }: AcceptButtonProps) => {
  const handleButtonClick = async (isAccepted: boolean) => {
    try {
      await respondInvitation(invitationId, isAccepted);
      onClick();
    } catch (error) {
      console.error("초대 응답 실패: ", error);
    }
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
