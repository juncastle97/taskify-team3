import { useState } from "react";
import clsx from "clsx";
import styles from "./InputDropdown.module.scss";
import Image from "next/image";
import ProfileImage from "../profileImage/ProfileImage";

interface DropdownProps {
  assigneeData: Assignee[];
}

interface Assignee {
  assignee: {
    profileImageUrl: string;
    nickname: string;
    id: number;
  };
}

const InputDropdown: React.FC<DropdownProps> = ({ assigneeData }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<Assignee | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleMenuItemClick = (clickedItem: Assignee) => {
    setSelectedItem(clickedItem);
    setIsOpen(false);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSearchTerm(value);

    if (selectedItem !== null) {
      setSelectedItem(null);
    }
  };

  const filteredAssigneeData = assigneeData.filter(item =>
    item.assignee.nickname.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className={clsx(styles.Container)}>
      <div className={clsx(styles.Wrapper)}>
        <div className={clsx(styles.InputContainer)}>
          {selectedItem?.assignee && (
            <ProfileImage
              member={selectedItem.assignee}
              width={28}
              height={28}
            />
          )}
          <input
            type="text"
            placeholder={"이름을 입력해 주세요"}
            onClick={toggleDropdown}
            onChange={handleInputChange}
            value={
              selectedItem ? `${selectedItem?.assignee.nickname}` : searchTerm
            }
          />
        </div>
        <button onClick={toggleDropdown} tabIndex={-1}>
          <Image
            className={clsx(styles.Arrow, { [styles.RotateArrow]: isOpen })}
            src="/icons/arrowDropdown.svg"
            alt="드롭다운 화살표"
            width={26}
            height={26}
          />
        </button>
      </div>
      {isOpen && (
        <ul>
          {filteredAssigneeData.map(item => (
            <li
              key={item.assignee.id}
              onClick={() => handleMenuItemClick(item)}
            >
              <div key={item.assignee.id} className={clsx(styles.Assignee)}>
                <ProfileImage member={item.assignee} width={28} height={28} />
                <span className={clsx(styles.Nickname)}>
                  {item.assignee.nickname}
                </span>
                <Image
                  className={clsx(styles.CheckImage)}
                  src="/icons/checkImg.svg"
                  alt="체크 이미지"
                  width={22}
                  height={22}
                />
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default InputDropdown;
