import React from 'react'
import User from '../../../containers/User'
import { Layout, Menu, Button, Affix, Row, Col} from 'antd';
const SubMenu = Menu.SubMenu;
const { Header, Content, Sider, Footer } = Layout;
import AddTrip from '../../../containers/Addtrip'
import Logout from "../../../containers/Logout"

const user = () => {
  return (
    <Layout>
      <Sider style={{ background: '#002329',minHeight: '100vh' }}>
      <br></br>
      <br></br>
      <br></br>
      <div className="hellouser">
      {sessionStorage.getItem('username')}
      </div>
      <div className="hellouser">
      <Logout/>
      </div>
      </Sider>
      <Content>
      <div>
        <User/>
      </div>
      </Content>
    </Layout>
  )
}

export default user
