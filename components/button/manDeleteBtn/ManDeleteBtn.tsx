import clsx from "clsx";
import styles from "./ManDeleteBtn.module.scss";

interface ManDeleteButtonProps {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  small?: boolean;
}

const ManDeleteButton = ({ onClick, small }: ManDeleteButtonProps) => {
  return (
    <button
      className={clsx(styles.button, small && styles.small)}
      onClick={onClick}
    >
      삭제
    </button>
  );
};

export default ManDeleteButton;
