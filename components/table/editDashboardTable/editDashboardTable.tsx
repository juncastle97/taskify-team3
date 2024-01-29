import clsx from "clsx";
import styles from "./editDashboardTable.module.scss";
import EditButton from "@/components/button/editButton/EditButton";

function EditDashboardTable() {
  return (
    <form className={clsx(styles["table-form"])}>
      <div className={clsx(styles["dashboard-title"])}>
        <div className={clsx(styles["dashboard-title-text"])}>
          {"dashboard title"}
        </div>
        <div>(color chips)</div>
      </div>
      <div className={clsx(styles["dashboard-input-box"])}>
        <label className={clsx(styles["label"])}>대시보드 이름</label>
        <input
          className={clsx(styles["dashboard-input"])}
          placeholder="뉴 프로젝트"
        />
      </div>
      <div className={clsx(styles["edit-button"])}>
        <EditButton />
      </div>
    </form>
  );
}
export default EditDashboardTable;
