import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";
import styles from "./SideMenu.module.scss";
import mockData from "./dashboard.json";

interface Dashboard {
  id: number;
  title: string;
  color: string;
  userId: number;
  createdAt: string;
  updatedAt: string;
  createdByMe: boolean;
}

interface DashboardList {
  dashboards: Dashboard[];
  totalCount: number;
  cursorId?: number | null;
}

const SideMenu: React.FC<DashboardList> = () => {
  const [data, setData] = useState<DashboardList | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result: DashboardList = await mockData;
        setData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

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
        {data?.dashboards.map(dashboard => (
          <div key={dashboard.id} className={clsx(styles.dashboardListWrapper)}>
            <div
              className={clsx(styles.dashboardColor)}
              style={{ backgroundColor: dashboard.color }}
            ></div>
            <span className={clsx(styles.dashboardList)}>
              {dashboard.title}
            </span>
            {dashboard.createdByMe && (
              <Image
                src="/button-icon/crown_icon.png"
                alt="왕관 아이콘"
                width={17}
                height={14}
              />
            )}
          </div>
        ))}
    </div>
  );
};

export default SideMenu;
