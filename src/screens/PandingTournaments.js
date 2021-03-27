import React, { useEffect, useState } from 'react';
import './Style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import moment from 'moment';
import Header from './../components/header';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';


const PandingTournaments = (props) => {
  const [data, setData] = useState([])
  console.log("data ----->", moment.utc("2020-10-15T20:00:00Z").format("DD-MM-YYYY"));
  useEffect(() => {
    axios({
      method: 'get',
      url: 'http://143.110.254.46:8084/poker/api/pending-tournaments',
      headers: {
        Authorization: "Token "+localStorage.getItem("accessToken")?.trim()
      }
    })
      .then(function (response) {
        console.log("response ---->", response.data);
        setData(response.data.map((item) => item.state !== "Cancel" ? item : null));
      });
  }, []);
  return (
    <div className="pennding-tournament-main">
      <div className="container">
        <div className="header">
          <Header push={props.history.push}/>
        </div>
        <div className="pending-tournament-details-table" style={{flexDirection: "row", display: "flex"}}>
        <div className="col-md-3 col-sm-3">
            <div className="details-left-btn">
                <Button id="orange-btn" onClick={() => props.history.push('/tournaments_overview')}>Tournaments Overview</Button>
            </div>
        </div>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Tournament ID</th>
                <th>Start</th>
                <th>End</th>
                <th>Total Player</th>
              </tr>
            </thead>
            {data.map((item) => {
              console.log("item ---->",item)
            return(
              <tbody>
                {item &&
                  <tr onClick={() => props.history.push(`/tournaments_details/${item.external_id}`)}>
                    <td>{"#" + item.external_id}</td>
                    <td>{moment.utc(item.start_tournament).format("HH:mm") + " - " + moment.utc(item.start_tournament).format("DD.MM.YY")}</td>
                    <td>{moment.utc(item.end_tournament).format("HH:mm") + " - " + moment.utc(item.end_tournament).format("DD.MM.YY")}</td>
                    <td>{item.total_players}</td>
                  </tr>
                }
              </tbody>
            )})}
          </Table>
        </div>
      </div>
    </div>
  );
}

export default PandingTournaments;