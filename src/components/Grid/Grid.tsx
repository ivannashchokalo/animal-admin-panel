import type { Children } from "../../types/children";
import styles from "./Grid.module.scss";

export default function Grid({ children }: Children) {
  return <ul className={styles.list}>{children}</ul>;
}
