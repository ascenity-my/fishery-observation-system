import OrganizationChart from '@dabeng/react-orgchart';
import PropTypes from 'prop-types';

import styles from 'styles/component/OrgChart.module.scss';

function Node({ nodeData }) {
    return (
        <div className={styles.node}>
            <div className={styles.photo}>
                <img src={nodeData.img} alt="" />
            </div>
            <div className={styles.details}>
                <div className={styles.title}>{nodeData.title}</div>
                <div className={styles.name}>{nodeData.name}</div>

            </div>
        </div>
    );
}

Node.propTypes = {
    nodeData: PropTypes.object.isRequired
};

export default function OrgChart({ nodeData }) {
    return (
        <div className={styles.orgChart}>
            <OrganizationChart
                datasource={nodeData}
                NodeTemplate={Node}
                pan={true}
            />
        </div>
    );
}