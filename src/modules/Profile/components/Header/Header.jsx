import React, { useEffect, useState } from 'react'
import styles from './Header.module.css'
import classNames from 'classnames'

const Header = () => {
    const [user, setUser] = useState(null)
    const [isImageLoaded, setIsImageLoaded] = useState(false)

    useEffect(() => {
        const tgUser = window.Telegram?.WebApp?.initDataUnsafe?.user
        if (tgUser) {
            setUser(tgUser)
        }
    }, [])
    //test
    //test

    return (
        <div className={styles.header}>
            {user?.photo_url ? (
                <>
                    {!isImageLoaded && (
                        <div
                            className={classNames(
                                styles.avatarSkeleton,
                                styles.pulse
                            )}
                        ></div>
                    )}
                    <img
                        className={styles.avatar}
                        src={user.photo_url}
                        alt="User Avatar"
                        onLoad={() => setIsImageLoaded(true)}
                        style={{ display: isImageLoaded ? 'block' : 'none' }}
                    />
                </>
            ) : (
                <div className={styles.avatarSkeleton}></div>
            )}
            <h4 className={styles.name}>
                {user?.first_name && user?.last_name
                    ? `${user?.first_name} ${user?.last_name}`
                    : user?.first_name || user?.username || 'Guest'}
            </h4>
        </div>
    )
}

export default Header
