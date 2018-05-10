import React, { PropTypes } from 'react'
import styled from 'styled-components'
import { font, palette } from 'styled-theme'
import Button from '../../../components/atoms/Button'

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
	/*if(username.value == '')
		throw "fill username"
	else if(password.value == '')
		throw "fill password"
	else if(username.value == '')
		throw "fill username"*/    // change state
  };//make function
  console.log(intro);
  return (
    <Wrapper>
      <InnerWrapper>
      <h1>뀨여닝 여행회사</h1>
      <input type="text" placeholder="username" ref={ref => { console.log(ref);username = ref;}}/>
	  <input type="password" placeholder="password" ref={node => {password = node;}}  />
      <p>Error message : {intro.errorMessage}</p>
	  <Button type="submit" onClick={onLoginBtn}>login</Button>
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
