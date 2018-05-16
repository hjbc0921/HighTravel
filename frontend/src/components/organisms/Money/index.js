import React from 'react'
import { Tabs } from 'antd';
const TabPane = Tabs.TabPane;
//import Budget from '../../../containers/Budget'
//import Expense from '../../../containers/Expense'
import AddUser from "../../../containers/AddUser";

const Money = () => {
  return (
    <Tabs defaultActiveKey="1">
    <TabPane tab="Budget" key="1">add budget container</TabPane>
    <TabPane tab="Expense" key="2">add expense container</TabPane>
    </Tabs>
  )
}

export default Money
