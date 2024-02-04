import styles from "./MyInvitedDashboardTable.module.scss";
import { MappedInvitations } from "@/types/invitations";
import SearchBar from "@/components/input/SearchBar";
import NoInvitation from "@/components/tables/myInvitedDashboardTable/NoInvitation";
import { ChangeEventHandler, useState } from "react";
import AcceptButton from "@/components/tables/myInvitedDashboardTable/AcceptButton";

interface MyInvitedDashboardTableProps {
  totalCount: number;
  invitations: MappedInvitations;
}

const MyInvitedDashboardTable = ({
  totalCount,
  invitations: initialInvitations,
}: MyInvitedDashboardTableProps) => {
  const [invitations, setInvitations] = useState(initialInvitations);

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = e => {
    const input = e.target.value;

    setInvitations(
      initialInvitations.filter(
        invitation =>
          invitation.dashboard.includes(input) ||
          invitation.inviter.includes(input),
      ),
    );
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>초대받은 대시보드</div>
      {totalCount ? (
        <div className={styles.tableArea}>
          <SearchBar onChange={handleInputChange} />
          <table className={styles.table}>
            <thead>
              <tr>
                <th>이름</th>
                <th>초대자</th>
                <th>수락 여부</th>
              </tr>
            </thead>
            <tbody>
              {invitations.map(invitation => (
                <tr key={invitation.id}>
                  <td>{invitation.dashboard}</td>
                  <td>{invitation.inviter}</td>
                  <td>
                    <AcceptButton isAccepted={invitation.inviteAccepted} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <NoInvitation />
      )}
    </div>
  );
};

export default MyInvitedDashboardTable;
