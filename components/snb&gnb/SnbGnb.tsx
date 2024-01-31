import clsx from "clsx";
import styles from "./SnbGnb.module.scss";

import SideMenu from "../sidemenu/SideMenu";
import DashboardGnb from "../gnb/DashboardGnb";

const SnbGnb = () => {
  return (
    <div className={clsx(styles.container)}>
      <SideMenu />
      <DashboardGnb />
    </div>
  );
};

export default SnbGnb;
