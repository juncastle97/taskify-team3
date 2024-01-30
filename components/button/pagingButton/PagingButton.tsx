import clsx from "clsx";
import styles from "./PagingButton.module.scss";
import Image from "next/image";

const ARROW_SIZE = 16;
const LEFT_ARROW_PATH = "/icons/leftArrow.svg";
const DISABLED_LEFT_ARROW_PATH = "/icons/disabledLeftArrow.svg";
const RIGHT_ARROW_PATH = "/icons/rightArrow.svg";
const DISABLED_RIGHT_ARROW_PATH = "/icons/disabledRightArrow.svg";

interface PagingButtonProps {
  onClick: {
    left: React.MouseEventHandler<HTMLButtonElement>;
    right: React.MouseEventHandler<HTMLButtonElement>;
  };
  disabled: {
    left: boolean;
    right: boolean;
  };
  small?: boolean;
}

const PagingButton = ({ onClick, disabled, small }: PagingButtonProps) => {
  return (
    <div>
      <button
        className={clsx(
          styles.button,
          styles.left,
          small && styles.small,
          disabled.left && styles.disabled,
        )}
        onClick={onClick.left}
        disabled={disabled.left}
      >
        <Image
          src={disabled.left ? DISABLED_LEFT_ARROW_PATH : LEFT_ARROW_PATH}
          alt="leftArrow"
          width={ARROW_SIZE}
          height={ARROW_SIZE}
        />
      </button>
      <button
        className={clsx(
          styles.button,
          styles.right,
          small && styles.small,
          disabled.right && styles.disabled,
        )}
        onClick={onClick.right}
        disabled={disabled.right}
      >
        <Image
          src={disabled.right ? DISABLED_RIGHT_ARROW_PATH : RIGHT_ARROW_PATH}
          alt="rightArrow"
          width={ARROW_SIZE}
          height={ARROW_SIZE}
        />
      </button>
    </div>
  );
};

export default PagingButton;
