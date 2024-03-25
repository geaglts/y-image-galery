import styles from "./styles.module.scss";

export function Card({ image, showImage }) {
  const onClickImage = () => {
    showImage(image);
  };

  return (
    <div>
      <div class={styles.container} onClick={onClickImage}>
        <img src={image.image_url} alt={image.description} />
        <p>{image.description}</p>
      </div>
    </div>
  );
}
