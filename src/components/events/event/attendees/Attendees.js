import React, { Component } from "react";
import { getAttendeesAPI } from "../../../../api/events/events.api";
import { withRouter } from "react-router-dom";
import { message, Row, Col, Card, Tooltip, Pagination } from "antd";

const { Meta } = Card;

class Attendees extends Component {
  state = {
    attendees: [],
    page: 1,
    pageSize: 12
  };

  componentDidMount = async () => {
    try {
      const response = await getAttendeesAPI({
        eventId: this.props.match.params.eventId,
      });
      if (response.data) {
        this.setState({
          attendees: response.data,
        });
      } else {
        message.error("Fail to get attendees");
      }
    } catch (error) {
      message.error("Fail to get attendees");
    }
  };

  handlePageChange = (page) => {
      this.setState({
          page: page
      });
  };

  render() {
    const { attendees, page, pageSize } = this.state;
    const attendeesByPage = attendees.slice(pageSize * page- pageSize, pageSize * page);

    return (
      <>
        <Row>
          <Col span={24}>
            <h1 style={{ fontSize: "25px" }}>All Attendees</h1>
          </Col>
        </Row>
        <Row>
          {attendeesByPage.map((attendee) => {
            return (
              <Col sm={24} md={12} lg={8} xl={6} xxl={4}>
                <Card
                  style={{ width: 220, marginBottom: 20 }}
                  cover={<img alt={attendee.name} src={attendee.photoURL} />}
                >
                  <Meta
                    title={
                      <Tooltip title={attendee.name}>{attendee.name}</Tooltip>
                    }
                    description={
                      <a
                        href={`mailto:${attendee.email}`}
                        style={{ color: "rgba(0, 0, 0, 0.45)" }}
                      >
                        <Tooltip title={attendee.email} placement="bottom">
                          {attendee.email}
                        </Tooltip>
                      </a>
                    }
                  />
                </Card>
              </Col>
            );
          })}
        </Row>
        <Row>
          <Col span={24}>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Pagination current={page} total={attendees.length} pageSize={pageSize} onChange={this.handlePageChange} />
            </div>
          </Col>
        </Row>
      </>
    );
  }
}

export default withRouter(Attendees);
