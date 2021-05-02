import React, { Component } from 'react';
import { Layout } from 'antd';
import Events from '../../events/Events'
import 'antd/dist/antd.css';

const { Content } = Layout;

class LayoutContent extends Component {
  render() {
    return (
      <Content>
        <Events />
      </Content>
    );
  }
}

export default LayoutContent;