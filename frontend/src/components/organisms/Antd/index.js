import React from 'react'
import Rules from '../../organisms/Rules'
import Diary from '../../organisms/Diary'
import HomePage from '../../organisms/HomePage'
import Map from '../../organisms/Map'
import Money from '../../organisms/Money'
import Photo from '../../organisms/Photo'

import AddUser from "../../../containers/AddUser";
import Settings from "../../../containers/Settings";
import Logout from "../../../containers/Logout"
import {Link} from 'react-router'
import img from './../../image2.jpg';
//ANTD
import { Layout, Menu, Button, Affix, Row, Col} from 'antd';
const SubMenu = Menu.SubMenu;
const { Header, Content, Sider, Footer } = Layout;
const MenuItemGroup = Menu.ItemGroup;
import Icon from 'antd/lib/icon';
import 'antd/dist/antd.css';
import '../../item.css'
import styled from 'styled-components'
import { font, palette } from 'styled-theme'

const Wrapper = styled.div`
  background-image: url(${img});
  background-size: cover;
  width: 100vw;
  height: 20vh;
`;

const Antd = ({antd,menu,changeContent,toggleCol}) => {
    const handleClick = (e) => {
        changeContent(e.key)
    }
    const toggleCollapsed = () => {
        toggleCol(antd.collapsed)
    }
    const gotoUser = () => {
        sessionStorage.setItem('menu','home')
    }
    return (
    <Layout>
        <Wrapper>
        <Header style={{ height: '20vh', width: '100vw', background:'transparent' }}>
            <div className="verCenter">
            <Col span={2}><Link to="/user"><Button icon="user" ghost onClick={gotoUser}> {sessionStorage.getItem('username')}</Button></Link></Col>
            <Col span={20}><div className="mytitle">{sessionStorage.getItem("triptitle")}</div></Col>
            <Col span={2}><Logout/></Col>
            </div>
        </Header>
        </Wrapper>
        <Layout style={{ minHeight: '100vh' }}>
            <Sider width={200} style={{ background: '#fff' }}
            collapsible
            onCollapse={toggleCollapsed}
            collapsed={antd.collapsed}
            >
                <Menu
                mode="inline"
                theme="light"
                onClick={handleClick}
                selectedKeys={[sessionStorage.getItem('menu')]}
                defaultSelectedKeys={['home']}
                style={{ height: '100%', borderRight: 0 }}
                >
                    <Menu.Item key="home"><Icon type="home" /><span>Home</span></Menu.Item>
                    <Menu.Item key="rules"><Icon type="profile" /><span>Rules {"&"} Todos</span></Menu.Item>
                    <Menu.Item key="money"><Icon type="wallet" /><span>Money</span></Menu.Item>
                    <Menu.Item key="photo"><Icon type="camera-o" /><span>Photo</span></Menu.Item>
                    <Menu.Item key="diary"><Icon type="edit" /><span>Diary</span></Menu.Item>
                    {true &&
                    <Menu.Item key="setting"><Icon type="setting" /><span>Settings</span></Menu.Item>
                    }
                    
                </Menu>
            </Sider>
            <Layout style={{ padding: '10px 10px 10px',minHeight: '100vh' }}>
                <Content style={{ margin: '0 16px', }}>
                    <div style={{ padding: 24, background: '#fff', minHeight: '100vh' }}>
                    {(menu==="home" || menu===null) && <div> <HomePage/> </div>}
                    {(menu==="rules") && <div> <Rules/> </div>}
                    {(menu==="money") && <div> <Money/> </div>}
                    {(menu==="photo") && <div> <Photo/> </div>}
                    {(menu==="diary") && <div> <Diary/> </div>}
                    {(menu==="setting") && <div> <Settings/> </div>}
                    </div>
                </Content>
            </Layout>
        </Layout>
        <Footer className="footer">
        </Footer>
    </Layout>
    );
      
}


export default Antd
