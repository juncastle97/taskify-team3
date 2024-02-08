import ModalContainer from "@/components/modal/ModalContainer";
import ModalPortal from "@/components/modal/ModalPortal";
import { Dispatch, SetStateAction, useState } from "react";
import styles from "./CreateDashboardModal.module.scss";
import SelectColorChip from "@/components/chips/SelectColorChip";
import { createDashboard } from "@/api/dashboards";

interface CreateDashboardModalProps {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const CreateDashboardModal = ({ setIsOpen }: CreateDashboardModalProps) => {
  const [title, setTitle] = useState("");
  const [color, setColor] = useState("");

  const createDashboardRequest = async () => {
    try {
      await createDashboard(title, color);
      setIsOpen(false);
    } catch (error) {
      console.error("대시보드 생성 실패: ", error);
    }
  };

  return (
    <ModalPortal>
      <ModalContainer setIsOpen={setIsOpen}>
        <div className={styles.container}>
          <div className={styles.title}>새로운 대시보드</div>
          <div className={styles.subTitle}>대시보드 이름</div>
          <input
            className={styles.inputTitle}
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
          <div className={styles.colors}>
            <SelectColorChip
              color={color}
              setColor={value => {
                setColor(value);
              }}
            />
          </div>
          <div className={styles.btnArea}>
            <button
              type="button"
              className={styles.cancel}
              onClick={() => setIsOpen(false)}
            >
              취소
            </button>
            <button
              type="button"
              className={styles.create}
              onClick={createDashboardRequest}
            >
              생성
            </button>
          </div>
        </div>
      </ModalContainer>
    </ModalPortal>
  );
};

export default CreateDashboardModal;
