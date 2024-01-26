import { useState } from "react";

import clsx from "clsx";
import styles from "./InputDropdown.module.scss";
import Image from "next/image";

interface DropdownProps {
  assigneeData: Assignee[] | null;
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
    setSearchTerm(event.target.value);
  };

  const filteredAssigneeData = assigneeData?.filter(item =>
    item.assignee.nickname.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className={clsx(styles.Container)}>
      <div className={clsx(styles.Wrapper)}>
        <input
          className={clsx(styles.InputContainer)}
          type="text"
          placeholder={"이름을 입력해 주세요"}
          onClick={toggleDropdown}
          onChange={handleInputChange}
          value={selectedItem?.assignee.nickname}
        />
        <button onClick={toggleDropdown}>
          <Image
            className={clsx(styles.Arrow, { [styles.RotateArrow]: isOpen })}
            src="/icons/arrowDropdown.svg"
            alt="드롭다운 화살표"
            width={26}
            height={26}
          />
        </button>
        {/* {selectedItem && (
          <div key={selectedItem.assignee.id} className={clsx(styles.Assignee)}>
            <Image
              className={clsx(styles.ProfileImg)}
              src={selectedItem.assignee.profileImageUrl}
              alt="프로필 이미지"
              width={26}
              height={26}
            />
            <span className={clsx(styles.Nickname)}>
              {selectedItem.assignee.nickname}
            </span>
          </div>
        )} */}
      </div>
      {isOpen && (
        <ul>
          {filteredAssigneeData?.map(item => (
            <li
              key={item.assignee.id}
              onClick={() => handleMenuItemClick(item)}
            >
              <div key={item.assignee.id} className={clsx(styles.Assignee)}>
                <Image
                  className={clsx(styles.ProfileImg)}
                  src={item.assignee.profileImageUrl}
                  alt="프로필 이미지"
                  width={26}
                  height={26}
                />
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
