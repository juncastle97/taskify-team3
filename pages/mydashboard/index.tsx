import React, { useState, useEffect } from "react";
import mapInvitations from "@/utils/mapInvitations";
import { MappedInvitations } from "@/types/invitations";
import MyInvitedDashboardTable from "@/components/tables/myInvitedDashboardTable/MyInvitedDashboardTable";
import styles from "@/styles/pages/Mydashboard.module.scss";
import clsx from "clsx";
import DashboardBtn from "@/components/button/dashboardBtn/DashboardBtn";
import { GetDashboardListType } from "@/types/dashboard";
import { getDashboardList } from "@/api/dashboards";
import PagingButton from "@/components/button/pagingButton/PagingButton";
import { getInvitedDashboardList } from "@/api/invitations";
import CreateDashboardModal from "@/components/modal/createDashboardModal/CreateDashboardModal";
import { useRouter } from "next/router";

function MyDashboard() {
  const [dashboardList, setDashboardList] = useState<GetDashboardListType>({
    totalCount: 0,
    cursorId: 0,
    dashboards: [],
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [invitations, setInvitations] = useState<MappedInvitations>([]);
  const [filteredInvitations, setFilteredInvitations] =
    useState<MappedInvitations>([]);

  const router = useRouter();
  const { create } = router.query;
  const [isModalOpen, setIsModalOpen] = useState(create ? true : false);

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
    } catch (error) {
      console.error("GET 요청 실패: ", error);
    }
  };

  const getInvitations = async () => {
    try {
      const response = await getInvitedDashboardList();
      const result = mapInvitations(response);
      setInvitations(result);
      setFilteredInvitations(result);
    } catch (error) {
      console.error("초대받은 대시보드 데이터 요청 실패: ", error);
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  useEffect(() => {
    if (totalPage !== 0 && totalPage < currentPage)
      setCurrentPage(prev => prev - 1);
  }, [totalPage]);

  useEffect(() => {
    DashboardListData(currentPage);
  }, [dashboardList.totalCount, currentPage, invitations, isModalOpen]);

  useEffect(() => {
    getInvitations();
  }, []);

  return (
    <div className={clsx(styles.bg)}>
      <div className={clsx(styles.container)}>
        <DashboardBtn
          onClick={() => setIsModalOpen(true)}
          dashboardList={dashboardList}
        />
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
        data={invitations}
        setData={setInvitations}
        filteredData={filteredInvitations}
        setFilteredData={setFilteredInvitations}
      />
      {isModalOpen && <CreateDashboardModal setIsOpen={setIsModalOpen} />}
    </div>
  );
}

export default MyDashboard;
