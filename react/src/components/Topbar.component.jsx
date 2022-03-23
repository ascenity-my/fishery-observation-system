import { MdOutlineExitToApp as LogoutIcon } from "react-icons/md";

import { useAuth0 } from "@auth0/auth0-react";

import styles from "styles/component/Topbar.module.scss";
import { useEffect } from "react/cjs/react.production.min";

export default function Topbar() {
	const { loginWithRedirect, logout, user, isAuthenticated } = useAuth0();

	return (
		<div className={styles.wrapper}>
			<div className={styles.bar}>
				{/* <div className={styles.head}>
                    <div className={styles.title}>
                        Super Intensive Prawn Farming Observation System (SIPFOS)
                    </div>
                </div> */}
				{isAuthenticated && (
					<div className={styles.user}>
						<div className={styles.photo}></div>
						<div className={styles.detail}>
							<div className={styles.name}>
								{user.name}
							</div>
							<div className={styles.title}>Pengarah</div>
						</div>
					</div>
				)}
				test : {isAuthenticated ? "Logout" : "Login"}
				<div className={styles["user-action"]}>
					{!isAuthenticated && (
						<div className={styles.logout} onClick={() => {
							loginWithRedirect();
						}}>
							<LogoutIcon size={20} />
							Login
						</div>
					)}
					<div className={styles.logout} onClick={() => {
						logout();
					}}>
						<LogoutIcon size={20} />
						Logout
					</div>
				</div>
			</div>
			
		</div>
	);
}
