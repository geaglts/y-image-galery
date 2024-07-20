import styles from "./styles.module.scss";

export function Card({ image, showImage }) {
  const descriptionIsNull = image.description.length === 0;

  const onClickImage = () => {
    showImage(image);
  };

  return (
    <div>
      <div class={styles.container} onClick={onClickImage}>
        <img src={image.image_url} alt={image.description} />
        {!descriptionIsNull && <p>{image.description}</p>}
      </div>
    </div>
  );
}
