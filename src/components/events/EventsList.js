import React, { Component } from 'react';
import { List, Avatar, Space, Spin, message, Rate } from 'antd';
import { MessageOutlined, LikeOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import { connect } from 'react-redux';
import { fetchEvents } from '../../redux/events/actions';
import { fetchHosts } from '../../redux/hosts/actions';
import { toggleAuthModal } from '../../redux/auth/actions';
import styles from './index.module.scss';
import { Link } from 'react-router-dom';

const mapStateToProps = (state) => {
    return {
        events: state.EventsReducer.events,
        hosts: state.HostsReducer.hosts,
        eventsLoading: state.EventsReducer.loading,
        hostsLoading: state.HostsReducer.loading,
        isAuthenticated: state.AuthReducer.isAuthenticated
    }
}

const IconText = ({ icon, text }) => (
    <Space>
      {React.createElement(icon)}
      {text}
    </Space>
);

class EventsList extends Component {
    componentDidMount = () => {
        this.props.fetchEvents();
        this.props.fetchHosts();
    };

    componentWillReceiveProps = (nextProps) => {
        if (nextProps.date !== this.props.date) {
            this.props.fetchEvents({date: nextProps.date});
        }
    }

    handleClickEvent = (e) => {
        if (!this.props.isAuthenticated) {
            e.preventDefault();
            message.info("Please login first");
            this.props.toggleAuthModal({isAuthModalVisible: true, authModalType: "login"});
        }
    };

    getAvatar = (event) => {
        for (const host of this.props.hosts) {
            if (event.eventId === host.eventId) {
                return host.photoUrl;
            }
        }
        return "";
    }

    getEventPicture = (event) => {
        switch (event.category) {
            case "culture":
                return (
                    <img
                        width={272}
                        height={150}
                        alt="culture"
                        src="/img/culture.jpg"
                    />
                );
            case "film":
                return (
                    <img
                        width={272}
                        height={150}
                        alt="film"
                        src="/img/film.jpg"
                    />
                );
            case "food":
                return (
                    <img
                        width={272}
                        height={150}
                        alt="food"
                        src="/img/food.jpg"
                    />
                );
            case "music":
                return (
                    <img
                        width={272}
                        height={150}
                        alt="music"
                        src="/img/music.jpg"
                    />
                );
            case "travel":
                return (
                    <img
                        width={272}
                        height={150}
                        alt="travel"
                        src="/img/travel.jpg"
                    />
                );
            default:
                return null;
        }
    }

    getAverageRate = (rates) => {
        return rates.map((ele) => {
            return ele.rate
        }).reduce((total, rate) => {
            return total + rate;
        }, 0) / rates.length;
    }

    render() {
        return (
            <Spin spinning={this.props.eventsLoading}>
                <List
                    itemLayout="vertical"
                    size="large"
                    pagination={{
                        onChange: page => {
                        console.log(page);
                        },
                        pageSize: 3,
                    }}
                    dataSource={this.props.events}
                    footer={
                        <div>
                        Let's meet up!
                        </div>
                    }
                    renderItem={item => (
                        <List.Item
                            className={styles.event_list_item}
                            key={item.eventId}
                            actions={[
                                <Rate disabled allowHalf defaultValue={2.5}  value={this.getAverageRate(item.rate)} />,
                                <IconText icon={LikeOutlined} text="156" key="list-vertical-like-o" />,
                                <IconText icon={MessageOutlined} text={item.comments.length} key="list-vertical-message" />,
                            ]}
                            extra={
                                this.getEventPicture(item)
                            }
                        >
                            <List.Item.Meta
                                avatar={<Avatar src={ this.getAvatar(item) } />}
                                title={<Link to={`/events/${item.eventId}`} onClick={this.handleClickEvent}>{item.title}</Link>}
                                description={item.description}
                            />
                        </List.Item>
                    )}
                />
            </Spin>
        );
    }
}

export default connect(mapStateToProps, { fetchEvents, fetchHosts, toggleAuthModal })(EventsList);