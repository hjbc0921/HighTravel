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

export const SignUp = ({ signUp, onSignUp }) => {
  let username,password,pwd_check;
    const onSignUpBtn = () => {
    onSignUp(username.value, password.value, pwd_check.value);
  }
  return (
  <Wrapper>
    <InnerWrapper>
    <div>
    <h1 className="hightravel">JOIN US</h1>
    <div><input placeholder="username" required ref={node =>{username = node;}} /></div>
    <div><input placeholder="password" required type="password" ref={node =>{password = node;}} /></div>
    <div><input placeholder="pwd check"required type="password" ref={node =>{pwd_check =node;}} /></div>
    <div className="mywarning">{signUp.message}</div>
    <Button id="button2" type="submit" style={{ width:'200px', margin: '4px 0' }} onClick={onSignUpBtn} icon="user-add">signup</Button> 
    </div>
    </InnerWrapper>
  </Wrapper>
  )
}

SignUp.propTypes = {
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  pwd_check: PropTypes.string.isRequired
}

SignUp.defaultProps = {
  username: '',
  password: '',
  pwd_check: ''
}

export default SignUp
