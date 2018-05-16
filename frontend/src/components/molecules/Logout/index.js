import React, { PropTypes } from 'react'
import {Button} from 'antd'
import {Link} from 'react-router'

const Logout = ({logout,onLogout }) => {
  const onLogoutBtn = () => {
    onLogout()
  }
  return (
      <Link to="/intro"> <Button type="default" onClick={onLogoutBtn}>logout</Button> </Link>
  )
}

Logout.propTypes = {
  reverse: PropTypes.bool,
  children: PropTypes.node,
}

export default Logout
