import styles from './profile.module.css'
import Header from '../../modules/Profile/components/Header/Header'

const Profile = () => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.items}>
                <Header />
                <div className={styles.description}></div>
            </div>
        </div>
    )
}

export default Profile
