import React, { PropTypes } from 'react'
import styled from 'styled-components'
import { font, palette } from 'styled-theme'
import Button from '../../../components/atoms/Button'
import {Link} from 'react-router'

const Wrapper = styled.div`
  font-family: ${font('primary')};
  color: ${palette('grayscale', 0)};
`

const Logout = ({logout,onLogout }) => {
  const onLogoutBtn = () => {
    onLogout()
  }
  return (
    <Wrapper>
      <div> Hello,{sessionStorage.getItem('username')} </div>
      <Link to="/intro"> <Button type="submit" onClick={onLogoutBtn}>logout</Button> </Link>
    </Wrapper>
  )
}

Logout.propTypes = {
  reverse: PropTypes.bool,
  children: PropTypes.node,
}

export default Logout
