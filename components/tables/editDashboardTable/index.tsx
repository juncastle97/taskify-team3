import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import clsx from "clsx";
import styles from "./EditDashboardTable.module.scss";
import { DashboardType } from "@/types/dashboard";
import { getDashboardInfo } from "@/api/dashboards";
import { editDashboard } from "@/api/dashboards";
import { COLORS } from "@/constants/colors";
import SelectChipDropdown from "@/components/dropdown/selectChipDropdown";
import BaseButton from "@/components/button/baseButton/BaseButton";
import Spinner from "@/components/spinner";

function EditDashboardTable() {
  const router = useRouter();
  const { id } = router.query;
  const dashboardId = Number(id);
  const popupRef = useRef(null);
  const [dashBoardInfo, setDashBoardInfo] = useState<DashboardType>({
    id: 0,
    title: "",
    color: "",
    createdAt: "",
    updatedAt: "",
    createdByMe: false,
    userId: 0,
  });
  const initialColor = dashBoardInfo.color || COLORS.GREEN;
  const [selectedColor, setSelectedColor] = useState(initialColor);
  const [isNotActive, setIsNotActive] = useState<boolean>(true);
  const [editName, setEditName] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const onNameChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setEditName(value);
    value === "" ? setIsNotActive(true) : setIsNotActive(false);
  };

  const handleButtonClick = async () => {
    const body = { title: editName, color: selectedColor };
    const confirmed = window.confirm("대시보드 이름을 변경하시겠습니까?");
    if (confirmed) {
      try {
        await editDashboard(dashboardId, body);
        setDashBoardInfo(prevState => ({
          ...prevState,
          title: editName,
          color: selectedColor,
        }));
      } catch (error) {
        console.error("이름 변경에 실패했습니다.", error);
      }
    }
  };

  const handleEditColorClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();
      setIsOpen(true);
    },
    [],
  );

  const handlePopupClose = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setIsOpen(false);
  };

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const dashBoardData = await getDashboardInfo(dashboardId);
        setDashBoardInfo(dashBoardData);
        setIsLoading(false);
      } catch (error) {
        console.error("GET 요청 실패 :", error);
      }
    };

    fetchDashboardData();
  }, [dashboardId, dashBoardInfo.title, dashBoardInfo.color]);

  useEffect(() => {
    setSelectedColor(initialColor);
    setEditName("");
  }, [initialColor]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        popupRef.current &&
        !(popupRef.current as Node).contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <form className={clsx(styles.tableForm)}>
      <div className={clsx(styles.currentDashboardTitle)}>
        <div className={clsx(styles.dashboardTitle)}>
          {selectedColor && (
            <div
              className={clsx(styles.chip)}
              style={{ background: selectedColor }}
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
            <div ref={popupRef}>
              <SelectChipDropdown
                onClick={handlePopupClose}
                selectedColor={selectedColor}
                setSelectedColor={setSelectedColor}
              />
            </div>
          )}
        </div>
      </div>
      <div className={clsx(styles.dashboardInputBox)}>
        <label>대시보드 이름</label>
        <input
          placeholder="뉴 프로젝트"
          value={editName}
          onChange={onNameChangeHandler}
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
