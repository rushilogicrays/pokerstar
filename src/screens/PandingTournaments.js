import React, { useEffect, useState } from 'react';
import './Style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import moment from 'moment';
import Header from './../components/header';
import Table from 'react-bootstrap/Table';


const PandingTournaments = (props) => {
  const [data, setData] = useState([])
  console.log("data ----->", moment.utc("2020-10-15T20:00:00Z").format("DD-MM-YYYY"));
  useEffect(() => {
    axios({
      method: 'get',
      url: 'http://143.110.254.46:8084/poker/api/pending-tournaments',
      // headers: {
      //   Authorization: "Token "+localStorage.getItem("accessToken").trim()
      // }
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
          <Header />
        </div>
        <div className="pending-tournament-details-table">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Tournament ID</th>
                <th>Start</th>
                <th>End</th>
                <th>Total Player</th>
              </tr>
            </thead>
            {data.map((item) => (
              <tbody>
                {item &&
                  <tr onClick={() => props.history.push(`/tournaments_details/${item.external_id}`)}>
                    <td>{"#" + item.external_id}</td>
                    <td>{moment.utc(item.start_tournament).format("hh:mm") + " - " + moment.utc(item.start_tournament).format("DD.MM.YY")}</td>
                    <td>{moment.utc(item.end_tournament).format("hh:mm") + " - " + moment.utc(item.end_tournament).format("DD.MM.YY")}</td>
                    <td>{item.total_players}</td>
                  </tr>
                }
              </tbody>
            ))}
          </Table>
        </div>
      </div>
    </div>
  );
}

export default PandingTournaments;