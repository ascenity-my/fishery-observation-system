import Gallery from "react-grid-gallery";

import styles from "styles/common/Gallery.module.scss";

export default function GalleryPage() {
	const IMAGES = [
		{
			src: "/gallery/img-01.jpeg",
			thumbnail:
				"/gallery/img-01.jpeg",
			thumbnailWidth: 320,
			thumbnailHeight: 320,
			caption: "Pond image #1",
		},
		
		{
			src: "/gallery/img-02.jpeg",
			thumbnail:
				"/gallery/img-02.jpeg",
			thumbnailWidth: 420,
			thumbnailHeight: 200,
			caption: "Pond image #2",
		},
		
		{
			src: "/gallery/img-03.jpeg",
			thumbnail:
				"/gallery/img-03.jpeg",
			thumbnailWidth: 320,
			thumbnailHeight: 124,
			caption: "Pond image #3",
		},
		
		{
			src: "/gallery/img-04.jpeg",
			thumbnail:
				"/gallery/img-04.jpeg",
			thumbnailWidth: 320,
			thumbnailHeight: 174,
			caption: "Pond image #4",
		},
		
		{
			src: "/gallery/img-05.jpeg",
			thumbnail:
				"/gallery/img-05.jpeg",
			thumbnailWidth: 200,
			thumbnailHeight: 300,
			caption: "Pond image #5",
		},
		
	];

	return <div className={styles.container}>
		{/* <div className={styles.header}>
			<div className={styles.title}>
				Gallery
			</div>
		</div> */}
        <Gallery
			images={IMAGES}
			enableImageSelection={false}
			rowHeight={300}
		/>
    </div>;
}
