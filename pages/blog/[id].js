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

export default function BlogId({ blog }) {
  return (
    <main>
      <h2>{blog.title}</h2>
      <p>{blog.publishedAt}</p>
      <p>{blog.body}</p>
    </main>
  )
}

export const getStaticPaths = async () => {
  const data = await client.get({ endpoint: "blogs" })
  const paths = data.contents.map((content) => `/blog/${content.id}`)
  return {
    paths,
    fallback: false,
  }
}
