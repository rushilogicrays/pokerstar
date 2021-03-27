import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Header from '../components/header';
import Table from 'react-bootstrap/Table';
import axios from 'axios';
import moment from 'moment';

const AccountDetails = (props) => {
    const[data, setData] = useState(undefined);
    console.log("props?.match?.params?.slug --------->", props?.match?.params?.slug);
    console.log("data ---->",  data?.transaction);
    // useEffect(() => {
    //     axios({
    //         method: 'get',
    //         url: `http://143.110.254.46/poker/api/account-details/1`,
    //         headers: {
    //           Authorization: "Token "+localStorage.getItem("accessToken").trim()
    //         }
    //       })
    //         .then(function (response) {
    //             setData(response.data);
    //     });
    // },[])
    useEffect(() => {
        axios({
            method: 'get',
            url: `http://143.110.254.46/poker/api/account-details/${props?.match?.params?.slug}`,
            headers: {
              Authorization: "Token "+localStorage.getItem("accessToken")?.trim()
            }
          })
            .then(function (response) {
                setData(response.data);
        });   
    },[])
    return (
        <div className="account-details-page-main">
            <div className="header container">
                <Header push={props.history.push}/>
            </div>
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        <div className="account-name-details">
                            <ul className="btn-row">
                                <div>
                                    <span style={{marginRight: 20}}>Accounnt Name</span> 
                                    <li><span className="magenta-value"> {data?.account[0].account_name} </span> </li>
                                </div>
                                <div>
                                    <span style={{marginRight: 10}}>Accounnt Balance</span>
                                    <li> <span className="magenta-value"> {data?.account[0].balance} </span> </li>
                                </div>
                            </ul>
                            <ul className="btn-row">
                                <li> <Button id="purple-btn"> Show All </Button> </li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="account-deposit-btn">
                            <ul className="btn-row">
                                <li> <Button id="pink-btn" onClick={() => props.history.push(`/transaction-deposit/${props?.match?.params?.slug}`)}> Deposit </Button> </li>
                                <li> <Button id="pink-btn" onClick={() => props.history.push(`/transaction-withdrawal/${props?.match?.params?.slug}`)}> Withdrawal </Button> </li>
                            </ul>
                            <ul className="btn-row">
                                <li> <Button id="pink-btn" onClick={() => props.history.push('/transaction/Manual')}> Manual </Button> </li>
                                <li> <Button id="pink-btn" onClick={() => props.history.push('/transaction/Deduction')}> Deducation </Button> </li>
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
                                        <th>Transaction Type</th>
                                        <th>From</th>
                                        <th>To</th>
                                        <th>Payment Method</th>
                                        <th>Description</th>
                                        <th>Amount</th>
                                        <th>Confirm</th>
                                    </tr>
                                </thead>
                                {data?.transaction?.map((item) => (
                                    <tbody onClick={() => props.history.push(`/transaction/${item.id}`)}>
                                        <tr>
                                            <td>{`#${item?.id}`}</td>
                                            <td>{`${moment.utc(item.created_at).format("DD.MM.YY")} - ${moment.utc(item.created_at).format("hh:mm")}`}</td>
                                            <td>{item?.transaction_type}</td>
                                            <td>{item?.from_account_id?.account_name}</td>
                                            <td>{item?.to_account_id?.account_name}</td>
                                            <td>{item?.payment_type_id?.payment_name}</td>
                                            <td>{item?.description}</td>
                                            <td>{item?.transaction_amount}</td>
                                            <td>{`${item?.confirm ? "true" : "false"}`}</td>
                                        </tr>
                                    </tbody>
                                ))}
                                {/* <tbody>
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
                                </tbody> */}
                            </Table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AccountDetails;