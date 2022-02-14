/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */

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
			device_name: "",
		},
		ph: {
			value: 0,
			device_name: "",
		},
		temp: {
			value: 0,
			device_name: "",
		},
		tds: {
			value: 0,
			device_name: "",
		},
		sal: {
			value: 0,
			device_name: "",
		},
	});

	useEffect(() => {
		(async () => {
			let request = await fetch(
				`${process.env.REACT_APP_SERVER_HOSTNAME}/api/device/data/average/all`,
				{
					method: "GET",
					headers: {
						"Content-Type": "application/json",
					},
				}
			);

			if (request.status === 200) {
				const response = await request.json();

				// replace null values with -, round to 2 decimal places
				const a = response.map((d) => {
					const { tds, oxy, ph, temp, sal, count } = d.data;

					return {
						...d,
						data: {
							count,
							tds: tds.value ? tds.value.toFixed(2) : "-",
							oxy: oxy.value ? oxy.value.toFixed(2) : "-",
							ph: ph.value ? ph.value.toFixed(2) : "-",
							temp: temp.value ? temp.value.toFixed(2) : "-",
							sal: sal.value ? sal.value.toFixed(2) : "-",
						},
					};
				});

				setAverages(a);
			}

			request = await fetch(
				`${process.env.REACT_APP_SERVER_HOSTNAME}/api/device/data/highest/all`,
				{
					method: "GET",
					headers: {
						"Content-Type": "application/json",
					},
				}
			);

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
					<StatNumber
						title="Highest Salinity"
						value={highest.sal.value || 0}
						unit={highest.sal.device_name || 0}
						icon="FaLevelUpAlt"
					/>
				</StatWrapper>
				<div className={exStyles.avrTable}>
					<div className={exStyles.header}>
						<div className={exStyles.title}>Name</div>
						<div className={exStyles.title}>pH</div>
						<div className={exStyles.title}>DO</div>
						<div className={exStyles.title}>Temp</div>
						<div className={exStyles.title}>Turbidity</div>
						<div className={exStyles.title}>Salinity</div>
						<div className={exStyles.title}>Data count</div>
					</div>
					<div className={exStyles.data}>
						{averages.map((_, i) => (
							<div key={i} className={exStyles.dataRow}>
								<div className={exStyles.dataCell}>
									{_.device_name}
								</div>
								<div className={exStyles.dataCell}>
									{_.data.ph}
								</div>
								<div className={exStyles.dataCell}>
									{_.data.oxy}
								</div>
								<div className={exStyles.dataCell}>
									{_.data.temp}
								</div>
								<div className={exStyles.dataCell}>
									{_.data.tds}
								</div>
								<div className={exStyles.dataCell}>
									{_.data.sal}
								</div>
								<div className={exStyles.dataCell}>
									{_.data.count}
								</div>
							</div>
						))}
					</div>
				</div>
				<div className={exStyles.averages}>
					<div className={exStyles.item}>
						<div className={exStyles.title}>Average pH</div>
						<div className={exStyles.chart}>
							<MultiAverageChart
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
								label="averageTDS"
								height="300px"
								field="tds"
							/>
						</div>
					</div>
					<div className={exStyles.item}>
						<div className={exStyles.title}>Average Salinity</div>
						<div className={exStyles.chart}>
							<MultiAverageChart
								label="averageSal"
								height="300px"
								field="sal"
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default DisplayReport;
