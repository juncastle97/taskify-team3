import clsx from "clsx";
import { useEffect, useState } from "react";
import styles from "./InviteDashboardTable.module.scss";
import PagingButton from "@/components/button/PagingButton";
import Button from "@/components/button/BaseButton/BaseButton";
import Image from "next/image";

function InviteDashboardTable() {
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
    <form className={clsx(styles.tableForm)}>
      <div className={clsx(styles.dashboardTitle)}>
        <div>초대 내역</div>
        <div className={clsx(styles.pageNumber)}>
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
          <div className={clsx(styles.inviteButton)}>
            <Button small>
              <div className={clsx(styles.buttonText)}>
                <Image
                  src="/icons/addImage.svg"
                  width={16}
                  height={16}
                  alt="add image"
                />
                {"초대하기"}
              </div>
            </Button>
          </div>
        </div>
      </div>
      <div className={clsx(styles.label)}>이메일</div>
    </form>
  );
}
export default InviteDashboardTable;
