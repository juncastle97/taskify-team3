import styles from "@/styles/pages/Dashboard.module.scss";
import CardColumn from "@/components/card/CardColumn";

import mockColumns from "./mockColumns.json";
import mockCards from "./mockCards.json";
import mapCardList from "@/utils/mapCardList";
import InitialCardData from "@/types/cards";

const Dashboard = () => {
  const mappedMockCards = mapCardList(mockCards as InitialCardData);

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
      </div>
    </div>
  );
};

export default Dashboard;
