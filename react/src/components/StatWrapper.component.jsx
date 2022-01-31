import styles from "styles/component/StatWrapper.module.scss";

function StatWrapper(props) {
    return (
        <div className={styles.container}>
            <div className={styles.stats}>
                {props.children}
            </div>
        </div>
    )
}

export default StatWrapper;