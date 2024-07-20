import { useState, useEffect } from "preact/hooks";
import styles from "./mansory.module.scss";
import { Card } from "../../components/Card";

const rows = (size) => Array.from({ length: size }, () => []);

function getColumnCount() {
  const width = window.innerWidth;
  if (width >= 1800) return rows(5);
  if (width >= 1436) return rows(4);
  if (width >= 1074) return rows(3);
  if (width >= 712) return rows(2);
  return rows(1);
}

export function Mansory({ images, setCurrentImage }) {
  const [columns, setColumns] = useState(getColumnCount());

  useEffect(() => {
    const handleResize = () => {
      setColumns(getColumnCount());
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // i  = image, c = counter
  images.forEach((i, c) => {
    columns[c % columns.length].push(i);
  });

  return (
    <div className={styles.container}>
      {columns.map((column) => (
        <div className={styles.column}>
          {column.map((row) => (
            <Card image={row} showImage={setCurrentImage}></Card>
          ))}
        </div>
      ))}
    </div>
  );
}
