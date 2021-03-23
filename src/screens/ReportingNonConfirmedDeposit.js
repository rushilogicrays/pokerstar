import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Header from '../components/header';
import Table from 'react-bootstrap/Table';

const ReportingAllAccountDebt = () => {

    return (
        <div className="re-non-deposit-main">
            <div className="container">
                <div className="header">
                    <Header />
                </div>
                <div className="row">
                    <div className="col-md-3 col-sm-3">
                        <div className="details-left-btn">
                            <Button id="orange-btn">Non Confirmed Deposit</Button>
                            <Button id="orange-btn">All Account in debt</Button>
                        </div>
                    </div>
                    <div className="col-md-9 col-sm-9">
                        <div className="tournament-details-table">
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>Tournament ID</th>
                                        <th>Name</th>
                                        <th>Start</th>
                                        <th>End</th>
                                        <th>Total Player</th>
                                        <th>Total Pricepool</th>
                                        <th>Total Rake</th>
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

export default ReportingAllAccountDebt;