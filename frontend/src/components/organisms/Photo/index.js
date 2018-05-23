import React from 'react'
import { Tabs } from 'antd';
const TabPane = Tabs.TabPane;
import Icon from 'antd/lib/icon';

const Photo = () => {
  return (
    <Tabs defaultActiveKey="1">
    <TabPane tab="Photos" key="1">add photos container</TabPane>
    <TabPane tab={<span><Icon type="plus" />add</span>} key="2">add AddPhoto container</TabPane>
    </Tabs>
  )
}

export default Photo
