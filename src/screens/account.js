import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Header from '../components/header';
import Table from 'react-bootstrap/Table';
import { Calendar } from 'react-calendar';
import axios from 'axios';
import { propTypes } from 'react-bootstrap/esm/Image';

const Account = (props) => {
    const [formData, setFormData] = useState(undefined);
    console.log("formdata --->", formData);
    useEffect(() => {
        axios({
            method: 'get',
            url: `http://143.110.254.46:8084/poker/api/get-account-details`,
            // headers: {
            //   Authorization: "Token "+localStorage.getItem("accessToken")?.trim()
            // }
          })
            .then(function (response) {
                setFormData(response.data)
            });
    },[])
    return (
        <div className="account-main">
            <div className="container">
                <div className="header">
                    <Header />
                </div>
                <div className="row">
                    <div className="col-md-6">
                        {/* <div className="overview-search">
                            <Form inline>
                                <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                                <Button variant="outline-success">Search</Button>
                            </Form>
                        </div> */}
                    </div>
                    <div className="col-md-6">

                    </div>
                    <div className="col-md-12 col-sm-12">
                        <div className="account-details-table">
                            <h2>Master Account | Outside Account</h2>
                            <div className="account-details-list">
                                <h2>Account Name</h2>
                                <ul>
                                    {formData?.map((item) => (
                                        <li onClick={() => props.history.push(`/account-details/${item.id}`)} > {item?.account_name + " :: " + item?.balance} </li>
                                    ))}
                                </ul>
                            </div>
                            {/* <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>Account Name</th>
                                    </tr>
                                </thead>
                                {formData?.map((item) => (
                                    <tbody onClick={() => props.history.push(`/account-details/${item.id}`)}>
                                        <tr>
                                            <td>{item?.account_name}</td>
                                        </tr>
                                    </tbody>
                                ))}
                            </Table> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Account;