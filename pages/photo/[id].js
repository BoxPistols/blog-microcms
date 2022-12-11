// INFO: https://photo.microcms.io/microcms-next-jamstack-photo/
import { client } from "../../libs/client"
import Link from "next/link"
import styles from "../../styles/Home.module.scss"

export default function PhotoId({ photo }) {
  return (
    <div className={styles.container.posts}>
      <main className={styles.main}>
        <h2 className={styles.title}>
          {photo.id} / {photo.menu}
        </h2>
        <p className="category">
          {photo.categories && `categories:${photo.categories.id}`} / id:
          {photo.id && `${photo.id}`} / menu:{photo.menu && `${photo.menu}`}
        </p>
        <img src={photo.photo.url} />
        <p className="published">{photo.publishedAt}</p>
        {/* to top */}
        <Link className={styles.description} href="/">
          トップに戻る
        </Link>
      </main>
    </div>
  )
}

export const getStaticProps = async (context) => {
  const id = context.params.id
  const data = await client.get({ endpoint: "photos", contentId: id })

  return {
    props: {
      photo: data,
    },
  }
}

export const getStaticPaths = async () => {
  const data = await client.get({ endpoint: "photos" })
  const paths = data.contents.map((content) => `/photo/${content.id}`)
  return {
    paths,
    fallback: false,
  }
}
