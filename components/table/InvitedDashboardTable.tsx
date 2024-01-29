import Image from "next/image";
import styles from "./InvitedDashboardTable.module.scss";
import { MappedInvitations } from "@/types/invitations";
import noInvitationIcon from "@/public/icons/noInvitation.svg";

const NO_INVITATION_ICON_SIZE = 100;

interface InvitedDashboardTableProps {
  totalCount: number;
  invitations: MappedInvitations;
}

const NoInvitation = () => {
  return (
    <div className={styles["no-invitation"]}>
      <Image
        src={noInvitationIcon}
        alt="No Invitation"
        width={NO_INVITATION_ICON_SIZE}
        height={NO_INVITATION_ICON_SIZE}
      />
      <span>아직 초대받은 대시보드가 없어요</span>
    </div>
  );
};

const InvitedDashboardTable = ({
  totalCount,
  invitations,
}: InvitedDashboardTableProps) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>초대받은 대시보드</div>
      {totalCount ? (
        <ul>
          {invitations.map(invitation => (
            <li>
              {invitation.dashboard}
              {invitation.inviter}
              {invitation.inviteAccepted}
            </li>
          ))}
        </ul>
      ) : (
        <NoInvitation />
      )}
    </div>
  );
};

export default InvitedDashboardTable;
