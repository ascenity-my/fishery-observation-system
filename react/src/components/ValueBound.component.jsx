import Icon from "components/Icon.component";

import styles from "styles/component/ValueBound.module.scss";

export default function ValueBound() {
	const data = [
		{
			label: "pH",
			value: [1.2, 7.5],
		},
		{
			label: "Dissolved Oxygen",
			value: [1.2, 7.5],
		},
		{
			label: "Temperature",
			value: [1.2, 7.5],
		},
		{
			label: "Turbidity",
			value: [1.2, 7.5],
		},
		{
			label: "Salinity",
			value: [1.2, 7.5],
		},
	];

	return (
		<div className={styles.wrapper}>
			{data.map((d, x) => (
				<div key={x} className={styles.item}>
					<div className={styles.label}>{d.label}</div>
                    <div className={styles.values}>
                        <div className={styles.value}>
                            <Icon name="FaLevelUpAlt" from="Fa" />
                            <div>{d.value[1]}</div>
                        </div>
                        <div className={styles.value}>
                            <Icon name="FaLevelDownAlt" from="Fa" />
                            <div>{d.value[0]}</div>
                        </div>
                    </div>
				</div>
			))}
		</div>
	);
}
