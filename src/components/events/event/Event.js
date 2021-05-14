import React, { Component } from 'react';
import { Row, Col } from 'antd';
import 'antd/dist/antd.css';
import EventJoining from './EventJoining';
import EventInfo from './EventInfo';
import EventChat from './EventChat';
import EventPeople from './EventPeople';
import {withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchEvents } from '../../../redux/events/actions';
import { fetchHosts } from '../../../redux/hosts/actions';
import { setSiderMenu } from "../../../redux/layout/actions";

const mapStateToProps = (state) => {
    return {
        events: state.EventsReducer.events,
        hosts: state.HostsReducer.hosts,
        eventsLoading: state.EventsReducer.loading,
        hostsLoading: state.HostsReducer.loading,
        user: state.AuthReducer.user
    }
};

class Event extends Component {
    componentDidMount = () => {
        this.props.fetchEvents({eventId: this.props.match.params.eventId});
        this.props.fetchHosts({eventId: this.props.match.params.eventId});
        this.props.setSiderMenu("1");
    }

    render() {
        return (
            <Row style={{maxWidth: "1000px"}}>
                <Col span={16}>
                    <Row>
                        <Col span={24} style={{padding: "8px"}}>
                            <EventJoining
                                events={this.props.events}
                                hosts={this.props.hosts}
                                eventsLoading={this.props.eventsLoading}
                                hostsLoading={this.props.hostsLoading}
                                user={this.props.user}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24} style={{padding: "8px"}}>
                            <EventInfo
                                events={this.props.events}
                                hosts={this.props.hosts}
                                eventsLoading={this.props.eventsLoading}
                                hostsLoading={this.props.hostsLoading}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24} style={{padding: "8px"}}>
                            <EventChat
                                events={this.props.events}
                                hosts={this.props.hosts}
                                eventsLoading={this.props.eventsLoading}
                                hostsLoading={this.props.hostsLoading}
                                user={this.props.user}
                            />
                        </Col>
                    </Row>
                </Col>
                <Col span={8} style={{padding: "8px"}}>
                    <EventPeople
                        events={this.props.events}
                        hosts={this.props.hosts}
                        eventsLoading={this.props.eventsLoading}
                        hostsLoading={this.props.hostsLoading}
                    />
                </Col>
            </Row>
        );
    }
}

export default connect(mapStateToProps, {fetchEvents, fetchHosts, setSiderMenu})(withRouter(Event));