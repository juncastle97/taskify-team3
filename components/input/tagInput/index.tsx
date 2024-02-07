import { useState } from "react";
import clsx from "clsx";
import styles from "./TagInput.module.scss";
import { TodoCreateType } from "@/types/cards";
import { generateRandomColorHexCode } from "@/utils/color";
import TagChips from "@/components/chips/TagChips";

interface TagInputProps {
  formState: TodoCreateType;
  setFormState: React.Dispatch<React.SetStateAction<TodoCreateType>>;
}

function TagInput({ formState, setFormState }: TagInputProps) {
  const [tagInput, setTagInput] = useState<string>(""); // 입력된 태그
  const [tags, setTags] = useState<string[]>([]); // 추가된 태그들

  const handleTagChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTagInput(event.target.value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault(); // 엔터 키 입력 시 기본 동작 방지

      const newTag = `${tagInput}`;
      if (newTag !== "") {
        const newColor = generateRandomColorHexCode(); // 새로운 색상 생성
        setFormState(prevState => ({
          ...prevState,
          tags: [...prevState.tags, newTag], // 새 태그 추가
        }));
        setTags(prevTags => [...prevTags, newColor]); // 태그 색상 추가
        setTagInput(""); // 입력 필드 초기화
      }
    }
  };

  const handleDeleteTag = (index: number) => {
    const updatedTags = [...formState.tags];
    updatedTags.splice(index, 1);
    setFormState(prevState => ({
      ...prevState,
      tags: updatedTags,
    }));

    const updatedTagColors = [...tags];
    updatedTagColors.splice(index, 1);
    setTags(updatedTagColors);
  };

  return (
    <div className={clsx(styles.tagWrapper)}>
      <div className={clsx(styles.tagsContainer)}>
        {formState.tags.map((tag, index) => (
          <TagChips
            key={index}
            tagName={tag}
            color={tags[index]}
            onDelete={() => handleDeleteTag(index)}
          />
        ))}
      </div>
      <input
        type="text"
        value={tagInput}
        onChange={handleTagChange}
        onKeyDown={handleKeyDown}
        placeholder="입력 후 Enter"
      />
    </div>
  );
}
export default TagInput;
