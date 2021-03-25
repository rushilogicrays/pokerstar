import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Header from '../components/header';
import Table from 'react-bootstrap/Table';


const AccountDetails = () => {
    return (
        <div className="account-details-page-main">
            <div className="header container">
                <Header />
            </div>
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        <div className="account-name-details">
                            <ul className="btn-row">
                                <li> <span className="magenta-value"> Account Name </span> </li>
                                <li> <span className="magenta-value"> Account Balance </span> </li>
                            </ul>
                            <ul className="btn-row">
                                <li> <Button id="purple-btn"> Show All </Button> </li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="account-deposit-btn">
                            <ul className="btn-row">
                                <li> <Button id="pink-btn"> Deposit </Button> </li>
                                <li> <Button id="pink-btn"> Withdrawal </Button> </li>
                            </ul>
                            <ul className="btn-row">
                                <li> <Button id="pink-btn"> Manual </Button> </li>
                                <li> <Button id="pink-btn"> Deducation </Button> </li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-md-12 col-sm-12">
                        <div className="account-transaction">
                            <p>Last 10 Transaction</p>
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>Tournament ID</th>
                                        <th>Time</th>
                                        <th>Account Type</th>
                                        <th>Payment Method</th>
                                        <th>Amount</th>
                                        <th>Confirmed</th>
                                        <th>Discription</th>
                                        <th>Total Tip</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>#1234567</td>
                                        <td>NL 50 Turbo</td>
                                        <td>19:00 - 16/03/2021</td>
                                        <td>22:01 - 16/03/2021</td>
                                        <td>18</td>
                                        <td>766</td>
                                        <td>76</td>
                                        <td>12</td>
                                    </tr>
                                    <tr>
                                        <td>#1234567</td>
                                        <td>NL 50 Turbo</td>
                                        <td>19:00 - 16/03/2021</td>
                                        <td>22:01 - 16/03/2021</td>
                                        <td>18</td>
                                        <td>766</td>
                                        <td>76</td>
                                        <td>12</td>
                                    </tr>
                                    <tr>
                                        <td>#1234567</td>
                                        <td>NL 50 Turbo</td>
                                        <td>19:00 - 16/03/2021</td>
                                        <td>22:01 - 16/03/2021</td>
                                        <td>18</td>
                                        <td>766</td>
                                        <td>76</td>
                                        <td>12</td>
                                    </tr>
                                    <tr>
                                        <td>#1234567</td>
                                        <td>NL 50 Turbo</td>
                                        <td>19:00 - 16/03/2021</td>
                                        <td>22:01 - 16/03/2021</td>
                                        <td>18</td>
                                        <td>766</td>
                                        <td>76</td>
                                        <td>12</td>
                                    </tr>
                                    <tr>
                                        <td>#1234567</td>
                                        <td>NL 50 Turbo</td>
                                        <td>19:00 - 16/03/2021</td>
                                        <td>22:01 - 16/03/2021</td>
                                        <td>18</td>
                                        <td>766</td>
                                        <td>76</td>
                                        <td>12</td>
                                    </tr>
                                    <tr>
                                        <td>#1234567</td>
                                        <td>NL 50 Turbo</td>
                                        <td>19:00 - 16/03/2021</td>
                                        <td>22:01 - 16/03/2021</td>
                                        <td>18</td>
                                        <td>766</td>
                                        <td>76</td>
                                        <td>12</td>
                                    </tr>
                                    <tr>
                                        <td>#1234567</td>
                                        <td>NL 50 Turbo</td>
                                        <td>19:00 - 16/03/2021</td>
                                        <td>22:01 - 16/03/2021</td>
                                        <td>18</td>
                                        <td>766</td>
                                        <td>76</td>
                                        <td>12</td>
                                    </tr>
                                    <tr>
                                        <td>#1234567</td>
                                        <td>NL 50 Turbo</td>
                                        <td>19:00 - 16/03/2021</td>
                                        <td>22:01 - 16/03/2021</td>
                                        <td>18</td>
                                        <td>766</td>
                                        <td>76</td>
                                        <td>12</td>
                                    </tr>
                                </tbody>
                            </Table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AccountDetails;