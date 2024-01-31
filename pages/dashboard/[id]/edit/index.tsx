import ReturnButton from "@/components/button/returnButton/returnButton";
import EditDashboardTable from "@/components/table/editDashboardTable/editDashboardTable";
import clsx from "clsx";
import styles from "@/styles/pages/DashboardEdit.module.scss";
import MembersDashboardTable from "@/components/table/membersDashboardTable/MembersDashboardTable";
import DeleteButton from "@/components/button/deleteButton/DeleteButton";
import InviteDashboardTable from "@/components/table/inviteDashboardTable/InviteDashboardTable";
import { useRouter } from "next/router";

function DashboardEdit() {
  const router = useRouter();

  const handleDeleteClick = () => {
    // [id] 삭제 기능, 삭제 후 "/dashboard"로 이동 로직
    console.log("대시보드가 삭제되었습니다.");
    router.push("/dashboard");
  };
  return (
    <div className={clsx(styles["layout"])}>
      <div className={clsx(styles["tables"])}>
        <div>
          <ReturnButton />
        </div>
        <EditDashboardTable data={null} />
        <MembersDashboardTable assigneeData={null} />
        <InviteDashboardTable totalCount={0} />
        <div className={clsx(styles["delete-button"])}>
          <DeleteButton onClick={handleDeleteClick} />
        </div>
      </div>
    </div>
  );
}
export default DashboardEdit;
