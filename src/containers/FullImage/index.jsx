import styles from "./styles.module.scss";
import { Button } from "../../components/Button/index.jsx";

export function FullImage({ currentImage, onResetState }) {
  if (!currentImage) return null;
  return (
    <section class={styles.container}>
      <div>
        <Button btnStyle="red-full" onClick={onResetState}>
          X
        </Button>
      </div>
      <img src={currentImage.image_url} alt={currentImage.description} />
    </section>
  );
}
