import { ChangeEvent, useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import clsx from "clsx";
import styles from "./EditDashboardTable.module.scss";
import { DashboardType } from "@/types/dashboard";
import { getDashboard } from "@/api/dashboards";
import { editDashboard } from "@/api/dashboards";
import { COLORS } from "@/constants/colors";
import SelectChipDropdown from "@/components/dropdown/selectChipDropdown";
import BaseButton from "@/components/button/baseButton/BaseButton";
import Spinner from "@/components/spinner";
import AlertModal from "@/components/modal/alertModal";

function EditDashboardTable() {
  const router = useRouter();
  const { id } = router.query;
  const dashboardId = Number(id);
  const popupRef = useRef(null);
  const [getDashboardInfo, setGetDashboardInfo] = useState<DashboardType>({
    id: 0,
    title: "",
    color: "",
    createdAt: "",
    updatedAt: "",
    createdByMe: false,
    userId: 0,
  });
  const initialColor = getDashboardInfo.color || COLORS.GREEN;
  const [selectedColor, setSelectedColor] = useState(initialColor);
  const [isNotActive, setIsNotActive] = useState<boolean>(true);
  const [editName, setEditName] = useState<string>("");
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const onNameChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setEditName(value);
    value === "" ? setIsNotActive(true) : setIsNotActive(false);
  };

  const handleButtonClick = async () => {
    const body = { title: editName, color: selectedColor };
    try {
      await editDashboard(dashboardId, body);
      closeModal();
      setEditName("");
      setGetDashboardInfo(prevState => ({
        ...prevState,
        title: editName,
        color: selectedColor,
      }));
      closeModal();
    } catch (error) {
      console.error("이름 변경에 실패했습니다.", error);
    }
  };

  const handlePopupClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();
      setIsPopupOpen(true);
    },
    [],
  );

  const popupClose = () => {
    setIsPopupOpen(false);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const getDashboardData = async () => {
      try {
        const dashBoardData = await getDashboard(dashboardId);
        setGetDashboardInfo(dashBoardData);
        setIsLoading(false);
      } catch (error) {
        console.error("GET 요청 실패 :", error);
      }
    };

    if (router.query.id) {
      getDashboardData();
    }
  }, [dashboardId, getDashboardInfo.title, getDashboardInfo.color]);

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
        popupClose();
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
      {isModalOpen && (
        <AlertModal
          setModal={setIsModalOpen}
          alertMessage="이름을 변경하시겠습니까?"
          onConfirmClick={handleButtonClick}
          isCancelButton
        />
      )}
      <div className={clsx(styles.currentDashboardTitle)}>
        <div className={clsx(styles.dashboardTitle)}>
          {selectedColor && (
            <div
              className={clsx(styles.chip)}
              style={{ background: selectedColor }}
            />
          )}
          {getDashboardInfo?.title}
        </div>
        <div
          className={clsx(styles.editColorOption)}
          onClick={handlePopupClick}
        >
          <div>색상변경</div>
          <Image
            src="/icons/arrowDropdown.svg"
            width={20}
            height={20}
            alt="dropdown icon"
          />
          {isPopupOpen && (
            <div ref={popupRef}>
              <SelectChipDropdown
                onClick={popupClose}
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
        <BaseButton onClick={openModal} disabled={isNotActive} small>
          변경
        </BaseButton>
      </div>
    </form>
  );
}
export default EditDashboardTable;
