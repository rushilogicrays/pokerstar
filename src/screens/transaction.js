import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Header from '../components/header';

const Transaction = () => {
    return (
        <div className="transaction-main">
            <div className="container">
                <div className="header">
                    <Header />
                </div>
                <div className="row">
                    <div className="col-md-12 col-sm-12">
                        <div className="transaction-feild">
                            <div className="back-type-action mb-4">
                                <div className="row">
                                    <div className="col-md-6 col-sm-6 mb-4">
                                        <Form.Control
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
                                        </Form.Control>
                                    </div>
                                    <div className="col-md-6 col-sm-6 text-right mb-4">
                                        <Button id="orange-btn"> Back </Button>
                                    </div>
                                    <div className="col-md-6 col-sm-6 mb-4"><input type="date" className="date-input" /> </div>
                                    <div className="col-md-6 col-sm-6 mb-4">
                                        <Form.Control
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
                                    </div>
                                    <div className="col-md-4 col-sm-4 mb-4">
                                        <input type="text" className="input-text" placeholder="From" />
                                    </div>
                                    <div className="col-md-4 col-sm-4 mb-4">
                                        <input type="text" className="input-text" placeholder="To" />
                                    </div>
                                    <div className="col-md-4 col-sm-4 mb-4">
                                        <input type="text" className="input-text" placeholder="Amount" />
                                    </div>
                                    <div className="col-md-12 col-sm-12 mb-4">
                                        <textarea className="textarea-text" name="comment" form="usrform">Description...</textarea>
                                    </div>
                                    <div className="col-md-12 col-sm-12 mb-4">
                                        <Form.Group controlId="formBasicCheckbox">
                                            <Form.Check checked type="checkbox" label="Confirmed" />
                                        </Form.Group>
                                    </div>
                                    <div className="col-md-6 col-sm-6">
                                        <Button id="red-btn"> Cancel Transaction </Button>
                                    </div>
                                    <div className="col-md-6 col-sm-6">
                                        <Button id="green-btn"> Submit/Update Transaction </Button>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Transaction;