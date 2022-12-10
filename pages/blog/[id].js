// INFO: https://blog.microcms.io/microcms-next-jamstack-blog/
import { client } from "../../libs/client"

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
    <main>
      <h2>{blog.title}</h2>
      <p>{blog.publishedAt}</p>
      <div
        dangerouslySetInnerHTML={{
          __html: `${blog.content}`,
        }}
      />
    </main>
  )
}
