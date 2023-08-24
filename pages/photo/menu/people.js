// file name: pages/photo/menu/people.js
import React, { useState, useCallback } from "react"
import { client } from "../../../libs/client"
import Masonry from "react-masonry-css"
import Link from "next/link"
import CustomLightbox from "../../../components/CustomLightbox"
import styles from "../../../styles/Home.module.scss"

export default function PhotoPeople({ photo }) {
  const peoplePhotos = photo.filter((p) => p.menu == "people")

  const [isOpen, setIsOpen] = useState(false)
  const [currentIdx, setCurrentIdx] = useState(0)

  const handleOpen = (idx) => {
    setIsOpen(true)
    document.body.style.overflow = "hidden"
    setCurrentIdx(idx)
  }

  const handleClose = () => {
    // console.log("Closing lightbox")
    document.body.style.overflow = "unset"
    setIsOpen(false)
  }

  const handlePrev = useCallback(() => {
    if (currentIdx > 0) {
      setCurrentIdx((prevIdx) => prevIdx - 1)
    } else {
      setCurrentIdx(peoplePhotos.length - 1)
    }
  }, [currentIdx, peoplePhotos])

  const handleNext = useCallback(() => {
    if (currentIdx < peoplePhotos.length - 1) {
      setCurrentIdx((prevIdx) => prevIdx + 1)
    } else {
      setCurrentIdx(0)
    }
  }, [currentIdx, peoplePhotos])

  return (
    <div className={styles.container.posts}>
      <main className={styles.main}>
        <h2>People</h2>
        <Masonry
          // breakpointCols={{ default: 5, 1100: 2, 700: 1 }}
          breakpointCols={{ default: 5, 960: 2 }}
          className={styles.my_masonry_grid}
          columnClassName={styles.my_masonry_grid_column}
        >
          {peoplePhotos.map((p, idx) => (
            <div key={p.id}>
              <img src={p.photo.url} onClick={() => handleOpen(idx)} alt="" />
            </div>
          ))}
        </Masonry>
        {isOpen && (
          <CustomLightbox
            photos={peoplePhotos.map((p) => p.photo.url)}
            isOpen={isOpen}
            currentIdx={currentIdx}
            handleClose={handleClose}
            handlePrev={handlePrev}
            handleNext={handleNext}
          />
        )}
        <div className={styles.description}>
          <Link href="/">トップに戻る</Link>
        </div>
      </main>
    </div>
  )
}

// データをテンプレートに受け渡す部分の処理を記述します
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
