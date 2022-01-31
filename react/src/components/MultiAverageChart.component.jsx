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

		return data;
	};

	useLayoutEffect(() => {
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
				baseInterval: { timeUnit: "day", count: 1 },
				renderer: am5xy.AxisRendererX.new(root, {}),
			})
		);

		xAxis.get("dateFormats")["second"] = "HH:mm";
		xAxis.get("periodChangeDateFormats")["day"] = "MMMM";


		// Add cursor
		chart.set(
			"cursor",
			am5xy.XYCursor.new(root, {
				behavior: "zoomXY",
				xAxis: xAxis,
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

	/* useEffect(() => {
		if (!props.series) return;

		if (props.series.length > 0) {
			if (!legend.current) {
				for (let x = 0; x < props.series.length; x++) {
					let s = props.series[x];
					let series = createSeries(s.name, s.field);

					setSeriesList([...seriesList, series]);
					series.data.setAll(generateDummyData());
				}

				legend.current = mainChart.current.children.push(
					am5.Legend.new(mainRoot.current, {})
				);
				legend.current.data.setAll(mainChart.current.series.values);
			}
		}
	}, [props.series]); */

	useEffect(() => {
		if (!props.field) return;

		if (legend.current) return;

		(async () => {
			try {
				let request = await fetch(`${process.env.REACT_APP_SERVER_HOSTNAME}:${process.env.REACT_APP_SERVER_PORT}/api/device/data/average/hourly/all`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
				},
				query: {
					total: 20
				}
			});

			if (request.status === 200) {
				const response = await request.json();

				for (let x = 0; x < response.length; x++) {
					let s = response[x].device_name;
					let series = createSeries(s, props.field);

					setSeriesList([...seriesList, series]);
					series.data.setAll(response[x].data.map(d => {
						d.date = new Date(d.date).getTime();

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
		<div className={styles.container} style={{ border: "2px solid #2179FFFF", height: "fit-content" }}>
			<div
				id={props.label}
				style={{ width: "100%", height: `${props.height}` }}
			></div>
		</div>
	);
}

export default SimpleLineChart;
