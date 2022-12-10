import Head from "next/head"
import styles from "../styles/Home.module.scss"
import { client } from "../libs/client"
import Link from "next/link"

export default function Home({ blog }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>MicroCMS on Next</h1>
        {/* {data.contents[0].title} */}
        <p className={styles.description}>
          Get started by editing{" "}
          <code className={styles.code}>pages/index.js</code>
        </p>
        <div className={styles.blog}>
          <ul>
            {blog.map((blog) => (
              <li key={blog.id}>
                <Link href={`/blog/${blog.id}`}>{blog.title}</Link>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </div>
  )
}

// SSG
export const getStaticProps = async () => {
  const data = await client.get({
    endpoint: "blogs",
  })
  // console.log(data)
  return {
    props: {
      blog: data.contents,
    },
  }
}
