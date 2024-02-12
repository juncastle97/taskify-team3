import AcceptButton from "@/components/tables/myInvitedDashboardTable/AcceptButton";
import styles from "./DesktopTable.module.scss";
import { MappedInvitations } from "@/types/invitations";

interface DesktopTableProps {
  datas: MappedInvitations;
  handleButtonClick: (id: number) => void;
}

const DesktopTable = ({ datas, handleButtonClick }: DesktopTableProps) => {
  return (
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
        {datas.map(invitation => (
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
  );
};

export default DesktopTable;
