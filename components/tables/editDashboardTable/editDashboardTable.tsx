import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import clsx from "clsx";
import styles from "./editDashboardTable.module.scss";
import { DashboardType } from "@/types/dashboard";
import { getDashboardInfo } from "@/api/dashboards/getDashboardInfo";
import { editDashboard } from "@/api/dashboards/editDashboard";
import { COLORS } from "@/constants/colors";
import SelectChipDropdown from "@/components/dropdown/selectChipDropdown/SelectChipDropdown";
import BaseButton from "@/components/button/baseButton/BaseButton";

function EditDashboardTable() {
  const [dashBoardInfo, setDashBoardInfo] = useState<DashboardType>({
    id: 0,
    title: "",
    color: "",
    createdAt: "",
    updatedAt: "",
    createdByMe: false,
    userId: 0,
  });

  const [selectedColor, setSelectedColor] = useState("");
  const [isNotActive, setIsNotActive] = useState<boolean>(true);
  const [editName, setEditName] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const router = useRouter();
  const { id } = router.query;
  const dashboardId = Number(id);
  const initialColor = dashBoardInfo?.color || COLORS.GREEN;

  const OnNameChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setEditName(value);
    value === "" ? setIsNotActive(true) : setIsNotActive(false);
  };

  // const OnFocusInputHandler = (event: React.FocusEvent<HTMLInputElement>) => {
  //   setEditName("");
  // };

  const fetchDashboardData = async () => {
    const dashBoardData = await getDashboardInfo();
    setDashBoardInfo(dashBoardData);
  };

  const handleButtonClick = async () => {
    const body = { title: editName, color: selectedColor };
    const confirmed = window.confirm("대시보드 이름을 변경하시겠습니까?");

    if (confirmed) {
      try {
        await editDashboard(body);
      } catch (error) {
        console.error("이름 변경에 실패했습니다.", error);
      }
    }
  };

  const handleEditColorClick = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      event.stopPropagation();
      setIsOpen(true);
    },
    [],
  );

  const handlePopupClose = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setIsOpen(false);
  };

  useEffect(() => {
    setSelectedColor(initialColor);
    fetchDashboardData();
    setEditName("");
  }, [dashBoardInfo.title, dashBoardInfo.color]);

  return (
    <form className={clsx(styles.tableForm)}>
      <div className={clsx(styles.currentDashboardTitle)}>
        <div className={clsx(styles.dashboardTitle)}>
          {selectedColor && (
            <div
              className={clsx(styles.chip)}
              style={{ background: selectedColor }}
              color={selectedColor}
            />
          )}
          {dashBoardInfo?.title}
        </div>
        <div
          className={clsx(styles.editColorOption)}
          onClick={handleEditColorClick}
        >
          <div>색상변경</div>
          <Image
            src="/icons/arrowDropdown.svg"
            width={20}
            height={20}
            alt="dropdown icon"
          />
          {isOpen && (
            <SelectChipDropdown
              onClick={handlePopupClose}
              selectedColor={selectedColor}
              setSelectedColor={setSelectedColor}
            />
          )}
        </div>
      </div>
      <div className={clsx(styles.dashboardInputBox)}>
        <label>대시보드 이름</label>
        <input
          placeholder="뉴 프로젝트"
          value={editName}
          onChange={OnNameChangeHandler}
        />
      </div>
      <div className={clsx(styles.button)}>
        <BaseButton onClick={handleButtonClick} disabled={isNotActive} small>
          변경
        </BaseButton>
      </div>
    </form>
  );
}
export default EditDashboardTable;
