import React from 'react'
import Rules from '../../organisms/Rules'
import Diary from '../../organisms/Diary'
import HomePage from '../../organisms/HomePage'
import Map from '../../organisms/Map'
import Money from '../../organisms/Money'
import Photo from '../../organisms/Photo'

import AddUser from "../../../containers/AddUser";
import AddSchedule from "../../../containers/AddSchedule";
import TodoList from "../../../containers/TodoList";
import Logout from "../../../containers/Logout"
import {Link} from 'react-router'

//ANTD
import { Layout, Menu, Button, Affix, Row, Col} from 'antd';
const SubMenu = Menu.SubMenu;
const { Header, Content, Sider, Footer } = Layout;
const MenuItemGroup = Menu.ItemGroup;
import Icon from 'antd/lib/icon';
import 'antd/dist/antd.css';
import '../../item.css'

const Antd = ({antd,changeContent,toggleCol}) => {
    const handleClick = (e) => {
        changeContent(e.key)
    }
    const toggleCollapsed = () => {
        toggleCol(antd.collapsed)
    }
    return (
    <Layout>
        <Header style={{ background: '#002329' }}>
            <Row type="flex">
            <Col span={4}><Link to="/user"><Button icon="user" ghost> {sessionStorage.getItem('username')}</Button></Link></Col>
            <Col span={18}><div className="mytitle">Title</div></Col>
            <Col span={2}><Logout/></Col>
            </Row>
        </Header>
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
                selectedKeys={[antd.current]}
                defaultSelectedKeys={['1']}
                defaultOpenKeys={[]}
                style={{ height: '100%', borderRight: 0 }}
                >
                    <Menu.Item key="home"><Icon type="home" /><span>Home</span></Menu.Item>
                    <Menu.Item key="rules"><Icon type="profile" /><span>Rules</span></Menu.Item>
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
                    {(antd.current==="home") && <div> <HomePage/> </div>}
                    {(antd.current==="rules") && <div> <Rules/> </div>}
                    {(antd.current==="money") && <div> <Money/> </div>}
                    {(antd.current==="photo") && <div> <Photo/> </div>}
                    {(antd.current==="diary") && <div> <Diary/> </div>}
                    {(antd.current==="setting") && <div> <AddUser/> </div>}
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