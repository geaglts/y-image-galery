import { Button } from "../../components/Button";
import styles from "./styles.module.scss";

export function Header({ onClickNewMemory = () => {} }) {
  return (
    <header class={styles.container}>
      <section>
        <h1>💖</h1>
      </section>
      <section>
        <Button onClick={onClickNewMemory}>Nuevo recuerdo ✨</Button>
      </section>
    </header>
  );
}
