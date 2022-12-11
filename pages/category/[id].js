// pages/category/[id].js
import Link from "next/link"
import { client } from "../../libs/client"
import styles from "../../styles/Home.module.scss"

export default function CategoryId({ blog }) {
  // カテゴリーに紐付いたコンテンツがない場合に表示
  if (blog.length === 0) {
    return (
      <div className={styles.container.posts}>
        <main className={styles.main}>ブログコンテンツがありません</main>
      </div>
    )
  }
  return (
    <div className={styles.container.posts}>
      <main className={styles.main}>
        <ul>
          {blog.map((blog) => (
            <li key={blog.id}>
              <Link href={`/blog/${blog.id}`}>{blog.title}</Link>
              {/* TODO: Photo gallery */}
              {/* <div
                className={styles.main_blog}
                dangerouslySetInnerHTML={{
                  __html: `${blog.content}`,
                }}
              /> */}

              {/* <p className="published">
                {blog.category && `${blog.category.name}`} / {blog.publishedAt}
              </p> */}
            </li>
          ))}
        </ul>
      </main>
    </div>
  )
}

// 静的生成のためのパスを指定します
export const getStaticPaths = async () => {
  const data = await client.get({ endpoint: "categories" })
  const paths = data.contents.map((content) => `/category/${content.id}`)
  return { paths, fallback: false }
}

// データをテンプレートに受け渡す部分の処理を記述します
export const getStaticProps = async (context) => {
  const id = context.params.id
  const data = await client.get({
    endpoint: "blogs",
    queries: { filters: `category[equals]${id}` },
  })

  return {
    props: {
      blog: data.contents,
    },
  }
}
