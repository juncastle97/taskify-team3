import mockInvitations from "./mockInvitations.json";
import mapInvitations from "@/utils/mapInvitations";
import { InitialInvitations } from "@/types/invitations";
import MyInvitedDashboardTable from "@/components/table/myInvitedDashboardTable/MyInvitedDashboardTable";
import styles from '@/styles/pages/Mydashboard.module.scss'
import clsx from "clsx";

function MyDashboard() {
  const mappedMockInvitations = mapInvitations(
    mockInvitations as InitialInvitations,
  );

  return (
    <div className={clsx(styles.bg)}>
      <MyInvitedDashboardTable
        totalCount={mockInvitations.totalCount}
        invitations={mappedMockInvitations}
      />
    </div>
  );
}

export default MyDashboard;
