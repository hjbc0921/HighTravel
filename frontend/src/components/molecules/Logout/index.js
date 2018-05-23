import React, { PropTypes } from 'react'
import {Button} from 'antd'
import {Link} from 'react-router'
import Icon from 'antd/lib/icon';

const Logout = ({logout,onLogout }) => {
  const onLogoutBtn = () => {
    onLogout()
  }
  return (
      <Link to="/intro"> <Button type="default" icon="logout" onClick={onLogoutBtn} ghost>Logout</Button> </Link>
  )
}

Logout.propTypes = {
  reverse: PropTypes.bool,
  children: PropTypes.node,
}

export default Logout
