import React, { PropTypes } from 'react'
import styled from 'styled-components'
import { font, palette } from 'styled-theme'
import Button from '../../../components/atoms/Button'
import {Link} from 'react-router'

const Wrapper = styled.div`
  font-family: ${font('primary')};
  color: ${palette('grayscale', 0)};
  text-align: center;
  margin: auto;
`;

const InnerWrapper = styled.div`
  display: inline-grid;
  margin-top: 20px;
`;

export const Intro = ({intro, onLogin}) => {

  let username, password;
  const onLoginBtn = () => {
    onLogin(username.value, password.value);
//<<<<<<< HEAD
	/*if(username.value == '')
		throw "fill username"
	else if(password.value == '')
		throw "fill password"
	else if(username.value == '')
		throw "fill username"*/    // change state
  };//make function
//  const onSignUpPageBtn = () => {
//     onSignUpPage();
//};

    username.value = ''
    password.value = ''
  console.log("index.js of Intro page#########");
 console.log(intro);
  };

  return (
    <Wrapper>
      <InnerWrapper>
      <h1>High, Travel!</h1>
      <input type="text" required placeholder="username" ref={ref => { console.log(ref);username = ref;}}/>
	  <input type="password" required placeholder="password" ref={node => {password = node;}}  />
      <p>{intro.message}</p>
	  <Button type="submit" onClick={onLoginBtn}>login</Button>
//	  <Button type="submit" onClick={onSignUpPageBtn}>Sign up</Button>
=======
      <Link to="/signup" > <Button> signup </Button> </Link>
      </InnerWrapper>
    </Wrapper>
  );
};

Intro.propTypes = {
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  errorMessage: PropTypes.string
}
Intro.defaultProps = {
  username: '',
  password: '',
  errorMessage: ''
};
export default Intro
