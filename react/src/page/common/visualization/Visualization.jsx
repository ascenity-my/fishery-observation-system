import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";

// components
import Table from "components/Table.component";
import TopList from "components/TopList.component";
import DateAxisLineChart from "components/DateAxisLineChart.component";
import MultiAverageChart from "components/MultiAverageChart.component";
import StatWrapper from "components/StatWrapper.component";
import StatNumber from "components/StatNumber.component";

import styles from "styles/common/facilities/PondDevices.module.scss";
import exStyles from "styles/common/visualization/Visualization.module.scss";

function DisplayReport(props) {
	const [averages, setAverages] = useState([]);
	const [highest, setHighest] = useState({
		oxy: {
			value: 0,
			device_name: ''
		},
		ph: {
			value: 0,
			device_name: ''
		},
		temp: {
			value: 0,
			device_name: ''

		},
		tds: {
			value: 0,
			device_name: ''
		}
	});

	const generateDummyData = () => {
		const data = [];

		for (let i = 0; i < 10; i++) {
			data.push({
				date: new Date(2020, 0, i + 1).getTime(),
				value: Math.random() * 100,
				value2: Math.random() * 100,
				value3: Math.random() * 100,
			});
		}

		console.log(data);

		return data;
	};

	useEffect(() => {
		(async () => {
			let request = await fetch(`${process.env.REACT_APP_SERVER_HOSTNAME}:${process.env.REACT_APP_SERVER_PORT}/api/device/data/average/all`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
				},
			});

			if (request.status === 200) {
				const response = await request.json();

				setAverages(response);
			}

			request = await fetch(`${process.env.REACT_APP_SERVER_HOSTNAME}:${process.env.REACT_APP_SERVER_PORT}/api/device/data/highest/all`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
				},
			});

			if (request.status === 200) {
				const response = await request.json();

				setHighest(response);
			}
		})();
	}, []);

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<div className={styles.text}>
					<div className={styles.title}>Averages</div>
					<div className={styles.subtitle}>
						Average value for each data recorded from the ponds
					</div>
				</div>
			</div>
			<div className={exStyles.body}>

				<StatWrapper>
					<StatNumber
						title="Highest pH"
						value={highest.ph.value || 0}
						unit={highest.ph.device_name || 0}
						icon="FaLevelUpAlt"
					/>

					<StatNumber
						title="Highest DO"
						value={highest.oxy.value || 0}
						unit={highest.oxy.device_name || 0}
						icon="FaLevelUpAlt"
					/>

					<StatNumber
						title="Highest Temp"
						value={highest.temp.value || 0}
						unit={highest.temp.device_name || 0}
						icon="FaLevelUpAlt"
					/>

					<StatNumber
						title="Highest Turbidity"
						value={highest.tds.value || 0}
						unit={highest.tds.device_name || 0}
						icon="FaLevelUpAlt"
					/>
				</StatWrapper>
				<div className={exStyles.avrTable}>
					<div className={exStyles.header}>
						<div className={exStyles.title}>Device name</div>
						<div className={exStyles.title}>pH</div>
						<div className={exStyles.title}>DO</div>
						<div className={exStyles.title}>Temp</div>
						<div className={exStyles.title}>Turbidity</div>
						<div className={exStyles.title}>Data count</div>
					</div>
					<div className={exStyles.data}>
						{averages
							.map((_, i) => (
								<div key={i} className={exStyles.dataRow}>
									<div className={exStyles.dataCell}>
										{_.device_name}
									</div>
									<div className={exStyles.dataCell}>{_.data.ph.value.toFixed(2)}</div>
									<div className={exStyles.dataCell}>{_.data.oxy.value.toFixed(2)}</div>
									<div className={exStyles.dataCell}>{_.data.temp.value.toFixed(2)}</div>
									<div className={exStyles.dataCell}>{_.data.tds.value.toFixed(2)}</div>
									<div className={exStyles.dataCell}>{_.data.count}</div>
								</div>
							))}
					</div>
				</div>
				<div className={exStyles.averages}>
					<div className={exStyles.item}>
						<div className={exStyles.title}>Average pH</div>
						<div className={exStyles.chart}>
							<MultiAverageChart
								series={[
									{
										name: "Pond #1",
										field: "value",
									},
									{
										name: "Pond #2",
										field: "value2",
									},
									{
										name: "Pond #3",
										field: "value3",
									},
								]}
								label="averagePH"
								height="300px"
								field="ph"
							/>
						</div>
					</div>
					<div className={exStyles.item}>
						<div className={exStyles.title}>Average DO</div>
						<div className={exStyles.chart}>
							<MultiAverageChart
								series={[
									{
										name: "Pond #1",
										field: "value",
									},
									{
										name: "Pond #2",
										field: "value2",
									},
									{
										name: "Pond #3",
										field: "value3",
									},
								]}
								label="averageDO"
								height="300px"
								field="oxy"
							/>
						</div>
					</div>
					<div className={exStyles.item}>
						<div className={exStyles.title}>
							Average Temperature
						</div>
						<div className={exStyles.chart}>
							<MultiAverageChart
								series={[
									{
										name: "Pond #1",
										field: "value",
									},
									{
										name: "Pond #2",
										field: "value2",
									},
									{
										name: "Pond #3",
										field: "value3",
									},
								]}
								label="averageTemp"
								height="300px"
								field="temp"
							/>
						</div>
					</div>
					<div className={exStyles.item}>
						<div className={exStyles.title}>Average Turbidity</div>
						<div className={exStyles.chart}>
							<MultiAverageChart
								series={[
									{
										name: "Pond #1",
										field: "value",
									},
									{
										name: "Pond #2",
										field: "value2",
									},
									{
										name: "Pond #3",
										field: "value3",
									},
								]}
								label="averageTDS"
								height="300px"
								field="tds"
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default DisplayReport;
