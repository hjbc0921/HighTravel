import React from 'react'
import { Tabs } from 'antd';
const TabPane = Tabs.TabPane;
import Icon from 'antd/lib/icon';

const Diary = () => {
  return (
    <Tabs defaultActiveKey="1">
    <TabPane tab="Diaries" key="1">Content of Tab Pane 1</TabPane>
    <TabPane tab={<span><Icon type="plus" />add</span>} key="2">Content of Tab Pane 2</TabPane>
    </Tabs>
  )
}

export default Diary
