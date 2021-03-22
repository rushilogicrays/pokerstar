import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Logo from '../images/logo.png'
import PandingTournaments from './../screens/PandingTournaments';

const Header = () => {
    return (
        <div className="header-main">
            <div className="container">
                <div className="header">
                    <div className="header-logo">
                        <img src={Logo}/>
                    </div>
                    <div className="header-navigation-btn">
                        <Button id="header-btn">Tournaments</Button>
                        <Button id="header-btn">Account</Button>
                        <Button id="header-btn">Reporting</Button>
                        <Button id="header-btn">My Admin</Button>
                        <Button id="header-btn">Logout</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header;