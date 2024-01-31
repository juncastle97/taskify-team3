import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";
import styles from "./SideMenu.module.scss";

const SideMenu = () => {
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
      {/* <ul>
        <li>1</li>
        <li>2</li>
        <li>3</li>
      </ul> */}
    </div>
  );
};

export default SideMenu;
