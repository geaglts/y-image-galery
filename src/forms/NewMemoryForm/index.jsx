import { useState } from "preact/hooks";
import toast from "react-hot-toast";
import { Button } from "../../components/Button";
import styles from "./styles.module.scss";
import { ImageInput } from "../../components/ImageInput";
import { useGlobalDispatch } from "../../hooks/useGlobalContext";
import axios from "../../services/axios";
import { classnames } from "../../utils/classnames";

// icons
import closeEye from "../../assets/close-eye.svg";
import openEye from "../../assets/open-eye.svg";

export function NewMemoryForm({ onCloseMemoryForm, reloadImages }) {
  const [images, setImages] = useState([]);
  const globalDispatch = useGlobalDispatch();

  const onSubmitForm = async (evt) => {
    evt.preventDefault();
    try {
      globalDispatch({ type: "toggleLoading" });
      const formData = Object.fromEntries(new FormData(evt.target));
      if (images.length === 0) {
        toast("La foto es necesaria jsjsjs");
        return;
      }
      if (formData?.apikey.length === 0) {
        toast("La palabra secreta es necesaria jsjsjs");
        return;
      }

      const imagesRequest = images.map((i) =>
        axios.post(
          "/images",
          { description: i.description, base64: i.src },
          { headers: { Authorization: formData.apikey } }
        )
      );

      const loadingId = toast.loading("Las imágenes se están subiendo");

      const response = await Promise.all(imagesRequest);

      const isUploaded = response.every((i) =>
        i.data.message.includes("éxito")
      );

      if (isUploaded) {
        await reloadImages();
        onCloseMemoryForm();
        toast.success("Las fotos han sido subidas con éxito 🙌");
      } else {
        toast.error("No se pudieron cargar las imágenes");
      }
      toast.dismiss(loadingId);
    } catch (error) {
      //   console.log(error);
    } finally {
      globalDispatch({ type: "toggleLoading" });
    }
  };

  return (
    <section class={styles.container}>
      <form class={styles.form} onSubmit={onSubmitForm}>
        <h2>🌼 Agrega una nueva foto 🌼</h2>
        <ImageInput images={images} setImages={setImages} />
        <PasswordInput
          name="apikey"
          placeholder="Cuál es la palabra secreta? uwu"
          class="input"
        />
        <div class={styles.buttons}>
          <Button btnStyle="green">Agrega la fotoos 🙌</Button>
          <Button type="button" onClick={onCloseMemoryForm}>
            La subire mas tarde
          </Button>
        </div>
      </form>
    </section>
  );
}

export function PasswordInput(props) {
  const [show, setShow] = useState(false);

  return (
    <div class={classnames("bordered", styles.passwordInput)}>
      <input type={show ? "text" : "password"} {...props} />
      <button
        type="button"
        onClick={() => setShow(!show)}
        className={styles.button}
      >
        <img src={show ? openEye : closeEye} alt="eye icon" />
      </button>
    </div>
  );
}
