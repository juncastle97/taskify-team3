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
import style from "./TodoEditModal.module.scss";

import TagChips from "@/components/chips/TagChips";
import BaseButton from "@/components/button/baseButton/BaseButton";

import Dropdown from "@/components/dropdown/Dropdown";
import { generateRandomColorHexCode } from "@/utils/color";

import InputDropdown from "@/components/inputdropdown/InputDropdown";
import AddImage from "@/components/mypage/AddImage";
import Calendar from "@/components/datepicker/Calendar";
import { TodoEditType } from "@/types/cards";
import { getCardinfoList } from "@/api/cards";
interface TodoEditModalProps {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  cardId: number;
}
function TodoEditModal({ setIsOpen, cardId }: TodoEditModalProps) {
  const [formState, setFormState] = useState<TodoEditType>({
    title: "",
    description: "",
    tags: [],
    dueDate: "",
    assignee: [],
    imageUrl: "",
  });
  const handleTodoEditClick = async (event?: FormEvent) => {
    if (event) event.preventDefault();

    const CardListData = async (cardId: number) => {
      try {
        await getCardinfoList(cardId);
        console.log("Success");
      } catch (error) {
        console.log("GET 요청 실패: ", error);
      }
    };
    useEffect(() => {
      CardListData(cardId);
    }, [cardId]);

    // const [tagInput, setTagInput] = useState("");
    // const [tags, setTags] = useState([]);

    // const handleTagInputChange = e => {
    //   setTagInput(e.target.value);
    // };

    // const handleTagInputKeyDown = e => {
    //   if (e.key === "Enter" && tagInput.trim() !== "") {
    //     setTags(prevTags => [...prevTags, tagInput.trim()]);
    //     setTagInput("");
    //   }
    // };

    return (
      <ModalPortal>
        <ModalContainer setIsOpen={setIsOpen}>
          <form onSubmit={handleTodoEditClick}>
            <div className={clsx(style.modalWrapper)}>
              <h1>할 일 수정</h1>
              <div className={clsx(style.inputWrapper)}>
                <div className={clsx(style.flexWrapper)}>
                  <div>
                    <p>상태</p>
                    <Dropdown data={null}></Dropdown>
                  </div>
                  <div>
                    <p>담당자</p>
                    <div className={clsx(style.inputdropdown)}>
                      <InputDropdown small />
                    </div>
                  </div>
                </div>
                <div className={clsx(style.gap)}>
                  <p>
                    제목 <span className={clsx(style.star)}>*</span>
                  </p>
                  <input
                    className={clsx(style.input)}
                    placeholder="제목을 입력해 주세요"
                  ></input>
                </div>
                <div className={clsx(style.gap)}>
                  <p>설명 *</p>
                  <textarea
                    className={clsx(style.input)}
                    rows={5}
                    cols={40}
                    placeholder="설명을 입력해 주세요"
                  ></textarea>
                </div>
                <div className={clsx(style.gap)}>
                  <p>마감일</p>
                  <Calendar />
                </div>
                <div className={clsx(style.gap)}>
                  <p>태그</p>

                  <TagChips
                    tagName={"가나다아라라"}
                    color={generateRandomColorHexCode()}
                  />
                  <input
                    className={clsx(style.input)}
                    placeholder="입력 후 Enter"
                  ></input>
                </div>
                <div className={clsx(style.gap)}>
                  <p> 이미지 </p>
                  <div className={clsx(style.img)}>
                    <AddImage small profileImageUrl={null} />
                  </div>
                </div>
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
                <BaseButton
                  type="submit"
                  small
                  disabled={
                    //상태
                    !formState.title || !formState.description
                  }
                >
                  생성
                </BaseButton>
              </div>
            </div>
          </form>
        </ModalContainer>
      </ModalPortal>
    );
  };
}

export default TodoEditModal;
