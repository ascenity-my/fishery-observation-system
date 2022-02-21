/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import "dotenv/config";

import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import useToken from "hooks/useToken";

import mqtt from "mqtt";

import logo from "./logo.svg";
import "styles/App.module.scss";

import Login from "page/common/Login";

import UserLayout from "layouts/User.layout";
import AdminLayout from "layouts/Admin.layout";

import PondDevices from "page/common/facilities/PondDevices";
import Visualization from "page/common/visualization/Visualization";

function Home() {
	return (
		<header className="App-header">
			<img src={logo} className="App-logo" alt="logo" />
		</header>
	);
}

function App() {
	const location = useLocation();
	const navigate = useNavigate();

	const { token, setToken } = useToken();
	const [mqttData, setMqttData] = useState(null);

	const routes = [
		{
            path: '/user/home',
            name: 'Home',
            icon: 'FaHome'
        },
		{
            path: '/user/about',
            name: 'About',
            icon: 'FaInfo'
        },
		{
            path: '/user/gallery',
            name: 'Gallery',
            icon: 'FaImage'
        },
		{
			path: "/user/visualization",
			name: "Visualization",
			icon: 'FaChartLine'
		},
		{
			path: "/user/facilities",
			name: "Facilites",
			icon: 'FaTachometerAlt'
		},
	];

	const mqttConnect = () => {
		try {
			const client = mqtt.connect(`${process.env.REACT_APP_MQTT_PROTOCOL}://${process.env.REACT_APP_MQTT_HOSTNAME}:${process.env.REACT_APP_MQTT_PORT}`, {
				username: process.env.REACT_APP_MQTT_USERNAME,
				password: process.env.REACT_APP_MQTT_PASSWORD,
			});
			client.on("connect", () => {
				console.log("Connected to MQTT broker");
				client.subscribe("sasaqua/server/state");
				client.subscribe("sasaqua/test/state");
			});

			client.on("message", (topic, message) => {
				setMqttData({
					topic,
					message: message.toString(),
				});
			});

			client.on("error", (err) => {
				console.log("Error connecting to MQTT broker", err);
			});
		} catch (error) {
			console.log("Error connecting to MQTT broker", error);
		}
	};

	useEffect(() => {
		mqttConnect();
	}, []);

	/* if (!token) {
		return <Login setToken={setToken} />;
	} */

	useEffect(() => {
		const validPaths = routes.map(p => p.path);

		if (!validPaths.includes(location.pathname)) {
			navigate('/user/visualization', { replace: true });
		}
	}, [location.pathname]);

	return (
		<div className="App">
			<Routes>
				<Route path="/user" element={<UserLayout mqtt={mqttData} routes={routes}/>}>
					<Route index element={<Home />} />

					<Route path="home" element={<Home />} />
					<Route path="about" element={<Home />} />
					<Route path="gallery" element={<Home />} />
					<Route path="visualization" element={<Visualization />} />
					<Route path="facilities" element={<PondDevices />} />
				</Route>
				<Route path="/admin" element={<AdminLayout />}>
					<Route index element={<Home />} />
				</Route>
			</Routes>
		</div>
	);
}

export default App;
