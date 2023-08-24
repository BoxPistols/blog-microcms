import React, { useState } from "react";
import { client } from "../../../libs/client";
import styles from "../../../styles/Home.module.scss";
// Lightbox.module.scss
import Masonry from "react-masonry-css";
import Link from "next/link";

export default function PhotoPeople({ photo }) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const peoplePhotos = photo.filter((p) => p.menu == "people");

  const handleOpen = (index) => {
    setIsOpen(true);
    setCurrentImageIndex(index);
  };

  const handleClose = () => {
    setIsOpen(false);
    setCurrentImageIndex(0);
  };

  const handleNext = () => {
    setCurrentImageIndex((currentImageIndex + 1) % peoplePhotos.length);
  };

  const handlePrev = () => {
    setCurrentImageIndex(
      (currentImageIndex + peoplePhotos.length - 1) % peoplePhotos.length
    );
  };

  return (
    <div className={styles.container.posts}>
      <main className={styles.main}>
        <h2>People</h2>
        <Masonry
          breakpointCols={{ default: 5, 1100: 2, 700: 1 }}
          className={styles.my_masonry_grid}
          columnClassName={styles.my_masonry_grid_column}
        >
          {peoplePhotos.map((p, idx) => (
            <div key={p.id}>
              <img src={p.photo.url} onClick={() => handleOpen(idx)} alt="" />
            </div>
          ))}
        </Masonry>
        {isOpen && (
          <div className={styles.lightbox}>
            <div className={styles.lightboxContent}>
              <img src={peoplePhotos[currentImageIndex].photo.url} alt="" />
              <button className={styles.closeButton} onClick={handleClose}>
                ×
              </button>
              <button className={styles.prevButton} onClick={handlePrev}>
                ←
              </button>
              <button className={styles.nextButton} onClick={handleNext}>
                →
              </button>
            </div>
          </div>
        )}
        <div className={styles.description}>
          <Link href="/">トップに戻る</Link>
        </div>
      </main>
    </div>
  );
}

// データをテンプレートに受け渡す部分の処理を記述します
export const getStaticProps = async (context) => {
  const photoData = await client.get({
    endpoint: "photos",
  });

  return {
    props: {
      photo: photoData.contents,
    },
  };
};
