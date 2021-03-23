import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import Header from './../components/header';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Tournamentsdetails from './tournamentsDetails';


const TournamentsOverview = () => {
    const [value, onChange] = useState(new Date());
    return (
        <div className="tournaments-overview-main">
            <div className="container">
                <div className="tournaments-overview-header">
                    <Header />
                </div>
                <div className="row">
                    <div className="col-md-3 col-sm-3">
                        <div className="tournaments-calander">
                            <Calendar
                                onChange={onChange}
                                value={value}
                            />
                            <div className="overview-search">
                                <Form inline>
                                    <FormControl type="text" placeholder="Search by ID" className="mr-sm-2" />
                                    <Button variant="outline-success">Search</Button>
                                </Form>
                            </div>
                        </div>
                        <div className="subtotale-box">
                            <ul>
                                <li> <strong className="text">+ Total Rake</strong> <span>745</span> </li>
                                <li> <strong className="text">+ Total Tip</strong> <span>47</span> </li>
                                <li className="deducation-text"> <strong className="text">+ Total Deducation</strong> <span>125</span> </li>
                                <li> <strong className="text">Profit</strong> <span>670</span> </li>
                            </ul>
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
                        <div className="deducation-details-table">
                            <div className="add-deducation-btn">
                                <Button id="orange-btn"> Add Deducation </Button>
                            </div>
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>Amount</th>
                                        <th>To</th>
                                        <th>Reson</th>
                                        <th>Remove</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>75</td>
                                        <td>Silce 666</td>
                                        <td>Buyin free</td>
                                        <td>x</td>
                                    </tr>
                                    <tr>
                                        <td>75</td>
                                        <td>Silce 666</td>
                                        <td>Buyin free</td>
                                        <td>x</td>
                                    </tr>
                                    <tr>
                                        <td>75</td>
                                        <td>Silce 666</td>
                                        <td>Buyin free</td>
                                        <td>x</td>
                                    </tr>
                                    <tr>
                                        <td>75</td>
                                        <td>Silce 666</td>
                                        <td>Buyin free</td>
                                        <td>x</td>
                                    </tr>
                                    <tr>
                                        <td>75</td>
                                        <td>Silce 666</td>
                                        <td>Buyin free</td>
                                        <td>x</td>
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

export default TournamentsOverview;