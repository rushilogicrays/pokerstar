import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Header from '../components/header';
import Table from 'react-bootstrap/Table';
import { Calendar } from 'react-calendar';

const Account = () => {

    return (
        <div className="account-main">
            <div className="container">
                <div className="header">
                    <Header />
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <div className="overview-search">
                            <Form inline>
                                <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                                <Button variant="outline-success">Search</Button>
                            </Form>
                        </div>
                    </div>
                    <div className="col-md-6">

                    </div>
                    <div className="col-md-12 col-sm-12">
                        <div className="account-details-table">
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>A</th>
                                        <th>B</th>
                                        <th>C</th>
                                        <th>D</th>
                                        <th>E</th>
                                        <th>F</th>
                                        <th>G</th>
                                        <th>H</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Amelie</td>
                                        <td>Bmelie</td>
                                        <td>Cmelie</td>
                                        <td>Dmelie</td>
                                        <td>Emelie</td>
                                        <td>Fmelie</td>
                                        <td>Gmelie</td>
                                        <td>Hmelie</td>
                                    </tr>
                                    <tr>
                                        <td>Amelie Amelie</td>
                                        <td>Bmelie Amelie</td>
                                        <td>Cmelie Amelie Amelie</td>
                                        <td>Dmelie Amelie</td>
                                        <td>Emelie Amelie Amelie</td>
                                        <td>Fmelie Amelie Amelie</td>
                                        <td>Gmelie Amelie Amelie</td>
                                        <td>Hmelie Amelie</td>
                                    </tr>
                                    <tr>
                                        <td>Amelie</td>
                                        <td>Bmelie</td>
                                        <td>Cmelie</td>
                                        <td>Dmelie</td>
                                        <td>Emelie</td>
                                        <td>Fmelie</td>
                                        <td>Gmelie</td>
                                        <td>Hmelie</td>
                                    </tr>
                                    <tr>
                                        <td>Amelie Amelie</td>
                                        <td>Bmelie Amelie</td>
                                        <td>Cmelie Amelie Amelie</td>
                                        <td>Dmelie Amelie</td>
                                        <td>Emelie Amelie Amelie</td>
                                        <td>Fmelie Amelie Amelie</td>
                                        <td>Gmelie Amelie Amelie</td>
                                        <td>Hmelie Amelie</td>
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

export default Account;