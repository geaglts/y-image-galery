import { Button } from "../../components/Button";
import styles from "./styles.module.scss";

export function Header() {
  return (
    <header class={styles.container}>
      <section>
        <h1>💖</h1>
      </section>
      <section>
        <Button label="Nuevo recuerdo ✨" />
      </section>
    </header>
  );
}
