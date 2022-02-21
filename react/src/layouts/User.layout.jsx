import { Outlet } from "react-router-dom";

import styles from "styles/layout/User.module.scss";

import Navbar from "components/Navbar.component";
import Topbar from "components/Topbar.component";
import Banner from "components/Banner.component"
import Icon from "components/Icon.component";

import { useEffect, useState } from "react";

import { Link, useMatch, useResolvedPath, useLocation } from "react-router-dom";
import type { LinkProps } from "react-router-dom";

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

export default function UserLayout(props) {
	const location = useLocation();

	const [mqtt, setMqtt] = useState(null);
	const [routes, setRoutes] = useState([]);
	const [activeLink, setActiveLink] = useState(null);

	useEffect(() => {
		if (!props.mqtt) return;
		setMqtt(props.mqtt);
	}, [props.mqtt, props.routes]);
	
	useEffect(() => {
		if (!props.routes) return;
		
		setRoutes(props.routes);
	}, [props.routes]);

	useEffect(() => {
		setActiveLink(location.pathname);
	}, [location]);

	return (
		<div>
			<div className={styles.topbar}>
				<Topbar />
			</div>
			<div className={styles.navbar}>
				<Navbar routes={routes} />
			</div>
            <div className={styles.botnavbar}>
                {routes.map((item, index) => (
                    <div key={index} className={`${styles.item} ${(activeLink === item.path) && styles.active}`}>
                        <CustomLink key={index} to={item.path} className={`${styles.link}`}>
                            <Icon name={item.icon.name} from={item.icon.from}/>
                        </CustomLink>
                    </div>
                ))}
            </div>
			<Banner title="Super Intensive Prawn Farming Observation System (SIPFOS)"/>
			<div className={styles.content}>
				<div className={styles.bg}></div>
				<Outlet context={[mqtt]}/>
			</div>
		</div>
	);
}
