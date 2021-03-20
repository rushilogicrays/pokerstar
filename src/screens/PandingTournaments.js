import React, { useEffect, useState } from 'react';
import './Style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

const PandingTournaments = () => {
  const [form, setForm] = useState(false);
  const [data, setData] = useState([
    {
      "id": 1,
      "name": "rushi",
      "lastName": "kantaria",
      "email": "email",
      "email": "email",
      "email": "email",
      "save": "save"
    },
    {
      "id": 2,
      "name": "mihir",
      "lastName": "kantaria",
      "email": "email",
      "email": "email",
      "email": "email",
      "save": "save"
    },
    {
      "id": 3,
      "name": "zakir",
      "lastName": "kantaria",
      "email": "email",
      "email": "email",
      "email": "email",
      "save": "save"
    },
    {
      "id": 4,
      "name": "deepkbhai",
      "lastName": "kantaria",
      "email": "email",
      "email": "email",
      "email": "email",
      "save": "save"
    }
  ])
  const deletitem = (slectedData) => {
    let updatedData = [];
    updatedData = data.map((item) => item.id !== slectedData.id && item);
    setData(updatedData)
  }
  useEffect(() => {
    axios({
      method: 'get',
      url: 'http://143.110.254.46:8084/api/pending-tournaments',
    })
    .then(function (response) {
      console.log("resp ---->", response.data);
    });
  });

  return (
    <div className="App">
        {data.map((item) => {
          return(
            <div>
              {item && 
                <div className="data-fatch">
                  <p>{item.name}</p>
                  <p>{item.lastName}</p>
                  <p>{item.email}</p>
                  <p>{item.email}</p>
                  <p><button onClick={() => deletitem(item)}>Delelt</button><button onClick={() => setForm(true)}>edit</button></p>
                </div>
              }
            </div>
          )
        })}
        {form && <div style={{marginTop: 40}}>
          <div style={{flexDirection: "row"}}>
            <a style={{marginRight: 12}}>Name:</a>
            <input type="text" name="title" />
          </div>
          <div style={{flexDirection: "row", marginTop: 15}}>
            <a style={{marginRight: 14}}>Email</a>
            <input type="text" name="title" />
          </div>
          <button style={{marginTop: 15}} onClick={() => setForm(false)}>submit</button>
        </div>}
    </div>
  );
}

export default PandingTournaments;