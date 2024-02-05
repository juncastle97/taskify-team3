import React, { useState, useEffect } from "react";
import mockInvitations from "./mockInvitations.json";
import mapInvitations from "@/utils/mapInvitations";
import { InitialInvitations } from "@/types/invitations";
import MyInvitedDashboardTable from "@/components/tables/myInvitedDashboardTable/MyInvitedDashboardTable";
import styles from "@/styles/pages/Mydashboard.module.scss";
import clsx from "clsx";
import DashboardBtn from "@/components/button/dashboardBtn/DashboardBtn";
import { GetDashboardListType } from "@/types/dashboard";
import { getDashboardList } from "@/api/dashboards";
import PagingButton from "@/components/button/pagingButton/PagingButton";

function MyDashboard() {
  const mappedMockInvitations = mapInvitations(
    mockInvitations as InitialInvitations,
  );
  const [dashboardList, setDashboardList] = useState<GetDashboardListType>({
    totalCount: 0,
    cursorId: 0,
    dashboards: [],
  });
  const [currentPage, setCurrentPage] = useState(1);

  const ITEMS_PER_PAGE = 5;
  const totalPage = Math.ceil((dashboardList.totalCount || 1) / ITEMS_PER_PAGE);
  const handleLeftButtonClick = () => {
    setCurrentPage(prevPage => Math.max(prevPage - 1, 1));
  };

  const handleRightButtonClick = () => {
    setCurrentPage(prevPage => Math.min(prevPage + 1, totalPage));
  };

  const DashboardListData = async (page: number) => {
    try {
      const response = await getDashboardList(page, 5);
      setDashboardList(response);
      // setIsLoading(false);
    } catch (error) {
      console.error("GET 요청 실패: ", error);
    }
  };

  useEffect(() => {
    if (totalPage !== 0 && totalPage < currentPage)
      setCurrentPage(prev => prev - 1);
  }, [totalPage]);

  useEffect(() => {
    DashboardListData(currentPage);
  }, [dashboardList.totalCount, currentPage]);

  return (
    <div className={clsx(styles.bg)}>
      <div className={clsx(styles.container)}>
        <DashboardBtn dashboardList={dashboardList} />
        <div className={clsx(styles.pageBtnWrapper)}>
          <p>{`${totalPage} 페이지 중 ${currentPage}`}</p>
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
      <MyInvitedDashboardTable
        totalCount={mockInvitations.totalCount}
        invitations={mappedMockInvitations}
      />
    </div>
  );
}

export default MyDashboard;
