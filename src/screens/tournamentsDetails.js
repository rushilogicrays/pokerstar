import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Header from '../components/header';
import Table from 'react-bootstrap/Table';
import axios from 'axios';
import moment from 'moment'

const Tournamentsdetails = (props) => {
    const [data, setData] = useState(undefined);
    const [tournamentDetail, setTournamentDetail] = useState(undefined);
    const [buyIn, setBuyIn] = useState("");
    const [rake, setRake] = useState(undefined);
    const [name, setName] = useState(undefined);
    let totalPrizepool = (data?.length * (buyIn - rake))
    let totalRake = (data?.length * rake)
    var a = data
    let totalTip = 0;
    if(a?.length > 0){
        for (var i=0; i<a?.length; i++) {
            totalTip += a[i].tip;
        }
    }
    //console.log("tournamentDetail ----->", tournamentDetail[0].total_players);
    // console.log('total', props?.match?.params?.slug)
    useEffect(() => {
        axios({
          method: 'get',
          url: `http://143.110.254.46:8084/poker/api/tournament/${props?.match?.params?.slug}`,
          // headers: {
          //   Authorization: "Token "+localStorage.getItem("accessToken").trim()
          // }
        })
          .then(function (response) {
            setTournamentDetail(response.data.tournament);
            setData(response.data.rank);
            setBuyIn(response?.data?.tournament[0]?.buy_in)
            setRake(response?.data?.tournament[0]?.rake)
            setName(response?.data?.tournament[0]?.name)
          });
      }, []);

      const deleteTournament = () => {
        axios({
            method: 'delete',
            url: `http://143.110.254.46/poker/api/delete-tournament/${props?.match?.params?.slug}`,
            // headers: {
            //   Authorization: "Token "+localStorage.getItem("accessToken").trim()
            // }
          })
            .then(function (response) {
              console.log(response.data.rank);
            });
      }
      const fetchData = () => {
        axios({
            method: 'get',
            url: `http://143.110.254.46:8084/poker/api/tournament/${props?.match?.params?.slug}`,
            // headers: {
            //   Authorization: "Token "+localStorage.getItem("accessToken").trim()
            // }
          })
            .then(function (response) {
                console.log("response --->", response.data.tournament[0].name);
                setData(response.data.rank);
                setName(response.data.tournament[0].name)
                setBuyIn(response.data.tournament[0].buy_in)
                setRake(response.data?.tournament[0].rake)
            });
      }
      const setCangeWin = async(e, index) => {
        await setData(
            data?.map(item => 
                    item.id === index 
                    ? {...item, payout : Number(e)} 
                    : item
                )
        )
        data?.filter(item => item.id === index ? console.log(item) : item)
      }
      const setCangeTip = async(e, index) => {
        await setData(
            data?.map(item => 
                    item.id === index 
                    ? {...item, tip : Number(e)} 
                    : item
                )
        )
        data?.filter(item => item.id === index ? console.log(item) : item)
      }

      const handleSave = () => {
        axios({
            method: 'put',
            url: `http://143.110.254.46:8084/poker/api/tournament/${props?.match?.params?.slug}`,
            data: {
                tournament:[
                    {
                        id: tournamentDetail[0].id,
                        external_id: tournamentDetail[0].external_id,
                        start_tournament: tournamentDetail[0].start_tournament,
                        end_tournament: tournamentDetail[0].end_tournament,
                        total_players: tournamentDetail[0].total_players,
                        playdate_id: tournamentDetail[0].playdate_id,
                        name: name,
                        buy_in: buyIn,
                        rake: rake,
                        total_prizepool: totalPrizepool,
                        total_rake: totalRake,
                        total_tip: totalTip
                    }
                ],
                rank: data
            }
            // headers: {
            //   Authorization: "Token "+localStorage.getItem("accessToken").trim()
            // }
          })
            .then(function (response) {
              console.log("res --->", response.data);
            });
      }
    return (
        <div className="tournamnets-details-main">
            <div className="container">
                <div className="header">
                    <Header />
                </div>
                <div className="row">
                    <div className="col-md-3 col-sm-3">
                        <div className="details-left-btn">
                            <Button id="orange-btn" onClick={() => props.history.goBack()}>Panding Tournaments</Button>
                            <Button id="orange-btn" onClick={() => props.history.push('/tournaments_overview')}>Tournaments Overview</Button>
                        </div>
                    </div>
                    <div className="col-md-9 col-sm-9">
                        <div className="details-table-btn">
                            <ul className="btn-row">
                                <li> <span className="yello-value"> {`${props?.match?.params?.slug ? props?.match?.params?.slug :  "Tournament ID" }`} </span> </li>
                                <li> <span className="yello-value"> {`${tournamentDetail?.length > 0 ? moment(tournamentDetail[0].start_tournament).format("h:mm") + " - " + moment(tournamentDetail[0].start_tournament).format("DD.MM.YY") : "Start"}`} </span> </li>
                                <li> <span className="yello-value"> {`${tournamentDetail?.length > 0 ? moment(tournamentDetail[0].end_tournament).format("h:mm") + " - " + moment(tournamentDetail[0].end_tournament).format("DD.MM.YY") : "End"}`} </span> </li>
                                <li> <Button id="orange-btn" onClick={() => props.history.goBack()}> Back </Button> </li>
                            </ul>
                            <ul className="btn-row">
                                <li> <input type="text" id="blue-input" placeholder="Input Name" value={name} onChange={(e) => setName(e.target.value)}/> </li>
                                {/* <li> <Form.Control
                                    as="select"
                                    className="mr-sm-2 blue-select"
                                    id="inlineFormCustomSelect"
                                    custom
                                    onChange={(e) => setBuyIn(e.target.value)}
                                >
                                    <option value="0">Select Buyin</option>
                                    <option value="9/1">9/1</option>
                                    <option value="23/2">23/2</option>
                                    <option value="32/5">32/5</option>
                                    <option value="47/3">47/3</option>
                                    <option value="72/3">72/3</option>
                                    <option value="96/4">96/4</option>
                                    <option value="145/5">145/5</option>
                                    <option value="195/5">195/5</option>
                                    <option value="242/8">242/8</option>
                                    <option value="430/14">430/14</option>
                                </Form.Control>
                                </li> */}
                                <li> <input type="text" id="blue-input" placeholder="BuyIn" value={buyIn} onChange={(e) => setBuyIn(e.target.value)}/> </li>
                                <li> <input type="text" id="blue-input" placeholder="Rake" value={rake}  onChange={e => setRake(e.target.value)}/> </li>
                            </ul>
                            <ul className="btn-row">
                                <li> <span className="yello-value">{`${tournamentDetail?.length > 0 ? tournamentDetail[0].total_players : "Total Playes"}`}</span> </li>
                                <li> <span className="purple-value">{`${totalPrizepool ? totalPrizepool : "Total Players"}`}</span> </li>
                                <li> <span className="purple-value"> {`${totalRake ? totalRake: "Total Rake"}`}</span> </li>
                                <li> <span className="purple-value"> {`${totalTip ? totalTip : "Total Tip"}`}</span> </li>
                            </ul>
                            <ul className="btn-row">
                                <li> <Button id="red-btn" onClick={() => deleteTournament()}> Delete </Button> </li>
                                <li> <Button id="pink-btn" onClick={() => fetchData()}> Reset </Button> </li>
                                <li> <Button id="green-btn" onClick={() => handleSave()}> Save </Button> </li>
                            </ul>
                        </div>
                        <div className="tournament-details-table">
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>Rank</th>
                                        <th>Player</th>
                                        <th>Win</th>
                                        <th>Tip</th>
                                    </tr>
                                </thead>
                                {data?.map((item, index) => {
                                return(
                                    <tbody>
                                        <tr>
                                            <td>{`#${item.position}`}</td>
                                            <td>Simba34</td>
                                            <td><input type="text" id="blue-input" value={item.payout} onChange={(e) => setCangeWin(e.target.value, item.id)}/></td>
                                            <td><input type="text" id="blue-input" value={item.tip} onChange={(e) => setCangeTip(e.target.value, item.id)}/></td>
                                        </tr>
                                    </tbody>
                                )})}
                            </Table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Tournamentsdetails;