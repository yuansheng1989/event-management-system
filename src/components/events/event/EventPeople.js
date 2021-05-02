import React, { Component } from 'react';
import styles from '../index.module.scss';
import { Badge, Card } from 'antd';
import 'antd/dist/antd.css';

class EventPeople extends Component {
    render() {
        const { hosts } = this.props;

        return (
            <div className={styles.event_people}>
                <Card title="Event Host">
                    <div>
                        <Badge.Ribbon text="Host">
                            <img className={styles.event_people_image} src={hosts && hosts[0].photoUrl} alt={hosts && hosts[0].name} width="80px" height="80px" />
                            {hosts && hosts[0].name}
                        </Badge.Ribbon>
                    </div>
                </Card>
            </div>
        );
    }
}

export default EventPeople;