import { useLayoutEffect, useEffect, useRef } from "react";

// amcharts
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

function SimpleLineChart(props) {
	const ch = useRef(null);

	useLayoutEffect(() => {
		let root = am5.Root.new(props.label);

		root.setThemes([am5themes_Animated.new(root)]);

		let chart = root.container.children.push(
			am5xy.XYChart.new(root, {
				panY: false,
				layout: root.verticalLayout,
			})
		);

		// Create Y-axis
		let yAxis = chart.yAxes.push(
			am5xy.ValueAxis.new(root, {
				extraTooltipPrecision: 1,
				renderer: am5xy.AxisRendererY.new(root, {}),
				opacity: .5
				/* visible: false, */
			})
		);

		// Create X-Axis
		let xAxis = chart.xAxes.push(
			am5xy.DateAxis.new(root, {
				baseInterval: { timeUnit: "second", count: 1 },
				renderer: am5xy.AxisRendererX.new(root, {}),
				opacity: .5
				/* visible: false, */
			})
		);

		xAxis.get("dateFormats")["second"] = "HH:mm";
		xAxis.get("periodChangeDateFormats")["day"] = "MMMM";

		xAxis.get("renderer").grid.template.setAll({
			visible: false,
		});
		yAxis.get("renderer").grid.template.setAll({
			visible: false,
		});

		// Create series
		function createSeries(name, field) {
			let series = chart.series.push(
				am5xy.LineSeries.new(root, {
					name: name,
					xAxis: xAxis,
					yAxis: yAxis,
					valueYField: field,
					valueXField: "date",
					tooltip: am5.Tooltip.new(root, {}),
					stroke: am5.color("#2179FF"),
				})
			);

			series.bullets.push(function () {
				return am5.Bullet.new(root, {
					sprite: am5.Circle.new(root, {
						radius: 4,
						fill: series.get("fill"),
					}),
				});
			});

			series.strokes.template.set("strokeWidth", 2);

			series
				.get("tooltip")
				.label.set("text", "{valueY}");

			ch.current = series;
			series.appear(1000);
			chart.appear(1000, 100);
		}

		createSeries(props.label, "value");

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

		return () => {
			root.dispose();
		};
	}, []);

	useEffect(() => {
		ch.current.data.setAll(props.data);
	}, [props.data, props.data.length]);

	return (
		<div style={{ border: "2px solid #2179FFFF", height: "fit-content" }}>
			<div
				id={props.label}
				style={{ width: "100%", height: `${props.height}` }}
			></div>
		</div>
	);
}

export default SimpleLineChart;
