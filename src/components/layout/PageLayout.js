import React, { Component } from "react";
import { Layout } from "antd";
import "antd/dist/antd.css";
import LayoutHeader from "./layoutHeader/LayoutHeader";
import LayoutSider from "./layoutSider/LayoutSider";
import LayoutContent from "./layoutContent/LayoutContent";
import { BrowserRouter as Router } from 'react-router-dom';

class PageLayout extends Component {
  state = {
    collapsed: false
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };
  
  render() {
    return (
      <Router>
        <Layout style={{minHeight: "100vh"}}>
          <LayoutSider collapsed={this.state.collapsed} />
          <Layout>
              <LayoutHeader collapsed={this.state.collapsed} toggle={this.toggle} />
              <LayoutContent />
          </Layout>
        </Layout>
      </Router>
    );
  }
}
  
  export default PageLayout;