import ModalContainer from "../ModalContainer";
import {
  ChangeEvent,
  Dispatch,
  FormEvent,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import ModalPortal from "../ModalPortal";
import clsx from "clsx";
import style from "./ColumnAddModal.module.scss";
import BaseButton from "@/components/button/baseButton/BaseButton";
import axios from "@/lib/axios";
import { PostcolumnsAddData } from "@/types/columns";
import { useRouter } from "next/router";
interface ColumnAddModalProps {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

function ColumnAddModal({ setIsOpen }: ColumnAddModalProps) {
  const router = useRouter();
  const { id } = router.query;
  const dashboardId = Number(id);
  const [errorMsg, setErrorMsg] = useState("");

  const [columnName, setColumnName] = useState<PostcolumnsAddData>({
    title: "",
  });

  const postColumnsAdd = async (title: string, dashboardId: number) => {
    const response = await axios.post("/columns", {
      title,
      dashboardId,
    });
    return response.data;
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setColumnName({ title: value });
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    try {
      postColumnsAdd(columnName.title, 3066); //dashboardId는 dashborad에서 받아와야함.
      setIsOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  const isCreateButtonDisabled = columnName.title === "";

  return (
    <ModalPortal>
      <ModalContainer setIsOpen={setIsOpen}>
        <form onSubmit={handleSubmit}>
          <div className={clsx(style.modalWrapper)}>
            <h1>새 컬럼 생성</h1>
            <div className={clsx(style.nameWrapper)}>
              <p>이름</p>
              <input
                className={clsx(style.nameInput)}
                type="text"
                placeholder="새로운 프로젝트"
                value={columnName.title}
                onChange={handleInputChange}
              />
            </div>
            <div className={clsx(style.buttons)}>
              <BaseButton
                type="button"
                onClick={() => setIsOpen(false)}
                small
                white
              >
                취소
              </BaseButton>
              <BaseButton type="submit" small disabled={isCreateButtonDisabled}>
                생성
              </BaseButton>
            </div>
          </div>
        </form>
      </ModalContainer>
    </ModalPortal>
  );
}

export default ColumnAddModal;
