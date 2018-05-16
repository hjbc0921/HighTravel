import React, { PropTypes } from 'react'
import styled from 'styled-components'
import { font, palette } from 'styled-theme'
import './../../item.css'
import Logout from "../../../containers/Logout"
import {Link} from 'react-router'
import {Layout, Menu, Breadcrumb } from 'antd';
const SubMenu = Menu.SubMenu;
const {Header,Content, Sider } = Layout;
const MenuItemGroup = Menu.ItemGroup;
import Icon from 'antd/lib/icon';
import 'antd/dist/antd.css';

const Head = () => {
  return (
    <Layout>
    <Sider
       collapsible
       collapsed={true}
       >
            
    <Menu
      theme="dark"
      mode="horizontal"
      defaultSelectedKeys={['2']}
      style={{ lineHeight: '64px'}}
    >
      <Menu.Item key="0">Hello, Alice!</Menu.Item>
      <Menu.Item key="1"><Link to="/test"><Icon type="home" />Home</Link></Menu.Item>
      <Menu.Item key="2"><Icon type="bars" />Rules</Menu.Item>
      
      <SubMenu title={<span><Icon type="wallet" />Money</span>}>

  <Menu.Item key="setting:1">Budget</Menu.Item>
  <Menu.Item key="setting:2">Expense</Menu.Item>
</SubMenu>
<Menu.Item key="3"><Link to="/test"><Icon type="camera-o" />Photo</Link></Menu.Item>
<Menu.Item key="4"><Link to="/test"><Icon type="edit" />Diary</Link></Menu.Item>

    </Menu>
  </Sider>
  </Layout>
  )
}

export default Head
