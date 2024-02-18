import { useEffect, useState } from "preact/hooks";
import { Header } from "../../containers/Header";

import axios from "../../services/axios";

export function Home() {
  const [images, setImages] = useState([]);

  const getImages = async () => {
    try {
      const response = await axios.get("/images/all");
      setImages(response.data);
    } catch (error) {
      console.log("ups!");
    }
  };

  useEffect(() => {
    getImages();
  }, []);

  return (
    <main>
      <Header />
      <section>
        {images.map((i) => {
          return <p>{i.description}</p>;
        })}
      </section>
    </main>
  );
}
