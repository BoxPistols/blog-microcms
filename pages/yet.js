//  https://codesandbox.io/s/yet-another-react-lightbox-examples-forked-tqxh4n
import * as React from "react"

import PhotoAlbum from "react-photo-album"
import Lightbox from "yet-another-react-lightbox"

// import { Paragraph } from "../components"
import photos from "../data/photos"
// import { photoCMS } from "./photo/photoCMS"
import slides from "../data/slides"
import "yet-another-react-lightbox/styles.css"

// CMS
import { client } from "/libs/client"

// let getPhotos = photo
// let gPhotos = getPhotos.map((pt) => {
//   pt.photo.url
// })

const PhotoGallery = ({ photo }) => {
  const [index, setIndex] = React.useState(-1)

  // 2
  const breakpoints2 = [4320, 2160, 1080, 640, 384, 256, 128]

  const photos2 = photo.map((photo, index) => {
    return {
      src: photo.photo.url,
      key: `${index}`,
      width: 1200,
      height: 1200,
      // width: "100%",
      // height: "100%",
    }
  })
  // const photos2 = photo.map((photo, index) => {
  //   const width = photo.width * 4
  //   const height = photo.height * 4
  //   return {
  //     src: (photo.photo.url, width, height),
  //     key: `${index}`,
  //     width,
  //     height,
  //     images: breakpoints2.map((breakpoint) => {
  //       const breakpointHeight = Math.round((height / width) * breakpoint)
  //       return {
  //         src: (photo.photo.url, breakpoint, breakpointHeight),
  //         width: breakpoint,
  //         height: breakpointHeight,
  //       }
  //     }),
  //   }
  // })

  const slides2 = photos2.map(({ src, key, width, height, images }) => ({
    src,
    key,
    width,
    height,
    srcSet: images?.map((image) => ({
      src: image.src,
      width: image.width,
      height: image.height,
    })),
  }))

  // const slides3 = photos.map(({ src, key, width, height, images }) => ({
  //   src,
  //   key,
  //   width,
  //   height,
  //   srcSet: images?.map((image) => ({
  //     src: image.src,
  //     width: image.width,
  //     height: image.height,
  //   })),
  // }))

  return (
    <>
      <div style={{ display: "block", padding: "2vw" }}>
        {/* {photoCMS} */}

        <PhotoAlbum
          layout="rows"
          targetRowHeight={150}
          onClick={({ index }) => setIndex(index)}
          photos={photos2}
        />

        <Lightbox
          open={index >= 0}
          index={index}
          close={() => setIndex(-1)}
          slides={slides2}
        />

        <p>
          Here is an example of a photo gallery with a lightbox. You can click
          any photo to open it in a lightbox.
        </p>

        {/* <p>{gPhotos}</p> */}

        <div style={{ display: "flex", padding: "2vw" }}>
          {photo.map((photo) => (
            <div key={photo.id}>
              <img src={photo.photo.url} width="200" />
            </div>
          ))}
        </div>

        {/* <PhotoAlbum
          layout="rows"
          targetRowHeight={150}
          onClick={({ index }) => setIndex(index)}
          // photos={photo.photo.url}
          photos={photos}
        />

        <Lightbox
          open={index >= 0}
          index={index}
          close={() => setIndex(-1)}
          slides={slides}
        /> */}
      </div>
    </>
  )
}

export default PhotoGallery

// CMS
export const getStaticProps = async (context) => {
  const photoData = await client.get({
    endpoint: "photos",
  })

  return {
    props: {
      photo: photoData.contents,
    },
  }
}
