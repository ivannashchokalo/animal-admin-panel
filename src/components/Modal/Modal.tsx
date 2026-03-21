import type React from "react";
import { useEffect, type ReactNode } from "react";
import styles from "./Modal.module.scss";
import { createPortal } from "react-dom";

interface BackdropProps {
  children: ReactNode;
  onModalClose: () => void;
}

export default function Modal({ children, onModalClose }: BackdropProps) {
  const handleModalClose = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onModalClose();
  };

  useEffect(() => {
    const handleEscapePress = (e: KeyboardEvent) => {
      if (e.code === "Escape") onModalClose();
    };
    document.addEventListener("keydown", handleEscapePress);

    return () => document.removeEventListener("keydown", handleEscapePress);
  }, [onModalClose]);

  return createPortal(
    <div className={styles.backdrop} onClick={handleModalClose}>
      <div className={styles.modal}>{children}</div>
    </div>,
    document.body,
  );
}
