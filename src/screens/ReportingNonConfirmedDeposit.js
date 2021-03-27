import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Header from '../components/header';
import Table from 'react-bootstrap/Table';
import axios from 'axios';
import moment from 'moment';
import Modal from 'react-bootstrap/Modal'

const ReportingAllAccountDebt = (props) => {
    const [data, setData] = useState(undefined);
    const [showModal, setShowModal] = useState(false);
    const [id, setId] = useState(undefined);
    useEffect(async() => {
        axios({
            method: 'get',
            url: `http://143.110.254.46/poker/api/get-transactions?transaction_type=Deposit&confirm=0`,
            headers: {
              Authorization: "Token "+localStorage.getItem("accessToken")?.trim()
            }
          })
            .then(function (response) {
                setData(response.data);
            });
    },[])
    const handleConfirm = () => {
        axios({
            method: 'post',
            url: `http://143.110.254.46:8084/poker/api/confirm-deposit/${id}`,
            headers: {
              Authorization: "Token "+localStorage.getItem("accessToken")?.trim()
            }
          })
            .then(function (response) {
                console.log(response.data);
            });
        setShowModal(false)
    }
    const modalShow = (id) => {
        setId(id);
        setShowModal(true);
    }
    return (
        <div className="re-non-deposit-main">
            <div className="container">
                <div className="header">
                    <Header push={props.history.push}/>
                </div>
                <div className="row">
                    <div className="col-md-3 col-sm-3">
                        <div className="details-left-btn">
                            <Button id="orange-btn">Non Confirmed Deposit</Button>
                            <Button id="orange-btn" onClick={() => props.history.push(`/reporting-all-account-debt`)}>All Account in debt</Button>
                        </div>
                    </div>
                    <div className="col-md-9 col-sm-9">
                        <div className="tournament-details-table">
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>Tournament ID</th>
                                        <th>Time</th>
                                        <th>From</th>
                                        <th>To</th>
                                        <th>Payment Method</th>
                                        <th>Amount</th>
                                        <th>Description</th>
                                        <th>Confirmed</th>
                                    </tr>
                                </thead>
                                {data?.map((item) => (
                                    <tbody>
                                        <tr>
                                            <td>{`#${item.id}`}</td>
                                            <td>{`${moment(item.created_at).format("DD.MM.YY")} - ${moment(item.created_at).format("h:mm")}`}</td>
                                            <td>{item?.from_account_id?.account_name}</td>
                                            <td>{item?.to_account_id?.account_name}</td>
                                            <td>{item?.payment_type_id?.payment_name}</td>
                                            <td>{item?.transaction_amount}</td>
                                            <td>{item?.description}</td>
                                            <td><Button onClick={() => modalShow(item.id)}>Confirm</Button></td>
                                        </tr>
                                    </tbody>
                                ))}
                            </Table>
                        </div>
                    </div>
                </div>
            </div>
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to confirm this tournament?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => handleConfirm()}>
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default ReportingAllAccountDebt;