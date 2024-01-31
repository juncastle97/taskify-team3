import clsx from "clsx";
import styles from "./editDashboardTable.module.scss";
import EditButton from "@/components/button/editButton/EditButton";
import SelectColorChip from "@/components/chips/SelectColorChip";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
import mockData from "@/pages/dashboard/mock.json";
import Image from "next/image";
import { COLORS } from "@/constants/color";

interface DropdownItem {
  id: number;
  title: string;
  color: string;
}

interface DashboardProps {
  data: DropdownItem[] | null;
}

const EditDashboardTable: React.FC<DashboardProps> = () => {
  const [data, setData] = useState<DropdownItem[] | null>(null);
  const [selectedColor, setSelectedColor] = useState("");
  const [isNotActive, setIsNotActive] = useState<boolean>(true);
  const [editName, setEditName] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const router = useRouter();
  const { id } = router.query;
  const dashboardId = Number(id);
  const initialColor = data?.[dashboardId]?.color || COLORS.GREEN;

  const OnNameChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setEditName(value);
    value === "" ? setIsNotActive(true) : setIsNotActive(false);
  };

  const OnFocusInputHandler = (event: React.FocusEvent<HTMLInputElement>) => {
    event.stopPropagation();
    setEditName("");
    setIsNotActive(true);
  };

  const fetchDashboardData = async () => {
    try {
      const result: DropdownItem[] = await mockData;
      setData(result);
    } catch (error) {
      console.error("Error fetching data:", error);
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
  }, [initialColor]);

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
          {data?.[dashboardId]?.title}
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
            <div className={clsx(styles.popupWrapper)}>
              <div className={clsx(styles.popup)}>
                <SelectColorChip
                  type="edit"
                  color={selectedColor}
                  setColor={setSelectedColor}
                />
                <button onClick={handlePopupClose}>
                  <Image
                    className={clsx(styles.close)}
                    src="/icons/close.svg"
                    width={10}
                    height={10}
                    alt="close"
                  />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className={clsx(styles.dashboardInputBox)}>
        <label className={clsx(styles.label)}>대시보드 이름</label>
        <input
          className={clsx(styles.dashboardInput)}
          placeholder="뉴 프로젝트"
          value={editName}
          onChange={OnNameChangeHandler}
          onFocus={OnFocusInputHandler}
        />
      </div>
      <div className={clsx(styles.editButton)}>
        <EditButton disabled={isNotActive} />
      </div>
    </form>
  );
};
export default EditDashboardTable;
