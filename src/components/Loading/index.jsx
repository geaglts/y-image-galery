import styles from "./styles.module.scss";

export function Loading() {
  return (
    <div class={styles.container}>
      <div class={styles.loader}></div>
    </div>
  );
}
