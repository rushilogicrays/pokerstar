import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const ChangePassword = () => {
    const [changePassword, setChangePassword] = useState(undefined);
    const [newPassword1, setNewPassword1] = useState(undefined);
    const [newPassword2, setNewPassword2] = useState(undefined);

    return (
        <div className="login-page-main">
            <div className="container">
                <div className="login-form">
                    <Form className="form-field">
                        <h1> Change Password </h1>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Curent Password</Form.Label>
                            <Form.Control value={changePassword} type="password" placeholder="Curent Password" onChange={(e) => setChangePassword(e.target.value)}/>
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
                            <Button id="orange-btn" variant="primary" type="submit">Change Password</Button>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    )
}

export default ChangePassword;