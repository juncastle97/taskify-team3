import { ChangeEventHandler, useState } from "react";
import styles from "./SearchBar.module.scss";
import Image from "next/image";

const SEARCH_ICON_SIZE = 24;
const SEARCH_ICON_PATH = "/icons/search.svg";

const SearchBar = () => {
  const [value, setValue] = useState("");
  const handleInputChange: ChangeEventHandler<HTMLInputElement> = e => {
    setValue(e.target.value);
  };

  return (
    <div className={styles.wrapper}>
      <Image
        className={styles.searchIcon}
        src={SEARCH_ICON_PATH}
        width={SEARCH_ICON_SIZE}
        height={SEARCH_ICON_SIZE}
        alt="search"
      />
      <input
        type="text"
        value={value}
        placeholder="검색"
        onChange={handleInputChange}
        className={styles.inputBox}
      />
    </div>
  );
};

export default SearchBar;
