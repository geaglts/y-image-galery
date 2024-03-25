import { useState } from "preact/hooks";
import toast from "react-hot-toast";
import { Button } from "../../components/Button";
import styles from "./styles.module.scss";
import { ImageInput } from "../../components/ImageInput";
import {
  useGlobalDispatch,
  useGlobalContext,
} from "../../hooks/useGlobalContext";
import axios from "../../services/axios";

export function NewMemoryForm({ onCloseMemoryForm, reloadImages }) {
  const [image, setImage] = useState(null);
  const globalDispatch = useGlobalDispatch();

  const onSubmitForm = async (evt) => {
    evt.preventDefault();
    try {
      globalDispatch({ type: "toggleLoading" });
      const formData = Object.fromEntries(new FormData(evt.target));
      if (!image) {
        toast("La foto es necesaria jsjsjs");
        return;
      }
      if (formData?.apikey.length === 0) {
        toast("La palabra secreta es necesaria jsjsjs");
        return;
      }
      const response = await axios.post(
        "/images",
        {
          description: formData.description,
          base64: image,
        },
        { headers: { authorization: formData.apikey } }
      );
      toast(response.data.message);
      if (!response.data.error) {
        await reloadImages();
        onCloseMemoryForm();
      } else {
      }
    } catch (error) {
      //   console.log(error);
    } finally {
      globalDispatch({ type: "toggleLoading" });
    }
  };

  return (
    <form class={styles.container} onSubmit={onSubmitForm}>
      <h2>🌼 Agrega una nueva foto 🌼</h2>
      <ImageInput image={image} setImage={setImage} />
      <input
        type="text"
        name="description"
        placeholder="Quieres poner una notita para la foto?"
        class="input bordered"
      />
      <input
        type="text"
        name="apikey"
        placeholder="Cuál es la palabra secreta? uwu"
        class="input bordered"
      />
      <div class={styles.buttons}>
        <Button btnStyle="green">Agrega la fotoo 🙌</Button>
        <Button type="button" onClick={onCloseMemoryForm}>
          La subire mas tarde
        </Button>
      </div>
    </form>
  );
}
