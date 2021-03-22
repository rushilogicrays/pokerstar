import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import axios from 'axios';

const Login = (event) => {
    const submitLogin = () => {
        axios({
            method: 'post',
            url: 'http://143.110.254.46/poker/rest-auth/login/',
            data: {
                username : "poker",
                password : "poker"
            } 
          })
            .then(function (response) {
              console.log("res ---->", response.data);
            });
        event.preventDefault();
    }
    return (
        <div className="login-page-main">
            <div className="container">
                <div className="login-form">
                    <Form className="form-field">
                        <h1> Login </h1>
                        <Form.Group>
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="username" placeholder="Enter email" />
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" />
                        </Form.Group>

                        <div className="action-btn">
                            <Link to="/change_password">Forgot Password</Link>
                            <Button variant="primary" type="submit" onClick={e => submitLogin(e)}>Submit</Button>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    )
}

export default Login;