import { useState } from 'react'

function App() {
    const [element, setElement] = useState(false)
    const [audioFile, setAudioFile] = useState(null)

    const telegram = window.Telegram.WebApp
    const user = telegram?.initDataUnsafe?.user

    const handleClick = () => {
        const telegram = window.Telegram
        if (telegram?.WebApp?.HapticFeedback) {
            telegram.WebApp.HapticFeedback.impactOccurred('medium')
        }

        console.log(123)
        setElement(true)
    }

    const AudioUploader = () => {
        const handleFileChange = (event) => {
            const file = event.target.files[0]
            if (file) {
                setAudioFile(file)
            }
        }

        return (
            <div>
                <input
                    type="file"
                    accept="audio/*"
                    onChange={handleFileChange}
                />
                {audioFile && (
                    <div>
                        <p>файл: {audioFile.name}</p>
                        <audio controls>
                            <source
                                src={URL.createObjectURL(audioFile)}
                                type={audioFile.type}
                            />
                            null
                        </audio>
                    </div>
                )}
            </div>
        )
    }

    return (
        <div className="scrollable-element">
            {user?.id}
            <button onClick={handleClick}>Click me</button>
            <button className="btn" onClick={() => setElement(false)}>
                hide
            </button>
            {element && <div>hide</div>}
            <AudioUploader />
        </div>
    )
}

export default App
