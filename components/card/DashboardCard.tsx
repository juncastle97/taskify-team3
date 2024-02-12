import styles from "./DashboardCard.module.scss";
import TagChips from "@/components/chips/TagChips";
import { generateRandomColorHexCode } from "@/utils/color";
import clsx from "clsx";
import Image from "next/image";
import { CardPropsType } from "@/types/cards";

const CALENDAR_ICON_PATH = "/icons/calendar.svg";

const DashboardCard = ({
  cardProps,
  onClick,
}: {
  cardProps: CardPropsType;
  onClick: () => void;
}) => {
  const noneImgUrl =
    "https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/taskify/task_image";

  return (
    <div className={styles.container} onClick={onClick}>
      {cardProps.imageUrl !== noneImgUrl && (
        <img
          className={styles.cardImage}
          src={cardProps.imageUrl}
          alt="Card Image"
        />
      )}
      <div>
        <div className={styles.cardTitle}>{cardProps.title}</div>
        <div className={styles.tagsAndDates}>
          <div className={styles.tags}>
            {cardProps.tags.map((tag, index) => (
              <TagChips
                key={`tags_${index}`}
                tagName={tag}
                color={generateRandomColorHexCode()}
              />
            ))}
          </div>
          <div className={styles.dates}>
            <img
              className={styles.calendar}
              src={CALENDAR_ICON_PATH}
              alt="Calendar"
            />
            <span>{cardProps.dueDate}</span>
          </div>
        </div>
      </div>
      <div
        className={styles.profileImageWrapper}
        style={{
          background: cardProps.assignee.profileImageUrl ? "" : "#9fa6b2",
        }}
      >
        {cardProps.assignee.profileImageUrl ? (
          <div>
            <Image
              className={clsx(styles.profileImage)}
              src={`${cardProps.assignee.profileImageUrl}`}
              alt="프로필 이미지"
              width={24}
              height={24}
            />
          </div>
        ) : (
          cardProps.assignee.nickname.charAt(0).toUpperCase()
        )}
      </div>
    </div>
  );
};

export default DashboardCard;
