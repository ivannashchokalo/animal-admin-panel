import type { ReactNode } from "react";
import styles from "./Grid.module.scss";
interface GridProps {
  children: ReactNode;
}

export default function Grid({ children }: GridProps) {
  return <ul className={styles.list}>{children}</ul>;
}
