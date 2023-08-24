import React, { useState } from "react";
import styles from "./Lightbox.module.scss"; // CSSモジュール

function CustomLightbox({ photos }) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState("");

  const handleOpen = (image) => {
    setIsOpen(true);
    setCurrentImage(image);
  };

  const handleClose = () => {
    setIsOpen(false);
    setCurrentImage("");
  };

  return (
    <div>
      <div className={styles.grid}>
        {photos.map((photo, idx) => (
          <img key={idx} src={photo} alt="" onClick={() => handleOpen(photo)} />
        ))}
      </div>

      {isOpen && (
        <div className={styles.lightbox}>
          <div className={styles.lightboxContent}>
            <img src={currentImage} alt="" />
            <button className={styles.closeButton} onClick={handleClose}>
              ×
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CustomLightbox;
