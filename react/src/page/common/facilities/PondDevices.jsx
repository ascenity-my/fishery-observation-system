import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";

// components
import Table from "components/Table.component";
import TopList from "components/TopList.component";
import DateAxisLineChart from "components/DateAxisLineChart.component";
import DeviceData from "components/DeviceData.component";

import styles from "styles/common/facilities/PondDevices.module.scss";

function DisplayReport(props) {
	const [mqtt] = useOutletContext();

	const [labels, setLabels] = useState([]);

	const requestLabels = async () => {
		const response = await fetch(`${process.env.REACT_APP_SERVER_HOSTNAME}:${process.env.REACT_APP_SERVER_PORT}/api/device/list`);

		const data = await response.json();

		const allLabel = data.map((device) => ({
			label: device.name,
			id: device._id
		}));

		setLabels(allLabel);
	};

	useEffect(() => {
		requestLabels();
	}, []);

	useEffect(() => {
		if (!mqtt) return;

		if (mqtt.topic === 'server/state') {
			if (mqtt.message === 'NEWDEVICE') {
				requestLabels();
			}
		}
	}, [mqtt]);

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<div className={styles.text}>
					<div className={styles.title}>Pond devices</div>
					<div className={styles.subtitle}>Monitor each pond devices in real-time</div>
				</div>
			</div>
			<div className={styles.body}>
				<div className={styles.charts}>
					{labels.map((item, x) => (
						<DeviceData
							key={x}
							name={item.label}
							uid={item.id}
							chartHeight={"120px"}
							mqtt={mqtt}
						/>
					))}
				</div>

			</div>
		</div>
	);
}

export default DisplayReport;
