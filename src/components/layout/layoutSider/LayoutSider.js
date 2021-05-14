import React, { Component } from "react";
import { Layout, Menu, Image, message } from "antd";
import "antd/dist/antd.css";
import {
  CoffeeOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import "./LayoutSider.css";
import { NavLink } from "react-router-dom";
import { toggleAuthModal } from "../../../redux/auth/actions";
import { setSiderMenu } from "../../../redux/layout/actions";
import { connect } from "react-redux";

const { Sider } = Layout;

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.AuthReducer.isAuthenticated,
    siderMenuKey: state.LayoutReducer.siderMenuKey
  };
};

class LayoutSider extends Component {
  handleMenuClick = (e) => {
    if ((e.key === "2" || e.key === "3") && !this.props.isAuthenticated) {
      message.info("Please login first");
      this.props.toggleAuthModal({
        isAuthModalVisible: true,
        authModalType: "login",
      });
    } else {
      this.props.setSiderMenu(e.key);
    }
  }

  render() {
    return (
      <Sider trigger={null} collapsible collapsed={this.props.collapsed}>
        <Image className="logo" preview={false} src={"/img/logo.png"} />
        <Menu theme="dark" mode="inline" selectedKeys={[this.props.siderMenuKey]} onClick={this.handleMenuClick}>
          <Menu.Item key="1" icon={<CoffeeOutlined />}>
            <NavLink to="/">Events</NavLink>
          </Menu.Item>
          <Menu.Item key="2" icon={<VideoCameraOutlined />}>
            <NavLink to="/new-event">
              Create Event
            </NavLink>
          </Menu.Item>
          <Menu.Item key="3" icon={<UploadOutlined />}>
            <NavLink to="/profile">
              Profile
            </NavLink>
          </Menu.Item>
        </Menu>
      </Sider>
    );
  }
}

export default connect(mapStateToProps, { toggleAuthModal, setSiderMenu })(LayoutSider);
