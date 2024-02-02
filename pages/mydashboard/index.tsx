import mockInvitations from "./mockInvitations.json";
import mapInvitations from "@/utils/mapInvitations";
import { InitialInvitations } from "@/types/invitations";
import MyInvitedDashboardTable from "@/components/tables/myInvitedDashboardTable/MyInvitedDashboardTable";
import PlusBtn from "@/components/button/plusBtn/PlusBtn";
import styles from "@/styles/pages/Mydashboard.module.scss";
import clsx from "clsx";

function MyDashboard() {
  const mappedMockInvitations = mapInvitations(
    mockInvitations as InitialInvitations,
  );

  return (
    <div className={clsx(styles.bg)}>
      <PlusBtn textStyle={'colum16'}>새로운 대시보드</PlusBtn>
      <MyInvitedDashboardTable
        totalCount={mockInvitations.totalCount}
        invitations={mappedMockInvitations}
      />
    </div>
  );
}

export default MyDashboard;
