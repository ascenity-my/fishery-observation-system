import { useEffect, useState } from "react";

import Icon from "components/Icon.component";

import styles from "styles/component/ValueBound.module.scss";

export default function ValueBound(props) {
	const [ph, setPh] = useState([0.0, 0.0]);
	const [oxy, setOxy] = useState([0.0, 0.0]);
	const [temp, setTemp] = useState([0.0, 0.0]);
	const [sal, setSal] = useState([0.0, 0.0]);

	useEffect(() => {
		setPh([...props.bounds.ph]);
		setOxy([...props.bounds.oxy]);
		setTemp([...props.bounds.temp]);
		setSal([...props.bounds.sal]);
	}, [props.bounds]);

	return (
		<div className={styles.wrapper}>
			<div className={styles.item}>
				<div className={styles.label}>pH</div>
				<div className={styles.values}>
					<div className={styles.value}>
						<Icon name="FaLevelUpAlt" from="Fa" />
						<div>{ph[1]}</div>
					</div>
					<div className={styles.value}>
						<Icon name="FaLevelDownAlt" from="Fa" />
						<div>{ph[0]}</div>
					</div>
				</div>
			</div>
			<div className={styles.item}>
				<div className={styles.label}>Dissolved Oxygen</div>
				<div className={styles.values}>
					<div className={styles.value}>
						<Icon name="FaLevelUpAlt" from="Fa" />
						<div>{oxy[1]}</div>
					</div>
					<div className={styles.value}>
						<Icon name="FaLevelDownAlt" from="Fa" />
						<div>{oxy[0]}</div>
					</div>
				</div>
			</div>
			<div className={styles.item}>
				<div className={styles.label}>Temperature</div>
				<div className={styles.values}>
					<div className={styles.value}>
						<Icon name="FaLevelUpAlt" from="Fa" />
						<div>{temp[1]}</div>
					</div>
					<div className={styles.value}>
						<Icon name="FaLevelDownAlt" from="Fa" />
						<div>{temp[0]}</div>
					</div>
				</div>
			</div>
			<div className={styles.item}>
				<div className={styles.label}>Salinity</div>
				<div className={styles.values}>
					<div className={styles.value}>
						<Icon name="FaLevelUpAlt" from="Fa" />
						<div>{sal[1]}</div>
					</div>
					<div className={styles.value}>
						<Icon name="FaLevelDownAlt" from="Fa" />
						<div>{sal[0]}</div>
					</div>
				</div>
			</div>
		</div>
	);
}
