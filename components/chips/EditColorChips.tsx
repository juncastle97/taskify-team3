import { SetStateAction } from "react";
import { useForm } from "react-hook-form";
import Image from "next/image";
import clsx from "clsx";
import styles from "./EditColorChips.module.scss";
import { COLORS } from "@/constants/colors";
import BaseButton from "../button/baseButton/BaseButton";

interface EditColorChipsProps {
  theme: "color" | "custom" | string;
  selectedColor: string;
  setSelectedColor: (value: SetStateAction<string>) => void;
  isInModal?: boolean;
}

const colorCodeRules = {
  required: "값을 입력해주세요.",
  pattern: {
    value: /^#[a-zA-Z0-9]{6}$/,
    message: "형식이 맞지 않아요.",
  },
};

function EditColorChips({
  theme,
  selectedColor,
  setSelectedColor,
  isInModal,
}: EditColorChipsProps) {
  const colors = [
    COLORS.GREEN,
    COLORS.PURPLE,
    COLORS.ORANGE,
    COLORS.BLUE,
    COLORS.PINK,
  ];
  const {
    register,
    watch,
    formState: { errors },
  } = useForm({ mode: "onBlur" });
  const customColorCode = watch("customColor");
  const isError = errors.customColor ? true : false;

  return theme === "custom" ? (
    <div className={clsx(styles.inputWrapper)}>
      <div className={clsx(styles.errorWrapper)}>
        <input
          className={clsx(isError && styles.error)}
          {...register("customColor", colorCodeRules)}
          placeholder="#FFFFFF 형식으로 입력하세요"
        />
        {errors.customColor && (
          <div
            className={clsx(styles.errorMsg)}
          >{`${errors.customColor.message}`}</div>
        )}
      </div>
      <BaseButton
        type="button"
        disabled={
          isError || !customColorCode || selectedColor === customColorCode
        }
        onClick={() => {
          setSelectedColor(customColorCode);
        }}
        small
      >
        확인
      </BaseButton>
    </div>
  ) : (
    <div className={clsx(styles.container)}>
      {colors.map(color => (
        <div
          key={color}
          className={clsx(styles.colorBox)}
          onClick={() => setSelectedColor(color)}
          style={{
            backgroundColor: color,
            display: isInModal ? "flex" : "block",
          }}
        >
          {selectedColor === color && (
            <Image
              src="/icons/checkChip.svg"
              width={20}
              height={20}
              alt="check icon"
            />
          )}
        </div>
      ))}
    </div>
  );
}

export default EditColorChips;
