import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Header from '../components/header';
import axios from 'axios';
import moment from 'moment';
import Modal from 'react-bootstrap/Modal'

const TransactionDeposit = (props) => {
    const [deductionData, setDeductionData] = useState(undefined);
    const [transactionType, setTransactionType] = useState(props?.match?.params?.slug ? props?.match?.params?.slug : undefined);
    const [paymentMethod, setPaymentMethod] = useState(undefined);
    const [toFrom, setToFrom] = useState(undefined);
    const [from, setFrom] = useState(undefined);
    const [to, setTo] = useState(undefined);
    const [date, setDate] = useState(new Date());
    const [amount, setAmount] = useState(undefined);
    const [description, setDescription] = useState(undefined);
    const [checkBox, setCheckBox] = useState(false);
    const [getPaymentMethod, setGetPaymentMethod] = useState(undefined);
    const [showCancel, setShowCancel] = useState(false);
    const [showSave, setShowSave] = useState(false);
    let filterTransection = deductionData?.filter((item) => item.id.toString() === props?.match?.params?.slug?.toString() ? item : null )
    console.log("transactionType", deductionData);
    // console.log("params ----->", localStorage.getItem("accessToken").trim());
    useEffect(async() => {
        if(filterTransection?.length > 0){
            setTo(filterTransection?.length > 0 ? filterTransection[0].to_account_id.id : undefined)
            setFrom(filterTransection?.length > 0 ? filterTransection[0].from_account_id.id : undefined)
            setPaymentMethod(filterTransection?.length > 0 ? filterTransection[0].payment_type_id?.id : undefined)
            setAmount(filterTransection?.length > 0 ? filterTransection[0].transaction_amount : undefined)
            setTransactionType(filterTransection?.length > 0 ? filterTransection[0].transaction_type : undefined)
            setDescription(filterTransection?.length > 0 ? filterTransection[0].description : undefined)
        }
    })
    useEffect(() => {
        axios({
            method: 'get',
            url: `http://143.110.254.46/poker/api/get-account-details`,
            headers: {
              Authorization: "Token "+localStorage.getItem("accessToken")?.trim()
            }
          })
            .then(function (response) {
                setToFrom(response.data)
            });
            axios({
                method: 'get',
                url: `http://143.110.254.46/poker/api/get-paymenttype`,
                headers: {
                    Authorization: "Token "+localStorage.getItem("accessToken")?.trim()
                }
                })
                .then(function (response) {
                    setGetPaymentMethod(response.data)
                    // setOriginalData(response.data);
            });
            axios({
                method: 'get',
                url: `http://143.110.254.46/poker/api/get-transactions?transaction_type=Deduction`,
                headers: {
                  Authorization: "Token "+localStorage.getItem("accessToken")?.trim()
                }
                })
                .then(function (response) {
                    setDeductionData(response.data);
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
        setShowSave(false);
        props.history.goBack();
    }

    const cancelTransaction = () => {
        axios({
            method: 'post',
            url: `http://143.110.254.46/poker/api/cancel-transaction/${filterTransection[0].id}`,
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
              Authorization: "Token "+localStorage.getItem("accessToken")?.trim()
            }
          })
            .then(function (response) {
                console.log("res ---->", response);
                // setOriginalData(response.data);
        });
        setShowCancel(false);
        props.history.goBack();
    }
    return (
        <div className="transaction-main">
            <div className="container">
                <div className="header">
                    <Header push={props.history.push}/>
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
                                            readonly={filterTransection?.length > 0 ? true : false}
                                        >
                                            <option value="0">Type</option>
                                            <option value="Deposit">Deposit</option>
                                            <option value="Withdrawal">Withdrawal</option>
                                            <option value="Deduction">Deduction</option>
                                            <option value="BuyIn">BuyIn</option>
                                            <option value="Payout">Payout</option>
                                            <option value="Manual">Manual</option>
                                        </Form.Control>
                                    </div>
                                    <div className="col-md-6 col-sm-6 text-right mb-4">
                                        <Button id="orange-btn" onClick={() => props.history.goBack()}> Back </Button>
                                    </div>
                                    {transactionType === "Deduction" && <div className="col-md-6 col-sm-6 mb-4"><input type="date" value={moment(date).format("YYYY-MM-DD")} className="date-input" onChange={(e) => setDate(e.target.value)}/> </div>}
                                    <div className="col-md-6 col-sm-6 mb-4">
                                        <Form.Control
                                            as="select"
                                            className="mr-sm-2 blue-select"
                                            id="inlineFormCustomSelect"
                                            custom
                                            value={paymentMethod}
                                            onChange={(e) => setPaymentMethod(e.target.value)}
                                            readonly={filterTransection?.length > 0 ? true : false}
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
                                            value={from}
                                            onChange={(e) => setFrom(e.target.value)}
                                            readonly={filterTransection?.length > 0 ? true : false}
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
                                            value={to}
                                            onChange={(e) => setTo(e.target.value)}
                                            readonly={filterTransection?.length > 0 ? true : false}
                                        >
                                            <option>To</option>
                                            {toFrom?.map((item) => (
                                                <option value={item.id}>{item.account_name}</option>
                                            ))}
                                        </Form.Control>
                                    </div>
                                    <div className="col-md-4 col-sm-4 mb-4">
                                        <input type="text" className="input-text" placeholder="Amount" value={amount} readonly={filterTransection?.length > 0 ? true : false} onChange={(e) => setAmount(e.target.value)} />
                                    </div>
                                    <div className="col-md-12 col-sm-12 mb-4">
                                        <textarea placeholder="Description..." className="textarea-text" name="comment" form="usrform" value={description} readonly={filterTransection?.length > 0 ? true : false} onChange={(e) => setDescription(e.target.value)}></textarea>
                                    </div>
                                    {transactionType === "Deposit" && <div className="col-md-12 col-sm-12 mb-4">
                                        <Form.Group controlId="formBasicCheckbox" readonly={filterTransection?.length > 0 ? true : false}>
                                            <Form.Check readonly={filterTransection?.length > 0 ? true : false} checked={checkBox} type="checkbox" label="Confirmed" onClick={() => setCheckBox(!checkBox)} />
                                        </Form.Group>
                                    </div>}
                                    {filterTransection?.length > 0 ? (
                                        <div className="col-md-6 col-sm-6" onClick={() => setShowCancel(true)}>
                                            <Button id="red-btn"> Cancel Transaction </Button>
                                        </div>
                                    ) : (
                                        <div className="col-md-6 col-sm-6" onClick={() => setShowSave(true)}>
                                            <Button id="green-btn"> Submit/Update Transaction </Button>
                                        </div>
                                    )}

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Modal show={showCancel} onHide={() => setShowCancel(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to cancel this Transaction?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowCancel(false)}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => cancelTransaction()}>
                        cancel Transaction
                    </Button>
                </Modal.Footer>
            </Modal>
            <Modal show={showSave} onHide={() => setShowSave(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Save</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to save this Transaction?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowSave(false)}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => handleSubmit()}>
                        Save Transaction
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default TransactionDeposit;