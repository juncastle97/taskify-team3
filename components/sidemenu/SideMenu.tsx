import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";
import styles from "./SideMenu.module.scss";
import { GetDashboardListType } from "@/types/dashboard";
import { getDashboardList } from "@/api/dashboards";
import PagingButton from "@/components/button/pagingButton/PagingButton";

interface DashboardBtnProps {
  dashboardList: GetDashboardListType;
}

const SideMenu: React.FC<DashboardBtnProps> = () => {
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
    <div className={clsx(styles.Container)}>
      <Link className={clsx(styles.logo)} href="/">
        <Image
          src="/logo/logo.svg"
          width={29}
          height={33}
          alt="taskify 로고(white theme)"
        />
        <Image
          className={clsx(styles.logoText)}
          src="/logo/Taskify.svg"
          width={80}
          height={33}
          alt="taskify 로고(white theme)"
          priority={true}
        />
      </Link>
      <div className={clsx(styles.btnWrapper)}>
        <span className={clsx(styles.menu)}>Dash Boards</span>
        <Link href="/">
          <Image
            src="/button-icon/sidemenuPlus.svg"
            width={20}
            height={20}
            alt="plus 버튼"
          />
        </Link>
      </div>
      {dashboardList.dashboards.map(item => (
        <Link href={`/dashboard/${item.id}`}>
          <div key={item.id} className={clsx(styles.dashboardListWrapper)}>
            <div
              className={clsx(styles.dashboardColor)}
              style={{ backgroundColor: item.color }}
            ></div>
            <span className={clsx(styles.dashboardList)}>{item.title}</span>
            {item.createdByMe && (
              <Image
                src="/button-icon/crown_icon.png"
                alt="왕관 아이콘"
                width={17}
                height={14}
                className={clsx(styles.crown)}
              />
            )}
          </div>
        </Link>
      ))}
      <div className={clsx(styles.pageBtnWrapper)}>
        <p
          className={clsx(styles.pageText)}
        >{`${totalPage} 페이지 중 ${currentPage}`}</p>
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
  );
};

export default SideMenu;
