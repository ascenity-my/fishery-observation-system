import { MdOutlineExitToApp as LogoutIcon } from "react-icons/md";

import { useAuth0 } from "@auth0/auth0-react";

import styles from "styles/component/Topbar.module.scss";
import { useEffect } from "react/cjs/react.production.min";

export default function Topbar() {
	const { loginWithRedirect, logout, user, isAuthenticated, isLoading } = useAuth0();

	return (
		<div className={styles.wrapper}>
			<div className={styles.bar}>
				{/* <div className={styles.head}>
                    <div className={styles.title}>
                        Super Intensive Prawn Farming Observation System (SIPFOS)
                    </div>
                </div> */}
				{isAuthenticated && !isLoading && (
					<div className={styles.user}>
						<div className={styles.photo}>
							<img src={user.picture} alt={user.name} />
						</div>
						<div className={styles.detail}>
							<div className={styles.name}>{user.name}</div>
							<div className={styles.title}>User</div>
						</div>
					</div>
				)}
				<div className={styles["user-action"]}>
					{!isAuthenticated && !isLoading && (
						<div
							className={styles.logout}
							onClick={() => {
								loginWithRedirect();
							}}
						>
							<LogoutIcon size={20} />
							Login
						</div>
					)}
					{isAuthenticated && !isLoading && (
						<div
							className={styles.logout}
							onClick={() => {
								logout();
							}}
						>
							<LogoutIcon size={20} />
							Logout
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
