import { useEffect, useState } from "react";
import DashboardCard from "@/components/card/DashboardCard";
import clsx from "clsx";
import styles from "./CardColumn.module.scss";
import { getCardList } from "@/api/cards";
import {InitialCardData, CardPropsType} from "@/types/cards";
import ColumnEditModal from "../modal/columnEditModal/ColumnEditModal";

const ELLIPSE_ICON_PATH = "/icons/blueEllipse.svg";
const SETTING_ICON_PATH = "/icons/setting.svg";
const PLUS_ICON_PATH = "/icons/plusButton.svg";

interface CardColumnProps {
  id: number;
  title: string;
}

const CardColumn = ({ id, title }: CardColumnProps) => {
  const [cardData, setCardData] = useState<InitialCardData>();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const CardListData = async (columnId: number) => {
    try {
      const response = await getCardList(10, columnId);
      setCardData(response);
    } catch (error) {
      console.error("GET 요청 실패: ", error);
    }
  };

  useEffect(() => {
    CardListData(id);
  }, [id]);

  const openModal = () => {
    setIsOpen(true);
  };

  return (
    <div className={clsx(styles.container)}>
      <div className={clsx(styles.head)}>
        <div>
          <img
            className={clsx(styles.ellipse)}
            src={ELLIPSE_ICON_PATH}
            alt="Ellipse"
          />
          <span className={clsx(styles.title)}>{title}</span>
          <span className={clsx(styles.numChip)}>{cardData?.totalCount}</span>
        </div>
        <button type="button" onClick={openModal}>
          <img
            className={clsx(styles.setting)}
            src={SETTING_ICON_PATH}
            alt="Setting"
          />
        </button>
        {isOpen && <ColumnEditModal setIsOpen={setIsOpen}/>}
      </div>
      <button type="button" className={clsx(styles.plusButton)}>
        <img src={PLUS_ICON_PATH} alt="Plus Button" />
      </button>
      <div className={clsx(styles.cardList)}>
        {cardData?.cards.map((cardProps: CardPropsType) => (
          <DashboardCard key={cardProps.id} cardProps={cardProps} />
        ))}
      </div>
    </div>
  );
};

export default CardColumn;
