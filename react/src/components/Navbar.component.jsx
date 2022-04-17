import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import type { LinkProps } from "react-router-dom";

import Icon from "components/Icon.component";

import styles from "styles/component/Navbar.module.scss";

function CustomLink({ children, to, ...props }: LinkProps) {
	const location = useLocation();

	const [match, setMatch] = useState(false);

	useEffect(() => {
		if (location.pathname === to) {
			setMatch(true);
		} else {
			setMatch(false);
		}
	}, [location.pathname, to]);

	return (
		<div className={`${(match && styles.active) || ''}`}>
			<Link
				
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
			<div className={styles.overlayz}></div>
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
