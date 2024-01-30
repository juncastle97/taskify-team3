import mockInvitations from "./mockInvitations.json";
import mapInvitations from "@/utils/mapInvitations";
import { InitialInvitations } from "@/types/invitations";
import MyInvitedDashboardTable from "@/components/table/myInvitedDashboardTable/MyInvitedDashboardTable";

function MyDashboard() {
  const mappedMockInvitations = mapInvitations(
    mockInvitations as InitialInvitations,
  );

  return (
    <div>
      <MyInvitedDashboardTable
        totalCount={mockInvitations.totalCount}
        invitations={mappedMockInvitations}
      />
    </div>
  );
}

export default MyDashboard;
