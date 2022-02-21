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
			<div className={styles.logo}></div>
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
