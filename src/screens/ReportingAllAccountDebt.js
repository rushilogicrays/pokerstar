import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Header from '../components/header';
import Table from 'react-bootstrap/Table';
import axios from 'axios';

const ReportingNonConfirmedDeposit = (props) => {
    const [data, setData] = useState(undefined);
    useEffect(async() => {
        axios({
            method: 'get',
            url: `http://143.110.254.46/poker/api/get-account-details`,
            // headers: {
            //   Authorization: "Token "+localStorage.getItem("accessToken").trim()
            // }
          })
            .then(function (response) {
                setData(response?.data?.filter((item) => item.balance < 0 ? item : null))
            });
    },[])

    return (
        <div className="re-non-deposit-main">
            <div className="container">
                <div className="header">
                    <Header />
                </div>
                <div className="row">
                    <div className="col-md-3 col-sm-3">
                        <div className="details-left-btn">
                            <Button id="orange-btn" onClick={() => props.history.push(`/reporting-non-confirmed-deposit`)}>Non Confirmed Deposit</Button>
                            <Button id="orange-btn" onClick={() => props.history.push(`/reporting-all-account-debt`)}>All Account in debt</Button>
                        </div>
                    </div>
                    <div className="col-md-9 col-sm-9">
                        <div className="tournament-details-table">
                            <Table striped bordered hover>
                                {data?.map((item) => (
                                        <tbody onClick={() => props.history.push(`/account-details/${item.id}`)}>
                                            <tr>
                                                <td>{item?.account_name}</td>
                                                <td className="redColor" >{item?.balance}</td>
                                            </tr>
                                        </tbody>
                                ))}
                                {/* <tbody>
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
                                </tbody> */}
                            </Table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ReportingNonConfirmedDeposit;