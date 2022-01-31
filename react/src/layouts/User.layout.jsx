import { Outlet } from 'react-router-dom';

import styles from 'styles/layout/User.module.scss';

import Navbar from 'components/Navbar.component';
import Topbar from 'components/Topbar.component';
import { useEffect, useState } from 'react';

export default function UserLayout(props) {
    const [mqtt, setMqtt] = useState(null);

    const paths = [
        /* {
            path: '/user/productivity',
            name: 'Productivity',
            icon: 'FaBox',
        }, */
        {  
            path: '/user/visualization',
            name: 'Visualization',
            icon: 'FaReceipt',
        },
        {  

            path: '/user/facilities',
            name: 'Facilites',
            icon: 'FaShoppingBag',
        },
        /* {
            path: '/user/',
            name: 'Home',
            icon: 'FaClipboardList',
        }, */

    ];

    useEffect(() => {
        if (!props.mqtt) return;

        setMqtt(props.mqtt);
    }, [props.mqtt]);

    return (
        <div>
            <Topbar className="animate__animated animate__slideInLeft"/>
            <Navbar paths={ paths }/>
            <div className={ styles.content }>
                <Outlet context={[mqtt]} path={paths}/>
            </div>
        </div>
    );
}