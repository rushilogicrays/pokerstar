import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import axios from 'axios';

const ChangePassword = (props) => {
    const [oldPassword, setOldPassword] = useState(undefined);
    const [newPassword1, setNewPassword1] = useState(undefined);
    const [newPassword2, setNewPassword2] = useState(undefined);
    console.log("local --->", localStorage.getItem("accessToken")?.trim())
    const handelSave = (event) => {
        axios({
            method: 'post',
            url: `http://143.110.254.46:8084/poker/rest-auth/password/change/`,
            data: {
                    old_password: oldPassword,
                    new_password1: newPassword1,
                    new_password2: newPassword2,
            },
            headers: {
              Authorization: "Token "+localStorage.getItem("accessToken")?.trim()
            }
        })
            .then(function (response) {
                console.log("res --->", response.data);
            });
        event.preventDefault();
    }
    return (
        <div className="login-page-main">
            <div className="container">
                <div className="login-form">
                    <Form className="form-field">
                        <h1> Change Password </h1>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Curent Password</Form.Label>
                            <Form.Control value={oldPassword} type="password" placeholder="Curent Password" onChange={(e) => setOldPassword(e.target.value)}/>
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>New Password</Form.Label>
                            <Form.Control value={newPassword1} type="password" placeholder="New Password" onChange={(e) => setNewPassword1(e.target.value)}/>
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>New Password</Form.Label>
                            <Form.Control value={newPassword2} type="password" placeholder="New Password" onChange={(e) => setNewPassword2(e.target.value)}/>
                        </Form.Group>

                        <div className="action-btn">
                            <Button id="orange-btn" variant="primary" type="submit" onClick={(e) => handelSave(e)}>Change Password</Button>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    )
}

export default ChangePassword;