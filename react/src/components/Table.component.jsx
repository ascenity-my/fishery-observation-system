import { useState } from "react";

import * as ReactIcons from "react-icons/fa";

import FolderCard from "components/FolderCard";

import styles from "styles/component/Table.module.scss";

function Table({ ...props }) {
	const [items, setItems] = useState(props.data.items);

	const findByName = (name) => {
		const item = items.filter((item) =>
			item[1].toLowerCase().includes(name.toLowerCase())
		);

		if (item) {
			setItems(item);
		}
	};

	const onSearch = (e) => {
		const name = e.target.value;
		if (name) {
			findByName(name);
		} else {
			setItems(props.data.items);
		}
	};

	const Icon = ({ name }) => {
		const TagName = ReactIcons[name];
		return !!TagName ? <TagName /> : <p>{name}</p>;
	};

	return (
		<FolderCard className={styles.container} title={props.title}>
			<div className={styles.header}>
				<div className={styles.filters}>
					<div className={styles.filter}>
						<div className={styles.filter_content}>
							<input
								type="text"
								placeholder="Search item name"
								onChange={onSearch}
							/>
						</div>
					</div>
				</div>
			</div>
			<div className={styles.table}>
				<div className={styles.cols}>
					<div className={styles.num}>#</div>
					<div
						className={styles.data}
						style={{
							width: `${
								props.data.actions
									? "calc(100% - 100px)"
									: "calc(100% - 50px)"
							}`,
						}}
					>
						{props.data.header.map((item, index) => (
							<div
								className={styles.col}
								key={index}
								style={{
									flex: `1 1 ${props.data.colWidthPercent[index]}`,
									textAlign: `${
										props.data.centered[index]
											? "center"
											: "start"
									}`,
								}}
							>
								{item}
							</div>
						))}
					</div>
					{props.data.actions && (
						<div className={styles.col}>Actions</div>
					)}
				</div>
				<div className={styles.rows}>
					{items.map((i, x) => (
						<div className={styles.row} key={x}>
							<div className={styles.no} key={x}>
								{x + 1}
							</div>
							<div
								className={styles.data}
								style={{
									width: `${
										props.data.actions
											? "calc(100% - 100px)"
											: "calc(100% - 50px)"
									}`,
								}}
							>
								{i.slice(1, i.length).map((item, index) => (
									<div
										className={styles.value}
										key={index}
										style={{
											flex: `1 1 ${props.data.colWidthPercent[index]}`,
											justifyContent: `${
												props.data.centered[index]
													? "center"
													: "flex-start"
											}`,
										}}
									>
										<div
											style={{
												background: `${
													item
														.toString()
														.includes(":")
														? item.split(":")[1] +
														  "1A"
														: "initial"
												}`,
												border: `${
													item
														.toString()
														.includes(":")
														? "2px solid " +
														  item.split(":")[1]
														: "initial"
												}`,
												padding: `${
													item
														.toString()
														.includes(":")
														? "2px 10px"
														: "initial"
												}`,
												borderRadius: `${
													item
														.toString()
														.includes(":")
														? "5px"
														: "initial"
												}`,
											}}
										>
											{item.split(":")[0]}
										</div>
									</div>
								))}
							</div>
							{props.data.actions && (
								<div className={styles.actions}>
									{props.data.actions.map((item, y) => (
										<div
											key={y}
											className={styles.action}
											onClick={() =>
												item.callback(items[x][0])
											}
										>
											<Icon name={item.icon} />
										</div>
									))}
								</div>
							)}
						</div>
					))}
				</div>
			</div>
		</FolderCard>
	);
}

export default Table;
