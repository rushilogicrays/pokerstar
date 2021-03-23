import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Header from '../components/header';
import Table from 'react-bootstrap/Table';

const ReportingNonConfirmedDeposit = () => {

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
                                <tbody>
                                    <tr>
                                        <td>Amelie</td>
                                        <td className="redColor" >- 30</td>
                                    </tr>
                                    <tr>
                                        <td>Amelie</td>
                                        <td className="redColor" >- 30</td>
                                    </tr>
                                    <tr>
                                        <td>Amelie</td>
                                        <td className="redColor" >- 30</td>
                                    </tr>
                                    <tr>
                                        <td>Amelie</td>
                                        <td className="redColor" >- 30</td>
                                    </tr>
                                    <tr>
                                        <td>Amelie</td>
                                        <td className="redColor" >- 30</td>
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

export default ReportingNonConfirmedDeposit;