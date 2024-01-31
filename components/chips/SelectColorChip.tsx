import clsx from "clsx";
import { Dispatch, SetStateAction, useState } from "react";

import styles from "./SelectColorChip.module.scss";
import EditColorChips from "./EditColorChips";

interface SetColorChipProps {
  type?: string;
  color: string;
  setColor: Dispatch<SetStateAction<string>>;
}

const SelectColorChip: React.FC<SetColorChipProps> = ({
  type = "create",
  color,
  setColor,
}) => {
  const [colorTheme, setColorTheme] = useState("color");
  return (
    <div className={clsx(styles.selectColorWrapper)}>
      <div className={clsx(styles.selectTheme)}>
        {type !== "edit" && <div>색상 선택</div>}
        <div
          className={clsx(styles.defaultTheme, {
            [styles.selectedTheme]: colorTheme === "color",
          })}
          onClick={() => setColorTheme("color")}
        >
          COLOR
        </div>
        <div
          className={clsx(styles.defaultTheme, {
            [styles.selectedTheme]: colorTheme === "custom",
          })}
          onClick={() => setColorTheme("custom")}
        >
          CUSTOM
        </div>
      </div>
      <EditColorChips
        theme={colorTheme}
        selectedColor={color}
        setSelectedColor={setColor}
        isInModal={true}
      />
    </div>
  );
};
export default SelectColorChip;
