import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import Header from './../components/header';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Tournamentsdetails from './tournamentsDetails';
import axios from 'axios';
import moment from 'moment'

const TournamentsOverview = (props) => {
    const [value, setValue] = useState(new Date());
    const [tournamentDetails, setTournamentDetails] = useState(undefined);
    const [originalData, setOriginalData] = useState(undefined);
    const [searchId, setSearchId] = useState(undefined);
    const [deductionData, setDeductionData] = useState(undefined);
    let date = moment(value).format("YYYY-MM-DD");
    useEffect(async() => {
        axios({
            method: 'get',
            url: `http://143.110.254.46/poker/api/tournament-overview?date=${date}`,
            // headers: {
            //   Authorization: "Token "+localStorage.getItem("accessToken").trim()
            // }
          })
            .then(function (response) {
                setTournamentDetails(response.data)
                setOriginalData(response.data);
            });
        
        axios({
            method: 'get',
            url: `http://143.110.254.46/poker/api/get-transactions?transaction_type=Deduction`,
            // headers: {
            //   Authorization: "Token "+localStorage.getItem("accessToken").trim()
            // }
            })
            .then(function (response) {
                setDeductionData(response.data);
            });
    },[])
    const fetchDataByDate = (date) => {
        // setValue(date);
        axios({
            method: 'get',
            url: `http://143.110.254.46/poker/api/tournament-overview?date=${moment(date).format("YYYY-MM-DD")}`,
            headers: {
              Authorization: "Token "+localStorage.getItem("accessToken").trim()
            }
          })
            .then(function (response) {
                setOriginalData(response.data);
                setTournamentDetails(response.data);
        });
    }

    const searchById = (e) => {
        let data = originalData?.filter((item) => item.external_id.toString() === searchId && item);
        setTournamentDetails(data);
    }
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
                                //onChange={onChange}
                                value={value}
                                onChange={(date) => fetchDataByDate(date)}
                                maxDate={new Date()}
                            />
                            <div className="overview-search">
                                <Form inline>
                                    <FormControl type="text" placeholder="Search by ID" className="mr-sm-2" onChange={e => setSearchId(e.target.value)}/>
                                    <Button variant="outline-success" onClick={() => searchById()}>Search</Button>
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
                        {tournamentDetails && <div className="tournament-details-table">
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
                                {tournamentDetails.map((item) => (
                                    <tbody>
                                        <tr onClick={() => props.history.push(`/tournaments_details/${item.external_id}`)}>
                                            <td>{"#" + item?.external_id}</td>
                                            <td>{item?.name}</td>
                                            <td>{moment(item?.start_tournament).format("h:mm") + " - " + moment(item?.start_tournament).format("DD.MM.YY")}</td>
                                            <td>{moment(item?.end_tournament).format("h:mm") + " - " + moment(item?.end_tournament).format("DD.MM.YY")}</td>
                                            <td>{item?.total_players}</td>
                                            <td>{item?.total_prizepool}</td>
                                            <td>{item?.rake}</td>
                                            <td>{item?.total_tip}</td>
                                        </tr>
                                    </tbody>
                                ))}
                            </Table>
                        </div>}
                        <div className="deducation-details-table">
                            <div className="add-deducation-btn">
                                <Button id="orange-btn" onClick={() => props.history.push('/transaction/Deduction')}> Add Deducation </Button>
                            </div>
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>Amount</th>
                                        <th>To</th>
                                        <th>Reason</th>
                                        <th>Remove</th>
                                    </tr>
                                </thead>
                                {deductionData?.map((item) => (
                                    <tbody onClick={() => props.history.push("/transaction/" + (item.id))}>
                                        <tr>
                                            <td>{item.transaction_amount}</td>
                                            <td>{item?.from_account_id?.account_name}</td>
                                            <td>{item.description}</td>
                                            <td><Button>X</Button></td>
                                        </tr>
                                    </tbody>
                                ))}
                            </Table>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default TournamentsOverview;