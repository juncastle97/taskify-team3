import clsx from "clsx";
import styles from "./EditButton.module.scss";

function EditButton() {
  return <button className={clsx(styles["edit-button"])}>변경</button>;
}
export default EditButton;
