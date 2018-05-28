import React, { PropTypes } from 'react'
import styled from 'styled-components'
import { font, palette } from 'styled-theme'
import {Link} from 'react-router'
import img from './../../image.jpg';
import { Input, Button} from 'antd';
import Icon from 'antd/lib/icon';
import 'antd/dist/antd.css';
import '../../item.css'

const Wrapper = styled.div`
  font-family: ${font('primary')};
  text-align: center;
  margin: auto;
  border: 1px solid #000;
  background-image: url(${img});
  background-size: cover;
  width: 100vw;
  height: 100vh;
`;

const InnerWrapper = styled.div`
  display: inline-grid;
  margin-top: 12vh;
  text-align: center;
`;

export const Intro = ({intro, onLogin, onSignup}) => {

  let username, password;
  
  const onLoginBtn = () => {
    if (username.value!=undefined && password.value!=undefined){
    onLogin(username.value, password.value);
    username.value = ''
    password.value = ''
    }
  } 
  const onSignBtn = () => {
    onSignup()
  }

return (
 <Wrapper>
  <InnerWrapper>
    <h1 className="hightravel">High, Travel!</h1>
    <div>
    <input type="text" required placeholder="username" ref={node => {username = node;}}/>
    </div>
    <div>
    <input type="password" required placeholder="password" ref={node => { password = node;}}  />
    </div>
    <div className="mywarning">{intro.message}</div>
    <div>
    <Button type="submit" style={{ width:'200px', margin: '4px 0' }} onClick={onLoginBtn} icon="login">login</Button> 
    </div>
    <div>
    <Link to="/signup" > <Button onClick={onSignBtn} icon="user-add" style={{ width:'200px',margin: '8px 0' }} > signup </Button> </Link> 
    </div>
  </InnerWrapper>
  </Wrapper>
);
};

Intro.propTypes = {
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
}

Intro.defaultProps = {
  username: '',
  password: '',
};

export default Intro
