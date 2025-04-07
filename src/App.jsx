import { useEffect, useState } from 'react'
import { RouterProvider } from 'react-router-dom'
import router from './constants/routes'
import Loader from './components/Loader/Loader'

function App() {
    const telegram = window.Telegram.WebApp
    const user = telegram?.initDataUnsafe?.user

    const [location, setLocation] = useState(null)
    const [error, setError] = useState(null)

    useEffect(() => {
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setLocation({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                    })
                },
                (err) => {
                    setError(err.message)
                }
            )
        } else {
            setError('Геолокация не поддерживается в этом браузере.')
        }
    }, [])

    useEffect(() => {
        if (window.Telegram?.WebApp) {
            window.Telegram.WebApp.disableVerticalSwipes()

            if (window.Telegram.WebApp.version >= '7.7') {
            } else {
            }
        }
    }, [])

    return <RouterProvider router={router} />
}

export default App
