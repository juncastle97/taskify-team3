import { ChangeEventHandler } from "react";
import styles from "./SearchBar.module.scss";
import Image from "next/image";

const SEARCH_ICON_SIZE = 24;
const SEARCH_ICON_PATH = "/icons/search.svg";

interface SearchBarProps {
  onChange: ChangeEventHandler<HTMLInputElement>;
}

const SearchBar = ({ onChange }: SearchBarProps) => {
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
        placeholder="검색"
        onChange={onChange}
        className={styles.inputBox}
      />
    </div>
  );
};

export default SearchBar;
