import Head from "next/head"
import styles from "../styles/Home.module.scss"
import { client } from "../libs/client"
import Link from "next/link"

export default function Home({ blog, category }) {
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
          {/* category */}
          <ul>
            {category.map((category) => (
              <li key={category.id}>
                <Link href={`/category/${category.id}`}>{category.name}</Link>
              </li>
            ))}
          </ul>
        </div>
        <hr />
        {/* blog */}
        <div className={styles.blog}>
          <ul>
            {blog.map((blog) => (
              <li key={blog.id}>
                <Link href={`/blog/${blog.id}`}>{blog.title}</Link>
                {/* TODO: Photo gallery */}
                {/* <Link href={blog.title}>
                  <div
                    className={styles.main_blog}
                    dangerouslySetInnerHTML={{
                      __html: `${blog.content}`,
                    }}
                  />
                </Link> */}
              </li>
            ))}
          </ul>
        </div>
        <hr />
        <div className={styles.blog}>
          <Link href={`./cat`}>category</Link>
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
  const categoryData = await client.get({ endpoint: "categories" })

  // console.log(data)
  return {
    props: {
      blog: data.contents,
      category: categoryData.contents,
    },
  }
}
