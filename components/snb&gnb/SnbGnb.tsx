import clsx from "clsx";
import styles from "./SnbGnb.module.scss";

import SideMenu from "../sidemenu/SideMenu";
import DashboardGnb from "../gnb/DashboardGnb";

import { GetDashboardListType } from "@/types/dashboard";

interface SnbGnbProps {
  dashboardList: GetDashboardListType;
}
const SnbGnb: React.FC<SnbGnbProps> = ({ dashboardList }) => {
  return (
    <div className={clsx(styles.container)}>
      <SideMenu dashboardList={dashboardList}/>
      <DashboardGnb  />
    </div>
  );
};

export default SnbGnb;
