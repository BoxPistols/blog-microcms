import React, { useState } from "react";
import { client } from "../../../libs/client";
import styles from "../../../styles/Home.module.scss";
// Lightbox.module.scss
import Masonry from "react-masonry-css";
import Link from "next/link";

export default function PhotoPeople({ photo }) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [currentIdx, setCurrentIdx] = React.useState(0);

  const peoplePhotos = photo.filter((p) => p.menu == "people");

  const handleOpen = (idx) => {
    setCurrentIdx(idx);
    setIsOpen(true);
  };

  const handlePrev = () => {
    setCurrentIdx((currentIdx - 1 + peoplePhotos.length) % peoplePhotos.length);
  };

  const handleNext = () => {
    setCurrentIdx((currentIdx + 1) % peoplePhotos.length);
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
            <img src={peoplePhotos[currentIdx].photo.url} alt="" />
            <button className={styles.prevButton} onClick={handlePrev}>
              <svg width="30" height="30" viewBox="0 0 30 30">
                <path
                  d="M20 5 L10 15 L20 25"
                  stroke="white"
                  strokeWidth="2"
                  fill="none"
                />
              </svg>
            </button>
            <button className={styles.nextButton} onClick={handleNext}>
              <svg width="30" height="30" viewBox="0 0 30 30">
                <path
                  d="M10 5 L20 15 L10 25"
                  stroke="white"
                  strokeWidth="2"
                  fill="none"
                />
              </svg>
            </button>
            <button
              className={styles.closeButton}
              onClick={() => setIsOpen(false)}
            >
              <svg width="30" height="30" viewBox="0 0 30 30">
                <path
                  d="M5 5 L25 25"
                  stroke="white"
                  strokeWidth="2"
                  fill="none"
                />
                <path
                  d="M25 5 L5 25"
                  stroke="white"
                  strokeWidth="2"
                  fill="none"
                />
              </svg>
            </button>
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
