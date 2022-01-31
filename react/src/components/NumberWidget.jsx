import styles from 'styles/component/NumberWidget.module.scss';

function NumberWidget({ ...props }) {
    return (
        <div className={styles.widget}>
            <div className={styles.title}>
                { props.title }
            </div>
            <div className={styles.data}>
                <div className={styles.label}>{ props.label }</div>
                <div className={styles.value}>{ props.value }</div>
            </div>
        </div>
    )
}

export default NumberWidget;