import styles from "./styles.module.scss";

export function Button({ btnStyle = "blue", label, ...props }) {
  return (
    <button class={`${styles.container} ${styles[btnStyle]}`} {...props}>
      {label}
    </button>
  );
}
