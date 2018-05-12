import React from 'react'
import './header.css'
import {Link} from 'react-router-dom'

const Header = () => {
    return (
        <div className="header">
            <Link to="/" className="item"> Home </Link>
            <Link to="/rules" className="item"> Rule </Link>
        </div>
    )
}

export default Header;