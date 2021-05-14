import React, { Component } from "react";
import { Layout } from "antd";
import Events from "../../events/Events";
import "antd/dist/antd.css";
import { Switch, Route } from "react-router-dom";
import AuthRoute from "../../auth/AuthRoute";
import Comments from "../../events/event/comments/Comments";
import Attendees from "../../events/event/attendees/Attendees";
import Event from "../../events/event/Event";
import CreateEvent from "../../events/CreateEvent";
import EditEvent from "../../events/EditEvent";
import Profile from "../../profile/Profile";

const { Content } = Layout;

class LayoutContent extends Component {
  render() {
    return (
      <Switch>
        <Content>
          <Route exact path="/">
            <div
              className="site-layout-background"
              style={{
                margin: "24px 16px",
                padding: "24px",
                minHeight: "280px",
              }}
            >
              <Events />
            </div>
          </Route>
          <AuthRoute exact path="/events/:eventId">
            <div
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Event />
            </div>
          </AuthRoute>
          <AuthRoute exact path="/events/:eventId/comments">
            <div
              className="site-layout-background"
              style={{
                margin: "24px 16px",
                padding: "12px",
                minHeight: "280px",
              }}
            >
              <Comments />
            </div>
          </AuthRoute>
          <AuthRoute exact path="/events/:eventId/Attendees">
            <div
              className="site-layout-background"
              style={{
                margin: "24px 16px",
                padding: "12px",
                minHeight: "280px",
              }}
            >
              <Attendees />
            </div>
          </AuthRoute>
          <AuthRoute exact path="/new-event">
            <div
              className="site-layout-background"
              style={{
                margin: "24px 16px",
                padding: "20px",
                minHeight: "280px",
              }}
            >
              <CreateEvent />
            </div>
          </AuthRoute>
          <AuthRoute exact path="/profile">
            <div
              className="site-layout-background"
              style={{
                margin: "24px 16px",
                padding: "20px",
                minHeight: "280px",
              }}
            >
              <Profile />
            </div>
          </AuthRoute>
          <AuthRoute exact path="/events/:eventId/edit">
            <div
              className="site-layout-background"
              style={{
                margin: "24px 16px",
                padding: "20px",
                minHeight: "280px",
              }}
            >
              <EditEvent />
            </div>
          </AuthRoute>
        </Content>
      </Switch>
    );
  }
}

export default LayoutContent;
