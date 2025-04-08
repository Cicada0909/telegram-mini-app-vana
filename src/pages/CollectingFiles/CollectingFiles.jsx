import React, { useRef } from 'react'
import { useAudioStore } from '../../store/store.js'
import styles from './CollectingFiles.module.css'

const CollectingFiles = () => {
    const fileInputRef = useRef(null)
    const audioRefs = useRef([])
    const {
        files,
        playingIndex,
        addFiles,
        removeFile,
        setPlayingIndex,
        clearFiles,
    } = useAudioStore()

    const handleContainerClick = () => {
        if (files.length < 5) {
            fileInputRef.current.click()
        } else {
            alert('You cannot attach more than 5 files!')
        }
    }

    const handleFileChange = (e) => {
        const selectedFiles = Array.from(e.target.files)
        const audioFiles = selectedFiles.filter((file) =>
            file.type.startsWith('audio/')
        )

        if (audioFiles.length !== selectedFiles.length) {
            alert('You need to upload only audio files!')
            return
        }

        const totalFilesAfterAdd = files.length + audioFiles.length
        if (totalFilesAfterAdd > 5) {
            alert(
                `You can attach only ${5 - files.length} file(s) from the selected ones!`
            )
        }

        const validFilesPromises = audioFiles.map((file) => {
            return new Promise((resolve) => {
                const audio = new Audio(URL.createObjectURL(file))
                audio.onloadedmetadata = () => {
                    if (audio.duration <= 120) {
                        resolve({ file, url: URL.createObjectURL(file) })
                    } else {
                        resolve(null)
                    }
                }
                audio.onerror = () => resolve(null)
            })
        })

        Promise.all(validFilesPromises).then((results) => {
            const validFiles = results.filter((result) => result !== null)

            if (validFiles.length > 0) {
                const existingFileNames = files.map((file) => file.file.name)
                const uniqueFiles = validFiles.filter(
                    ({ file }) => !existingFileNames.includes(file.name)
                )

                if (uniqueFiles.length > 0) {
                    const filesToAdd = uniqueFiles.slice(0, 5 - files.length)
                    addFiles(filesToAdd)

                    if (uniqueFiles.length > filesToAdd.length) {
                        alert(
                            'Some files were not added because the limit of 5 files was exceeded.'
                        )
                    }

                    if (uniqueFiles.length < validFiles.length) {
                        alert(
                            'Some files were skipped because they had already been added earlier.'
                        )
                    }
                } else {
                    alert(
                        'All selected files have already been added previously'
                    )
                }
            } else if (audioFiles.length > 0) {
                alert(
                    'All selected files are longer than 2 minutes or have errors'
                )
            }
        })

        e.target.value = ''
    }

    const handleRemoveFile = (indexToRemove) => {
        if (
            playingIndex === indexToRemove &&
            audioRefs.current[indexToRemove]
        ) {
            audioRefs.current[indexToRemove].pause()
        }
        URL.revokeObjectURL(files[indexToRemove].url)
        removeFile(indexToRemove)
        audioRefs.current.splice(indexToRemove, 1)
    }

    const handlePlayToggle = (index) => {
        const currentAudio = audioRefs.current[index]
        if (!currentAudio) return

        if (playingIndex === index) {
            currentAudio.pause()
            setPlayingIndex(null)
        } else {
            if (playingIndex !== null && audioRefs.current[playingIndex]) {
                audioRefs.current[playingIndex].pause()
            }
            currentAudio.play()
            setPlayingIndex(index)
        }
    }

    const handleSendFiles = () => {
        alert('Файлы отправлены: ' + files.map((f) => f.file.name).join(', '))

        clearFiles()
        audioRefs.current = []
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.uploud} onClick={handleContainerClick}>
                <input
                    type="file"
                    ref={fileInputRef}
                    accept="audio/mpeg,audio/wav,audio/ogg"
                    multiple
                    hidden
                    onChange={handleFileChange}
                />
                {files.length < 5 && (
                    <span className={styles.title}>
                        Upload your audio files here
                    </span>
                )}
            </div>

            <div className={styles.collection}>
                <div className={styles.audioList}>
                    {files.length === 0 ? (
                        <div className={styles.rules}>
                            <div className={styles.wrapperRules}>
                                <ul>
                                    <li className={styles.text}>
                                        1. Audio only format
                                    </li>
                                    <li className={styles.text}>
                                        2. Sending limit - no more than 5 audio
                                    </li>
                                    <li className={styles.text}>
                                        3. Audio length should not exceed 2
                                        minutes
                                    </li>
                                </ul>
                            </div>
                        </div>
                    ) : (
                        files.map(({ file, url }, index) => (
                            <div key={index} className={styles.audioItem}>
                                <div className={styles.audioInfo}>
                                    <div className={styles.fileName}>
                                        {index + 1}. {file.name}
                                    </div>
                                    <div className={styles.buttons}>
                                        <button
                                            onClick={() =>
                                                handlePlayToggle(index)
                                            }
                                            className={styles.playButton}
                                        >
                                            {playingIndex === index
                                                ? 'Stop'
                                                : 'Play'}
                                        </button>
                                        <button
                                            onClick={() =>
                                                handleRemoveFile(index)
                                            }
                                            className={styles.removeButton}
                                        >
                                            ✕
                                        </button>
                                    </div>
                                </div>
                                <audio
                                    ref={(el) =>
                                        (audioRefs.current[index] = el)
                                    }
                                    src={url}
                                    onEnded={() => setPlayingIndex(null)}
                                    style={{ display: 'none' }}
                                />
                            </div>
                        ))
                    )}
                </div>
                {files.length > 0 && (
                    <button
                        className={styles.btnSend}
                        onClick={handleSendFiles}
                    >
                        Send Files
                    </button>
                )}
            </div>
        </div>
    )
}

export default CollectingFiles
