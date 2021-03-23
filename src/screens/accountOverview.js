import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Header from '../components/header';
import Table from 'react-bootstrap/Table';


const AccountOverview = () => {
    return (
        <div className="account-overview-page-main">
            <div className="header container">
                <Header />
            </div>
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        <div className="overview-search">
                            <Form inline>
                                <FormControl type="text" placeholder="Search by ID" className="mr-sm-2" />
                                <Button variant="outline-success">Search</Button>
                            </Form>
                        </div>
                    </div>
                    <div className="col-md-6">

                    </div>
                    <div className="col-md-12 col-sm-12">
                        <div className="account-transaction">
                            <h2>Master Account | Outside Account</h2>
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>A</th>
                                        <th>B</th>
                                        <th>C</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Aapex23</td>
                                        <td>Banana</td>
                                        <td>Carlos66</td>
                                    </tr>
                                    <tr>
                                        <td>Aapex23</td>
                                        <td>Banana</td>
                                        <td>Carlos66</td>
                                    </tr>
                                    <tr>
                                        <td>Aapex23</td>
                                        <td>Banana</td>
                                        <td>Carlos66</td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td>Banana</td>
                                        <td>Carlos66</td>
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

export default AccountOverview;