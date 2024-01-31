import clsx from "clsx";
import styles from "./EditButton.module.scss";
import Button from "../baseButton/BaseButton";

interface ButtonProps {
  disabled?: boolean;
}

function EditButton({ disabled }: ButtonProps) {
  return (
    <div className={clsx(styles["edit-button"])}>
      <Button disabled={disabled} type="submit" small>
        변경
      </Button>
      ;
    </div>
  );
}
export default EditButton;
