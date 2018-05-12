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
      onSignUp(username.value, password.value, pwd_check.value);
  }
  return (
    <Wrapper>
        <div>
        {signUp.message}
        <div>username  : <input required ref={node =>{username = node;}} /></div>
        <div>password  : <input required type="password" ref={node =>{password = node;}} /></div>
        <div>pwd_check : <input required type="password" ref={node =>{pwd_check =node;}} /></div>
        <Button type = "submit" onClick={onSignUpBtn}>SignUp</Button>
        </div>
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
