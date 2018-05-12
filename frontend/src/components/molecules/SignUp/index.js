import React, { PropTypes } from 'react'
import styled from 'styled-components'
import { font, palette } from 'styled-theme'
import Button from '../../../components/atoms/Button'
import {Link} from 'react-router'

const Wrapper = styled.div`
  font-family: ${font('primary')};
  color: ${palette('grayscale', 0)};
`

export const SignUp = ({ signUp, onSignUp }) => {
  let username,password,pwd_check;
  const onSignUpBtn = () => {
    if(username.value == '')
      throw "fill username"
    else if(password.value == '')
      throw "fill password"
    else if(pwd_check.value == '')
      throw "type password confirmation"

    else if(password.value != pwd_check.value)
      throw "password is not same with pwd_check"
    else 	
      onSignUp(username.value, password.value);
  }
  return (
    <Wrapper>
        {!signUp.trying && !signUp.success && (
        <div>
        {signUp.message}
        <div>username  : <input ref={node =>{username = node;}} /></div>
        <div>password  : <input type="password" ref={node =>{password = node;}} /></div>
        <div>pwd_check : <input type="password" ref={node =>{pwd_check =node;}} /></div>
        <Button type = "submit" onClick={onSignUpBtn}>SignUp</Button>
        </div>
        )}
        {signUp.trying && !signUp.success && (
        <div>
        {signUp.message}
        <div>username  : <input ref={node =>{username = node;}} /></div>
        <div>password  : <input type="password" ref={node =>{password = node;}} /></div>
        <div>pwd_check : <input type="password" ref={node =>{pwd_check =node;}} /></div>
        <Button type = "submit" onClick={onSignUpBtn}>SignUp</Button>
        </div>
        )}
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

//export default SignUp
