import { MouseEvent, SetStateAction, Dispatch } from "react";
import clsx from "clsx";
import Image from "next/image";
import styles from "./SelectChipDropdown.module.scss";
import SelectColorChip from "@/components/chips/SelectColorChip";

interface SelectChipDropdown {
  selectedColor: string;
  setSelectedColor: Dispatch<SetStateAction<string>>;
  onClick: (e: MouseEvent<HTMLButtonElement>) => void;
}

const SelectChipDropdown: React.FC<SelectChipDropdown> = ({
  onClick,
  selectedColor,
  setSelectedColor,
}) => {
  return (
    <div className={clsx(styles.popupWrapper)}>
      <div className={clsx(styles.popup)}>
        <SelectColorChip
          type="edit"
          color={selectedColor}
          setColor={setSelectedColor}
        />
        <button className={clsx(styles.button)} type="button" onClick={onClick}>
          <Image src="/icons/close.svg" width={10} height={10} alt="close" />
        </button>
      </div>
    </div>
  );
};
export default SelectChipDropdown;
