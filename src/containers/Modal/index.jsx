import { createPortal } from "preact/compat";
import styles from "./styles.module.scss";

export function Modal({ children, isOpen = false }) {
  if (!isOpen) return null;
  return createPortal(
    <section class={styles.container}>{children}</section>,
    document.body
  );
}
