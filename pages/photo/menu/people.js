// pages/photo/[id].js
import Link from "next/link"
import React from "react"
import { client } from "../../../libs/client"
import styles from "../../../styles/Home.module.scss"
import Lightbox from "yet-another-react-lightbox"
import "yet-another-react-lightbox/styles.css"

export default function PhotoPeople({ photo }) {
  const [open, setOpen] = React.useState(false)

  return (
    <div className={styles.container.posts}>
      <main className={styles.main}>
        <h2>People</h2>

        <button type="button" onClick={() => setOpen(true)}>
          Open Lightbox
        </button>

        <Lightbox open={open} close={() => setOpen(false)} slides />

        {/* photo */}
        <div className={styles.photo_gallery}>
          {photo.map((photo) => (
            <div key={photo.id}>
              <Link href={`/photo/${photo.id}`}>
                {photo.menu == "people" ? (
                  <>
                    <img src={photo.photo.url} />
                    <br />
                    <div className={styles.photo_figure}>
                      {photo.figure} / {photo.menu}
                    </div>
                  </>
                ) : (
                  ``
                )}
              </Link>
              {/* menu */}
            </div>
          ))}
        </div>
        {/* to top */}
        <Link className={styles.description} href="/">
          トップに戻る
        </Link>
      </main>
    </div>
  )
}

// // データをテンプレートに受け渡す部分の処理を記述します
export const getStaticProps = async (context) => {
  const photoData = await client.get({
    endpoint: "photos",
  })

  return {
    props: {
      photo: photoData.contents,
    },
  }
}
