import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Header from '../components/header';
import axios from 'axios';
import moment from 'moment';


const Transaction = (props) => {
    const [transactionType, setTransactionType] = useState(props?.match?.params?.slug ? props?.match?.params?.slug : undefined);
    const [paymentMethod, setPaymentMethod] = useState(undefined);
    const [toFrom, setToFrom] = useState(undefined);
    const [from, setFrom] = useState(undefined);
    const [to, setTo] = useState(undefined);
    const [date, setDate] = useState(new Date());
    const [amount, setAmount] = useState(undefined);
    const [description, setDescription] = useState(undefined);
    const [checkBox, setCheckBox] = useState(false);
    const [getPaymentMethod, setGetPaymentMethod] = useState(undefined);;
    console.log("transactionType", paymentMethod);
    console.log("params ----->", props?.match?.params?.slug)
    useEffect(async() => {
        axios({
            method: 'get',
            url: `http://143.110.254.46/poker/api/get-account-details`,
            headers: {
              Authorization: "Token "+localStorage.getItem("accessToken").trim()
            }
          })
            .then(function (response) {
                setToFrom(response.data)
                // setOriginalData(response.data);
            });
        axios({
            method: 'get',
            url: `http://143.110.254.46/poker/api/get-paymenttype`,
            headers: {
              Authorization: "Token "+localStorage.getItem("accessToken").trim()
            }
            })
            .then(function (response) {
                setGetPaymentMethod(response.data)
                // setOriginalData(response.data);
            });
    },[])
    const handleSubmit = () => {
        console.log("here in handel submit");
        axios({
            method: 'post',
            url: `http://143.110.254.46/poker/api/create-transaction`,
            data: {
                transaction_type: transactionType,
                transaction_amount: amount,
                description: description,
                confirm: checkBox,
                from_account_id: from,
                to_account_id: to,
                tournament_id: 17,
                admin_id: localStorage.getItem("pk"),
                payment_type_id: paymentMethod
            },
            headers: {
              Authorization: "Token "+localStorage.getItem("accessToken").trim()
            }
          })
            .then(function (response) {
                console.log("res ---->", response);
                // setOriginalData(response.data);
        });
    }
    return (
        <div className="transaction-main">
            <div className="container">
                <div className="header">
                    <Header />
                </div>
                <div className="row">
                    <div className="col-md-12 col-sm-12">
                        <div className="transaction-feild">
                            <div className="back-type-action mb-4">
                                <div className="row">
                                    <div className="col-md-6 col-sm-6 mb-4">
                                        <Form.Control
                                            as="select"
                                            className="mr-sm-2 blue-select"
                                            id="inlineFormCustomSelect"
                                            custom
                                            onChange={(e) => setTransactionType(e.target.value)}
                                            value={transactionType}
                                        >
                                            <option value="0">Type</option>
                                            <option value="Deposit">Deposit</option>
                                            <option value="Withdrawal">Withdrawal</option>
                                            <option value="Deduction">Deduction</option>
                                            <option value="BuyIn">BuyIn</option>
                                            <option value="Payout">Payout</option>
                                        </Form.Control>
                                    </div>
                                    <div className="col-md-6 col-sm-6 text-right mb-4">
                                        <Button id="orange-btn"> Back </Button>
                                    </div>
                                    {transactionType === "Deduction" && <div className="col-md-6 col-sm-6 mb-4"><input readonly value={moment(date).format("YYYY-MM-DD")} className="date-input" /> </div>}
                                    <div className="col-md-6 col-sm-6 mb-4">
                                        <Form.Control
                                            as="select"
                                            className="mr-sm-2 blue-select"
                                            id="inlineFormCustomSelect"
                                            custom
                                            onChange={(e) => setPaymentMethod(e.target.value)}
                                        >
                                            <option value="0">Payment Method</option>
                                            {getPaymentMethod?.map((item) => (
                                                <option value={item.id}>{item.payment_name}</option>
                                            ))}
                                        </Form.Control>
                                    </div>
                                    {/* <div className="col-md-4 col-sm-4 mb-4">
                                        <input type="text" className="input-text" placeholder="From" />
                                    </div> */}
                                    <div className="col-md-4 col-sm-4 mb-4">
                                        <Form.Control
                                            as="select"
                                            className="mr-sm-2 blue-select"
                                            id="inlineFormCustomSelect"
                                            custom
                                            onChange={(e) => setFrom(e.target.value)}
                                        >
                                            <option>From</option>
                                            {toFrom?.map((item) => (
                                                <option value={item.id}>{item.account_name}</option>
                                            ))}
                                        </Form.Control>
                                    </div>
                                    {/* <div className="col-md-4 col-sm-4 mb-4">
                                        <input type="text" className="input-text" placeholder="To" />
                                    </div> */}
                                     <div className="col-md-4 col-sm-4 mb-4">
                                        <Form.Control
                                            as="select"
                                            className="mr-sm-2 blue-select"
                                            id="inlineFormCustomSelect"
                                            custom
                                            onChange={(e) => setTo(e.target.value)}
                                        >
                                            <option>To</option>
                                            {toFrom?.map((item) => (
                                                <option value={item.id}>{item.account_name}</option>
                                            ))}
                                        </Form.Control>
                                    </div>
                                    <div className="col-md-4 col-sm-4 mb-4">
                                        <input type="text" className="input-text" placeholder="Amount" onChange={(e) => setAmount(e.target.value)} />
                                    </div>
                                    <div className="col-md-12 col-sm-12 mb-4">
                                        <textarea className="textarea-text" name="comment" form="usrform" onChange={(e) => setDescription(e.target.value)}>Description...</textarea>
                                    </div>
                                    {transactionType === "Deposit" && <div className="col-md-12 col-sm-12 mb-4">
                                        <Form.Group controlId="formBasicCheckbox">
                                            <Form.Check checked={checkBox} type="checkbox" label="Confirmed" onClick={() => setCheckBox(!checkBox)} />
                                        </Form.Group>
                                    </div>}
                                    <div className="col-md-6 col-sm-6">
                                        <Button id="red-btn"> Cancel Transaction </Button>
                                    </div>
                                    <div className="col-md-6 col-sm-6" onClick={() => handleSubmit()}>
                                        <Button id="green-btn"> Submit/Update Transaction </Button>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Transaction;