import { MdOutlineExitToApp as LogoutIcon } from 'react-icons/md';

import styles from 'styles/component/Topbar.module.scss';

export default function Topbar() {

    return (
        <div className={`${styles.container}`} >
            <div className={styles.bar}>
                <div className={styles.head}>
                    <div className={styles.title}>
                        Performance observation system
                    </div>
                </div>
                <div className={styles['user-action']}>
                    <div className={styles.logout}>
                        <LogoutIcon size={20}/>
                        Logout
                    </div>
                    {/* <div className={styles.avatar}>

                    </div> */}
                </div>
            </div>
        </div>
    )
}