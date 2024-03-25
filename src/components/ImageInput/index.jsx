import { classnames } from "../../utils/classnames";
import styles from "./styles.module.scss";
import { base64Services } from "../../services/base64.service";

export function ImageInput({ image, setImage }) {
  const loadImage = async (evt) => {
    const { files } = evt.target;
    if (files.length > 0) {
      const base64Image = await base64Services.fileToBase64(files[0]);
      setImage(base64Image);
    }
    evt.target.value = null;
  };

  return (
    <label
      for="image-file"
      class={classnames(styles.imageInput, image && styles.withImage)}
    >
      {!image && (
        <>
          Pícale aquí para escoger la foto que quieres subir 7u7 📷
          <input
            id="image-file"
            type="file"
            class="input"
            onChange={loadImage}
          />
        </>
      )}
      {image && <img src={image} alt="Previsualizacion de la foto a subir" />}
    </label>
  );
}
