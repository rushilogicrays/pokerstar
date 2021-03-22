import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Header from '../components/header';
import Table from 'react-bootstrap/Table';

const Tournamentsdetails = () => {
    return (
        <div className="tournamnets-details-main">
            <div className="container">
                <div className="header">
                    <Header />
                </div>
                <div className="row">
                    <div className="col-md-3 col-sm-3">
                        <div className="details-left-btn">
                            <Button id="orange-btn">Panding Tournaments</Button>
                            <Button id="orange-btn">Tournaments Overview</Button>
                        </div>
                    </div>
                    <div className="col-md-9 col-sm-9">
                        <div className="details-table-btn">
                            <ul className="btn-row">
                                <li> <span className="yello-value"> Tournament ID </span> </li>
                                <li> <span className="yello-value"> Start </span> </li>
                                <li> <span className="yello-value"> End </span> </li>
                                <li> <Button id="orange-btn"> Back </Button> </li>
                            </ul>
                            <ul className="btn-row">
                                <li> <input type="text" id="blue-input" placeholder="Input Name"/> </li>
                                <li> <Form.Control
                                    as="select"
                                    className="mr-sm-2 blue-select"
                                    id="inlineFormCustomSelect"
                                    custom
                                >
                                    <option value="0">Select Buyin</option>
                                    <option value="1">9/1</option>
                                    <option value="2">23/2</option>
                                    <option value="3">32/5</option>
                                    <option value="3">47/3</option>
                                    <option value="3">72/3</option>
                                    <option value="3">96/4</option>
                                    <option value="3">145/5</option>
                                    <option value="3">195/5</option>
                                    <option value="3">242/8</option>
                                    <option value="3">430/14</option>
                                </Form.Control>
                                </li>
                                <li> <input type="text" id="blue-input" placeholder="Rake"/> </li>
                            </ul>
                            <ul className="btn-row">
                                <li> <span className="yello-value"> Total Players </span> </li>
                                <li> <span className="purple-value"> Total Pricepool </span> </li>
                                <li> <span className="purple-value"> Total Rake </span> </li>
                                <li> <span className="purple-value"> Total Tip </span> </li>
                            </ul>
                            <ul className="btn-row">
                                <li> <Button id="red-btn"> Delete </Button> </li>
                                <li> <Button id="pink-btn"> Reset </Button> </li>
                                <li> <Button id="green-btn"> Save </Button> </li>
                            </ul>
                        </div>
                        <div className="tournament-details-table">
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>Rank</th>
                                        <th>Player</th>
                                        <th>Win</th>
                                        <th>Tip</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>#1</td>
                                        <td>Simba34</td>
                                        <td><input type="text" id="blue-input" placeholder="5656564"/></td>
                                        <td><input type="text" id="blue-input" placeholder="Tip"/></td>
                                    </tr>
                                    <tr>
                                        <td>#2</td>
                                        <td>Slice 666</td>
                                        <td><input type="text" id="blue-input" placeholder="5656564"/></td>
                                        <td> <input type="text" id="blue-input" placeholder="Tip"/> </td>
                                    </tr>
                                    <tr>
                                        <td>#3</td>
                                        <td>Janba2k11</td>
                                        <td><input type="text" id="blue-input" placeholder="5656564"/></td>
                                        <td><input type="text" id="blue-input" placeholder="Tip"/></td>
                                    </tr>
                                    <tr>
                                        <td>34</td>
                                        <td>Papapingu</td>
                                        <td><input type="text" id="blue-input" placeholder="5656564"/></td>
                                        <td><input type="text" id="blue-input" placeholder="Tip"/></td>
                                    </tr>
                                    <tr>
                                        <td>#5</td>
                                        <td>Papapingu</td>
                                        <td><input type="text" id="blue-input" placeholder="5656564"/></td>
                                        <td><input type="text" id="blue-input" placeholder="Tip"/></td>
                                    </tr>
                                    <tr>
                                        <td>#6</td>
                                        <td>Papapingu</td>
                                        <td><input type="text" id="blue-input" placeholder="5656564"/></td>
                                        <td><input type="text" id="blue-input" placeholder="Tip"/></td>
                                    </tr>
                                    <tr>
                                        <td>#7</td>
                                        <td>Papapingu</td>
                                        <td><input type="text" id="blue-input" placeholder="5656564"/></td>
                                        <td><input type="text" id="blue-input" placeholder="Tip"/></td>
                                    </tr>
                                    <tr>
                                        <td>#8</td>
                                        <td>Papapingu</td>
                                        <td><input type="text" id="blue-input" placeholder="5656564"/></td>
                                        <td><input type="text" id="blue-input" placeholder="Tip"/></td>
                                    </tr>
                                    <tr>
                                        <td>#9</td>
                                        <td>Papapingu</td>
                                        <td><input type="text" id="blue-input" placeholder="5656564"/></td>
                                        <td><input type="text" id="blue-input" placeholder="Tip"/></td>
                                    </tr>
                                    <tr>
                                        <td>#10</td>
                                        <td>Papapingu</td>
                                        <td><input type="text" id="blue-input" placeholder="5656564"/></td>
                                        <td><input type="text" id="blue-input" placeholder="Tip"/></td>
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

export default Tournamentsdetails;