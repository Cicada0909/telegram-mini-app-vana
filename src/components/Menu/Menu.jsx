import React from 'react'
import styles from './Menu.module.css'
import { Link } from 'react-router-dom'
import { pageRoutes } from '../../constants/pageRoutes'

const Menu = () => {
    return (
        <div className={styles.menu}>
            <Link to={pageRoutes.filesRoutes.files}>
                <button className={styles.menu__btn}>My files</button>
            </Link>
            <Link to={pageRoutes.profileRoutes.profile}>
                <button className={styles.menu__btn}>My profile</button>
            </Link>
        </div>
    )
}

export default Menu
