import Image from "next/image";
import styles from "./NoInvitation.module.scss";

const NO_INVITATION_ICON_SIZE = 100;
const NO_INVITATION_ICON_PATH = "/icons/noInvitation.svg";

const NoInvitation = () => {
  return (
    <div className={styles.noInvitation}>
      <Image
        priority
        src={NO_INVITATION_ICON_PATH}
        alt="No Invitation"
        width={NO_INVITATION_ICON_SIZE}
        height={NO_INVITATION_ICON_SIZE}
      />
      <span>아직 초대받은 대시보드가 없어요</span>
    </div>
  );
};

export default NoInvitation;
