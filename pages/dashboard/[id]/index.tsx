import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import styles from "@/styles/pages/Dashboard.module.scss";
import PlusBtn from "@/components/button/plusBtn/PlusBtn";
import CardColumn from "@/components/card/CardColumn";
import ColumnAddModal from "@/components/modal/columnAddModal/ColumnAddModal";
import { getColumnList } from "@/api/columns";
import { ColumnDataType } from "@/types/column";
import clsx from "clsx";

const Dashboard = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [columnData, setColumnData] = useState<ColumnDataType>();
  const [currentId, setCurrentId] = useState<number>(0);

  const ColumnListData = async (dashboardId: number) => {
    try {
      const response = await getColumnList(dashboardId);
      setColumnData(response);
    } catch (error) {
      console.error("GET 요청 실패: ", error);
    }
  };

  useEffect(() => {
    const dashboardId = Number(router.query.id);
    if (!isNaN(dashboardId)) {
      ColumnListData(dashboardId);
      setCurrentId(dashboardId);
    }
  }, [router.query.id]);

  const openModal = () => {
    setIsOpen(true);
  };

  return (
    <div className={styles.bg}>
      <div className={styles.columns}>
        {columnData?.data.map(column => (
          <CardColumn key={column.id} id={column.id} title={column.title} />
        ))}
        <div className={clsx(styles.plusBtn)}>
          <PlusBtn size={"colum1"} textStyle={"colum16"} onClick={openModal}>
            새로운 컬럼 추가하기
          </PlusBtn>
        </div>
        {isOpen && (
          <ColumnAddModal setIsOpen={setIsOpen} currentId={currentId} />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
