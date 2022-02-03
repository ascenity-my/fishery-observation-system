import { useState, useEffect } from "react";
import * as ReactIcons from "react-icons/fa";
import * as ReactIconsSi from "react-icons/si";
import * as ReactIconsBs from "react-icons/bs";
import "animate.css";

import styles from "styles/component/StatNumber.module.scss";

function StatNumber(props) {
    const [title, setTitle] = useState("");
    const [icon, setIcon] = useState("");
    const [value, setValue] = useState("");
    const [unit, setUnit] = useState("");
    const [src, setSrc] = useState("");
    const [valueSize, setValueSize] = useState("2rem");

    const Icon = ({ from, name }) => {
        let TagName;

        if (from !== '') {
            if (from === "Si") {
                TagName = ReactIconsSi[name];
            }
            if (from === "Bs") {
                TagName = ReactIconsBs[name];
            }
        } else {
            TagName = ReactIcons[name];
        }

		return !!TagName ? <TagName /> : <p>{name}</p>;
	};

    useEffect(() => {
        if (props.title) {
            setTitle(props.title);
        }

        if (props.icon) {
            setIcon(props.icon);
        }

        if (props.value) {
            setValue(props.value);
        }

        if (props.unit) {
            setUnit(props.unit);
        }

        if (props.valueSize) {
            setValueSize(props.valueSize);
        }

        if (props.from) {
            setSrc(props.from);
        }

    }, [props.title, props.icon, props.value, props.unit, props.valueSize, props.from]);

	return (
		<div className={`animate__animated animate__zoomInDown ${styles.stat}`}>
			<div className={styles.header}>
				<Icon name={icon} from={src}/>
				<label>{title || '-'}</label>
			</div>
			<div className={styles.body}>
				<div className={` ${styles.value}`} style={{fontSize: valueSize}}>{value || '-'}</div>
                {unit && <div className={styles.unit}>{unit || '-'}</div>}
			</div>
		</div>
	);
}

export default StatNumber;
