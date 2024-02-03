import { ClipLoader } from "react-spinners";
import clsx from "clsx";
import styles from "./Spinner.module.scss";
import { COLORS } from "@/constants/colors";

function Spinner() {
  return (
    <div className={clsx(styles.spinner)}>
      <ClipLoader color={COLORS.PURPLE} size={50} />
    </div>
  );
}
export default Spinner;
