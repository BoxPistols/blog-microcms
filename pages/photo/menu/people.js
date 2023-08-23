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

  const handleOpen = (idx) => {
    setCurrentIdx(idx);
    setOpen(true);
  };

  return (
    <div className={styles.container.posts}>
      <main className={styles.main}>
        <h2>People</h2>
        <Lightbox
          open={open}
          close={() => setOpen(false)}
          slides={photo
            .filter((photo) => photo.menu == "people")
            .map((photo) => ({ src: photo.photo.url }))}
          currentIdx={currentIdx}
        />

        <Masonry
          breakpointCols={{ default: 3, 1100: 2, 700: 1 }}
          className={styles.my_masonry_grid}
          columnClassName={styles.my_masonry_grid_column}
        >
          {photo.map((photo, idx) => (
            <div key={photo.id}>
              <Link href={`/photo/${photo.id}`}>
                {photo.menu == "people" ? (
                  <div>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={photo.photo.url}
                      onClick={(event) => {
                        event.preventDefault();
                        handleOpen(idx);
                      }}
                      alt=""
                    />
                  </div>
                ) : (
                  ``
                )}
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
