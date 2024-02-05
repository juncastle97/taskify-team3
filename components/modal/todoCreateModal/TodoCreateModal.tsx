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
import style from "./TodoCreateModal.module.scss";
// import Input from "@/components/input/Input";
import TagChips from "@/components/chips/TagChips";
import BaseButton from "@/components/button/baseButton/BaseButton";
import Input from "@/components/input/Input";
import Dropdown from "@/components/dropdown/Dropdown";
import { generateRandomColorHexCode } from "@/utils/color";
import Plus from "@/components/button/plusBtn/PlusBtn";
import InputDropdown from "@/components/inputdropdown/InputDropdown";
import AddImage from "@/components/mypage/AddImage";

interface TodoCreateModalProps {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

function TodoCreateModal({ setIsOpen }: TodoCreateModalProps) {
  const handleTodoCreateClick = async (event?: FormEvent) => {
    if (event) event.preventDefault();
  };
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
      <form onSubmit={handleTodoCreateClick}>
        <ModalContainer setIsOpen={setIsOpen}>
          <div className={clsx(style.modalWrapper)}>
            <h1>할 일 생성</h1>
            <div className={clsx(style.inputWrapper)}>
              <div className={clsx(style.gap)}>
                <p>담당자</p>
                <InputDropdown assigneeData={[]}></InputDropdown>
              </div>
              <div className={clsx(style.gap)}>
                <p>
                  제목 <span className={clsx(style.star)}>*</span>
                </p>
                <input
                  className={clsx(style.input)}
                  placeholder="제목을 입력해 주세요"
                  onChange={function (
                    e: ChangeEvent<HTMLInputElement>,
                  ): void {}}
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
                <input
                  className={clsx(style.input)}
                  placeholder="날짜를 입력해주세요"
                  onChange={function (
                    e: ChangeEvent<HTMLInputElement>,
                  ): void {}}
                ></input>
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
                {/* {tags.map((tag, index) => (
                  <TagChips
                    key={index}
                    tagName={tag}
                    color={generateRandomColorHexCode()}
                  />
                ))}
                <input
                  className={clsx(style.input)}
                  placeholder="입력 후 Enter"
                  value={tagInput}
                  onChange={handleTagInputChange}
                  onKeyDown={handleTagInputKeyDown}
                /> */}
              </div>
              <div className={clsx(style.gap)}>
                <p> 이미지 </p>
                <div className={clsx(style.img)}>
                  <AddImage />
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
              <BaseButton type="submit" small>
                생성
              </BaseButton>
            </div>
          </div>
        </ModalContainer>
      </form>
    </ModalPortal>
  );
}

export default TodoCreateModal;