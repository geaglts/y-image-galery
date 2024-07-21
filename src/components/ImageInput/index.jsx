import { useState } from "preact/hooks";
import { classnames } from "../../utils/classnames";
import { base64Services } from "../../services/base64.service";

import nextArrow from "../../assets/next-arrow.svg";
import prevArrow from "../../assets/prev-arrow.svg";

import styles from "./styles.module.scss";

export function ImageInput({ images, setImages }) {
  const [currentImage, setcurrentImage] = useState(null);
  const [total, setTotal] = useState(0);

  const loadImage = async (evt) => {
    const { files } = evt.target;
    const newImages = [];
    if (files.length > 0) {
      let counter = 0;
      for await (let file of files) {
        counter++;
        const newImage = {
          position: counter,
          isShowed: false,
          description: "",
        };
        newImage.src = await base64Services.fileToBase64(file);
        newImages.push(newImage);
      }
      setImages(newImages);
      setTotal(counter);
      setcurrentImage(newImages[0]);
    }
    evt.target.value = null;
  };

  const onNext = () => {
    const newCurrent = images.find(
      (i) => i.position === currentImage.position + 1
    );
    if (newCurrent) {
      setcurrentImage(newCurrent);
    }
  };

  const onPrev = () => {
    const newCurrent = images.find(
      (i) => i.position === currentImage.position - 1
    );
    if (newCurrent) {
      setcurrentImage(newCurrent);
    }
  };

  const onChangeDescription = (position) => (evt) => {
    const value = evt.target.value;
    const updatedImages = [...images];
    updatedImages[position - 1].description = value;
    setImages(updatedImages);
  };

  if (images.length > 0) {
    return (
      <ImagesViewer
        currentImage={currentImage}
        next={onNext}
        prev={onPrev}
        total={total}
        onUpdateDescription={onChangeDescription}
      />
    );
  }

  return (
    <label
      for="image-file"
      class={classnames(styles.imageInput, images && styles.withImage)}
    >
      {images.length === 0 && (
        <>
          Pícale aquí para escoger las fotos que quieres subir 7u7 📷
          <input
            id="image-file"
            type="file"
            class="input"
            multiple={true}
            accept={".jpg, .png"}
            onChange={loadImage}
          />
        </>
      )}
    </label>
  );
}

function ImagesViewer({
  currentImage,
  next,
  prev,
  total,
  onUpdateDescription,
}) {
  return (
    <section class={styles.imageViewerContainer}>
      <section class={styles.imageContainer}>
        <img src={currentImage.src} alt="Previsualizacion de la foto a subir" />
        <div class={styles.imageNavigation}>
          <div>
            {currentImage.position !== 1 && (
              <button type={"button"} class={styles.left} onClick={prev}>
                <img src={prevArrow} alt="arrow navigation previous" />
              </button>
            )}
          </div>
          <div></div>
          <div>
            {currentImage.position !== total && (
              <button type={"button"} class={styles.right} onClick={next}>
                <img src={nextArrow} alt="arrow navigation next" />
              </button>
            )}
          </div>
        </div>
      </section>
      <input
        type="text"
        name="description"
        placeholder="Quieres poner una notita para la foto?"
        value={currentImage.description}
        class="input bordered w-100"
        onChange={onUpdateDescription(currentImage.position)}
      />
    </section>
  );
}
