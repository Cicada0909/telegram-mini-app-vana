import { useEffect, useState } from 'react'
import PageLayout from './layouts/PageLayout/PageLayout'
import { RouterProvider } from 'react-router-dom'
import router from './constants/routes'

function App() {
    const telegram = window.Telegram.WebApp
    const user = telegram?.initDataUnsafe?.user

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
