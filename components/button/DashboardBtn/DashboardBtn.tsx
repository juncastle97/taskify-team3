import React from "react";
import clsx from "clsx";
import styles from "./DashboardBtn.module.scss";
import Image from "next/image";

interface DashboardBtnProps {
  data: Array<{
    id: number;
    title: string;
    color: string;
    createdByMe: boolean;
  }>;
}

const DashboardBtn: React.FC<DashboardBtnProps> = ({ data }) => {
  return (
    <div>
      {data.map(item => (
        <div key={item.id} className={clsx(styles.dashboardBtnButton)}>
          <button>
            <div className={clsx(styles.btnContents)}>
              <div className={clsx(styles.btnContent)}>
                <div
                  style={{ backgroundColor: item.color }}
                  className={clsx(styles.colorCircle)}
                ></div>
                <span>{item.title}</span>
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
        </div>
      ))}
    </div>
  );
};

export default DashboardBtn;
