/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */

import { useEffect, useState, Suspense, lazy } from "react";
import { useOutletContext } from "react-router-dom";

// components
/* import Table from "components/Table.component";
import TopList from "components/TopList.component";
import DateAxisLineChart from "components/DateAxisLineChart.component";
import MultiAverageChart from "components/MultiAverageChart.component";
import StatWrapper from "components/StatWrapper.component";
import StatNumber from "components/StatNumber.component";
import ValueBound from "components/ValueBound.component"; */

import styles from "styles/common/facilities/PondDevices.module.scss";
import exStyles from "styles/common/visualization/Visualization.module.scss";

//const Table = lazy(() => import('components/Table.component'));
//const TopList = lazy(() => import('components/TopList.component'));
//const DateAxisLineChart = lazy(() => import('components/DateAxisLineChart.component'));
const MultiAverageChart = lazy(() => import('components/MultiAverageChart.component'));
const StatWrapper = lazy(() => import('components/StatWrapper.component'));
//const StatNumber = lazy(() => import('components/StatNumber.component'));
const ValueBound = lazy(() => import('components/ValueBound.component'));

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
		sal: {
			value: 0,
			device_name: "",
		},
	});
	const [bounds, setBounds] = useState({
		oxy: [0, 0],
		ph: [0, 0],
		temp: [0, 0],
		sal: [0, 0],
	});

	useEffect(() => {
		(async () => {
			let request = await fetch(
				`${process.env.REACT_APP_SERVER_HOSTNAME}/api/device/data/average/hourly/one`,
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

					const { oxy, ph, temp, sal, date } = d.data[0];

					const dateStr = new Date(date);

					/* // convert date to local time
					dateStr.setMinutes(dateStr.getMinutes() - dateStr.getTimezoneOffset()); */

					return {
						...d,
						data: {
							date: `${dateStr.getMonth() + 1}/${dateStr.getDate()}/${dateStr.getFullYear()}, ${dateStr.getHours()}:00 ${dateStr.getHours() >= 12 ? "PM" : "AM"}`,
							oxy: oxy ? oxy.toFixed(2) : "-",
							ph: ph ? ph.toFixed(2) : "-",
							temp: temp ? temp.toFixed(2) : "-",
							sal: sal ? sal.toFixed(2) : "-",
						},
					};
				});
				setAverages(a);
			}
		})();
		(async () => {
			let request = await fetch(
				`${process.env.REACT_APP_SERVER_HOSTNAME}/api/device/data/bounds/all/hourly`,
				{
					method: "GET",
					headers: {
						"Content-Type": "application/json",
					},
				}
			);

			if (request.status === 200) {
				const response = await request.json();

				let b = bounds;

				try {
					Object.keys(b).forEach((key) => {
						b[key] = [
							response[key][0].value,
							response[key][1].value,
						];
					});

				} catch (e) {
					console.log(e);
				}
				setBounds(b);
			}
		})();
	}, []);

	return (
		<div className={styles.container}>
			<div className={exStyles.body}>
				<div className={styles.header}>
					<div className={styles.text}>
						<div className={styles.title}>Min & Max</div>
						<div className={styles.subtitle}>
							This values represent the highest and lowest value
							obtained per hour
						</div>
					</div>
				</div>
				<Suspense >
					<StatWrapper>
						<ValueBound
							bounds={bounds}
							update={bounds.ph[1]}
						/>
					</StatWrapper>
				</Suspense>
				<div className={styles.header}>
					<div className={styles.text}>
						<div className={styles.title}>Parameter averages</div>
						<div className={styles.subtitle}>
							This table shows the average value of each parameter
							per hour
						</div>
					</div>
				</div>
				<div className={exStyles.avrTable}>
					<div className={exStyles.header}>
						<div className={exStyles.title}>Name</div>
						<div className={exStyles.title}>pH</div>
						<div className={exStyles.title}>DO</div>
						<div className={exStyles.title}>Temp</div>
						<div className={exStyles.title}>Salinity</div>
					</div>
					<div className={exStyles.data}>
						{averages.map((_, i) => (
							<div key={i} className={exStyles.dataRow}>
								<div className={exStyles.dataCell}>
									<div className={exStyles.label}>
										<div className={exStyles.name}>
											{_.device_name}
										</div>
										<div className={exStyles.date}>
											last updated at {_.data.date}
										</div>
									</div>
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
									{_.data.sal}
								</div>
							</div>
						))}
					</div>
				</div>

				<div className={exStyles.averages}>
					<div className={styles.header}>
						<div className={styles.text}>
							<div className={styles.title}>Average pH</div>
							<div className={styles.subtitle}>
								This chart shows the average pH value per hour
							</div>
						</div>
					</div>
					<div className={exStyles.item}>
						<div className={exStyles.chart}>
							<Suspense>
								<MultiAverageChart
									label="averagePH"
									height="300px"
									field="ph"
								/>
							</Suspense>
						</div>
					</div>
					<div className={styles.header}>
						<div className={styles.text}>
							<div className={styles.title}>
								Average DO (mg/l)
							</div>
							<div className={styles.subtitle}>
								This chart shows the average dissolved oxygen
								(DO) value per hour
							</div>
						</div>
					</div>
					<div className={exStyles.item}>
						<div className={exStyles.chart}>
							<Suspense>
								<MultiAverageChart
									label="averageDO"
									height="300px"
									field="oxy"
								/>
							</Suspense>
						</div>
					</div>
					<div className={styles.header}>
						<div className={styles.text}>
							<div className={styles.title}>
								Average Temperature (°C)
							</div>
							<div className={styles.subtitle}>
								This chart shows the average temperature (temp)
								value per hour
							</div>
						</div>
					</div>
					<div className={exStyles.item}>
						<div className={exStyles.chart}>
							<Suspense>
								<MultiAverageChart
									label="averageTemp"
									height="300px"
									field="temp"
								/>

							</Suspense>
						</div>
					</div>
					<div className={styles.header}>
						<div className={styles.text}>
							<div className={styles.title}>
								Average Salinity (ppt)
							</div>
							<div className={styles.subtitle}>
								This chart shows the average salinity (sal)
								value per hour
							</div>
						</div>
					</div>
					<div className={exStyles.item}>
						<div className={exStyles.chart}>
							<Suspense>

								<MultiAverageChart
									label="averageSal"
									height="300px"
									field="sal"
								/>
							</Suspense>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default DisplayReport;
