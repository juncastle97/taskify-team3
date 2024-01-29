import clsx from "clsx";
import { useState, useEffect } from "react";
import styles from "./MembersDashboardTable.module.scss";
import PagingButton from "@/components/button/PagingButton";

function MembersDashboardTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState<number>(0);

  const handleLeftButtonClick = () => {
    setCurrentPage(prevPage => Math.max(prevPage - 1, 1));
  };

  const handleRightButtonClick = () => {
    setCurrentPage(prevPage => Math.min(prevPage + 1, totalPage));
  };

  useEffect(() => {
    if (totalPage !== 0 && totalPage < currentPage)
      setCurrentPage(prev => prev - 1);
  }, [totalPage]);

  return (
    <form className={clsx(styles["table-form"])}>
      <div className={clsx(styles["dashboard-title"])}>
        <div>구성원</div>
        <div className={clsx(styles["page-number"])}>
          {`${totalPage} 페이지 중 ${currentPage}`}
          <PagingButton
            onClick={{
              left: handleLeftButtonClick,
              right: handleRightButtonClick,
            }}
            disabled={{
              left: currentPage === 1,
              right: currentPage === totalPage,
            }}
            small
          />
        </div>
      </div>
      <div className={clsx(styles["label"])}>이름</div>
    </form>
  );
}
export default MembersDashboardTable;
