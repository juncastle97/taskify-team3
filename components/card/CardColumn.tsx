import DashboardCard, {
  DashboardCardProps,
} from "@/components/card/DashboardCard";
import styles from "./CardColumn.module.scss";

const ELLIPSE_ICON_PATH = "/icons/blueEllipse.svg";
const SETTING_ICON_PATH = "/icons/setting.svg";
const PLUS_ICON_PATH = "/icons/plusButton.svg";

interface CardColumnProps {
  id: number;
  title: string;
  totalCount: number;
  cardPropsList: DashboardCardProps[];
}

const CardColumn = ({
  id,
  title,
  totalCount,
  cardPropsList,
}: CardColumnProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.head}>
        <div>
          <img
            className={styles.ellipse}
            src={ELLIPSE_ICON_PATH}
            alt="ellipse"
          />
          <span className={styles.title}>{title}</span>
          <span className={styles.numChip}>{totalCount}</span>
        </div>
        <button type="button">
          <img
            className={styles.setting}
            src={SETTING_ICON_PATH}
            alt="setting"
          />
        </button>
      </div>
      <button type="button" className={styles.plusButton}>
        <img src={PLUS_ICON_PATH} alt="plus button" />
      </button>
      <div className={styles.cardList}>
        {cardPropsList.map(cardProps => (
          <DashboardCard key={cardProps.id} {...cardProps} />
        ))}
      </div>
    </div>
  );
};

export default CardColumn;
