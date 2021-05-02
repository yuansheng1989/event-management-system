import React, { Component } from "react";
import { Layout, Menu, Image } from "antd";
import "antd/dist/antd.css";
import {
    CoffeeOutlined,
    VideoCameraOutlined,
    UploadOutlined
} from '@ant-design/icons';
import './LayoutSider.css';
import { NavLink } from 'react-router-dom';

const { Sider } = Layout;

class LayoutSider extends Component {
    render() {
        return (
            <Sider trigger={null} collapsible collapsed={this.props.collapsed}>
                <Image className="logo" preview={false} src={"/img/logo.png"} />
                <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                    <Menu.Item key="1" icon={<CoffeeOutlined />}>
                        <NavLink to="/">Events</NavLink>
                    </Menu.Item>
                    <Menu.Item key="2" icon={<VideoCameraOutlined />}>
                    nav 2
                    </Menu.Item>
                    <Menu.Item key="3" icon={<UploadOutlined />}>
                    nav 3
                    </Menu.Item>
                </Menu>
            </Sider>
        );
    }
}

export default LayoutSider;