// CMS
import { client } from "../../libs/client"

// CMS
export const photoCMS = ({ photo }) => {
  photo.map((photo) => (
    <div key={photo.id}>
      <img src={photo.photo.url} width="200" />
    </div>
  ))
}

// CMS
export const getStaticProps = async (context) => {
  const photoData = await client.get({
    endpoint: "photo",
  })

  return {
    props: {
      photo: photoData.contents,
    },
  }
}
