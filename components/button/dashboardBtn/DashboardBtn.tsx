import { MouseEvent } from "react";
import clsx from "clsx";
import styles from "./DashboardBtn.module.scss";
import Link from "next/link";
import Image from "next/image";
import { GetDashboardListType } from "@/types/dashboard";
import PlusBtn from "../plusBtn/PlusBtn";

interface DashboardBtnProps {
  dashboardList: GetDashboardListType;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
}

const DashboardBtn: React.FC<DashboardBtnProps> = ({
  dashboardList,
  onClick,
}) => {
  return (
    <div className={clsx(styles.gridContainer)}>
      <PlusBtn onClick={onClick} textStyle={"colum16"}>
        새로운 대시보드
      </PlusBtn>
      {dashboardList.dashboards?.map(item => (
        <Link key={item.id} href={`/dashboard/${item.id}`}>
          <button className={clsx(styles.btn)}>
            <div className={clsx(styles.btnContents)}>
              <div className={clsx(styles.btnContent)}>
                <div
                  style={{ backgroundColor: item.color }}
                  className={clsx(styles.colorCircle)}
                ></div>
                <span className={clsx(styles.title)}>{item.title}</span>
                {item.createdByMe && (
                  <Image
                    src="/button-icon/crown_icon.png"
                    alt="Crown"
                    width={20}
                    height={16}
                    priority
                  />
                )}
              </div>
              <Image
                src="/button-icon/arrow.png"
                alt="화살표 이미지"
                width={18}
                height={18}
              />
            </div>
          </button>
        </Link>
      ))}
    </div>
  );
};

export default DashboardBtn;
