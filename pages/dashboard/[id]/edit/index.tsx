import { useRouter } from "next/router";
import clsx from "clsx";
import styles from "@/styles/pages/DashboardEdit.module.scss";
import { DashboardType } from "@/types/dashboard";
import { deleteDashboard } from "@/api/dashboards";
import ReturnButton from "@/components/button/returnButton/returnButton";
import EditDashboardTable from "@/components/tables/editDashboardTable";
import MembersDashboardTable from "@/components/tables/membersDashboardTable";
import InvitationDashboardTable from "@/components/tables/invitationDashboardTable";
import DeleteButton from "@/components/button/deleteButton/DeleteButton";

function DashboardEdit({ id, title }: DashboardType) {
  const router = useRouter();

  const handleDeleteClick = async (dashboardId: number) => {
    await deleteDashboard(dashboardId);
    router.push(`/dashboard`);
  };
  return (
    <div className={clsx(styles.layout)}>
      <div className={clsx(styles.tables)}>
        <div>
          <ReturnButton />
        </div>
        <EditDashboardTable />
        <MembersDashboardTable />
        <InvitationDashboardTable />
        <div className={clsx(styles.deleteButton)}>
          <DeleteButton
            onClick={() => {
              alert(`${title}을 삭제하시겠습니까?`);
              handleDeleteClick(id);
            }}
          />
        </div>
      </div>
    </div>
  );
}
export default DashboardEdit;
