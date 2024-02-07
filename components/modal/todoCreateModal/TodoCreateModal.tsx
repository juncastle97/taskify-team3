import ModalContainer from "../ModalContainer";
import {
  ChangeEvent,
  Dispatch,
  FormEvent,
  SetStateAction,
  useState,
} from "react";
import ModalPortal from "../ModalPortal";
import clsx from "clsx";
import styles from "./TodoCreateModal.module.scss";
import TagChips from "@/components/chips/TagChips";
import BaseButton from "@/components/button/baseButton/BaseButton";
import { generateRandomColorHexCode } from "@/utils/color";
import InputDropdown from "@/components/inputDropdown/InputDropdown";
import AddImage from "@/components/mypage/AddImage";
import Calendar from "@/components/datepicker/Calendar";
import { TodoCreateType } from "@/types/cards";

interface TodoCreateModalProps {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

function TodoCreateModal({ setIsOpen }: TodoCreateModalProps) {
  const [formState, setFormState] = useState<TodoCreateType>({
    title: "",
    description: "",
    tags: [],
    dueDate: "",
    assignee: [],
    imageUrl: "",
  });
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  // const handleTitleInputChange = (
  //   event: React.ChangeEvent<HTMLInputElement>,
  // ) => {
  //   const { value } = event.target;
  //   setTitle(value);
  // };

  // const handleTextareaInputChange = (
  //   event: React.ChangeEvent<HTMLTextAreaElement>,
  // ) => {
  //   const { value } = event.target;
  //   setDescription(value);
  // };

  const handleButtonClick = (event: any) => {
    setFormState(event.target.value);
    //추가적인 api 호출작업
  };

  const handleTodoCreateClick = async (event?: FormEvent) => {
    if (event) event.preventDefault();
  };

  return (
    <ModalPortal>
      <ModalContainer setIsOpen={setIsOpen}>
        <form onSubmit={handleTodoCreateClick}>
          <div className={clsx(styles.modalWrapper)}>
            <h1>할 일 생성</h1>
            <div className={clsx(styles.inputWrapper)}>
              <div className={clsx(styles.gap)}>
                <p>담당자</p>
                <InputDropdown />
              </div>
              <div className={clsx(styles.gap)}>
                <p>
                  제목 <span className={clsx(styles.star)}>*</span>
                </p>
                <input
                  className={clsx(styles.input)}
                  placeholder="제목을 입력해 주세요"
                  // onChange={handleTitleInputChange}
                />
              </div>
              <div className={clsx(styles.gap)}>
                <p>
                  설명 <span className={clsx(styles.star)}>*</span>
                </p>
                <textarea
                  className={clsx(styles.input)}
                  rows={5}
                  cols={40}
                  placeholder="설명을 입력해 주세요"
                  // onChange={handleTextareaInputChange}
                />
              </div>
              <div className={clsx(styles.gap)}>
                <p>마감일</p>
                <Calendar />
              </div>
              <div className={clsx(styles.gap)}>
                <p>태그</p>
                <TagChips
                  tagName={"가나다아라라"}
                  color={generateRandomColorHexCode()}
                />
                <input
                  className={clsx(styles.input)}
                  placeholder="입력 후 Enter"
                />
              </div>
              <div className={clsx(styles.gap)}>
                <p>이미지</p>
                <div className={clsx(styles.img)}>
                  <AddImage profileImageUrl={formState.imageUrl} />
                </div>
              </div>
            </div>
            <div className={clsx(styles.buttons)}>
              <BaseButton
                type="button"
                onClick={() => setIsOpen(false)}
                small
                white
              >
                취소
              </BaseButton>
              <BaseButton
                type="submit"
                small
                disabled={
                  // !formState.assignee.nickname ||
                  !formState.title ||
                  !formState.description ||
                  !formState.dueDate ||
                  !formState.tags ||
                  !formState.imageUrl
                }
                onClick={handleButtonClick}
              >
                생성
              </BaseButton>
            </div>
          </div>
        </form>
      </ModalContainer>
    </ModalPortal>
  );
}

export default TodoCreateModal;
