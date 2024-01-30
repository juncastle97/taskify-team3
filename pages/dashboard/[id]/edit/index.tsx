import ReturnButton from "@/components/button/returnButton/returnButton";
import EditDashboardTable from "@/components/table/editDashboardTable/editDashboardTable";
import clsx from "clsx";
import styles from "@/styles/pages/DashboardEdit.module.scss";
import MembersDashboardTable from "@/components/table/membersDashboardTable/MembersDashboardTable";
import DeleteButton from "@/components/button/deleteButton/DeleteButton";
import InviteDashboardTable from "@/components/table/inviteDashboardTable/InviteDashboardTable";

interface DashboardEditProps {
  dashboardId: string;
}

function DashboardEdit({ dashboardId }: DashboardEditProps) {
  const handleDeleteClick = () => {
    console.log("대시보드가 삭제되었습니다.");
  };
  return (
    <div className={clsx(styles["layout"])}>
      <div className={clsx(styles["tables"])}>
        <div>
          <ReturnButton url={`dashboard/${dashboardId}`} />
        </div>
        <EditDashboardTable data={null} />
        <MembersDashboardTable assigneeData={null} />
        <InviteDashboardTable totalCount={0} invitations={null} />
        <div className={clsx(styles["delete-button"])}>
          <DeleteButton onClick={handleDeleteClick} />
        </div>
      </div>
    </div>
  );
}
export default DashboardEdit;
