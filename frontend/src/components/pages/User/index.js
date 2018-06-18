import React from 'react'
import User from '../../../containers/User'
import { Layout, Menu, Button, Affix, Row, Col} from 'antd';
const SubMenu = Menu.SubMenu;
const { Header, Content, Sider, Footer } = Layout;
import Logout from "../../../containers/Logout"
import styled from 'styled-components'
import { font, palette } from 'styled-theme'
import img from './../../image3.jpg';

const Wrapper = styled.div`
  background-image: url(${img});
  background-size: cover;
  width: 30vw;
  height: 100vh;
`;

const user = () => {
  return (
    <Layout>
      <Wrapper>
      <Sider style={{ background: 'transparent',minHeight: '100vh', width:'30vw' }}>
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
      </Wrapper>
      <Content>
      <div>
        <User/>
      </div>
      </Content>
    </Layout>
  )
}

export default user
