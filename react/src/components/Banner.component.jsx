import styles from "styles/component/Banner.module.scss";

export default function Banner(props) {
	return (
		<div className={styles.wrapper}>
			<div className={styles.banner}>
				<div className={styles.bg}></div>
				<div className={styles.title}>{props.title}</div>
				<div>
					<svg
						className={styles.waves}
						xmlns="http://www.w3.org/2000/svg"
						xmlnsXlink="http://www.w3.org/1999/xlink"
						viewBox="0 24 150 28"
						preserveAspectRatio="none"
						shapeRendering="auto"
					>
						<defs>
							<path
								id="gentle-wave"
								d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
							/>
						</defs>
						<g className={styles.parallax}>
							<use
								xlinkHref="#gentle-wave"
								x="48"
								y="0"
								style={{fill: "rgba(234, 243, 255,0.7"}}
							/>
							<use
								xlinkHref="#gentle-wave"
								x="48"
								y="3"
								style={{fill: "rgba(234, 243, 255,0.5)"}}
							/>
							<use
								xlinkHref="#gentle-wave"
								x="48"
								y="5"
								style={{fill: "rgba(234, 243, 255,0.3)"}}
							/>
							<use
								xlinkHref="#gentle-wave"
								x="48"
								y="7"
								style={{fill: "rgb(234, 243, 255)"}}
							/>
						</g>
					</svg>
				</div>
			</div>
		</div>
	);
}
