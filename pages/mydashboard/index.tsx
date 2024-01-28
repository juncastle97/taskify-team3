import InvitedDashboardTable from "@/components/table/InvitedDashboardTable";
import mockInvitations from "./mockInvitations.json";
import mapInvitations from "@/utils/mapInvitations";
import { InitialInvitations } from "@/types/invitations";

function MyDashboard() {
  const mappedMockInvitations = mapInvitations(
    mockInvitations as InitialInvitations,
  );

  return (
    <div>
      <InvitedDashboardTable
        totalCount={mockInvitations.totalCount}
        invitations={mappedMockInvitations}
      />
    </div>
  );
}

export default MyDashboard;
