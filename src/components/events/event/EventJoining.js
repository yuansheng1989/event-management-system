import React, { Component } from 'react';
import styles from '../index.module.scss';
import moment from 'moment';
import { Button, Modal, Rate } from 'antd';
import 'antd/dist/antd.css';
import { connect } from 'react-redux';
import { addRate } from '../../../redux/events/actions';

class EventJoining extends Component {
    state = {
        isModalVisible: false,
        rate: 2.5
    };

    handleCancel = () => {
        this.setState({
            rate: 2.5,
            isModalVisible: false
        });
    };

    handleRateChange= (value) => {
        this.setState({
            rate: value
        });
    }

    rateEventClick = () => {
        this.setState({
            isModalVisible: true
        });
    }

    rateEventSubmit = async (rate) => {
        await this.props.addRate({
            EventId: this.props.events[0].eventId,
            rate
        });
        this.setState({
            rate: 2.5,
            isModalVisible: false
        });
    }

    render() {
        const { events, hosts, eventsLoading } = this.props;
        const { rate } = this.state;
        return (          
            <div className={styles.event_joining}>
                <div className={styles.event_joining_list}>
                    <h2 className={styles.event_joining_list_text_padding}>{events && events[0].title}</h2>
                    <p className={styles.event_joining_list_text_padding}>{moment(events && events[0].date).format("MMMM DD, YYYY h:mm A")}</p>
                    <p className={styles.event_joining_list_text_padding}>Hosted by {hosts && hosts[0].name}</p>
                </div>
                <div className={styles.event_joining_button_list}>
                    <Button 
                        type="primary"
                        style={{
                            backgroundColor: "#13a9b0",
                            borderColor: "#13a9b0",
                            borderRadius:"6px",
                            width: "150px"
                        }}
                    >
                        JOIN THIS EVENT
                    </Button>
                    <Button 
                        type="primary"
                        style={{
                            backgroundColor: "#13a9b0",
                            borderColor: "#13a9b0",
                            borderRadius:"6px",
                            width: "150px"
                        }}
                        onClick={this.rateEventClick}
                    >
                        RATE THIS EVENT
                    </Button>
                </div>
                <Modal
                    footer={null}
                    visible={this.state.isModalVisible}
                    onCancel={this.handleCancel}
                    centered={true}
                    maskClosable={false}
                    className={styles.rate_modal}
                >
                    <h2 style={{textAlign: "center"}}>How do you rate this event?</h2>
                    <div style={{display: "flex", justifyContent: "center", marginBottom: "20px"}}>
                        <Rate allowHalf value={rate} onChange={this.handleRateChange} />
                    </div>
                    <div style={{display: "flex", justifyContent: "center"}}>
                        <Button
                            type="primary"
                            loading={eventsLoading}
                            style={{
                                backgroundColor: "#13a9b0",
                                borderColor: "#13a9b0",
                                borderRadius:"6px",
                                width: "150px"
                            }}
                            onClick={() => {this.rateEventSubmit(rate)}}
                        >
                            Submit
                        </Button>
                    </div>
                </Modal>
            </div>
        );
    }
}

export default connect(null, { addRate })(EventJoining);