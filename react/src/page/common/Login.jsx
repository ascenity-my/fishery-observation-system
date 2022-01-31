import styles from "styles/common/Login.module.scss";

function Login() {
	const handleSubmit = (e) => {
		e.preventDefault();
		console.log("submit");
	};

	return (
		<div className={styles.container}>
			<div className={`${styles.sidecolor} animate__animated animate__slideInUp`} />
			<div className={`${styles.wrapper} animate__animated animate__fadeIn`}>
				<div className={styles.title}>Sign in to your account</div>
				<form className={styles.form} onSubmit={handleSubmit}>
					<div className={styles.item}>
						<input type="text" placeholder="Enter username" required/>
					</div>
					<div className={styles.item}>
						<input type="password" placeholder="Enter password" required/>
					</div>

					<div className={styles.item}>
						<button type="submit">Log in</button>
					</div>
				</form>
			</div>
		</div>
	);
}

export default Login;
