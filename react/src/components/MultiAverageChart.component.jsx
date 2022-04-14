/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */

import { useLayoutEffect, useEffect, useRef, useState } from "react";

// amcharts
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

import styles from "styles/component/MultiAverageChart.module.scss";

function SimpleLineChart(props) {
	const mainChart = useRef(null);
	const mainRoot = useRef(null);
	const mainXAxis = useRef(null);
	const mainYAxis = useRef(null);
	const legend = useRef(null);

	const [seriesList, setSeriesList] = useState([]);

	function createSeries(name, field) {
		let series = mainChart.current.series.push(
			am5xy.SmoothedXLineSeries.new(mainRoot.current, {
				name: name,
				xAxis: mainXAxis.current,
				yAxis: mainYAxis.current,
				valueYField: field,
				valueXField: "date",
				tooltip: am5.Tooltip.new(mainRoot.current, {}),
				/* stroke: am5.color("#2179FF"), */
			}),
			{
				legendLabelText: "[bold {stroke}]{name}:[/]",
				legendRangeLabelText: "[{stroke}]{name}:[/]",
				legendValueText: "[bold {stroke}]{valueY}[/]",
				legendRangeValueText: "[{stroke}]{valueYClose}[/]",
			}
		);

		series.bullets.push(function () {
			return am5.Bullet.new(mainRoot.current, {
				sprite: am5.Circle.new(mainRoot.current, {
					radius: 4,
					fill: series.get("fill"),
				}),
			});
		});

		series.strokes.template.set("strokeWidth", 2);

		series
			.get("tooltip")
			.label.set(
				"text",
				"[bold]{name}[/]\n{valueX.formatDate()}: {valueY}"
			);

		series.appear(1000);
		mainChart.current.appear(1000, 100);

		return series;
	}

	useEffect(() => {
		let root = am5.Root.new(props.label);

		root.setThemes([am5themes_Animated.new(root)]);

		let chart = root.container.children.push(
			am5xy.XYChart.new(root, {
				panY: false,
				layout: root.verticalLayout,
				maxTooltipDistance: 0,
			})
		);

		// Create Y-axis
		let yAxis = chart.yAxes.push(
			am5xy.ValueAxis.new(root, {
				extraTooltipPrecision: 1,
				renderer: am5xy.AxisRendererY.new(root, {}),
			})
		);

		// Create X-Axis
		let xAxis = chart.xAxes.push(
			am5xy.DateAxis.new(root, {
				baseInterval: { timeUnit: "hour", count: 1 },
				renderer: am5xy.AxisRendererX.new(root, {}),
			})
		);

		xAxis.get("dateFormats")["second"] = "HH:mm";
		xAxis.get("periodChangeDateFormats")["hour"] = "HH:mm";


		// Add cursor
		chart.set(
			"cursor",
			am5xy.XYCursor.new(root, {
				behavior: "zoomXY",
				xAxis: xAxis,
				yAxis: yAxis,
			})
		);

		xAxis.set(
			"tooltip",
			am5.Tooltip.new(root, {
				themeTags: ["axis"],
			})
		);

		yAxis.set(
			"tooltip",
			am5.Tooltip.new(root, {
				themeTags: ["axis"],
			})
		);

		mainChart.current = chart;
		mainRoot.current = root;
		mainXAxis.current = xAxis;
		mainYAxis.current = yAxis;

		return () => {
			root.dispose();
		};
	}, []);

	useEffect(() => {
		if (!props.field) return;

		if (legend.current) return;

		(async () => {
			try {
				let request = await fetch(`${process.env.REACT_APP_SERVER_HOSTNAME}/api/device/data/average/hourly/all`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
				},
			});

			if (request.status === 200) {
				const response = await request.json();

				console.log(response);

				for (let x = 0; x < response.length; x++) {
					let s = response[x].device_name;
					let series = createSeries(s, props.field);

					setSeriesList([...seriesList, series]);
					series.data.setAll(response[x].data.map(d => {
						// convert date to local time
						let date = new Date(d.date);
						date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
						
						d.date = date.getTime();

						return d;
					}));
				}

				legend.current = mainChart.current.children.push(
					am5.Legend.new(mainRoot.current, {})
				);

				legend.current.data.setAll(mainChart.current.series.values);
			}
			} catch (e) {
				console.log(e);
			}
		})();
	}, [props.field]);

	return (
		<div className={styles.container} style={{ boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)", height: "fit-content" }}>
			<div
				id={props.label}
				style={{ width: "100%", height: `${props.height}` }}
			></div>
		</div>
	);
}

export default SimpleLineChart;
