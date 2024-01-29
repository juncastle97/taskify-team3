import clsx from "clsx";
import styles from "./PagingButton.module.scss";
import Image from "next/image";

import leftArrow from "@/public/icons/leftArrow.svg";
import disabledLeftArrow from "@/public/icons/disabledLeftArrow.svg";
import rightArrow from "@/public/icons/rightArrow.svg";
import disabledRightArrow from "@/public/icons/disabledRightArrow.svg";

const ARROW_SIZE = 16;

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
          src={disabled.left ? disabledLeftArrow : leftArrow}
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
          src={disabled.right ? disabledRightArrow : rightArrow}
          alt="rightArrow"
          width={ARROW_SIZE}
          height={ARROW_SIZE}
        />
      </button>
    </div>
  );
};

export default PagingButton;
