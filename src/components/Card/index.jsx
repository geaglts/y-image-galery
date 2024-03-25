import styles from "./styles.module.scss";

export function Card({ image }) {
  return (
    <div>
      <div class={styles.container}>
        <img src={image.image_url} alt={image.description} />
        <p>{image.description}</p>
      </div>
    </div>
  );
}
