import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Header from '../components/header';
import Table from 'react-bootstrap/Table';

const Transaction = () => {
    return (
        <div className="transaction-main">
            <div className="container">
                <div className="header">
                    <Header />
                </div>
                <div className="row">
                    <div className="col-md-12 col-sm-12">
                        <div className="details-table-btn">
                            <ul className="btn-row">
                                <li> <Form.Control
                                    as="select"
                                    className="mr-sm-2 blue-select"
                                    id="inlineFormCustomSelect"
                                    custom
                                >
                                    <option value="0">Type</option>
                                    <option value="1">Dropdown1</option>
                                    <option value="2">Dropdown1</option>
                                    <option value="3">Dropdown1</option>
                                    <option value="3">Dropdown1</option>
                                    <option value="3">Dropdown1</option>
                                </Form.Control> </li>
                                <li> <input type="date" id="blue-input" /> </li>
                                <li> <Form.Control
                                    as="select"
                                    className="mr-sm-2 blue-select"
                                    id="inlineFormCustomSelect"
                                    custom
                                >
                                    <option value="0">Payment Method</option>
                                    <option value="1">Dropdown1</option>
                                    <option value="2">Dropdown1</option>
                                    <option value="3">Dropdown1</option>
                                    <option value="3">Dropdown1</option>
                                    <option value="3">Dropdown1</option>
                                </Form.Control>
                                </li>
                                <li> <Button id="orange-btn"> Back </Button> </li>
                            </ul>
                            <ul className="btn-row">
                                <li> <input type="text" id="blue-input" placeholder="From" /> </li>
                                <li> <input type="text" id="blue-input" placeholder="To" /> </li>
                                <li> <input type="text" id="blue-input" placeholder="Amount" /> </li>
                                <li> <textarea name="comment" form="usrform">Description...</textarea> </li>
                            </ul>
                            <div className="admin-checkbox">
                                <Form.Group controlId="formBasicCheckbox">
                                    <Form.Check checked type="checkbox" label="Confirmed" />
                                </Form.Group>
                            </div>
                            <ul className="btn-row">
                                <li> <Button id="red-btn"> Cancel Transaction </Button> </li>
                                <li> <Button id="green-btn"> Submit/Update Transaction </Button> </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Transaction;