import { useEffect, useRef, useState } from "react";
import styles from "styles/common/About.module.scss";

//organisation chart
import ChartOrg from "@balkangraph/orgchart.js";

function OrgTree(props) {
	const chart = useRef();
	const divRef = useRef();

	const [ready, setReady] = useState(false);

	ChartOrg.templates.edel = Object.assign({}, ChartOrg.templates.rony);

	ChartOrg.templates.edel.field_0 = '<text data-width="165" style="font-size: 18px;" fill="#039BE5" x="90" y="40" text-anchor="middle">{val}</text>';
	ChartOrg.templates.edel.field_1 = '<text data-width="165" style="font-size: 14px;" fill="#F57C00" x="90" y="70" text-anchor="middle">{val}</text>';

	ChartOrg.templates.edel.img_0 =
        '<clipPath id="ulaImg">'
        + '<circle cx="90" cy="140" r="80"></circle>'
        + '</clipPath>'
        + '<image clip-path="url(#ulaImg)" xlink:href="{val}" x="0" y="100" width="180" height="120"></image>';

	useEffect(() => {
		if (!props.nodes) return;

		chart.current = new ChartOrg(divRef.current, {
			mouseScrool: ChartOrg.action.scroll,
			nodes: props.nodes,
			nodeBinding: props.nodeBinding,
			template: "edel",
			enableSearch: false,
		});

		setReady(true);
	}, []);

	/* useEffect(() => {
		if (!ready) return;

		const svg = divRef.current.querySelectorAll("svg");

		console.log(divRef.current);
		console.log(svg);

		const nodes = svg.querySelectorAll('.node');

		for (let node of nodes) {
			const texts = node.querySelectorAll('text');

			texts[1].attr('y', 100);
		}
	}, [ready]) */

	return <div ref={divRef} className={styles.orgTree} />;
}

export default function About() {
	const data = [
		{
			id: 1,
			name: "Dato' Hj. Mohd Azmi bin Mohd Amin",
			title: "Pengerusi",
			img: "/crew/mohd-azmi.png",
		},
		{
			id: 2,
			pid: 1,
			name: "Tuan Muhammad Shukri bin Shafie",
			title: "Pengarah Projek",
			img: "/crew/tuan-muhd-shukri.png",
		},
		{
			id: 3,
			pid: 1,
			name: "Tuan Arriffin bin Md. Amin",
			title: "Pengurus Pentadbiran",
			img: "/crew/tuan-arriffin.png",
		},
		{
			id: 4,
			pid: 1,
			name: "Tuan Syed Abdullah bin Syed Mahmud",
			title: "Pengurusan Korporat",
			img: "/crew/tuan-syed.png",
		},
		{
			id: 5,
			pid: 1,
			name: "Mohd Amirul Hakim",
			title: "Pengurus Hatchery",
			img: "/crew/mohd-amirul.png",
		},
		{
			id: 6,
			pid: 1,
			name: "Muhammad Aqil",
			title: "Pengurus Farm",
			img: "/crew/mohd-aqil.png",
		},
		{
			id: 7,
			pid: 1,
			name: "Atiqah Nabilah",
			title: "Akaun",
			img: "/crew/atiqah.png",
		},
		{
			id: 8,
			pid: 1,
			name: "Nur Ayessah",
			title: "Admin",
			img: "/crew/ayessah.png",
		},
	];

	let nodeBinding = {
		field_0: "name",
		field_1: "title",
		img_0: "img",
	};

	return (
		<div className={`${styles.container}`}>
			<div className={styles.companyBG}>
				<div className={styles.contTitle}>LATAR BELAKANG</div>

				<div className={styles.content}>
					Serandu Aquaponic System Sdn. Bhd atau dalam panggilan
					singkatan SAS ditubuhkan pada 11 Februari 2021 telah
					diperbadankan di bawah Akta Syarikat 2016 dengan SSM
					bernombor(1405558-M) dan Serandu Aquaponic System adalah
					sebuah syarikat sendirian. Serandu Aquaponic System tertumpu
					kepada bidang akuakultur seperti ternakan udang putih super
					intensif (kepadatan tinggi), pembenihan udang putih ternakan
					rumpai laut (latok).
					<br /> <br />
					Perusahaan ternakan udang putih (vannamei) merupakan
					perniagaan utama bagi syarikat Serandu Aquaponic System yang
					telah menjalankan operasi hampoir setahun dalam bidang ini.
					Dengan menggunakan kaedah ternakan yang mudah, moden serta
					kos yang dengan permintaan semasa. Kemampuan Serandu
					Aquaponic System dalam pengeluaran udang adalah sebanyak 15
					tan satu pusingan dengan kapasiti kolam yang ada sekarang.
					Serandu Aquaponic System mempunyai 2 bahagian iaitu farm dan
					juga hatchery. Di farm (SAS) mempunyai kolam sebanyak 8 buah
					yang menggunakan teknologi HDPE lining berkeluasan 500m3 dan
					1000m3. Di farm (SAS) juga mempunyai tangki-tangki
					fibreglass bersaiz 10 tan air yang mampu menghasilkan
					pengeluaran benih udang putih sebanyak 7 hingga 10 juta satu
					pusingan. Di Hatchery (SAS) juga terdapat 2 buah kolam HDPE
					bersaiz 500m3 bertujuan untuk menghasilkan benih super PL
					sebelum dipindahkan ke farm (SAS) atau dipasarkan kepada
					penternak-penternak lain.
					<br /> <br />
					Untuk memperluaskan jaringan perniagaan, pihak syarikat
					telah berjaya menghasilkan sebuah profil syarikat yang
					bertujuan untuk memberikan informasi dengan lebih meluas
					berkenaan pengusahaan syarikat agar butirran lengkap dapat
					dibentangkan. Profil syarikat ini diharapkan mampu
					meningkatkan pemasaran dan jaringan pasaran baru dalam
					kalangan pelanggan. Syarikat ini menjalankan perniagaan
					secara usahasama dengan pihak Jabatan Perikanan selaku
					penasihat dalam menjayakan perusahaan ini.
				</div>
			</div>

			<div className={styles.companyScope}>
				<div className={styles.objective}>
					<div className={styles.scopeTitle}>OBJEKTIF</div>
					<div className={styles.sContent}>
						Syarikat perusahaan ternakan udang putih super intensif
						yang mampu mengeluarkan hasil ternakan yang mempunyai
						kualiti dan bermutu tinggi bagi pasaran semasa dan
						menarik minat masyarakat umum untuk menikmati hasil
						ternakan. Syarikat yang mampu menghasilkan dan membina
						sistem yang ideal dan kompetatif.
					</div>
				</div>
				<div className={styles.mission}>
					<div className={styles.scopeTitle}>MATLAMAT</div>
					<div className={styles.sContent}>
						Menjadi sebuah syarikat pengeluaran udang yang terkenal
						di Malaysia dan berhasrat menubuhkan cawangan-cawangan
						di negeri-negeri lain yang memerlukan pengeluaran hasil
						jenis ini. Berhasrat menceburi bidang baru seperti
						ternakan rumpai laut (latok) agar permintaan di
						semenanjung dapat dipenuhi.
					</div>
				</div>
				<div className={styles.vission}>
					<div className={styles.scopeTitle}>HALA TUJU</div>
					<div className={styles.sContent}>
						Menjadi sebuah pusat pengeluaran dan ternakan akuaponik
						udang putih dan rumpai laut (latok) serta menjadi tempat
						rujukan bagi syarikat-syarikat yang ingin menceburi
						bidang ini serta menjadi pusat latihan kepada
						pelajar-pelajar universiti.
					</div>
				</div>
			</div>

			<div className={styles.chartTitle}>CARTA ORGANISASI</div>

			<div className={styles.chart} >
				<OrgTree nodes={data} nodeBinding={nodeBinding} />
			</div>
		</div>
	);
}
