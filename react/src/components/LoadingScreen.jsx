import { useEffect, useState, useRef } from "react";
import { useAuth0 } from "@auth0/auth0-react";

import styles from "styles/component/LoadingScreen.module.scss";

export default function LoadingScreen(props) {
    const { isAuthenticated } = useAuth0();

	const [progress, setProgress] = useState(0);
	const [text, setText] = useState("Loading...");

	const bar = useRef();

	useEffect(() => {
		setProgress(props.progress);
		setText(props.text);
	}, [props.progress, props.text]);

	return (
		<>
			<div className={styles.wrapper} style={{display: `${!isAuthenticated ? 'flex' : 'none'}`}}>
				<div className={styles.loading}>
					<div className={styles.anim}>
						<div className={styles.loadAnim}>
							<div></div>
							<div></div>
						</div>
					</div>
					<div className={styles.text}>{text}</div>
					<div className={styles.bar}>
						<div className={styles.progress} ref={bar}></div>
					</div>
				</div>
			</div>
		</>
	);
}
