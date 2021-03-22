import React, { useEffect, useState } from 'react';
import './Style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import moment from 'moment'


const PandingTournaments = () => {
  const [data, setData] = useState([])

  useEffect(() => {
    axios({
      method: 'get',
      url: 'http://143.110.254.46:8084/poker/api/pending-tournaments',
    })
      .then(function (response) {
        setData(response.data);
      });
  }, []);

  return (
    <div className="App">
      <div className="data-fatch">
        <p>Tournament ID</p>
        <p>Start</p>
        <p>End</p>
        <p>Total Players</p>
      </div>
      {data.map((item) => {
        return (
          <div>
            {item &&
              <div style={{cursor: "pointer"}} onClick={() => console.log("here")} className="data-fatch">
                <p>{"#" + item.external_id}</p>
                <p>{moment(item.start_tournament).format("h:mm") + " - " + moment(item.start_tournament).format("DD.MM.YY")}</p>
                <p>{moment(item.end_tournament).format("h:mm") + " - " + moment(item.end_tournament).format("DD.MM.YY")}</p>
                <p>{item.total_players}</p>
                {/* <p><button onClick={() => deletitem(item)}>Delelt</button><button onClick={() => setForm(true)}>edit</button></p> */}
              </div>
            }
          </div>
        )
      })}
    </div>
  );
}

export default PandingTournaments;