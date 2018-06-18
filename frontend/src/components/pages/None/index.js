import React from 'react'
import './index.css'
import img from './../../image.jpg';
import {Link} from 'react-router'
import { Input, Button} from 'antd';
import Icon from 'antd/lib/icon';
import 'antd/dist/antd.css';
import styled from 'styled-components'
import { font, palette } from 'styled-theme'


const Wrapper = styled.div`
  font-family: ${font('primary')};
  text-align: center;
  margin: auto;
  background-image: url(${img});
  background-size: cover;
  width: 100%;
  height: 100vh;
`;

const InnerWrapper = styled.div`
width: 100%;
height: 100vh;
  text-align: center;
  background-color:black;
  background-size: cover;
  opacity:0.7;
`;

const None = () => {
  return (
    <Wrapper>
      <InnerWrapper>
      <div className="vs">
      <div className="topvs">
      <div className="title">404 Page not found</div>
      <div className="title">Redirect to...</div>
      </div>
      <div className="botvs">
      <Link to="/signup" > <Button icon="user-add" style={{ width:'200px',margin: '8px 0' }} > signup </Button> </Link>
      </div>
      <div> 
      <Link to="/intro" > <Button icon="login" style={{ width:'200px',margin: '8px 0' }} > login </Button> </Link> 
      </div>
      <div>
      <Link to="/user" > <Button icon="user" style={{ width:'200px',margin: '8px 0' }} > user page </Button> </Link> 
      </div>
      </div>
      </InnerWrapper>
    </Wrapper>
  )
}

export default None
