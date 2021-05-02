import React, { Component } from "react";
import { Row, Col } from "antd";
import { getCommentsAPI } from "../../../../api/events/events.api";
import { withRouter } from "react-router-dom";
import { message } from "antd";
import CommentsList from "./CommentsList";
import CommentsSearch from "./CommentsSearch";

class Comments extends Component {
  state = {
    comments: [],
  };

  setComments = (comments) => {
    this.setState({
      comments,
    });
  };

  componentDidMount = async () => {
    try {
      const response = await getCommentsAPI({
        eventId: this.props.match.params.eventId,
      });
      if (response.data) {
        this.setState({
          comments: response.data,
        });
      } else {
        message.error("Fail to get comments");
      }
    } catch (error) {
      message.error("Fail to get comments");
    }
  };

  render() {
    return (
      <Row>
        <Col span={24}>
          <Row>
            <Col span={24} style={{ padding: "0px 25px" }}>
              <CommentsSearch setComments={this.setComments} />
            </Col>
          </Row>
          <Row>
            <Col span={24} style={{ padding: "8px 25px" }}>
              <CommentsList comments={this.state.comments} />
            </Col>
          </Row>
        </Col>
      </Row>
    );
  }
}

export default withRouter(Comments);
