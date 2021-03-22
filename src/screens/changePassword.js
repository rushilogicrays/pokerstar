import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const ChangePassword = () => {
    return (
        <div className="login-page-main">
            <div className="container">
                <div className="login-form">
                    <Form className="form-field">
                        <h1> Change Password </h1>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Curent Password</Form.Label>
                            <Form.Control type="password" placeholder="Curent Password" />
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>New Password</Form.Label>
                            <Form.Control type="password" placeholder="New Password" />
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>New Password</Form.Label>
                            <Form.Control type="password" placeholder="New Password" />
                        </Form.Group>

                        <div className="action-btn">
                            <Button variant="primary" type="submit">Change Password</Button>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    )
}

export default ChangePassword;