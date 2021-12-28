import { useState } from "react";

import FolderCard from "components/FolderCard";

import styles from "styles/component/Table.module.scss";

function Table({ ...props }) {
	const [items, setItems] = useState(props.data.items);

	const findByName = (name) => {
		const item = items.filter((item) =>
			item[0].toLowerCase().includes(name.toLowerCase())
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

	return (
		<FolderCard className={styles.container} title="Items sold">
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
				<div className={styles.rows}>
					{items.map((i, x) => (
						<div className={styles.row} key={x}>
							<div className={styles.no} key={x}>
								{x + 1}
							</div>
							{i.map((item, index) => (
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
										className={`${
											props.data.isBadge[index]
												? styles.badge
												: ""
										}`}
										style={{
											border: `${
												props.data.isBadge[index]
													? props.data.badgeColor[
															x
													  ] &&
													  "2px solid " +
															props.data
																.badgeColor[x][
																index
															]
													: "initial"
											}`,
											background: `${
												props.data.isBadge[index]
													? props.data.badgeColor[
															x
													  ] &&
													  props.data.badgeColor[x][
															index
													  ] + "1A"
													: "initial"
											}`,
										}}
									>
										{item}
									</div>
								</div>
							))}
						</div>
					))}
				</div>
			</div>
		</FolderCard>
	);
}

export default Table;
