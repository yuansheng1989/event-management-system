import React, { Component } from 'react';
import { Row, Col, Calendar } from 'antd';
import 'antd/dist/antd.css';
import moment from 'moment';
import { Switch, Route } from "react-router-dom";
import Event from './event/Event';
import EventsList from './EventsList';
import AuthRoute from '../auth/AuthRoute';
import Comments from './event/comments/Comments';
import Attendees from './event/attendees/Attendees';

class Events extends Component {
    state = {
        date: moment().format('YYYY-MM-DD')
    }

    handleDateChange = (date) => {
        this.setState({
            date: moment(date).format('YYYY-MM-DD')
        });
    };

    render() {
        return (
            <Switch>
                <Route exact path="/">
                    <div
                        className="site-layout-background"
                        style={{
                            margin: '24px 16px',
                            padding: '24px',
                            minHeight: '280px',
                        }}
                    >
                        <Row>
                            <Col lg={15} md={24} sm={24}>
                                <EventsList date={this.state.date} />
                            </Col>
                            <Col lg={9} md={24} sm={24}>
                                <Calendar fullscreen={false} onChange={(date) => this.handleDateChange(date)} style={{minWidth: "281px"}} />
                            </Col>
                        </Row>
                    </div>
                </Route>
                <AuthRoute exact path="/events/:eventId">
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'center'
                        }}
                    >
                        <Event />
                    </div>
                </AuthRoute>
                <AuthRoute exact path="/events/:eventId/comments">
                    <div
                        className="site-layout-background"
                        style={{
                            margin: '24px 16px',
                            padding: '12px',
                            minHeight: '280px',
                        }}
                    >
                        <Comments />
                    </div>
                </AuthRoute>
                <AuthRoute exact path="/events/:eventId/Attendees">
                    <div
                        className="site-layout-background"
                        style={{
                            margin: '24px 16px',
                            padding: '12px',
                            minHeight: '280px',
                        }}
                    >
                        <Attendees />
                    </div>
                </AuthRoute>
            </Switch>
        );
    }
}

export default Events;