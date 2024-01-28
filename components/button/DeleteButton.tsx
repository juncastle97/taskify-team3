import clsx from "clsx";
import styles from "./DeleteButton.module.scss";

interface DeleteButtonProps {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  small?: boolean;
}

function DeleteButton({ onClick, small }: DeleteButtonProps) {
  return (
    <button
      className={clsx(styles.button, small && styles.small)}
      onClick={onClick}
    >
      대시보드 삭제하기
    </button>
  );
}

export default DeleteButton;
