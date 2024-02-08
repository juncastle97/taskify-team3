import styles from "./MyInvitedDashboardTable.module.scss";
import { MappedInvitations } from "@/types/invitations";
import SearchBar from "@/components/input/SearchBar";
import NoInvitation from "@/components/tables/myInvitedDashboardTable/NoInvitation";
import { ChangeEventHandler, Dispatch, SetStateAction } from "react";
import AcceptButton from "@/components/tables/myInvitedDashboardTable/AcceptButton";

interface MyInvitedDashboardTableProps {
  data: MappedInvitations;
  setData: Dispatch<SetStateAction<MappedInvitations>>;
  filteredData: MappedInvitations;
  setFilteredData: Dispatch<SetStateAction<MappedInvitations>>;
}

const MyInvitedDashboardTable = ({
  data,
  setData,
  filteredData,
  setFilteredData,
}: MyInvitedDashboardTableProps) => {
  const handleInputChange: ChangeEventHandler<HTMLInputElement> = e => {
    const input = e.target.value;

    setFilteredData(
      data.filter(
        invitation =>
          invitation.dashboard.includes(input) ||
          invitation.inviter.includes(input),
      ),
    );
  };

  const handleButtonClick = (id: number) => {
    setData(prev => prev.filter(invitation => invitation.id !== id));
    setFilteredData(prev => prev.filter(invitation => invitation.id !== id));
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>초대받은 대시보드</div>
      {data.length ? (
        <div className={styles.tableArea}>
          <SearchBar onChange={handleInputChange} />
          <table className={styles.table}>
            <colgroup>
              <col style={{ width: "30%" }} />
              <col style={{ width: "30%" }} />
              <col style={{ width: "30%" }} />
            </colgroup>
            <thead>
              <tr>
                <th>이름</th>
                <th>초대자</th>
                <th>수락 여부</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map(invitation => (
                <tr key={invitation.id}>
                  <td>{invitation.dashboard}</td>
                  <td>{invitation.inviter}</td>
                  <td>
                    <AcceptButton
                      invitationId={invitation.id}
                      onClick={() => handleButtonClick(invitation.id)}
                    />
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
