// https://zenn.dev/kimura141899/articles/4f33b899cb0bca
import { useState, useEffect } from "react" //mapメソッドを使用したいので初期値を[]に
// import Lightbox from "yet-another-react-lightbox"
import Lightbox from "yet-another-react-lightbox"
import "yet-another-react-lightbox/styles.css"
import { client } from "../../../libs/client"
import PhotoAlbum from "react-photo-album"

export default function Light({ photo }) {
  // const [places, setPlaces] = useState([])
  const [open, setOpen] = useState(false)
w
  // let datas = useEffect(() => {
  //   async function fetchData() {
  //     const response = await fetch("https://dummyjson.com/products")
  //     const data = await response.json()
  //     setPlaces(data.results)
  //   }
  //   fetchData()
  // }, [])

  // local
  let listProduct = [
    { id: 1, name: "Apple", type: "fruit" },
    { id: 2, name: "Orange", type: "fruit" },
    { id: 3, name: "Banana", type: "fruit" },
    { id: 4, name: "Tomato", type: "vegetable" },
    { id: 5, name: "Carrot", type: "vegetable" },
  ]

  // let datas = "https://dummyjson.com/products"
  // let types = [...new Set(listProduct.map((object) => object.type))]
  // let types = (listProduct.map((object) => object.type))
  // console.log(types)

  const [posts, setPosts] = useState([])
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((res) => res.json())
      // .then((data) => console.log(data))
      .then((data) => {
        setPosts(data)
      }, [])
  })

  // let datas = "https://dummyjson.com/products"
  // let types = [...new Set(listProduct.map((object) => object.type))]
  // let types = (listProduct.map((object) => object.type))
  // console.log(types)

  let getPhotos = photo
  let gPhotos = getPhotos.map((pt) => {
    pt.photo.url
  })

  const slides = [
    {
      src: "https://images.microcms-assets.io/assets/388dd216299b49caac3cece8e3758a4d/d8ab4ea68d764e2186806acbb214ebf0/lynch.png",
      alt: "image 1",
      width: 384,
      height: 256,
      srcSet: [
        {
          src: "https://images.microcms-assets.io/assets/388dd216299b49caac3cece8e3758a4d/d8ab4ea68d764e2186806acbb214ebf0/lynch.png",
          width: 320,
          height: 213,
        },
        // { src: "/image1x320.jpg", width: 320, height: 213 },
        // { src: "/image1x640.jpg", width: 640, height: 427 },
        // { src: "/image1x1200.jpg", width: 1200, height: 800 },
        // { src: "/image1x2048.jpg", width: 2048, height: 1365 },
        // { src: "/image1x3840.jpg", width: 3840, height: 2560 },
      ],
    },
    // ...
  ]

  const [index, setIndex] = useState(-1)

  return (
    <>
      <PhotoAlbum
        layout="rows"
        photos={gPhotos}
        targetRowHeight={150}
        onClick={({ index }) => setIndex(index)}
      />

      <Lightbox
        open={index >= 0}
        index={index}
        close={() => setIndex(-1)}
        slides={slides}
      />

      <div>{gPhotos}</div>
      <div>
        <button type="button" onClick={() => setOpen(true)}>
          Open Lightbox
        </button>
      </div>
      <div>
        {photo.map((photo) => (
          <div key={photo.id}>
            {photo.photo.url}
            {/* menu */}
          </div>
        ))}
      </div>

      {/* <div>
        {posts.map((post) => (
          <div key={post.id}>{post.title}</div>
        ))}
      </div> */}
      {/*  */}
      <div>
        {listProduct.map((obj) => (
          <p key={obj.id}>{obj.name}</p>
        ))}
        {/* {location.href} */}
      </div>
      {/*  */}
    </>
  )
}

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
