import React, { PropTypes } from 'react'
import styled from 'styled-components'
import { font, palette } from 'styled-theme'
import './../../item.css'
import {Link} from 'react-router'

const Header = () => {
  return (
    <div className="header">
      <Link to="/" className="item"> Home </Link>
      <Link to="/rules" className="item"> Rule </Link>
      <Link to="/money" className="item"> Money </Link>
      <Link to="/photo" className="item"> Photo </Link>
      <Link to="/diary" className="item"> Diary </Link>
    </div>
  )
}

export default Header
