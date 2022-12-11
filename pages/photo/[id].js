// pages/category/[id].js
import Link from "next/link"
import { client } from "../../libs/client"
import styles from "../../styles/Home.module.scss"

export default function CategoryId({ photo }) {
  // カテゴリーに紐付いたコンテンツがない場合に表示
  // if (photo.length === 0) {
  //   return (
  //     <div className={styles.container.posts}>
  //       <main className={styles.main}>画像がありません</main>
  //     </div>
  //   )
  // }
  return (
    <div className={styles.container.posts}>
      <main className={styles.main}>
        <ul>
          {photo.map((photo) => (
            <li key={photo.id}>
              <Link href={`/photo/${photo.url}`}>{photo.title}</Link>
            </li>
          ))}
        </ul>
      </main>
    </div>
  )
}

// 静的生成のためのパスを指定します
export const getStaticPaths = async () => {
  const data = await client.get({ endpoint: "photo" })
  const paths = data.contents.map((content) => `/photo/${content.id}`)
  return { paths, fallback: false }
}

// データをテンプレートに受け渡す部分の処理を記述します
export const getStaticProps = async (context) => {
  const id = context.params.id
  const data = await client.get({
    endpoint: "photo",
    queries: { filters: `category[equals]${id}` },
  })

  return {
    props: {
      photo: data.contents,
    },
  }
}
