import styles from "./styles.module.scss";

export function Button({ btnStyle = "blue", children, ...props }) {
  return (
    <button class={`${styles.container} ${styles[btnStyle]}`} {...props}>
      {children}
    </button>
  );
}
