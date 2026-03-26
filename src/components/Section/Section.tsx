import type { ReactNode } from "react";
import styles from "./Section.module.scss";
import clsx from "clsx";

interface SectionProps {
  children: ReactNode;
  className?: string;
}

export default function Section({ children, className }: SectionProps) {
  return (
    <section className={clsx(styles.section, className)}>{children}</section>
  );
}
