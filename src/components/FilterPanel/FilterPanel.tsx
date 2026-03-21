import SearchBox from "../SearchBox/SearchBox";
import StatusFilter from "../StatusFilter/StatusFilter";
import TypeFilter from "../TypeFilter/TypeFilter";
import styles from "./FilterPanel.module.scss";

export default function FilterPanel() {
  return (
    <div className={styles.panel}>
      <SearchBox />
      <div className={styles.filters}>
        <TypeFilter />
        <StatusFilter />
      </div>
    </div>
  );
}
