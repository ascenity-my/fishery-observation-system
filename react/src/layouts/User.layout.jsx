import { Outlet } from "react-router-dom";

import styles from "styles/layout/User.module.scss";

import Navbar from "components/Navbar.component";
import Topbar from "components/Topbar.component";
import { useEffect, useState } from "react";

import { Link, useMatch, useResolvedPath } from "react-router-dom";
import type { LinkProps } from "react-router-dom";

import * as ReactIcons from "react-icons/fa";

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
	const [mqtt, setMqtt] = useState(null);

    const Icon = ({ name }) => {
		const TagName = ReactIcons[name];
		return !!TagName ? <TagName size={25} /> : <p>{name}</p>;
	};

	const paths = [
		/* {
            path: '/user/productivity',
            name: 'Productivity',
            icon: 'FaBox',
        }, */
		{
			path: "/user/visualization",
			name: "Visualization",
			icon: "FaChartBar",
		},
		{
			path: "/user/facilities",
			name: "Facilites",
			icon: "FaInbox",
		},
		/* {
            path: '/user/',
            name: 'Home',
            icon: 'FaClipboardList',
        }, */
	];

	useEffect(() => {
		if (!props.mqtt) return;

		setMqtt(props.mqtt);
	}, [props.mqtt]);

	return (
		<div>
			<div className={styles.topbar}>
				<Topbar />
			</div>
			<div className={styles.navbar}>
				<Navbar paths={paths} />
			</div>
            <div className={styles.botnavbar}>
                {paths.map((item, index) => (
                    <div key={index} className={styles.item}>
                        <CustomLink key={index} to={item.path} className={styles.link}>
                            <Icon name={item.icon}/>
                        </CustomLink>
                    </div>
                ))}
            </div>
			<div className={styles.content}>
				<Outlet context={[mqtt]} path={paths} />
			</div>
		</div>
	);
}
