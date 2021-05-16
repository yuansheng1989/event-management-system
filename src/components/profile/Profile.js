import React, { useEffect, useState } from "react";
import { Row, Col, Card, Avatar, Divider, Table } from "antd";
import { connect } from "react-redux";
import { setSiderMenu } from "../../redux/layout/actions";
import { UserOutlined } from "@ant-design/icons";
import { fetchEvents } from "../../redux/events/actions";
import { fetchHosts } from "../../redux/hosts/actions";
import { Link } from "react-router-dom";
import moment from "moment";

const mapStateToProps = (state) => {
  return {
    user: state.AuthReducer.user,
    events: state.EventsReducer.events,
    hosts: state.HostsReducer.hosts,
  };
};

const Profile = (props) => {
  const [userEvents, setUserEvents] = useState([]);
  const { setSiderMenu, fetchEvents, fetchHosts, user, events, hosts } = props;

  useEffect(() => {
    setSiderMenu("3");
    fetchEvents();
    fetchHosts();
  }, []);

  useEffect(() => {
    if (events && hosts) {
      const eventIds = hosts
        .filter((el) => el.email === user.email)
        .map((el) => el.eventId);
      const eventsArr = events
        .filter((el) => eventIds.includes(el.eventId))
        .map((el) => ({
          key: el.eventId,
          title: el.title,
          category: el.category,
          date: moment(el.date).format("MMMM Do, YYYY"),
        }));
      setUserEvents(eventsArr);
    }
  }, [events, hosts]);

  const tableColumns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      render: (text, record) => <Link to={`/Events/${record.key}`}>{text}</Link>,
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => <Link to={`/Events/${record.key}/edit`}>Edit</Link>,
    },
  ];

  return (
    <Row>
      <Col
        xxl={{ span: 12, offset: 6 }}
        lg={{ span: 14, offset: 5 }}
        sm={{ span: 20, offset: 2 }}
        xs={{ span: 24 }}
      >
        <h1 style={{ fontSize: "30px" }}>My Profile</h1>
        <Card bordered={false}>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginBottom: "20px",
            }}
          >
            <Avatar
              size={{ xs: 64, sm: 80, md: 90, lg: 128, xl: 160, xxl: 200 }}
              src={user.photoURL}
              icon={!user.photoURL && <UserOutlined />}
            />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              flexWrap: "wrap",
            }}
          >
            <div>
              <h3>User Name</h3>
              <p>{user && user.name}</p>
            </div>
            <div>
              <h3>Email Address</h3>
              <p>{user && user.email}</p>
            </div>
          </div>
        </Card>
        <Divider />
      </Col>
      <Col
        xxl={{ span: 12, offset: 6 }}
        lg={{ span: 14, offset: 5 }}
        sm={{ span: 20, offset: 2 }}
        xs={{ span: 24 }}
      >
        <h2>My Events</h2>
        <Table columns={tableColumns} dataSource={userEvents}></Table>
      </Col>
    </Row>
  );
};

export default connect(mapStateToProps, {
  setSiderMenu,
  fetchEvents,
  fetchHosts
})(Profile);
