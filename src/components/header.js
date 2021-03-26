import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Nav from 'react-bootstrap/Nav'
import Logo from '../images/logo.png'
import PandingTournaments from './../screens/PandingTournaments';
import { propTypes } from 'react-bootstrap/esm/Image';
import axios from 'axios';

const Header = (props) => {
    const handelLogOut = () => {
        axios({
            method: 'post',
            url: `http://143.110.254.46:8084/poker/rest-auth/logout/`,
            headers: {
              Authorization: "Token "+localStorage.getItem("accessToken")?.trim()
            }
          })
            .then(function (response) {
                console.log(response.data)
            });
    }
    return (
        <div className="header-main">
            <div className="container">
                <div className="row">
                    <div className="header">
                        <div className="header-logo">
                            <img src={Logo} />
                        </div>
                        <div className="header-navigation-btn">
                        <Nav defaultActiveKey="/tournaments" as="ul">
                        <Nav.Item as="li">
                            <Nav.Link className="orange-btn" href="/pendingtournaments">Tournaments</Nav.Link>
                        </Nav.Item>
                        <Nav.Item as="li">
                            <Nav.Link className="orange-btn" href="/account" eventKey="link-1">Account</Nav.Link>
                        </Nav.Item>
                        <Nav.Item as="li">
                            <Nav.Link className="orange-btn" href="/reporting-all-account-debt" eventKey="link-2">Reporting</Nav.Link>
                        </Nav.Item>
                        <Nav.Item as="li">
                            <Nav.Link className="orange-btn" href="/change_password" eventKey="link-3">My Admin</Nav.Link>
                        </Nav.Item>
                        <Nav.Item as="li">
                            <Nav.Link className="orange-btn" eventKey="link-4" onClick={() => handelLogOut()}>Logout</Nav.Link>
                        </Nav.Item>
                        </Nav>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header;