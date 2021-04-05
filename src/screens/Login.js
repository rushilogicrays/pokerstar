import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import axios from 'axios';

const Login = (props) => {
    const [userName, setUserName] = useState(undefined);
    const [password, setPassword] = useState(undefined);
    const [error, setError] = useState(false);
    const submitLogin = (event) => {
        //console.log("here");
        axios({
            method: 'post',
            url: 'http://143.110.254.46:8084/poker/rest-auth/login/',
            data: {
                username : userName,
                password : password
            } 
          })
            .then(function (response) {
                console.log("res ---->",response);
                localStorage.setItem("accessToken", response.data.key)
            })
            .then(response => {
                axios({
                    method: 'get',
                    url: 'http://143.110.254.46:8084/poker/rest-auth/user/',
                    headers: {
                      Authorization: "Token "+localStorage.getItem("accessToken")?.trim()
                    }
                  })
                    .then(function (response) {
                        console.log("pk ---->", response.data)
                        localStorage.setItem("pk", response.data.pk)
                        props.history.push('/pendingtournaments')
                });
            })
            .catch(error => setError(true))
        event.preventDefault();
    }
    return (
        <div className="login-page-main">
            <div className="container">
                <div className="login-form">
                    <Form className="form-field">
                        <h1> Login </h1>
                        <Form.Group>
                            <Form.Label>UserName</Form.Label>
                            <Form.Control 
                                type="username" 
                                placeholder="Enter username" 
                                onChange={(e) => setUserName(e.target.value)} 
                            />
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control 
                                type="password" 
                                placeholder="Password" 
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </Form.Group>

                        <div className="action-btn">
                            {/* <Link to="/change_password">Forgot Password</Link> */}
                            <Button id="orange-btn" variant="primary" type="submit" onClick={e => submitLogin(e)}>Submit</Button>
                        </div>
                        {error && <div>
                            <p style={{color: "red", marginTop: 10}}>please enter correct username and password</p>
                        </div>}
                    </Form>
                </div>
            </div>
        </div>
    )
}

export default Login;