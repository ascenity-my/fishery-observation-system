import styles from "styles/common/About.module.scss";


import OrgChart from "components/OrgChart.component";

export default function About() {
	const data = {
		id: "1",
		name: "Lorem Ipsum Dolor Sit Amet",
		title: "Lorem Ipsum",
		img: "https://img.freepik.com/premium-vector/young-man-avatar-character_24877-9475.jpg",
		children: [
			{
				id: "2",
				pid: 1,
				name: "Lorem Ipsum Dolor Sit Amet",
				title: "Lorem Ipsum",
				img: "https://img.freepik.com/premium-vector/young-man-avatar-character_24877-9475.jpg",
			},
			{
				id: "3",
				pid: 1,
				name: "Lorem Ipsum Dolor Sit Amet",
				title: "Lorem Ipsum",
				img: "https://img.freepik.com/premium-vector/young-man-avatar-character_24877-9475.jpg",
			},
			{
				id: "4",
				pid: 1,
				name: "Lorem Ipsum Dolor Sit Amet",
				title: "Lorem Ipsum",
				img: "https://img.freepik.com/premium-vector/young-man-avatar-character_24877-9475.jpg",
			},
			{
				id: "5",
				pid: 1,
				name: "Lorem Ipsum Dolor Sit Amet",
				title: "Lorem Ipsum",
				img: "https://img.freepik.com/premium-vector/young-man-avatar-character_24877-9475.jpg",
			},
			{
				id: "6",
				pid: 1,
				name: "Lorem Ipsum Dolor Sit Amet",
				title: "Lorem Ipsum",
				img: "https://img.freepik.com/premium-vector/young-man-avatar-character_24877-9475.jpg",
			},
			{
				id: "7",
				pid: 1,
				name: "Lorem Ipsum Dolor Sit Amet",
				title: "Lorem Ipsum",
				img: "https://img.freepik.com/premium-vector/young-man-avatar-character_24877-9475.jpg",
			},
			{
				id: "8",
				pid: 1,
				name: "Lorem Ipsum Dolor Sit Amet",
				title: "Lorem Ipsum",
				img: "https://img.freepik.com/premium-vector/young-man-avatar-character_24877-9475.jpg",
			},
		],
	};

	return (
		<div className={`${styles.container}`}>
			<div className={styles.companyBG}>
				<div className={styles.contTitle}>BACKGROUND</div>

				<div className={styles.content}>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi, fuga? Mollitia, alias nulla iusto quibusdam officia facere quo accusamus architecto?
					<br />
					<br />
					Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repudiandae aliquam neque libero unde eum. Fuga eos, inventore repellendus consequatur eius facilis libero ex esse totam repellat vel, qui amet sunt.
					<br />
					<br />

					Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur debitis obcaecati mollitia assumenda voluptatem, officiis, iste libero recusandae maiores, quibusdam totam molestiae! Libero eum nam sit obcaecati consectetur dicta mollitia praesentium tempore amet laborum sint nulla iusto porro facilis, omnis minima molestias blanditiis explicabo quo similique reprehenderit sed ipsum! Quidem?
				</div>
			</div>

			<div className={styles.companyScope}>
				<div className={styles.objective}>
					<div className={styles.scopeTitle}>LOREM</div>
					<div className={styles.sContent}>
						Lorem ipsum dolor, sit amet consectetur adipisicing elit. Excepturi, suscipit nostrum perferendis maxime eveniet est sunt minus vero quas iusto id aliquam exercitationem vel! Rem eligendi reprehenderit quos id neque.
					</div>
				</div>
				<div className={styles.mission}>
					<div className={styles.scopeTitle}>LOREM</div>
					<div className={styles.sContent}>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod at ullam ducimus excepturi magnam minus quo adipisci accusantium eos possimus unde perspiciatis rerum reprehenderit laborum ipsum, quos quaerat dolorem voluptate.
					</div>
				</div>
				<div className={styles.vission}>
					<div className={styles.scopeTitle}>LOREM</div>
					<div className={styles.sContent}>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque exercitationem debitis voluptatibus at unde quod ducimus commodi. Nobis, enim alias dolore voluptas corrupti nesciunt at minus veritatis iste? Veritatis, ad!
					</div>
				</div>
			</div>

			<div className={styles.chartTitle}>ORGANIZATION CHART</div>

			<div className={styles.chart}>
				{/* <OrgTree nodes={data} nodeBinding={nodeBinding} /> */}
				<OrgChart nodeData={data} />
			</div>
		</div>
	);
}
