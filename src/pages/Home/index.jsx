import { useEffect, useState } from "preact/hooks";
import axios from "../../services/axios";
import { Header } from "../../containers/Header";
import { Modal } from "../../containers/Modal";
import { NewMemoryForm } from "../../forms/NewMemoryForm";
import { Card } from "../../components/Card";
import { FullImage } from "../../containers/FullImage";
import { useGlobalDispatch } from "../../hooks/useGlobalContext.jsx";

import styles from "./styles.module.scss";

export function Home() {
  const dispatch = useGlobalDispatch();
  const [images, setImages] = useState([]);
  const [newMemoryFormIsOpen, setNewMemoryForm] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);

  const getImages = async () => {
    try {
      dispatch({ type: "toggleLoading" });
      const response = await axios.get("/images/all");
      setImages(response.data.images);
      dispatch({ type: "toggleLoading" });
    } catch (error) {
      console.log("ups!");
    }
  };

  const onToggleNewMemoryForm = () => {
    setNewMemoryForm(!newMemoryFormIsOpen);
  };

  const onResetState = () => {
    setCurrentImage(null);
  };

  useEffect(() => {
    getImages();
  }, []);

  return (
    <main>
      <Modal isOpen={newMemoryFormIsOpen}>
        <NewMemoryForm
          onCloseMemoryForm={onToggleNewMemoryForm}
          reloadImages={getImages}
        />
      </Modal>
      <Header onClickNewMemory={onToggleNewMemoryForm} />
      <section class={styles.cardsContainer}>
        {images.map((image) => (
          <Card image={image} showImage={setCurrentImage} />
        ))}
      </section>
      <Modal isOpen={currentImage}>
        <FullImage currentImage={currentImage} onResetState={onResetState} />
      </Modal>
    </main>
  );
}
