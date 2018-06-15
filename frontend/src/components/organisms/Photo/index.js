import React from 'react'
import { Tabs } from 'antd';
const TabPane = Tabs.TabPane;
import Icon from 'antd/lib/icon'
import AddPhoto from "../../../containers/AddPhoto";
import PhotoList from "../../../containers/Photos";
;

export const Photo = () => {

//  const onPhotoTab = () =>{
//   console.log("onPhotoTab");
//   onPhoto();
//  }
  return (
    <Tabs defaultActiveKey="1">
    <TabPane tab="Photos"  key="1"><PhotoList/></TabPane>
    <TabPane tab={<span><Icon type="plus" />add</span>} key="2"><AddPhoto/></TabPane>
    </Tabs>
  )
}

export default Photo
