import React, { Component } from "react";
import { Row, Col, Calendar } from "antd";
import "antd/dist/antd.css";
import moment from "moment";
import EventsList from "./EventsList";
import { connect } from "react-redux";
import { setSiderMenu } from "../../redux/layout/actions";

class Events extends Component {
  state = {
    date: moment().format("YYYY-MM-DD"),
  };

  componentDidMount = () => {
    this.props.setSiderMenu("1");
  }
  
  handleDateChange = (date) => {
    this.setState({
      date: moment(date).format("YYYY-MM-DD"),
    });
  };

  render() {
    return (
      <Row>
        <Col lg={15} md={24} sm={24}>
          <EventsList date={this.state.date} />
        </Col>
        <Col lg={9} md={24} sm={24}>
          <Calendar
            fullscreen={false}
            onChange={(date) => this.handleDateChange(date)}
            style={{ minWidth: "281px" }}
          />
        </Col>
      </Row>
    );
  }
}

export default connect(null, { setSiderMenu })(Events);
