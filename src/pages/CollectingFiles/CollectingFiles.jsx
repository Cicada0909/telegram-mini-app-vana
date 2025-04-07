import React, { useRef, useState } from 'react'
import styles from './CollectingFiles.module.css'
import axios from 'axios'
import Loader from '../../components/Loader/Loader'

const CollectingFiles = () => {
    const fileInputRef = useRef(null)
    const [files, setFiles] = useState([])
    const [loader, setLoader] = useState(false)

    const handleContainerClick = () => {
        if (files.length < 5) {
            fileInputRef.current.click()
        } else {
            alert('Нельзя прикрепить больше 5 файлов!')
        }
    }

    const handleFileChange = (e) => {
        const newFiles = Array.from(e.target.files)
        const totalFilesAfterAdd = files.length + newFiles.length

        if (totalFilesAfterAdd > 5) {
            alert(
                `Вы можете прикрепить только ${5 - files.length} файл(ов) из выбранных!`
            )
            const allowedFiles = newFiles.slice(0, 5 - files.length)
            setFiles((prevFiles) => [...prevFiles, ...allowedFiles])
        } else {
            setFiles((prevFiles) => [...prevFiles, ...newFiles])
        }

        e.target.value = ''
    }

    const handleRemoveFile = (indexToRemove) => {
        setFiles((prevFiles) =>
            prevFiles.filter((_, index) => index !== indexToRemove)
        )
    }

    const [file, setFile] = useState(null)

    const handleFileChangee = (event) => {
        setFile(event.target.files[0])
    }

    // const handleSubmit = async (event) => {
    //     event.preventDefault()

    //     const formData = new FormData()
    //     formData.append('file', file)

    //     try {
    //         const response = await axios.post(
    //             'http://123/upload-file',
    //             formData,
    //             {
    //                 headers: {
    //                     'Content-Type': 'multipart/form-data',
    //                 },
    //             }
    //         )

    //         console.log('File uploaded successfully:', response.data)
    //     } catch (error) {
    //         console.error('Error uploading file:', error)
    //     }
    // }

    return (
        <div className={styles.wrapper}>
            <div className={styles.uploud} onClick={handleContainerClick}>
                <input
                    type="file"
                    ref={fileInputRef}
                    accept="audio/mpeg, audio/ogg, audio/aac, audio/wav"
                    multiple
                    hidden
                    onChange={handleFileChange}
                />
                <div className={styles.fileList}>
                    {files.length === 0 ? (
                        <span
                            className={styles.title}
                            onClick={() => setLoader(false)}
                        >
                            Upload your audio files here
                        </span>
                    ) : (
                        files.map((file, index) => (
                            <div key={index} className={styles.fileItem}>
                                <span>
                                    {index + 1}. {file.name} (
                                    {(file.size / 1024).toFixed(1)} KB)
                                </span>
                                <button
                                    className={styles.removeButton}
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        handleRemoveFile(index)
                                    }}
                                >
                                    ✕
                                </button>
                            </div>
                        ))
                    )}
                </div>
            </div>
            <div
                className={styles.collection}
                onClick={() => {
                    setLoader(true)
                }}
            >
                {loader && <Loader />}
                {/* <div>
                    <h1>Upload Audio File</h1>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="file"
                            onChange={handleFileChangee}
                            accept="audio/*"
                        />
                        <button type="submit">Upload</button>
                    </form>
                </div> */}
            </div>
        </div>
    )
}

export default CollectingFiles
