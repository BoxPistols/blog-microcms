// pages/photo/[id].js
import Link from "next/link";
import React from "react";
import { client } from "../../../libs/client";
import styles from "../../../styles/Home.module.scss";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Image from "next/image";

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

        <div className={styles.photo_gallery}>
          {photo.map((photo, idx) => (
            <div key={photo.id}>
              <Link href={`/photo/${photo.id}`}>
                {photo.menu == "people" ? (
                  <div
                    style={{
                      position: "relative",
                      width: "300px",
                      height: "300px",
                    }}
                  >
                    <Image
                      src={photo.photo.url}
                      alt=""
                      layout="fill"
                      objectFit="cover"
                      onClick={(event) => {
                        event.preventDefault();
                        handleOpen(idx);
                      }}
                    />{" "}
                    <br />
                    <div className={styles.photo_figure}>
                      {photo.figure} / {photo.menu}
                    </div>
                  </div>
                ) : (
                  ``
                )}
              </Link>{" "}
            </div>
          ))}
        </div>
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
