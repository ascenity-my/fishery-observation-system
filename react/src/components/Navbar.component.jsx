import { useEffect, useState } from "react";
import { Link, useMatch, useResolvedPath } from "react-router-dom";
import type { LinkProps } from "react-router-dom";

import Icon from "components/Icon.component";

import styles from "styles/component/Navbar.module.scss";

function CustomLink({ children, to, ...props }: LinkProps) {
	let resolved = useResolvedPath(to);
	let match = useMatch({ path: resolved.pathname, end: true });

	return (
		<div>
			<Link
				style={{ color: match ? "#444444" : "#000" }}
				to={to}
				{...props}
			>
				{children}
			</Link>
		</div>
	);
}

export default function Navbar(props) {

	const [routes, setRoutes] = useState([]);

	useEffect(() => {
		if (!props.routes) return;

		setRoutes(props.routes);
	}, [props.routes]); 

	return (
		<nav className={styles.nav}>
			<div className={styles['title-card']}>
				<div className={styles.logo}>
					{/* <Image src="/logo.png" width={100} height={100} alt=''/> */}
				</div>
				<div className={styles.text}>
					<div className={`${styles.title} card-text`}>
						User
					</div>
					<div className={`${styles.label} card-text`}>
						Researcher
					</div>
				</div>
			</div>
			<div className={styles.links}>
				{routes.map((item, index) => (
					<CustomLink key={index} to={item.path} className={styles.link}>
						<Icon name={item.icon} />
						{item.name}
					</CustomLink>
				))}
			</div>
		</nav>
	);
}
