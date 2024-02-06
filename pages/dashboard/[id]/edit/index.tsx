import { useRouter } from "next/router";
import clsx from "clsx";
import styles from "@/styles/pages/DashboardEdit.module.scss";
import { deleteDashboard } from "@/api/dashboards";
import ReturnButton from "@/components/button/returnButton/returnButton";
import EditDashboardTable from "@/components/tables/editDashboardTable";
import MembersDashboardTable from "@/components/tables/membersDashboardTable";
import InvitationDashboardTable from "@/components/tables/invitationDashboardTable";
import DeleteButton from "@/components/button/deleteButton/DeleteButton";
import { useState } from "react";
import AlertModal from "@/components/modal/alertModal";

function DashboardEdit() {
  const router = useRouter();
  const { id } = router.query;
  const dashboardId = Number(id);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const modalOpen = () => {
    setIsOpen(true);
  };

  const handleDeleteClick = async (dashboardId: number) => {
    await deleteDashboard(dashboardId);
    router.push(`/mydashboard`);
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
          <DeleteButton onClick={modalOpen} />
          {isOpen && (
            <AlertModal
              setModal={setIsOpen}
              alertMessage="대시보드를 삭제하시겠습니까?"
              confirmButton="삭제"
              isCancelButton
              onConfirmClick={() => handleDeleteClick(dashboardId)}
            />
          )}
        </div>
      </div>
    </div>
  );
}
export default DashboardEdit;
