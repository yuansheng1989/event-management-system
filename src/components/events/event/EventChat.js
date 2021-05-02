import React, { Component } from 'react';
import styles from '../index.module.scss';
import { Comment, Avatar, Form, Button, List, Input } from 'antd';
import 'antd/dist/antd.css';
import moment from 'moment';
import { connect } from 'react-redux';
import { addComment } from '../../../redux/events/actions';
import { UserOutlined } from '@ant-design/icons';
import { withRouter } from 'react-router-dom';

const { TextArea } = Input;

const CommentList = ({ comments }) => (
    <List
        dataSource={comments.slice(0, 10)}
        header={`${comments.length} ${comments.length > 1 ? 'replies' : 'reply'}`}
        itemLayout="horizontal"
        renderItem={item => 
            <Comment author={item.name}
                avatar={<Avatar src={item.photoURL} icon={!item.photoURL && <UserOutlined />} alt={item.name}/>}
                content={item.comment}
                datetime={moment(item.createAt).fromNow()}
            />

        }
    />
);

const Editor = ({ onChange, onSubmit, submitting, value }) => (
    <>
      <Form.Item>
        <TextArea rows={4} onChange={onChange} value={value} />
      </Form.Item>
      <Form.Item>
        <Button
            htmlType="submit"
            loading={submitting}
            onClick={onSubmit}
            type="primary"
            style={{
                backgroundColor: "#13a9b0",
                borderColor: "#13a9b0",
                borderRadius:" 6px",
                width: "150px"
            }}
        >
          Add Comment
        </Button>
      </Form.Item>
    </>
);

class EventChat extends Component {
    state = {
        value: ''
    }

    handleChange = e => {
        this.setState({
          value: e.target.value,
        });
    };

    handleSubmit = async () => {
        if (!this.state.value) {
            return;
        }

        await this.props.addComment({
          EventId: this.props.events[0].eventId,
          comment: this.state.value,
          name: this.props.user.name,
          photoURL: this.props.user.photoURL,
          createAt: moment()
        });

        this.setState({
          value: ""
        });
    };

    handleLoadMoreClick = () => {
        this.props.history.push(`/events/${this.props.match.params.eventId}/comments`);
    };

    render() {
        const { value } = this.state;
        const { events, user, eventsLoading } = this.props

        return (
            <div className={styles.event_chat}>
                <div className={styles.event_chat_title}>
                    Chat about this event
                </div>  
                <div className={styles.event_chat_comment}>
                    {
                        events && events.length > 0 && events[0].comments.length > 0 &&
                        <CommentList comments={events[0].comments} />
                    }
                    {
                        events && events.length > 0 && events[0].comments.length > 10 &&
                        <div style={{display: "flex", justifyContent: "center"}}>
                            <Button
                                onClick={this.handleLoadMoreClick}
                                type="primary"
                                style={{
                                    backgroundColor: "#13a9b0",
                                    borderColor: "#13a9b0",
                                    borderRadius:" 6px",
                                    width: "150px"
                                }}
                            >
                                Load more
                            </Button>
                        </div>
                    }
                    <Comment
                        avatar={<Avatar src={user.photoURL} icon={!user.photoURL && <UserOutlined />} alt={user.name} />}
                        content={
                            <Editor
                                onChange={this.handleChange}
                                onSubmit={this.handleSubmit}
                                submitting={eventsLoading}
                                value={value}
                            />
                        }
                    />
                </div>
            </div>
        );
    }
}

export default connect(null, { addComment })(withRouter(EventChat));