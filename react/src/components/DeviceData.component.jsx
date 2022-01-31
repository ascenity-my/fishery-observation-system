import { useEffect, useState, useRef } from "react";

import styles from "styles/component/DeviceData.module.scss";

import SimpleLineChart from "components/SimpleLineChart";

function DeviceData(props) {

	const [name, setName] = useState('');
	const [uid, setUID] = useState('');

	const [tds, setTds] = useState([]);
	const [oxy, setOxy] = useState([]);
	const [ph, setPh] = useState([]);
	const [temp, setTemp] = useState([]);
	const [lastUpdate, setLastUpdate] = useState('');
	
	const requestData = async (id) => {
		const response = await fetch(`${process.env.REACT_APP_SERVER_HOSTNAME}:${process.env.REACT_APP_SERVER_PORT}/api/device/data?id=${id}&limit=10`);
		const data = await response.json();

		if (data && data.length) {
			const tdsData = data.map((d) => ({
				date: new Date(d.timestamp).getTime(),
				value: d.values.tds,
			}));
			const oxyData = data.map((d) => ({
				date: new Date(d.timestamp).getTime(),
				value: d.values.oxy,
			}));
			const phData = data.map((d) => ({
				date: new Date(d.timestamp).getTime(),
				value: d.values.ph,
			}));
			const tempData = data.map((d) => ({
				date: new Date(d.timestamp).getTime(),
				value: d.values.temp,
			}));
			
			// setLastUpdate to dd/mm/yyyy hh:mm:ss
			const l = new Date(data[0].timestamp).toLocaleString();

			setTds(tdsData);
			setOxy(oxyData);
			setPh(phData);
			setTemp(tempData);
			setLastUpdate(l);
		}

	};

	useEffect(() => {
		if (!props.mqtt) return;

		if (props.mqtt.topic === 'server/state') {
			const d = props.mqtt.message.split(':');

			if (d.length > 0) {
				if (d[0] === 'UPDATE' && d[1] === name) {
					requestData(uid);
				}

			}

		}

	}, [props.mqtt]);

	
	useEffect(() => {
		if (!props.name) return;
		if (!props.uid) return;

		setName(props.name);
		setUID(props.uid);

		requestData(props.uid);
	}, [props.name, props.uid]);


	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<div className={styles.label}>
					<div className={styles.name}>{props.name}</div>
					<div className={styles.status}></div>
				</div>
			</div>
			<div className={styles.body}>
				<div className={styles.charts}>
					<div className={styles.chart}>
						<div className={styles.label}>
							<div className={styles.name}>pH</div>
							<div className={styles.value}>{(ph.length) && ph[0].value}</div>
						</div>
						<SimpleLineChart
							data={ph}
							/* unique label string generate */
							label={`${Date.now()}${Math.random()}`}
							height={props.chartHeight}
						/>
					</div>
					<div className={styles.chart}>
						<div className={styles.label}>
							<div className={styles.name}>DO</div>
							<div className={styles.value}>{(oxy.length) && oxy[0].value}</div>
						</div>
						<SimpleLineChart
							data={oxy}
							/* unique label string generate */
							label={`${Date.now()}${Math.random()}`}
							height={props.chartHeight}
						/>
					</div>
					<div className={styles.chart}>
						<div className={styles.label}>
							<div className={styles.name}>Temperature</div>
							<div className={styles.value}>{(temp.length) && temp[0].value}</div>
						</div>
						<SimpleLineChart
							data={temp}
							/* unique label string generate */
							label={`${Date.now()}${Math.random()}`}
							height={props.chartHeight}
						/>
					</div>
					<div className={styles.chart}>
						<div className={styles.label}>
							<div className={styles.name}>Turbidity</div>
							<div className={styles.value}>{(tds.length) && tds[0].value}</div>
						</div>
						<SimpleLineChart
							data={tds}
							/* unique label string generate */
							label={`${Date.now()}${Math.random()}`}
							height={props.chartHeight}
						/>
					</div>

				</div>
				<div className={styles.lastUpdate}>
					<div className={styles.label}>
						Last updated at
					</div>
					<div className={styles.value}>
						{lastUpdate}
					</div>	
				</div>
			</div>
		</div>
	);
}

export default DeviceData;
