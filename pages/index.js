import Head from "next/head"
import styles from "../styles/Home.module.scss"
import { client } from "../libs/client"
import Link from "next/link"

export default function Home({ blog, category, photo }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>MicroCMS on Next</h1>
        {/* category */}
        <div className={styles.blog}>
          <ul>
            {category.map((category) => (
              <li key={category.id}>
                <Link href={`/category/${category.id}`}>{category.name}</Link>
              </li>
            ))}
          </ul>
        </div>
        <hr />
        {/* menu */}
        <div className={styles.blog}>
          <ul>
            <li>
              <Link href={`/photo/menu/people`}>people</Link>
            </li>
            <li>
              <Link href={`/photo/menu/food`}>food</Link>
            </li>
          </ul>
        </div>
        <hr />
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
              </Link>
              {/* menu */}
            </div>
          ))}
        </div>
        <hr />
        {/* blog */}
        <div className={styles.blog}>
          <ul>
            {blog.map((blog) => (
              <li key={blog.id}>
                <Link href={`/blog/${blog.id}`}>{blog.title}</Link>
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
  const photoData = await client.get({ endpoint: "photos" })
  const menuData = await client.get({ endpoint: "photos" })

  // console.log(data)
  return {
    props: {
      blog: data.contents,
      category: categoryData.contents,
      photo: photoData.contents,
      menu: menuData.contents,
    },
  }
}
