import styles from "./MyInvitedDashboardTable.module.scss";
import { MappedInvitations } from "@/types/invitations";
import SearchBar from "@/components/input/SearchBar";
import NoInvitation from "@/components/tables/myInvitedDashboardTable/NoInvitation";
import { ChangeEventHandler, useState } from "react";

interface MyInvitedDashboardTableProps {
  totalCount: number;
  invitations: MappedInvitations;
}

/** @TODO mydashboard 페이지에서 데이터 api로 받기 (/{teamId}/invitations) */
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
                /** @TODO 수락/거절 버튼 컴포넌트 완성되면 적용하기 */
                <tr key={invitation.id}>
                  <td>{invitation.dashboard}</td>
                  <td>{invitation.inviter}</td>
                  <td>{invitation.inviteAccepted ? "수락" : "거절"}</td>
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
