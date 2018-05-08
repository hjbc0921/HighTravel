import React, { PropTypes } from 'react'
import styled from 'styled-components'
import { font, palette } from 'styled-theme'
import Button from '../../../components/atoms/Button'


const Wrapper = styled.div`
  font-family: ${font('primary')};
  color: ${palette('grayscale', 0)};
`

export const SignUp = ({ signUp, onSignUp }) => {
  let username,password,pwd_check;
  const onSignUpBtn = () => {
    if(password.value != pwd_check.value)
      throw "password is not same with pwd_check"
    else 	
      onSignUp(username.value, password.value);
  }
  return (
    <Wrapper>
        <div>username  : <input ref={node =>{username = node;}} /></div>
        <div>password  : <input ref={node =>{password = node;}} /></div>
        <div>pwd_check : <input ref={node =>{pwd_check =node;}} /></div>
        <Button type = "submit" onClick={onSignUpBtn}>SignUp</Button>
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
