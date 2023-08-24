import React, { useState } from "react"
import styles from "../styles/LightBox.module.scss"

function CustomLightbox({
  photos,
  isOpen,
  currentIdx,
  handleClose,
  handlePrev,
  handleNext,
}) {
  return (
    <div>
      <div className={styles.grid}>
        {photos.map((photo, idx) => (
          <img key={idx} src={photo} alt="" onClick={() => handleOpen(idx)} />
        ))}
      </div>

      {isOpen && (
        <div className={styles.lightbox}>
          <div className={styles.lightboxContent}>
            <img src={photos[currentIdx]} alt="" />
            <button className={styles.prevButton} onClick={handlePrev}>
              <svg width="30" height="30" viewBox="0 0 30 30">
                <path
                  d="M20 5 L10 15 L20 25"
                  stroke="white"
                  strokeWidth="2"
                  fill="none"
                />
              </svg>
            </button>
            <button className={styles.nextButton} onClick={handleNext}>
              <svg width="30" height="30" viewBox="0 0 30 30">
                <path
                  d="M10 5 L20 15 L10 25"
                  stroke="white"
                  strokeWidth="2"
                  fill="none"
                />
              </svg>
            </button>
            <button className={styles.closeButton} onClick={handleClose}>
              <svg width="30" height="30" viewBox="0 0 30 30">
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
