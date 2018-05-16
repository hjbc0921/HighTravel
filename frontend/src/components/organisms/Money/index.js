import React from 'react'
import { Tabs } from 'antd';
const TabPane = Tabs.TabPane;

const Money = () => {
  return (
    <Tabs defaultActiveKey="1">
    <TabPane tab="Budget" key="1">Content of Tab Pane 1</TabPane>
    <TabPane tab="Expense" key="2">Content of Tab Pane 2</TabPane>
    </Tabs>
  )
}

export default Money
