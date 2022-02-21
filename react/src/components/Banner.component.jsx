import styles from "styles/component/Banner.module.scss";

export default function Banner(props) {
	return (
		<div className={styles.wrapper}>
			<div className={styles.banner}>
				<div className={styles.bg}></div>
				<div className={styles.title}>{props.title}</div>
			</div>
		</div>
	);
}
