import { useState } from "react";

import styles from "@/styles/pages/Dashboard.module.scss";
import PlusBtn from "@/components/button/plusBtn/PlusBtn";
import CardColumn from "@/components/card/CardColumn";
import ColumnAddModal from "@/components/modal/columnAddModal/ColumnAddModal";
import { getCardList } from "@/api/cards";

import mockColumns from "./mockColumns.json";
import mockCards from "./mockCards.json";
import mapCardList from "@/utils/mapCardList";
import InitialCardData from "@/types/cards";

const Dashboard = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
 
  const mappedMockCards = mapCardList(mockCards as InitialCardData);

  const openModal = () => {
    setIsOpen(true);
  };

  return (
    <div className={styles.bg}>
      <div className={styles.columns}>
        {mockColumns.data.map(column => (
          <CardColumn
            key={column.id}
            id={column.id}
            title={column.title}
            totalCount={mockCards.totalCount}
            cardPropsList={mappedMockCards}
          />
        ))}
      <PlusBtn size={"colum1"} textStyle={"colum16"} onClick={openModal}>새로운 컬럼 추가하기</PlusBtn>
      {isOpen && <ColumnAddModal setIsOpen={setIsOpen} />}
      </div>
    </div>
  );
};

export default Dashboard;
