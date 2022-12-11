// pages/photo/[id].js
import Link from "next/link"
import { client } from "../../../libs/client"
import styles from "../../../styles/Home.module.scss"

export default function PhotoPeople({ photo }) {
  return (
    <div className={styles.container.posts}>
      <main className={styles.main}>
        {/* photo */}
        <div className={styles.photo_gallery}>
          {photo.map((photo) => (
            <div key={photo.id}>
              {/* <Link href={`${photo.photo.url}`}> */}
              {/* <Link href={`photo/${photo.menu}`}> */}
              <Link href={`photo/${photo.id}`}>
                <img src={photo.photo.url} />
                <br />
                <div className={styles.photo_figure}>
                  {photo.figure} / {photo.menu}
                </div>
                {photo.menu == "food" ? "yes,food!" : "not,food!"}
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
