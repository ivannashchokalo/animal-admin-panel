import type { ReactNode } from "react";
import styles from "./Section.module.scss";

interface SectionProps {
  children: ReactNode;
}

export default function Section({ children }: SectionProps) {
  return <section className={styles.section}>{children}</section>;
}
