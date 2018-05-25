import React from 'react'
import { Tabs } from 'antd';
const TabPane = Tabs.TabPane;
import Icon from 'antd/lib/icon'
import AddPhoto from "../../../containers/AddPhoto";
;

const Photo = () => {
  return (
    <Tabs defaultActiveKey="1">
    <TabPane tab="Photos" key="1">add Photo container</TabPane>
    <TabPane tab={<span><Icon type="plus" />add</span>} key="2"><AddPhoto/></TabPane>
    </Tabs>
  )
}

export default Photo
