import styles from "./styles.module.scss";

const images = [
  "https://picsum.photos/200/300",
  "https://picsum.photos/200/100",
  "https://picsum.photos/200/300",
  "https://picsum.photos/200/100",
  "https://picsum.photos/200/300",
  "https://picsum.photos/200/100",
  "https://picsum.photos/200/300",
  "https://picsum.photos/200/300",
  "https://picsum.photos/200/400",
  "https://picsum.photos/200/300",
  "https://picsum.photos/200/100",
  "https://picsum.photos/200/300",
  "https://picsum.photos/200/200",
  "https://picsum.photos/200/300",
  "https://picsum.photos/200/200",
];

const MasonryLayout = ({ images, children }) => {
  const columnCount = 6;
  const columns = Array.from({ length: columnCount }, () => []);
  console.log(columns);

  images.forEach((image, index) => {
    columns[index % columnCount].push(image);
  });

  return (
    <>
      <div className={styles.masonry}>
        {columns.map((column, columnIndex) => (
          <div key={columnIndex} className={styles.column}>
            {column.map((image, imageIndex) => (
              <div key={imageIndex} className={styles.image}>
                <img src={image} alt={`Unsplash ${imageIndex}`} />
              </div>
            ))}
          </div>
        ))}
      </div>
    </>
  );
};

export function Mansory() {
  return (
    <div class={styles.App}>
      <MasonryLayout images={images} />
    </div>
  );
}
