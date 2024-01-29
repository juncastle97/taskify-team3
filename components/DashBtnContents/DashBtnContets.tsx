import React from "react";
import clsx from "clsx";
import styles from "./DashBtnContents.module.scss"; // SCSS 모듈 임포트
import Image from "next/image";

interface DashBtnContentsnItem {
  id: number;
  title: string;
  color: string;
  createdByMe: boolean;
}

interface DashBtnContentsProps {
  data: DashBtnContentsnItem[] | null;
}

const DashBtnContent: React.FC<{
  color: string;
  title: string;
  createdByMe: boolean;
}> = ({ color, title, createdByMe }) => {
  const colorCircleStyle = {
    backgroundColor: color,
  };

  return (
    <div className={clsx(styles.dashboardBtnContent)}>
      <div style={colorCircleStyle} className={clsx(styles.colorCircle)}></div>
      <span>{title}</span>
      {createdByMe && (
        <Image
          src="/button-icon/crown_icon.png"
          alt="Crown"
          width={20}
          height={16}
          priority
        />
      )}
    </div>
  );
};

const DashBtnContents: React.FC<DashBtnContentsProps> = ({
  data: propData,
}) => {
  return (
    <div className={clsx(styles.dashboardBtnContainer)}>
      {propData &&
        propData.map(item => (
          <DashBtnContent
            key={item.id}
            color={item.color}
            title={item.title}
            createdByMe={item.createdByMe}
          />
        ))}
    </div>
  );
};

export default DashBtnContents;
