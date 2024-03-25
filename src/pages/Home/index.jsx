import { useEffect, useState } from "preact/hooks";
import axios from "../../services/axios";
import { Header } from "../../containers/Header";
import { Modal } from "../../containers/Modal";
import { NewMemoryForm } from "../../forms/NewMemoryForm";
import { Card } from "../../components/Card";
import { useGlobalContext } from "../../hooks/useGlobalContext";

import styles from "./styles.module.scss";

export function Home() {
  const [images, setImages] = useState([]);
  const [newMemoryFormIsOpen, setNewMemoryForm] = useState(false);

  const getImages = async () => {
    try {
      const response = await axios.get("/images/all");
      setImages(response.data.images);
    } catch (error) {
      console.log("ups!");
    }
  };

  const onToggleNewMemoryForm = () => {
    setNewMemoryForm(!newMemoryFormIsOpen);
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
          <Card image={image} />
        ))}
      </section>
    </main>
  );
}
