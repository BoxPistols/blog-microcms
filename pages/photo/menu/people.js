import Link from "next/link";
import React from "react";
import { client } from "../../../libs/client";
import styles from "../../../styles/Home.module.scss";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import Masonry from "react-masonry-css";

export default function PhotoPeople({ photo }) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [photoIndex, setPhotoIndex] = React.useState(0);

  const peoplePhotos = photo.filter((p) => p.menu == "people");

  const images = peoplePhotos.map((photo) => photo.photo.url); // 画像のURLの配列を作成

  const handleOpen = (idx) => {
    setPhotoIndex(idx);
    setIsOpen(true);
  };

  return (
    <div className={styles.container.posts}>
      <main className={styles.main}>
        <h2>People</h2>
        {isOpen && (
          <Lightbox
            mainSrc={images[photoIndex]}
            nextSrc={images[(photoIndex + 1) % images.length]}
            prevSrc={images[(photoIndex + images.length - 1) % images.length]}
            onCloseRequest={() => setIsOpen(false)}
            onMovePrevRequest={() =>
              setPhotoIndex((photoIndex + images.length - 1) % images.length)
            }
            onMoveNextRequest={() =>
              setPhotoIndex((photoIndex + 1) % images.length)
            }
          />
        )}
        <Masonry
          breakpointCols={{ default: 5, 1100: 2, 700: 1 }}
          className={styles.my_masonry_grid}
          columnClassName={styles.my_masonry_grid_column}
        >
          {peoplePhotos.map((photo, idx) => (
            <div key={photo.id}>
              <Link href={`/photo/${photo.id}`}>
                <img
                  src={photo.photo.url}
                  onClick={(event) => {
                    event.preventDefault();
                    handleOpen(idx); // ここでidxを渡す
                  }}
                  alt=""
                />
              </Link>
            </div>
          ))}
        </Masonry>
        <Link className={styles.description} href="/">
          トップに戻る
        </Link>
      </main>
    </div>
  );
}

// // データをテンプレートに受け渡す部分の処理を記述します
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
