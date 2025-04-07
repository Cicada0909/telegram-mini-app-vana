import React, { useEffect, useState } from 'react'
import greenFolder from './image/green-folder.png'
import blueFolder from './image/blue-folder.png'
import redFolder from './image/red-folder.png'
import styles from './Loader.module.css'

const Loader = ({ style }) => {
    const images = [redFolder, greenFolder, blueFolder]

    const [currentImageIndex, setCurrentImageIndex] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length)
        }, 750)

        return () => clearInterval(interval)
    }, [])

    return (
        <div className={styles.wrapper} style={style}>
            <div className={styles.images}>
                {images.map((image, index) => (
                    <img
                        key={index}
                        src={image}
                        alt="Loading..."
                        className={
                            currentImageIndex === index
                                ? `${styles.image} ${styles.visible}`
                                : `${styles.image} ${styles.hidden}`
                        }
                    />
                ))}
            </div>
        </div>
    )
}

export default Loader
