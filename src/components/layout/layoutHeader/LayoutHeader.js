import React, { Component } from "react";
import { Avatar, Layout, Button, Menu, Dropdown } from "antd";
import 'antd/dist/antd.css';
import "./LayoutHeader.css";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined
} from '@ant-design/icons';
import AuthModal from '../../auth/AuthModal';
import { connect } from 'react-redux';
import { logout, toggleAuthModal } from '../../../redux/auth/actions';

const { Header } = Layout;

const mapStateToProps = (state) => {
  return {
    ...state.AuthReducer
  };
};

class LayoutHeader extends Component {
  loginModal = () => {
    this.props.toggleAuthModal({isAuthModalVisible: true, authModalType: "login"});
  }

  signUpModal = () => {
    this.props.toggleAuthModal({isAuthModalVisible: true, authModalType: "signUp"});
  }

  render() {
    const menu = (
      <Menu>
        <Menu.Item>
          <a onClick={e => e.preventDefault()}>
            Setting
          </a>
        </Menu.Item>
        <Menu.Item>
          <a onClick={
            e => {
              e.preventDefault();
              this.props.logout();
            }
          }>
            Logout
          </a>
        </Menu.Item>
      </Menu>
    );

    return (
      <Header className="site-layout-background header-layout">
          <div>
            {
              React.createElement(this.props.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                className: 'trigger',
                onClick: this.props.toggle,
              })
            }
          </div>
          {this.props.isAuthenticated ? (
            <div className="user-auth">
              <Avatar src={this.props.user.photoURL} icon={!this.props.user.photoURL && <UserOutlined />} style={{marginRight: "10px"}}/>
              <Dropdown overlay={menu}>
                <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                  {this.props.user.name}
                </a>
              </Dropdown>
            </div>
          ) : (
            <div className="buttons">
              <Button className="header-button" type="primary" onClick={this.loginModal}>Login</Button>
              <Button className="header-button" type="primary" onClick={this.signUpModal}>Sign Up</Button>
            </div>
          )}
          <AuthModal />
      </Header>
    );
  }
}

export default connect(mapStateToProps, { logout, toggleAuthModal })(LayoutHeader);