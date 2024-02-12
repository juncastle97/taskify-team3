import clsx from "clsx";
import styles from "./ProfileImage.module.scss";
import Image from "next/image";

interface ProfileImageProps {
  member: {
    profileImageUrl: string | null;
    nickname: string;
  };
  width: number;
  height: number;
}

function ProfileImage({ member, width, height }: ProfileImageProps) {
  return (
    <div className={clsx(styles.profileImage)}>
      {member.profileImageUrl ? (
        <Image
          src={`${member.profileImageUrl}`}
          alt="프로필 이미지"
          width={width}
          height={height}
        />
      ) : (
        <div
          className={styles.profileInitial}
          style={{
            background: member.profileImageUrl ? "" : "#9fa6b2",
            width : width,
            height : height,
          }}
        >
          {member.nickname?.charAt(0).toUpperCase()}
        </div>
      )}
    </div>
  );
}
export default ProfileImage;
