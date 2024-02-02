import styles from "./DashboardCard.module.scss";
import TagChips from "@/components/chips/TagChips";
import { generateRandomColorHexCode } from "@/utils/color";

const CALENDAR_ICON_PATH = "/icons/calendar.svg";

interface DashboardCardProps {
  id: number;
  title: string;
  tags: string[];
  dueDate: string;
  profileImageUrl: string;
  imageUrl?: string;
}

const DashboardCard = ({
  id,
  title,
  tags,
  dueDate,
  profileImageUrl,
  imageUrl,
}: DashboardCardProps) => {
  return (
    <div className={styles.container}>
      {imageUrl && (
        <img className={styles.cardImage} src={imageUrl} alt="Card Image" />
      )}
      <div>
        <div className={styles.cardTitle}>{title}</div>
        <div className={styles.tagsAndDates}>
          <div className={styles.tags}>
            {tags.map(tag => (
              <TagChips tagName={tag} color={generateRandomColorHexCode()} />
            ))}
          </div>
          <div className={styles.dates}>
            <img
              className={styles.calendar}
              src={CALENDAR_ICON_PATH}
              alt="Calendar"
            />
            <span>{dueDate}</span>
          </div>
        </div>
      </div>
      <img
        className={styles.profileImage}
        src={profileImageUrl}
        alt="Profile Image"
      />
    </div>
  );
};

export default DashboardCard;
