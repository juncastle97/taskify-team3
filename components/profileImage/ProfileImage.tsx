import clsx from "clsx";
import styles from "./ProfileImage.module.scss";
import Image from "next/image";

interface ProfileImageProps {
  member: {
    profileImageUrl: string;
    nickname: string;
  };
  width: number;
  height: number;
}

function ProfileImage({ member, width, height }: ProfileImageProps) {
  return (
    <div
      className={clsx(styles.profileImage)}
      style={{
        background: member.profileImageUrl ? "" : "#9fa6b2",
        width: width,
        height: height,
      }}
    >
      {member.profileImageUrl ? (
        <Image
          src={`${member.profileImageUrl}`}
          alt="프로필 이미지"
          width={height}
          height={width}
        />
      ) : (
        member.nickname[0].toUpperCase()
      )}
    </div>
  );
}
export default ProfileImage;
