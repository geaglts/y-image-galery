import { useEffect, useState } from "preact/hooks";
import axios from "../../services/axios";
import { Header } from "../../containers/Header";
import { Modal } from "../../containers/Modal";
import { NewMemoryForm } from "../../forms/NewMemoryForm";
import { FullImage } from "../../containers/FullImage";
import { useGlobalDispatch } from "../../hooks/useGlobalContext.jsx";
import { Mansory } from "../../containers/Mansory/index.jsx";
import data from "./mook";

export function Home(props) {
  const dispatch = useGlobalDispatch();
  const [images, setImages] = useState([]);
  const [newMemoryFormIsOpen, setNewMemoryForm] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);

  const getImages = async () => {
    try {
      if (props.query.mock === "true") {
        setImages(data);
      } else {
        dispatch({ type: "toggleLoading" });
        const response = await axios.get("/images/all");
        setImages(response.data.images);
        dispatch({ type: "toggleLoading" });
      }
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
      {images.length > 0 && (
        <Mansory images={images} setCurrentImage={setCurrentImage} />
      )}
      <Modal isOpen={currentImage}>
        <FullImage currentImage={currentImage} onResetState={onResetState} />
      </Modal>
    </main>
  );
}
