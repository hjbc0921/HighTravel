import React from 'react'
import { Tabs } from 'antd';
const TabPane = Tabs.TabPane;
import Budget from '../../../containers/Budget'
import Expense from '../../../containers/Expense'

const Money = () => {
  return (
    <Tabs defaultActiveKey="1">
    <TabPane tab="Budget" key="1"><Budget/></TabPane>
    <TabPane tab="Expense" key="2"><Expense/></TabPane>
    </Tabs>
  )
}

export default Money
