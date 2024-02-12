import AcceptButton from "@/components/tables/myInvitedDashboardTable/AcceptButton";
import styles from "./MobileList.module.scss";
import { MappedInvitations } from "@/types/invitations";

interface MobileTableProps {
  datas: MappedInvitations;
  handleButtonClick: (id: number) => void;
}

const MobileTable = ({ datas, handleButtonClick }: MobileTableProps) => {
  return (
    <ul className={styles.list}>
      {datas.map(invitation => (
        <li key={invitation.id}>
          <div className={styles.row}>
            <span className={styles.head}>이름</span>
            <span>{invitation.dashboard}</span>
          </div>
          <div className={styles.row}>
            <span className={styles.head}>초대자</span>
            <span>{invitation.inviter}</span>
          </div>
          <div className={styles.buttons}>
            <AcceptButton
              onClick={() => handleButtonClick(invitation.id)}
              invitationId={invitation.id}
            />
          </div>
        </li>
      ))}
    </ul>
  );
};

export default MobileTable;
