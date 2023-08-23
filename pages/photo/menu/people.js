import Link from "next/link";
import React from "react";
import { client } from "../../../libs/client";
import styles from "../../../styles/Home.module.scss";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Masonry from "react-masonry-css";

export default function PhotoPeople({ photo }) {
  const [open, setOpen] = React.useState(false);
  const [currentIdx, setCurrentIdx] = React.useState(0);

  const peoplePhotos = photo.filter((p) => p.menu == "people");

  const handleOpen = (idx) => {
    setCurrentIdx(idx);
    setTimeout(() => setOpen(true), 0);
    console.log("Clicked image index: ", idx);
  };

  // あらかじめフィルタリングした人物の写真をスライドとして使用します
  // const slides = peoplePhotos.map((photo) => ({ src: photo.photo.url }));
  const slides = peoplePhotos.map((photo) => ({
    src: photo.photo.url,
    caption: photo.figure,
  }));

  return (
    <div className={styles.container.posts}>
      <main className={styles.main}>
        <h2>People</h2>
        <Lightbox
          open={open}
          close={() => setOpen(false)}
          slides={slides}
          currentIdx={currentIdx}
        />
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
