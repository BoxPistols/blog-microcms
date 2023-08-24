// file name: CustomLightbox.js
import React, { useEffect, useCallback } from "react"
import styles from "../styles/Lightbox.module.scss"

function CustomLightbox({
  photos,
  isOpen,
  currentIdx,
  handleClose,
  handlePrev,
  handleNext,
}) {
  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "ArrowLeft") handlePrev()
      if (e.key === "ArrowRight") handleNext()
      if (e.key === "Escape") handleClose()
    },
    [handlePrev, handleNext, handleClose]
  )

  useEffect(() => {
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown)
    } else {
      window.removeEventListener("keydown", handleKeyDown)
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [isOpen, handleKeyDown])

  return (
    <div>
      {isOpen && (
        <div className={styles.lightbox}>
          <div className={styles.lightboxContent}>
            <img src={photos[currentIdx]} alt="" />

            <button
              className={styles.prevButton}
              onClick={handlePrev}
              style={{ display: currentIdx === 0 ? "none" : "block" }}
            >
              <svg width="40" height="50" viewBox="0 0 30 30">
                <path
                  d="M20 5 L10 15 L20 25"
                  stroke="white"
                  strokeWidth="2"
                  fill="none"
                />
              </svg>
            </button>

            <button
              className={styles.nextButton}
              onClick={handleNext}
              style={{
                display: currentIdx === photos.length - 1 ? "none" : "block",
              }}
            >
              <svg width="40" height="50" viewBox="0 0 30 30">
                <path
                  d="M10 5 L20 15 L10 25"
                  stroke="white"
                  strokeWidth="2"
                  fill="none"
                />
              </svg>
            </button>

            <button className={styles.closeButton} onClick={handleClose}>
              <svg width="40" height="40" viewBox="0 0 30 30">
                <path
                  d="M5 5 L25 25"
                  stroke="white"
                  strokeWidth="2"
                  fill="none"
                />
                <path
                  d="M25 5 L5 25"
                  stroke="white"
                  strokeWidth="2"
                  fill="none"
                />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default CustomLightbox
