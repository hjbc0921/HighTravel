import React from 'react'
import { Tabs } from 'antd';
const TabPane = Tabs.TabPane;
import Icon from 'antd/lib/icon';
import AddDiary from '../../../containers/AddDiary'

const Diary = () => {
  return (
    <Tabs defaultActiveKey="1">
    <TabPane tab="Diaries" key="1">Content of Tab Pane 1</TabPane>
    <TabPane tab={<span><Icon type="plus" />add</span>} key="2"><AddDiary/></TabPane>
    </Tabs>
  )
}

export default Diary
