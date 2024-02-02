import { convertHexToRGBA } from "@/utils/color";
import styles from "./TagChips.module.scss";
import clsx from "clsx";

interface TagChipsProps {
  tagName: string;
  color: string;
  small?: boolean;
}

// color: hex code (ex. #fff / #c9c9c9)
const TagChips = ({ tagName, color, small }: TagChipsProps) => {
  const backgroundColor = convertHexToRGBA(color, 0.3);

  return (
    <div
      className={clsx(styles.tag, small && styles.small)}
      style={{ color, backgroundColor }}
    >
      {tagName}
    </div>
  );
};

export default TagChips;
