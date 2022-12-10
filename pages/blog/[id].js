// INFO: https://blog.microcms.io/microcms-next-jamstack-blog/
import { client } from "../../libs/client"
import Link from "next/link"
import styles from "../../styles/Home.module.scss"

export const getStaticProps = async (context) => {
  const id = context.params.id
  const data = await client.get({ endpoint: "blogs", contentId: id })

  return {
    props: {
      blog: data,
    },
  }
}

export const getStaticPaths = async () => {
  const data = await client.get({ endpoint: "blogs" })
  const paths = data.contents.map((content) => `/blog/${content.id}`)
  return {
    paths,
    fallback: false,
  }
}

export default function BlogId({ blog }) {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h2 className={styles.title}>{blog.title}</h2>
        <p>{blog.publishedAt}</p>
        <div
          className={styles.main_blog}
          dangerouslySetInnerHTML={{
            __html: `${blog.content}`,
          }}
        />
        {/* to top */}
        <Link className={styles.description} href="/">
          トップに戻る
        </Link>
      </main>
    </div>
  )
}
