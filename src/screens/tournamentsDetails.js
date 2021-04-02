import React, { useEffect } from 'react';
import useState from 'react-usestateref'
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Header from '../components/header';
import Table from 'react-bootstrap/Table';
import axios from 'axios';
import moment from 'moment';
import Modal from 'react-bootstrap/Modal'
import { propTypes } from 'react-bootstrap/esm/Image';

const Tournamentsdetails = (props) => {
    const [data, setData] = useState(undefined);
    const [tournamentDetail, setTournamentDetail] = useState(undefined);
    const [originalData, setOriginalData] = useState(undefined);
    const [buyIn, setBuyIn] = useState(undefined);
    const [rake, setRake] = useState(0);
    const [name, setName] = useState(undefined);
    const [PrizePool, setPrizePool] = useState(undefined);
    const [totalPlayers, setTotalPlayers] = useState(undefined);
    const [rakeValidation, setRakeValidation] = useState(false);
    const [buyInValidation, setBuyInValidation] = useState(false);
    const [nameValidation, setNameValidation] = useState(false);
    let totalPrizepool = (data?.length * (buyIn - rake))
    let totalRake = Number(tournamentDetail ? tournamentDetail[0].total_players : 0) * Number(rake);
    var a = data
    let totalTip = 0;
    if (a?.length > 0) {
        for (var i = 0; i < a?.length; i++) {
            totalTip += a[i]?.tip;
        }
    }
    console.log("rake ------>", rakeValidation, buyInValidation, nameValidation);
    useEffect(() => {
        axios({
            method: 'get',
            url: `http://143.110.254.46:8084/poker/api/tournament/${props?.match?.params?.slug}`,
            headers: {
              Authorization: "Token "+localStorage.getItem("accessToken")?.trim()
            }
        })
            .then(function (response) {
                setTournamentDetail(response.data.tournament);
                setData(response.data.rank);
                setBuyIn(response?.data?.tournament[0]?.buy_in)
                setRake(response?.data?.tournament[0]?.rake)
                setName(response?.data?.tournament[0]?.name)
                setPrizePool(response?.data?.tournament[0]?.total_prizepool)
                setOriginalData(response.data.rank)
                setTotalPlayers(response?.data?.tournament[0]?.total_players)
            });
    }, []);
    console.log("validation ----->", rakeValidation);
    const handleSave = () => {
        if(rake === 0 || !rake)
        {
            setRakeValidation(true)
            console.log("rake")
        }else {
            setRakeValidation(false)
        }
        if(buyIn === 0)
        {
            setBuyInValidation(true)
            console.log("buyInn")
        }else {
            setBuyInValidation(false)
        }
        if(!name)
        {
            setNameValidation(true)
            console.log("nname")
        }else{
            setNameValidation(false)
        }
        if((rake > 0 || !rake) && buyIn > 0 && name){
            axios({
            method: 'put',
            url: `http://143.110.254.46:8084/poker/api/tournament/${props?.match?.params?.slug}`,
            data: {
                tournament: [
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
            },
            headers: {
              Authorization: "Token "+localStorage.getItem("accessToken")?.trim()
            }
            })
                .then(function (response) {
                    console.log("res --->", response.data);
                    props.history.goBack()
                });
        }
            setShowSave(false)
    }
    //console.log("data ----------------------------------------->", PrizePool );
    const calculation = async(e) => {
        console.log(Number(e.target.value));
        setBuyIn(Number(e.target.value))
        let totalPrizepool = await (Number(tournamentDetail ? tournamentDetail[0].total_players : 0) * (Number(e.target.value) - Number(rake)))
        setPrizePool(totalPrizepool);
        totalRake = await (Number(tournamentDetail ? tournamentDetail[0].total_players : 0) * Number(rake))
        //console.log("PrizePool --->", totalPrizepool)
        if (tournamentDetail) {
            if (Number(e.target.value) >= 1 && Number(e.target.value) <= 75) {
                if (totalPlayers >= 2 && totalPlayers <= 5) {
                    setData(
                        data?.map(item =>
                            item.position === 1
                                ? { ...item, payout: ((totalPrizepool * 100) / 100) }
                                : { ...item, payout: 0 }
                        )
                    )
                }
                if (totalPlayers >= 6 && totalPlayers <= 8) {
                    let updatedData = data?.map(item =>
                        item.position === 1 ? { ...item, payout: Math.floor(((totalPrizepool * 62) / 100)) } : item
                    )
                    await setData(updatedData);
                    let updatedData1 = updatedData?.map(item =>
                        item.position === 2 ? { ...item, payout: Math.floor(((totalPrizepool * 38) / 100)) } : item
                    )
                    await setData(updatedData1);
                    let updatedData2 = updatedData1?.map(item =>
                        item.position === 3 ? { ...item, payout: 0 } : item
                    )
                    await setData(updatedData2);
                    await setData(
                        updatedData2?.map(item =>
                            item.position > 3 ? { ...item, payout: 0 } : item
                        )
                    )
                }
                if (totalPlayers >= 9 && totalPlayers <= 14) {
                    let updatedData = data?.map(item =>
                        item.position === 1 ? { ...item, payout: Math.floor(((totalPrizepool * 50) / 100)) } : item
                    )
                    await setData(updatedData);
                    let updatedData1 = updatedData?.map(item =>
                        item.position === 2 ? { ...item, payout: Math.floor(((totalPrizepool * 30) / 100)) } : item
                    )
                    await setData(updatedData1);
                    let updatedData2 = updatedData1?.map(item =>
                        item.position === 3 ? { ...item, payout: Math.floor(totalPrizepool - (updatedData1[0].payout + updatedData1[1].payout)) } : item
                    )
                    await setData(updatedData2);
                    await setData(
                        updatedData2?.map(item =>
                            item.position > 3 ? { ...item, payout: 0 } : item
                        )
                    )
                }
                if (totalPlayers >= 15 && totalPlayers <= 17) {
                    let updatedData = data?.map(item =>
                        item.position === 1 ? { ...item, payout: Math.floor(((totalPrizepool * 50) / 100)) } : item
                    )
                    await setData(updatedData);
                    let updatedData1 = updatedData?.map(item =>
                        item.position === 2 ? { ...item, payout: Math.floor(((totalPrizepool * 30) / 100)) } : item
                    )
                    console.log("updatedData2 ---->", updatedData1);
                    await setData(updatedData1);
                    let updatedData2 = updatedData1?.map(item =>
                        item.position === 3 ? { ...item, payout: Math.floor(totalPrizepool - (updatedData1[0].payout + updatedData1[1].payout)) } : item
                    )
                    await setData(updatedData2);
                    let updatedData3 = updatedData2?.map(item =>
                        item.position === 4 ? { ...item, payout: 0 } : item
                    )
                    await setData(updatedData3);
                    await setData(
                        updatedData3?.map(item =>
                            item.position > 4 ? { ...item, payout: 0 } : item
                        )
                    )
                }
                if (totalPlayers >= 18 && totalPlayers <= 24) {
                    let updatedData = data?.map(item =>
                        item.position === 1 ? { ...item, payout: Math.floor(((totalPrizepool * 45) / 100)) } : item
                    )
                    await setData(updatedData);
                    let updatedData1 = updatedData?.map(item =>
                        item.position === 2 ? { ...item, payout: Math.floor(((totalPrizepool * 27) / 100)) } : item
                    )
                    await setData(updatedData1);
                    let updatedData2 = updatedData1?.map(item =>
                        item.position === 3 ? { ...item, payout: Math.floor(((totalPrizepool * 17) / 100)) } : item
                    )
                    await setData(updatedData2);
                    let updatedData3 = updatedData2?.map(item =>
                        item.position === 4 ? { ...item, payout: Math.floor(totalPrizepool - (updatedData2[0].payout + updatedData2[1].payout + updatedData2[2].payout)) } : item
                    )
                    await setData(updatedData3);
                    await setData(
                        updatedData3?.map(item =>
                            item.position > 4 ? { ...item, payout: 0 } : item
                        )
                    )
                }
                if (totalPlayers >= 25 && totalPlayers <= 29) {
                    let updatedData = data?.map(item =>
                        item.position === 1 ? { ...item, payout: Math.floor(((totalPrizepool * 38) / 100)) } : item
                    )
                    await setData(updatedData);
                    let updatedData1 = updatedData?.map(item =>
                        item.position === 2 ? { ...item, payout: Math.floor(((totalPrizepool * 25) / 100)) } : item
                    )
                    await setData(updatedData1);
                    let updatedData2 = updatedData1?.map(item =>
                        item.position === 3 ? { ...item, payout: Math.floor(((totalPrizepool * 17) / 100)) } : item
                    )
                    await setData(updatedData2);
                    let updatedData3 = updatedData2?.map(item =>
                        item.position === 4 ? { ...item, payout: Math.floor(((totalPrizepool * 12) / 100)) } : item
                    )
                    await setData(updatedData3);
                    let updatedData4 = updatedData3?.map(item =>
                        item.position === 5 ? { ...item, payout: Math.floor(totalPrizepool - (updatedData3[0].payout + updatedData3[1].payout + updatedData3[2].payout + updatedData3[3].payout)) } : item
                    )
                    await setData(updatedData4);
                    await setData(
                        updatedData4?.map(item =>
                            item.position > 5 ? { ...item, payout: 0 } : item
                        )
                    )
                }
                if (totalPlayers >= 30 && totalPlayers <= 34) {
                    console.log("30 to 34");
                    let updatedData = data?.map(item =>
                        item.position === 1 ? { ...item, payout: Math.floor(((totalPrizepool * 37) / 100)) } : item
                    )
                    await setData(updatedData);
                    let updatedData1 = updatedData?.map(item =>
                        item.position === 2 ? { ...item, payout: Math.floor(((totalPrizepool * 24) / 100)) } : item
                    )
                    await setData(updatedData1);
                    let updatedData2 = updatedData1?.map(item =>
                        item.position === 3 ? { ...item, payout: Math.floor(((totalPrizepool * 15) / 100)) } : item
                    )
                    await setData(updatedData2);
                    let updatedData3 = updatedData2?.map(item =>
                        item.position === 4 ? { ...item, payout: Math.floor(((totalPrizepool * 10) / 100)) } : item
                    )
                    await setData(updatedData3);
                    let updatedData4 = updatedData3?.map(item =>
                        item.position === 5 ? { ...item, payout: Math.floor(((totalPrizepool * 8) / 100)) } : item
                    )
                    await setData(updatedData4);
                    let updatedData5 = updatedData4?.map(item =>
                        item.position === 6 ? { ...item, payout: Math.floor(totalPrizepool - (updatedData4[0].payout + updatedData4[1].payout + updatedData4[2].payout + updatedData4[3].payout + updatedData4[4].payout)) } : item
                    )
                    await setData(updatedData5);
                    await setData(
                        updatedData5?.map(item =>
                            item.position > 6 ? { ...item, payout: 0 } : item
                        )
                    )
                }
                if (totalPlayers >= 35 && totalPlayers <= 39) {
                    let updatedData = data?.map(item =>
                        item.position === 1 ? { ...item, payout: Math.floor(((totalPrizepool * 33) / 100)) } : item
                    )
                    await setData(updatedData);
                    let updatedData1 = updatedData?.map(item =>
                        item.position === 2 ? { ...item, payout: Math.floor(((totalPrizepool * 22) / 100)) } : item
                    )
                    await setData(updatedData1);
                    let updatedData2 = updatedData1?.map(item =>
                        item.position === 3 ? { ...item, payout: Math.floor(((totalPrizepool * 15) / 100)) } : item
                    )
                    await setData(updatedData2);
                    let updatedData3 = updatedData2?.map(item =>
                        item.position === 4 ? { ...item, payout: Math.floor(((totalPrizepool * 10) / 100)) } : item
                    )
                    await setData(updatedData3);
                    let updatedData4 = updatedData3?.map(item =>
                        item.position === 5 ? { ...item, payout: Math.floor(((totalPrizepool * 8) / 100)) } : item
                    )
                    await setData(updatedData4);
                    let updatedData5 = updatedData4?.map(item =>
                        item.position === 6 ? { ...item, payout: Math.floor(((totalPrizepool * 7) / 100)) } : item
                    )
                    await setData(updatedData5);
                    let updatedData6 = updatedData5?.map(item =>
                        item.position === 7 ? { ...item, payout: Math.floor(totalPrizepool - (updatedData5[0].payout + updatedData5[1].payout + updatedData5[2].payout + updatedData5[3].payout + updatedData5[4].payout + updatedData5[5].payout)) } : item
                    )
                    await setData(updatedData6);
                    await setData(
                        updatedData6?.map(item =>
                            item.position > 7 ? { ...item, payout: 0 } : item
                        )
                    )
                }
                if (totalPlayers >= 40 && totalPlayers <= 44) {
                    let updatedData = data?.map(item =>
                        item.position === 1 ? { ...item, payout: Math.floor(((totalPrizepool * 32) / 100)) } : item
                    )
                    await setData(updatedData);
                    let updatedData1 = updatedData?.map(item =>
                        item.position === 2 ? { ...item, payout: Math.floor(((totalPrizepool * 20) / 100)) } : item
                    )
                    await setData(updatedData1);
                    let updatedData2 = updatedData1?.map(item =>
                        item.position === 3 ? { ...item, payout: Math.floor(((totalPrizepool * 13) / 100)) } : item
                    )
                    await setData(updatedData2);
                    let updatedData3 = updatedData2?.map(item =>
                        item.position === 4 ? { ...item, payout: Math.floor(((totalPrizepool * 9) / 100)) } : item
                    )
                    await setData(updatedData3);
                    let updatedData4 = updatedData3?.map(item =>
                        item.position === 5 ? { ...item, payout: Math.floor(((totalPrizepool * 8) / 100)) } : item
                    )
                    await setData(updatedData4);
                    let updatedData5 = updatedData4?.map(item =>
                        item.position === 6 ? { ...item, payout: Math.floor(((totalPrizepool * 7) / 100)) } : item
                    )
                    await setData(updatedData5);
                    let updatedData6 = updatedData5?.map(item =>
                        item.position === 7 ? { ...item, payout: Math.floor(((totalPrizepool * 6) / 100)) } : item
                    )
                    await setData(updatedData6);
                    let updatedData7 = updatedData6?.map(item =>
                        item.position === 8 ? { ...item, payout: Math.floor(totalPrizepool - (updatedData6[0].payout + updatedData6[1].payout + updatedData6[2].payout + updatedData6[3].payout + updatedData6[4].payout + updatedData6[5].payout + updatedData6[6].payout)) } : item
                    )
                    await setData(updatedData7);
                    await setData(
                        updatedData7?.map(item =>
                            item.position > 8 ? { ...item, payout: 0 } : item
                        )
                    )
                }
                if (totalPlayers >= 45) {
                    console.log("46 above");
                    let updatedData = data?.map(item =>
                        item.position === 1 ? { ...item, payout: Math.floor(((totalPrizepool * 28) / 100)) } : item
                    )
                    await setData(updatedData);
                    let updatedData1 = updatedData?.map(item =>
                        item.position === 2 ? { ...item, payout: Math.floor(((totalPrizepool * 18) / 100)) } : item
                    )
                    await setData(updatedData1);
                    let updatedData2 = updatedData1?.map(item =>
                        item.position === 3 ? { ...item, payout: Math.floor(((totalPrizepool * 12) / 100)) } : item
                    )
                    await setData(updatedData2);
                    let updatedData3 = updatedData2?.map(item =>
                        item.position === 4 ? { ...item, payout: Math.floor(((totalPrizepool * 9) / 100)) } : item
                    )
                    await setData(updatedData3);
                    let updatedData4 = updatedData3?.map(item =>
                        item.position === 5 ? { ...item, payout: Math.floor(((totalPrizepool * 8) / 100)) } : item
                    )
                    await setData(updatedData4);
                    let updatedData5 = updatedData4?.map(item =>
                        item.position === 6 ? { ...item, payout: Math.floor(((totalPrizepool * 7) / 100)) } : item
                    )
                    await setData(updatedData5);
                    let updatedData6 = updatedData5?.map(item =>
                        item.position === 7 ? { ...item, payout: Math.floor(((totalPrizepool * 6) / 100)) } : item
                    )
                    await setData(updatedData6);
                    let updatedData7 = updatedData6?.map(item =>
                        item.position === 8 ? { ...item, payout: Math.floor(((totalPrizepool * 5) / 100)) } : item
                    )
                    await setData(updatedData7);
                    let updatedData8 = updatedData7?.map(item =>
                        item.position === 9 ? { ...item, payout: Math.floor(totalPrizepool - (updatedData7[0].payout + updatedData4[1].payout + updatedData7[2].payout + updatedData7[3].payout + updatedData7[4].payout + updatedData7[5].payout + updatedData7[6].payout + updatedData7[7].payout)) } : item
                    )
                    await setData(updatedData8);
                    await setData(
                        updatedData8?.map(item =>
                            item.position > 9 ? { ...item, payout: 0 } : item
                        )
                    )
                }
            }
            if(Number(e.target.value) >= 76 && Number(e.target.value) <= 125){
                if (totalPlayers >= 2 && totalPlayers <= 5) {
                    console.log("2 to 5");
                    let updatedData = data?.map(item =>
                        item.position === 1 ? { ...item, payout: Math.floor(((totalPrizepool * 100) / 100)) } : item
                    )
                    await setData(updatedData);
                    await setData(
                        updatedData?.map(item =>
                            item.position > 1 ? { ...item, payout: 0 } : item
                        )
                    )
                }
                if (totalPlayers >= 6 && totalPlayers <= 8) {
                    let updatedData = data?.map(item =>
                        item.position === 1 ? { ...item, payout: Math.floor(((totalPrizepool * 62) / 100)) } : item
                    )
                    await setData(updatedData);
                    let updatedData1 = updatedData?.map(item =>
                        item.position === 2 ? { ...item, payout: Math.floor(((totalPrizepool * 38) / 100)) } : item
                    )
                    await setData(updatedData1);
                    await setData(
                        updatedData1?.map(item =>
                            item.position > 2 ? { ...item, payout: 0 } : item
                        )
                    )
                }
                if (totalPlayers >= 9 && totalPlayers <= 14) {
                    let updatedData = data?.map(item =>
                        item.position === 1 ? { ...item, payout: Math.floor(((totalPrizepool * 50) / 100)) } : item
                    )
                    await setData(updatedData);
                    let updatedData1 = updatedData?.map(item =>
                        item.position === 2 ? { ...item, payout: Math.floor(((totalPrizepool * 30) / 100)) } : item
                    )
                    await setData(updatedData1);
                    let updatedData2 = updatedData1?.map(item =>
                        item.position === 3 ? { ...item, payout: Math.floor(totalPrizepool - (updatedData1[0].payout + updatedData1[1].payout)) } : item
                    )
                    await setData(updatedData2);
                    await setData(
                        updatedData2?.map(item =>
                            item.position > 3 ? { ...item, payout: 0 } : item
                        )
                    )
                }
                if (totalPlayers >= 15 && totalPlayers <= 17) {
                    let updatedData = data?.map(item =>
                        item.position === 1 ? { ...item, payout: Math.floor(((totalPrizepool * 45) / 100)) } : item
                    )
                    await setData(updatedData);
                    let updatedData1 = updatedData?.map(item =>
                        item.position === 2 ? { ...item, payout: Math.floor(((totalPrizepool * 27) / 100)) } : item
                    )
                    await setData(updatedData1);
                    let updatedData2 = updatedData1?.map(item =>
                        item.position === 3 ? { ...item, payout: Math.floor(((totalPrizepool * 17) / 100)) } : item
                    )
                    await setData(updatedData2);
                    let updatedData3 = updatedData2?.map(item =>
                        item.position === 4 ? { ...item, payout: Math.floor(totalPrizepool - (updatedData2[0].payout + updatedData2[1].payout + updatedData2[2].payout)) } : item
                    )
                    await setData(updatedData3);
                    await setData(
                        updatedData3?.map(item =>
                            item.position > 4 ? { ...item, payout: 0 } : item
                        )
                    )
                }
                if (totalPlayers >= 18 && totalPlayers <= 24) {
                    let updatedData = data?.map(item =>
                        item.position === 1 ? { ...item, payout: Math.floor(((totalPrizepool * 45) / 100)) } : item
                    )
                    console.log("updatedData --->", updatedData);
                    await setData(updatedData);
                    let updatedData1 = updatedData?.map(item =>
                        item.position === 2 ? { ...item, payout: Math.floor(((totalPrizepool * 27) / 100)) } : item
                    )
                    await setData(updatedData1);
                    let updatedData2 = updatedData1?.map(item =>
                        item.position === 3 ? { ...item, payout: Math.floor(((totalPrizepool * 17) / 100)) } : item
                    )
                    await setData(updatedData2);
                    let updatedData3 = updatedData2?.map(item =>
                        item.position === 4 ? { ...item, payout: Math.floor(totalPrizepool - (updatedData2[0].payout + updatedData2[1].payout + updatedData2[2].payout)) } : item
                    )
                    await setData(updatedData3);
                    await setData(
                        updatedData3?.map(item =>
                            item.position > 4 ? { ...item, payout: 0 } : item
                        )
                    )
                }
                if (totalPlayers >= 25 && totalPlayers <= 29) {
                    let updatedData = data?.map(item =>
                        item.position === 1 ? { ...item, payout: Math.floor(((totalPrizepool * 38) / 100)) } : item
                    )
                    await setData(updatedData);
                    let updatedData1 = updatedData?.map(item =>
                        item.position === 2 ? { ...item, payout: Math.floor(((totalPrizepool * 25) / 100)) } : item
                    )
                    await setData(updatedData1);
                    let updatedData2 = updatedData1?.map(item =>
                        item.position === 3 ? { ...item, payout: Math.floor(((totalPrizepool * 17) / 100)) } : item
                    )
                    await setData(updatedData2);
                    let updatedData3 = updatedData2?.map(item =>
                        item.position === 4 ? { ...item, payout: Math.floor(((totalPrizepool * 12) / 100)) } : item
                    )
                    await setData(updatedData3);
                    let updatedData4 = updatedData3?.map(item =>
                        item.position === 5 ? { ...item, payout: Math.floor(totalPrizepool - (updatedData3[0].payout + updatedData3[1].payout + updatedData3[2].payout + updatedData3[3].payout)) } : item
                    )
                    await setData(updatedData4);
                    await setData(
                        updatedData4?.map(item =>
                            item.position > 5 ? { ...item, payout: 0 } : item
                        )
                    )
                }
                if (totalPlayers >= 30 && totalPlayers <= 34) {
                    let updatedData = data?.map(item =>
                        item.position === 1 ? { ...item, payout: Math.floor(((totalPrizepool * 37) / 100)) } : item
                    )
                    await setData(updatedData);
                    let updatedData1 = updatedData?.map(item =>
                        item.position === 2 ? { ...item, payout: Math.floor(((totalPrizepool * 24) / 100)) } : item
                    )
                    await setData(updatedData1);
                    let updatedData2 = updatedData1?.map(item =>
                        item.position === 3 ? { ...item, payout: Math.floor(((totalPrizepool * 15) / 100)) } : item
                    )
                    await setData(updatedData2);
                    let updatedData3 = updatedData2?.map(item =>
                        item.position === 4 ? { ...item, payout: Math.floor(((totalPrizepool * 10) / 100)) } : item
                    )
                    await setData(updatedData3);
                    let updatedData4 = updatedData3?.map(item =>
                        item.position === 5 ? { ...item, payout: Math.floor(((totalPrizepool * 8) / 100)) } : item
                    )
                    await setData(updatedData4);
                    let updatedData5 = updatedData4?.map(item =>
                        item.position === 6 ? { ...item, payout: Math.floor(totalPrizepool - (updatedData4[0].payout + updatedData4[1].payout + updatedData4[2].payout + updatedData4[3].payout + updatedData4[4].payout)) } : item
                    )
                    await setData(updatedData5);
                    await setData(
                        updatedData5?.map(item =>
                            item.position > 6 ? { ...item, payout: 0 } : item
                        )
                    )
                }
                if (totalPlayers >= 35 && totalPlayers <= 39) {
                    let updatedData = data?.map(item =>
                        item.position === 1 ? { ...item, payout: Math.floor(((totalPrizepool * 33) / 100)) } : item
                    )
                    await setData(updatedData);
                    let updatedData1 = updatedData?.map(item =>
                        item.position === 2 ? { ...item, payout: Math.floor(((totalPrizepool * 22) / 100)) } : item
                    )
                    await setData(updatedData1);
                    let updatedData2 = updatedData1?.map(item =>
                        item.position === 3 ? { ...item, payout: Math.floor(((totalPrizepool * 15) / 100)) } : item
                    )
                    await setData(updatedData2);
                    let updatedData3 = updatedData2?.map(item =>
                        item.position === 4 ? { ...item, payout: Math.floor(((totalPrizepool * 10) / 100)) } : item
                    )
                    await setData(updatedData3);
                    let updatedData4 = updatedData3?.map(item =>
                        item.position === 5 ? { ...item, payout: Math.floor(((totalPrizepool * 8) / 100)) } : item
                    )
                    await setData(updatedData4);
                    let updatedData5 = updatedData4?.map(item =>
                        item.position === 6 ? { ...item, payout: Math.floor(((totalPrizepool * 7) / 100)) } : item
                    )
                    await setData(updatedData5);
                    let updatedData6 = updatedData5?.map(item =>
                        item.position === 7 ? { ...item, payout: Math.floor(totalPrizepool - (updatedData5[0].payout + updatedData5[1].payout + updatedData5[2].payout + updatedData5[3].payout + updatedData5[4].payout + updatedData5[5].payout)) } : item
                    )
                    await setData(updatedData6);
                    await setData(
                        updatedData6?.map(item =>
                            item.position > 7 ? { ...item, payout: 0 } : item
                        )
                    )
                }
                if (totalPlayers >= 40 && totalPlayers <= 44) {
                    let updatedData = data?.map(item =>
                        item.position === 1 ? { ...item, payout: Math.floor(((totalPrizepool * 33) / 100)) } : item
                    )
                    await setData(updatedData);
                    let updatedData1 = updatedData?.map(item =>
                        item.position === 2 ? { ...item, payout: Math.floor(((totalPrizepool * 22) / 100)) } : item
                    )
                    await setData(updatedData1);
                    let updatedData2 = updatedData1?.map(item =>
                        item.position === 3 ? { ...item, payout: Math.floor(((totalPrizepool * 15) / 100)) } : item
                    )
                    await setData(updatedData2);
                    let updatedData3 = updatedData2?.map(item =>
                        item.position === 4 ? { ...item, payout: Math.floor(((totalPrizepool * 10) / 100)) } : item
                    )
                    await setData(updatedData3);
                    let updatedData4 = updatedData3?.map(item =>
                        item.position === 5 ? { ...item, payout: Math.floor(((totalPrizepool * 8) / 100)) } : item
                    )
                    await setData(updatedData4);
                    let updatedData5 = updatedData4?.map(item =>
                        item.position === 6 ? { ...item, payout: Math.floor(((totalPrizepool * 7) / 100)) } : item
                    )
                    await setData(updatedData5);
                    let updatedData6 = updatedData5?.map(item =>
                        item.position === 7 ? { ...item, payout: Math.floor(((totalPrizepool * 5) / 100)) } : item
                    )
                    await setData(updatedData6);
                    let updatedData7 = updatedData6?.map(item =>
                        item.position === 8 ? { ...item, payout: Math.floor(totalPrizepool - (updatedData6[0].payout + updatedData6[1].payout + updatedData6[2].payout + updatedData6[3].payout + updatedData6[4].payout + updatedData6[5].payout + updatedData6[6].payout)) } : item
                    )
                    await setData(updatedData7);
                    await setData(
                        updatedData7?.map(item =>
                            item.position > 8 ? { ...item, payout: 0 } : item
                        )
                    )
                }
                if (totalPlayers >= 45) {
                    let updatedData = data?.map(item =>
                        item.position === 1 ? { ...item, payout: Math.floor(((totalPrizepool * 28) / 100)) } : item
                    )
                    await setData(updatedData);
                    let updatedData1 = updatedData?.map(item =>
                        item.position === 2 ? { ...item, payout: Math.floor(((totalPrizepool * 18) / 100)) } : item
                    )
                    await setData(updatedData1);
                    let updatedData2 = updatedData1?.map(item =>
                        item.position === 3 ? { ...item, payout: Math.floor(((totalPrizepool * 12) / 100)) } : item
                    )
                    await setData(updatedData2);
                    let updatedData3 = updatedData2?.map(item =>
                        item.position === 4 ? { ...item, payout: Math.floor(((totalPrizepool * 9) / 100)) } : item
                    )
                    await setData(updatedData3);
                    let updatedData4 = updatedData3?.map(item =>
                        item.position === 5 ? { ...item, payout: Math.floor(((totalPrizepool * 8) / 100)) } : item
                    )
                    await setData(updatedData4);
                    let updatedData5 = updatedData4?.map(item =>
                        item.position === 6 ? { ...item, payout: Math.floor(((totalPrizepool * 7) / 100)) } : item
                    )
                    await setData(updatedData5);
                    let updatedData6 = updatedData5?.map(item =>
                        item.position === 7 ? { ...item, payout: Math.floor(((totalPrizepool * 6) / 100)) } : item
                    )
                    await setData(updatedData6);
                    let updatedData7 = updatedData6?.map(item =>
                        item.position === 8 ? { ...item, payout: Math.floor(((totalPrizepool * 5) / 100)) } : item
                    )
                    await setData(updatedData7);
                    let updatedData8 = updatedData7?.map(item =>
                        item.position === 9 ? { ...item, payout: Math.floor(totalPrizepool - (updatedData7[0].payout + updatedData7[1].payout + updatedData7[2].payout + updatedData7[3].payout + updatedData7[4].payout + updatedData7[5].payout + updatedData7[6].payout + updatedData7[7].payout)) } : item
                    )
                    await setData(updatedData8);
                    await setData(
                        updatedData8?.map(item =>
                            item.position > 9 ? { ...item, payout: 0 } : item
                        )
                    )
                }
            }
            if(Number(e.target.value) >= 126){
                if (totalPlayers >= 2 && totalPlayers <= 5) {
                    let updatedData = data?.map(item =>
                        item.position === 1 ? { ...item, payout: Math.floor(((totalPrizepool * 100) / 100)) } : item
                    )
                    await setData(updatedData);
                    await setData(
                        updatedData?.map(item =>
                            item.position > 1 ? { ...item, payout: 0 } : item
                        )
                    )
                }
                if (totalPlayers >= 6 && totalPlayers <= 8) {
                    let updatedData = data?.map(item =>
                        item.position === 1 ? { ...item, payout: Math.floor(((totalPrizepool * 62) / 100)) } : item
                    )
                    await setData(updatedData);
                    let updatedData1 = updatedData?.map(item =>
                        item.position === 2 ? { ...item, payout: Math.floor(((totalPrizepool * 38) / 100)) } : item
                    )
                    await setData(updatedData1);
                    await setData(
                        updatedData1?.map(item =>
                            item.position > 2 ? { ...item, payout: 0 } : item
                        )
                    )
                }
                if (totalPlayers >= 9 && totalPlayers <= 14) {
                    let updatedData = data?.map(item =>
                        item.position === 1 ? { ...item, payout: Math.floor(((totalPrizepool * 50) / 100)) } : item
                    )
                    await setData(updatedData);
                    let updatedData1 = updatedData?.map(item =>
                        item.position === 2 ? { ...item, payout: Math.floor(((totalPrizepool * 30) / 100)) } : item
                    )
                    console.log("updatedData1 --->", updatedData1);
                    await setData(updatedData1);
                    let updatedData2 = updatedData1?.map(item =>
                        item.position === 3 ? { ...item, payout: Math.floor(totalPrizepool - (updatedData1[0].payout + updatedData1[1].payout)) } : item
                    )
                    await setData(updatedData2);
                    await setData(
                        updatedData2?.map(item =>
                            item.position > 3 ? { ...item, payout: 0 } : item
                        )
                    )
                }
                if (totalPlayers >= 15 && totalPlayers <= 17) {
                    let updatedData = data?.map(item =>
                        item.position === 1 ? { ...item, payout: Math.floor(((totalPrizepool * 45) / 100)) } : item
                    )
                    await setData(updatedData);
                    let updatedData1 = updatedData?.map(item =>
                        item.position === 2 ? { ...item, payout: Math.floor(((totalPrizepool * 27) / 100)) } : item
                    )
                    await setData(updatedData1);
                    let updatedData2 = updatedData1?.map(item =>
                        item.position === 3 ? { ...item, payout: Math.floor(((totalPrizepool * 17) / 100)) } : item
                    )
                    await setData(updatedData2);
                    let updatedData3 = updatedData2?.map(item =>
                        item.position === 4 ? { ...item, payout: Math.floor(totalPrizepool - (updatedData2[0].payout + updatedData2[1].payout + updatedData2[2].payout )) } : item
                    )
                    await setData(updatedData3);
                    await setData(
                        updatedData3?.map(item =>
                            item.position > 4 ? { ...item, payout: 0 } : item
                        )
                    )
                }
                if (totalPlayers >= 18 && totalPlayers <= 24) {
                    let updatedData = data?.map(item =>
                        item.position === 1 ? { ...item, payout: Math.floor(((totalPrizepool * 38) / 100)) } : item
                    )
                    await setData(updatedData);
                    let updatedData1 = updatedData?.map(item =>
                        item.position === 2 ? { ...item, payout: Math.floor(((totalPrizepool * 25) / 100)) } : item
                    )
                    await setData(updatedData1);
                    let updatedData2 = updatedData1?.map(item =>
                        item.position === 3 ? { ...item, payout: Math.floor(((totalPrizepool * 17) / 100)) } : item
                    )
                    await setData(updatedData2);
                    let updatedData3 = updatedData2?.map(item =>
                        item.position === 4 ? { ...item, payout: Math.floor(((totalPrizepool * 12) / 100)) } : item
                    )
                    await setData(updatedData3);
                    let updatedData4 = updatedData3?.map(item =>
                        item.position === 5 ? { ...item, payout: Math.floor(totalPrizepool - (updatedData3[0].payout + updatedData3[1].payout + updatedData3[2].payout + updatedData3[3].payout)) } : item
                    )
                    await setData(updatedData4);
                    await setData(
                        updatedData4?.map(item =>
                            item.position > 5 ? { ...item, payout: 0 } : item
                        )
                    )
                }
                if (totalPlayers >= 25 && totalPlayers <= 29) {
                    let updatedData = data?.map(item =>
                        item.position === 1 ? { ...item, payout: Math.floor(((totalPrizepool * 37) / 100)) } : item
                    )
                    await setData(updatedData);
                    let updatedData1 = updatedData?.map(item =>
                        item.position === 2 ? { ...item, payout: Math.floor(((totalPrizepool * 24) / 100)) } : item
                    )
                    await setData(updatedData1);
                    let updatedData2 = updatedData1?.map(item =>
                        item.position === 3 ? { ...item, payout: Math.floor(((totalPrizepool * 15) / 100)) } : item
                    )
                    await setData(updatedData2);
                    let updatedData3 = updatedData2?.map(item =>
                        item.position === 4 ? { ...item, payout: Math.floor(((totalPrizepool * 10) / 100)) } : item
                    )
                    await setData(updatedData3);
                    let updatedData4 = updatedData3?.map(item =>
                        item.position === 5 ? { ...item, payout: Math.floor(((totalPrizepool * 8) / 100)) } : item
                    )
                    await setData(updatedData4);
                    let updatedData5 = updatedData4?.map(item =>
                        item.position === 6 ? { ...item, payout: Math.floor(totalPrizepool - (updatedData4[0].payout + updatedData4[1].payout + updatedData4[2].payout + updatedData4[3].payout + updatedData4[4].payout)) } : item
                    )
                    await setData(updatedData5);
                    await setData(
                        updatedData5?.map(item =>
                            item.position > 6 ? { ...item, payout: 0 } : item
                        )
                    )
                }
                if (totalPlayers >= 30 && totalPlayers <= 34) {
                    let updatedData = data?.map(item =>
                        item.position === 1 ? { ...item, payout: Math.floor(((totalPrizepool * 33) / 100)) } : item
                    )
                    await setData(updatedData);
                    let updatedData1 = updatedData?.map(item =>
                        item.position === 2 ? { ...item, payout: Math.floor(((totalPrizepool * 22) / 100)) } : item
                    )
                    await setData(updatedData1);
                    let updatedData2 = updatedData1?.map(item =>
                        item.position === 3 ? { ...item, payout: Math.floor(((totalPrizepool * 15) / 100)) } : item
                    )
                    await setData(updatedData2);
                    let updatedData3 = updatedData2?.map(item =>
                        item.position === 4 ? { ...item, payout: Math.floor(((totalPrizepool * 10) / 100)) } : item
                    )
                    await setData(updatedData3);
                    let updatedData4 = updatedData3?.map(item =>
                        item.position === 5 ? { ...item, payout: Math.floor(((totalPrizepool * 8) / 100)) } : item
                    )
                    await setData(updatedData4);
                    let updatedData5 = updatedData4?.map(item =>
                        item.position === 6 ? { ...item, payout: Math.floor(((totalPrizepool * 7) / 100)) } : item
                    )
                    await setData(updatedData5);
                    let updatedData6 = updatedData5?.map(item =>
                        item.position === 7 ? { ...item, payout: Math.floor(totalPrizepool - (updatedData5[0].payout + updatedData5[1].payout + updatedData5[2].payout + updatedData5[3].payout + updatedData5[4].payout + updatedData5[5].payout)) } : item
                    )
                    await setData(updatedData6);
                    await setData(
                        updatedData6?.map(item =>
                            item.position > 7 ? { ...item, payout: 0 } : item
                        )
                    )
                }
                if (totalPlayers >= 35 && totalPlayers <= 39) {
                    let updatedData = data?.map(item =>
                        item.position === 1 ? { ...item, payout: Math.floor(((totalPrizepool * 32) / 100)) } : item
                    )
                    await setData(updatedData);
                    let updatedData1 = updatedData?.map(item =>
                        item.position === 2 ? { ...item, payout: Math.floor(((totalPrizepool * 20) / 100)) } : item
                    )
                    await setData(updatedData1);
                    let updatedData2 = updatedData1?.map(item =>
                        item.position === 3 ? { ...item, payout: Math.floor(((totalPrizepool * 13) / 100)) } : item
                    )
                    await setData(updatedData2);
                    let updatedData3 = updatedData2?.map(item =>
                        item.position === 4 ? { ...item, payout: Math.floor(((totalPrizepool * 9) / 100)) } : item
                    )
                    await setData(updatedData3);
                    let updatedData4 = updatedData3?.map(item =>
                        item.position === 5 ? { ...item, payout: Math.floor(((totalPrizepool * 8) / 100)) } : item
                    )
                    await setData(updatedData4);
                    let updatedData5 = updatedData4?.map(item =>
                        item.position === 6 ? { ...item, payout: Math.floor(((totalPrizepool * 7) / 100)) } : item
                    )
                    await setData(updatedData5);
                    let updatedData6 = updatedData5?.map(item =>
                        item.position === 7 ? { ...item, payout: Math.floor(((totalPrizepool * 6) / 100)) } : item
                    )
                    await setData(updatedData6);
                    let updatedData7 = updatedData6?.map(item =>
                        item.position === 8 ? { ...item, payout: Math.floor(totalPrizepool - (updatedData6[0].payout + updatedData6[1].payout + updatedData6[2].payout + updatedData6[3].payout + updatedData6[4].payout + updatedData6[5].payout + updatedData6[6].payout)) } : item
                    )
                    await setData(updatedData7);
                    await setData(
                        updatedData7?.map(item =>
                            item.position > 8 ? { ...item, payout: 0 } : item
                        )
                    )
                }
                if (totalPlayers >= 40 && totalPlayers <= 44) {
                    let updatedData = data?.map(item =>
                        item.position === 1 ? { ...item, payout: Math.floor(((totalPrizepool * 28) / 100)) } : item
                    )
                    await setData(updatedData);
                    let updatedData1 = updatedData?.map(item =>
                        item.position === 2 ? { ...item, payout: Math.floor(((totalPrizepool * 18) / 100)) } : item
                    )
                    await setData(updatedData1);
                    let updatedData2 = updatedData1?.map(item =>
                        item.position === 3 ? { ...item, payout: Math.floor(((totalPrizepool * 12) / 100)) } : item
                    )
                    await setData(updatedData2);
                    let updatedData3 = updatedData2?.map(item =>
                        item.position === 4 ? { ...item, payout: Math.floor(((totalPrizepool * 9) / 100)) } : item
                    )
                    await setData(updatedData3);
                    let updatedData4 = updatedData3?.map(item =>
                        item.position === 5 ? { ...item, payout: Math.floor(((totalPrizepool * 8) / 100)) } : item
                    )
                    await setData(updatedData4);
                    let updatedData5 = updatedData4?.map(item =>
                        item.position === 6 ? { ...item, payout: Math.floor(((totalPrizepool * 7) / 100)) } : item
                    )
                    await setData(updatedData5);
                    let updatedData6 = updatedData5?.map(item =>
                        item.position === 7 ? { ...item, payout: Math.floor(((totalPrizepool * 6) / 100)) } : item
                    )
                    await setData(updatedData6);
                    let updatedData7 = updatedData6?.map(item =>
                        item.position === 8 ? { ...item, payout: Math.floor(((totalPrizepool * 5) / 100)) } : item
                    )
                    await setData(updatedData7);
                    let updatedData8 = updatedData7?.map(item =>
                        item.position === 9 ? { ...item, payout: Math.floor(totalPrizepool - (updatedData7[0].payout + updatedData7[1].payout + updatedData7[2].payout + updatedData7[3].payout + updatedData7[4].payout + updatedData7[5].payout + updatedData7[6].payout + updatedData7[7].payout)) } : item
                    )
                    await setData(updatedData8);
                    await setData(
                        updatedData8?.map(item =>
                            item.position > 9 ? { ...item, payout: 0 } : item
                        )
                    )
                }
                if (totalPlayers >= 45) {
                    let updatedData = data?.map(item =>
                        item.position === 1 ? { ...item, payout: Math.floor(((totalPrizepool * 28) / 100)) } : item
                    )
                    await setData(updatedData);
                    let updatedData1 = updatedData?.map(item =>
                        item.position === 2 ? { ...item, payout: Math.floor(((totalPrizepool * 18) / 100)) } : item
                    )
                    await setData(updatedData1);
                    let updatedData2 = updatedData1?.map(item =>
                        item.position === 3 ? { ...item, payout: Math.floor(((totalPrizepool * 12) / 100)) } : item
                    )
                    await setData(updatedData2);
                    let updatedData3 = updatedData2?.map(item =>
                        item.position === 4 ? { ...item, payout: Math.floor(((totalPrizepool * 9) / 100)) } : item
                    )
                    await setData(updatedData3);
                    let updatedData4 = updatedData3?.map(item =>
                        item.position === 5 ? { ...item, payout: Math.floor(((totalPrizepool * 8) / 100)) } : item
                    )
                    await setData(updatedData4);
                    let updatedData5 = updatedData4?.map(item =>
                        item.position === 6 ? { ...item, payout: Math.floor(((totalPrizepool * 7) / 100)) } : item
                    )
                    await setData(updatedData5);
                    let updatedData6 = updatedData5?.map(item =>
                        item.position === 7 ? { ...item, payout: Math.floor(((totalPrizepool * 6) / 100)) } : item
                    )
                    await setData(updatedData6);
                    let updatedData7 = updatedData6?.map(item =>
                        item.position === 8 ? { ...item, payout: Math.floor(((totalPrizepool * 5) / 100)) } : item
                    )
                    await setData(updatedData7);
                    let updatedData8 = updatedData7?.map(item =>
                        item.position === 9 ? { ...item, payout: Math.floor(((totalPrizepool * 4) / 100)) } : item
                    )
                    await setData(updatedData8);
                    let updatedData9 = updatedData8?.map(item =>
                        item.position === 10 ? { ...item, payout: Math.floor(totalPrizepool - (updatedData8[0].payout + updatedData8[1].payout + updatedData8[2].payout + updatedData8[3].payout + updatedData8[4].payout + updatedData8[5].payout + updatedData8[6].payout + updatedData8[7].payout + updatedData8[8].payout)) } : item
                    )
                    await setData(updatedData9);
                    await setData(
                        updatedData9?.map(item =>
                            item.position > 10 ? { ...item, payout: 0 } : item
                        )
                    )
                }
            }
        }
        console.log("tournament is set")
    }

    const calculationRake = async(e) => {
        let totalPrizepool = await (Number(tournamentDetail ? tournamentDetail[0].total_players : 0) * (Number(buyIn) - e))
        setPrizePool(totalPrizepool);
        setRake(e);
        totalRake = Number(tournamentDetail ? tournamentDetail[0].total_players : 0) * Number(e)
        if (tournamentDetail) {
            if (Number(buyIn) >= 1 && Number(buyIn) <= 75) {
                if (totalPlayers >= 2 && totalPlayers <= 5) {
                    setData(
                        data?.map(item =>
                            item.position === 1
                                ? { ...item, payout: ((totalPrizepool * 100) / 100) }
                                : { ...item, payout: 0 }
                        )
                    )
                }
                if (totalPlayers >= 6 && totalPlayers <= 8) {
                    let updatedData = data?.map(item =>
                        item.position === 1 ? { ...item, payout: Math.floor(((totalPrizepool * 62) / 100)) } : item
                    )
                    await setData(updatedData);
                    let updatedData1 = updatedData?.map(item =>
                        item.position === 2 ? { ...item, payout: Math.floor(((totalPrizepool * 38) / 100)) } : item
                    )
                    await setData(updatedData1);
                    let updatedData2 = updatedData1?.map(item =>
                        item.position === 3 ? { ...item, payout: 0 } : item
                    )
                    await setData(updatedData2);
                    await setData(
                        updatedData2?.map(item =>
                            item.position > 3 ? { ...item, payout: 0 } : item
                        )
                    )
                }
                if (totalPlayers >= 9 && totalPlayers <= 14) {
                    let updatedData = data?.map(item =>
                        item.position === 1 ? { ...item, payout: Math.floor(((totalPrizepool * 50) / 100)) } : item
                    )
                    await setData(updatedData);
                    let updatedData1 = updatedData?.map(item =>
                        item.position === 2 ? { ...item, payout: Math.floor(((totalPrizepool * 30) / 100)) } : item
                    )
                    await setData(updatedData1);
                    let updatedData2 = updatedData1?.map(item =>
                        item.position === 3 ? { ...item, payout: Math.floor(totalPrizepool - (updatedData1[0].payout + updatedData1[1].payout)) } : item
                    )
                    await setData(updatedData2);
                    await setData(
                        updatedData2?.map(item =>
                            item.position > 3 ? { ...item, payout: 0 } : item
                        )
                    )
                }
                if (totalPlayers >= 15 && totalPlayers <= 17) {
                    let updatedData = data?.map(item =>
                        item.position === 1 ? { ...item, payout: Math.floor(((totalPrizepool * 50) / 100)) } : item
                    )
                    await setData(updatedData);
                    let updatedData1 = updatedData?.map(item =>
                        item.position === 2 ? { ...item, payout: Math.floor(((totalPrizepool * 30) / 100)) } : item
                    )
                    console.log("updatedData2 ---->", updatedData1);
                    await setData(updatedData1);
                    let updatedData2 = updatedData1?.map(item =>
                        item.position === 3 ? { ...item, payout: Math.floor(totalPrizepool - (updatedData1[0].payout + updatedData1[1].payout)) } : item
                    )
                    await setData(updatedData2);
                    let updatedData3 = updatedData2?.map(item =>
                        item.position === 4 ? { ...item, payout: 0 } : item
                    )
                    await setData(updatedData3);
                    await setData(
                        updatedData3?.map(item =>
                            item.position > 4 ? { ...item, payout: 0 } : item
                        )
                    )
                }
                if (totalPlayers >= 18 && totalPlayers <= 24) {
                    let updatedData = data?.map(item =>
                        item.position === 1 ? { ...item, payout: Math.floor(((totalPrizepool * 45) / 100)) } : item
                    )
                    await setData(updatedData);
                    let updatedData1 = updatedData?.map(item =>
                        item.position === 2 ? { ...item, payout: Math.floor(((totalPrizepool * 27) / 100)) } : item
                    )
                    await setData(updatedData1);
                    let updatedData2 = updatedData1?.map(item =>
                        item.position === 3 ? { ...item, payout: Math.floor(((totalPrizepool * 17) / 100)) } : item
                    )
                    await setData(updatedData2);
                    let updatedData3 = updatedData2?.map(item =>
                        item.position === 4 ? { ...item, payout: Math.floor(totalPrizepool - (updatedData2[0].payout + updatedData2[1].payout + updatedData2[2].payout)) } : item
                    )
                    await setData(updatedData3);
                    await setData(
                        updatedData3?.map(item =>
                            item.position > 4 ? { ...item, payout: 0 } : item
                        )
                    )
                }
                if (totalPlayers >= 25 && totalPlayers <= 29) {
                    let updatedData = data?.map(item =>
                        item.position === 1 ? { ...item, payout: Math.floor(((totalPrizepool * 38) / 100)) } : item
                    )
                    await setData(updatedData);
                    let updatedData1 = updatedData?.map(item =>
                        item.position === 2 ? { ...item, payout: Math.floor(((totalPrizepool * 25) / 100)) } : item
                    )
                    await setData(updatedData1);
                    let updatedData2 = updatedData1?.map(item =>
                        item.position === 3 ? { ...item, payout: Math.floor(((totalPrizepool * 17) / 100)) } : item
                    )
                    await setData(updatedData2);
                    let updatedData3 = updatedData2?.map(item =>
                        item.position === 4 ? { ...item, payout: Math.floor(((totalPrizepool * 12) / 100)) } : item
                    )
                    await setData(updatedData3);
                    let updatedData4 = updatedData3?.map(item =>
                        item.position === 5 ? { ...item, payout: Math.floor(totalPrizepool - (updatedData3[0].payout + updatedData3[1].payout + updatedData3[2].payout + updatedData3[3].payout)) } : item
                    )
                    await setData(updatedData4);
                    await setData(
                        updatedData4?.map(item =>
                            item.position > 5 ? { ...item, payout: 0 } : item
                        )
                    )
                }
                if (totalPlayers >= 30 && totalPlayers <= 34) {
                    console.log("30 to 34");
                    let updatedData = data?.map(item =>
                        item.position === 1 ? { ...item, payout: Math.floor(((totalPrizepool * 37) / 100)) } : item
                    )
                    await setData(updatedData);
                    let updatedData1 = updatedData?.map(item =>
                        item.position === 2 ? { ...item, payout: Math.floor(((totalPrizepool * 24) / 100)) } : item
                    )
                    await setData(updatedData1);
                    let updatedData2 = updatedData1?.map(item =>
                        item.position === 3 ? { ...item, payout: Math.floor(((totalPrizepool * 15) / 100)) } : item
                    )
                    await setData(updatedData2);
                    let updatedData3 = updatedData2?.map(item =>
                        item.position === 4 ? { ...item, payout: Math.floor(((totalPrizepool * 10) / 100)) } : item
                    )
                    await setData(updatedData3);
                    let updatedData4 = updatedData3?.map(item =>
                        item.position === 5 ? { ...item, payout: Math.floor(((totalPrizepool * 8) / 100)) } : item
                    )
                    await setData(updatedData4);
                    let updatedData5 = updatedData4?.map(item =>
                        item.position === 6 ? { ...item, payout: Math.floor(totalPrizepool - (updatedData4[0].payout + updatedData4[1].payout + updatedData4[2].payout + updatedData4[3].payout + updatedData4[4].payout)) } : item
                    )
                    await setData(updatedData5);
                    await setData(
                        updatedData5?.map(item =>
                            item.position > 6 ? { ...item, payout: 0 } : item
                        )
                    )
                }
                if (totalPlayers >= 35 && totalPlayers <= 39) {
                    let updatedData = data?.map(item =>
                        item.position === 1 ? { ...item, payout: Math.floor(((totalPrizepool * 33) / 100)) } : item
                    )
                    await setData(updatedData);
                    let updatedData1 = updatedData?.map(item =>
                        item.position === 2 ? { ...item, payout: Math.floor(((totalPrizepool * 22) / 100)) } : item
                    )
                    await setData(updatedData1);
                    let updatedData2 = updatedData1?.map(item =>
                        item.position === 3 ? { ...item, payout: Math.floor(((totalPrizepool * 15) / 100)) } : item
                    )
                    await setData(updatedData2);
                    let updatedData3 = updatedData2?.map(item =>
                        item.position === 4 ? { ...item, payout: Math.floor(((totalPrizepool * 10) / 100)) } : item
                    )
                    await setData(updatedData3);
                    let updatedData4 = updatedData3?.map(item =>
                        item.position === 5 ? { ...item, payout: Math.floor(((totalPrizepool * 8) / 100)) } : item
                    )
                    await setData(updatedData4);
                    let updatedData5 = updatedData4?.map(item =>
                        item.position === 6 ? { ...item, payout: Math.floor(((totalPrizepool * 7) / 100)) } : item
                    )
                    await setData(updatedData5);
                    let updatedData6 = updatedData5?.map(item =>
                        item.position === 7 ? { ...item, payout: Math.floor(totalPrizepool - (updatedData5[0].payout + updatedData5[1].payout + updatedData5[2].payout + updatedData5[3].payout + updatedData5[4].payout + updatedData5[5].payout)) } : item
                    )
                    await setData(updatedData6);
                    await setData(
                        updatedData6?.map(item =>
                            item.position > 7 ? { ...item, payout: 0 } : item
                        )
                    )
                }
                if (totalPlayers >= 40 && totalPlayers <= 44) {
                    let updatedData = data?.map(item =>
                        item.position === 1 ? { ...item, payout: Math.floor(((totalPrizepool * 32) / 100)) } : item
                    )
                    await setData(updatedData);
                    let updatedData1 = updatedData?.map(item =>
                        item.position === 2 ? { ...item, payout: Math.floor(((totalPrizepool * 20) / 100)) } : item
                    )
                    await setData(updatedData1);
                    let updatedData2 = updatedData1?.map(item =>
                        item.position === 3 ? { ...item, payout: Math.floor(((totalPrizepool * 13) / 100)) } : item
                    )
                    await setData(updatedData2);
                    let updatedData3 = updatedData2?.map(item =>
                        item.position === 4 ? { ...item, payout: Math.floor(((totalPrizepool * 9) / 100)) } : item
                    )
                    await setData(updatedData3);
                    let updatedData4 = updatedData3?.map(item =>
                        item.position === 5 ? { ...item, payout: Math.floor(((totalPrizepool * 8) / 100)) } : item
                    )
                    await setData(updatedData4);
                    let updatedData5 = updatedData4?.map(item =>
                        item.position === 6 ? { ...item, payout: Math.floor(((totalPrizepool * 7) / 100)) } : item
                    )
                    await setData(updatedData5);
                    let updatedData6 = updatedData5?.map(item =>
                        item.position === 7 ? { ...item, payout: Math.floor(((totalPrizepool * 6) / 100)) } : item
                    )
                    await setData(updatedData6);
                    let updatedData7 = updatedData6?.map(item =>
                        item.position === 8 ? { ...item, payout: Math.floor(totalPrizepool - (updatedData6[0].payout + updatedData6[1].payout + updatedData6[2].payout + updatedData6[3].payout + updatedData6[4].payout + updatedData6[5].payout + updatedData6[6].payout)) } : item
                    )
                    await setData(updatedData7);
                    await setData(
                        updatedData7?.map(item =>
                            item.position > 8 ? { ...item, payout: 0 } : item
                        )
                    )
                }
                if (totalPlayers >= 45) {
                    console.log("46 above");
                    let updatedData = data?.map(item =>
                        item.position === 1 ? { ...item, payout: Math.floor(((totalPrizepool * 28) / 100)) } : item
                    )
                    await setData(updatedData);
                    let updatedData1 = updatedData?.map(item =>
                        item.position === 2 ? { ...item, payout: Math.floor(((totalPrizepool * 18) / 100)) } : item
                    )
                    await setData(updatedData1);
                    let updatedData2 = updatedData1?.map(item =>
                        item.position === 3 ? { ...item, payout: Math.floor(((totalPrizepool * 12) / 100)) } : item
                    )
                    await setData(updatedData2);
                    let updatedData3 = updatedData2?.map(item =>
                        item.position === 4 ? { ...item, payout: Math.floor(((totalPrizepool * 9) / 100)) } : item
                    )
                    await setData(updatedData3);
                    let updatedData4 = updatedData3?.map(item =>
                        item.position === 5 ? { ...item, payout: Math.floor(((totalPrizepool * 8) / 100)) } : item
                    )
                    await setData(updatedData4);
                    let updatedData5 = updatedData4?.map(item =>
                        item.position === 6 ? { ...item, payout: Math.floor(((totalPrizepool * 7) / 100)) } : item
                    )
                    await setData(updatedData5);
                    let updatedData6 = updatedData5?.map(item =>
                        item.position === 7 ? { ...item, payout: Math.floor(((totalPrizepool * 6) / 100)) } : item
                    )
                    await setData(updatedData6);
                    let updatedData7 = updatedData6?.map(item =>
                        item.position === 8 ? { ...item, payout: Math.floor(((totalPrizepool * 5) / 100)) } : item
                    )
                    await setData(updatedData7);
                    let updatedData8 = updatedData7?.map(item =>
                        item.position === 9 ? { ...item, payout: Math.floor(totalPrizepool - (updatedData7[0].payout + updatedData4[1].payout + updatedData7[2].payout + updatedData7[3].payout + updatedData7[4].payout + updatedData7[5].payout + updatedData7[6].payout + updatedData7[7].payout)) } : item
                    )
                    await setData(updatedData8);
                    await setData(
                        updatedData8?.map(item =>
                            item.position > 9 ? { ...item, payout: 0 } : item
                        )
                    )
                }
            }
            if(Number(buyIn) >= 76 && Number(buyIn) <= 125){
                if (totalPlayers >= 2 && totalPlayers <= 5) {
                    console.log("2 to 5");
                    let updatedData = data?.map(item =>
                        item.position === 1 ? { ...item, payout: Math.floor(((totalPrizepool * 100) / 100)) } : item
                    )
                    await setData(updatedData);
                    await setData(
                        updatedData?.map(item =>
                            item.position > 1 ? { ...item, payout: 0 } : item
                        )
                    )
                }
                if (totalPlayers >= 6 && totalPlayers <= 8) {
                    let updatedData = data?.map(item =>
                        item.position === 1 ? { ...item, payout: Math.floor(((totalPrizepool * 62) / 100)) } : item
                    )
                    await setData(updatedData);
                    let updatedData1 = updatedData?.map(item =>
                        item.position === 2 ? { ...item, payout: Math.floor(((totalPrizepool * 38) / 100)) } : item
                    )
                    await setData(updatedData1);
                    await setData(
                        updatedData1?.map(item =>
                            item.position > 2 ? { ...item, payout: 0 } : item
                        )
                    )
                }
                if (totalPlayers >= 9 && totalPlayers <= 14) {
                    let updatedData = data?.map(item =>
                        item.position === 1 ? { ...item, payout: Math.floor(((totalPrizepool * 50) / 100)) } : item
                    )
                    await setData(updatedData);
                    let updatedData1 = updatedData?.map(item =>
                        item.position === 2 ? { ...item, payout: Math.floor(((totalPrizepool * 30) / 100)) } : item
                    )
                    await setData(updatedData1);
                    let updatedData2 = updatedData1?.map(item =>
                        item.position === 3 ? { ...item, payout: Math.floor(totalPrizepool - (updatedData1[0].payout + updatedData1[1].payout)) } : item
                    )
                    await setData(updatedData2);
                    await setData(
                        updatedData2?.map(item =>
                            item.position > 3 ? { ...item, payout: 0 } : item
                        )
                    )
                }
                if (totalPlayers >= 15 && totalPlayers <= 17) {
                    let updatedData = data?.map(item =>
                        item.position === 1 ? { ...item, payout: Math.floor(((totalPrizepool * 45) / 100)) } : item
                    )
                    await setData(updatedData);
                    let updatedData1 = updatedData?.map(item =>
                        item.position === 2 ? { ...item, payout: Math.floor(((totalPrizepool * 27) / 100)) } : item
                    )
                    await setData(updatedData1);
                    let updatedData2 = updatedData1?.map(item =>
                        item.position === 3 ? { ...item, payout: Math.floor(((totalPrizepool * 17) / 100)) } : item
                    )
                    await setData(updatedData2);
                    let updatedData3 = updatedData2?.map(item =>
                        item.position === 4 ? { ...item, payout: Math.floor(totalPrizepool - (updatedData2[0].payout + updatedData2[1].payout + updatedData2[2].payout)) } : item
                    )
                    await setData(updatedData3);
                    await setData(
                        updatedData3?.map(item =>
                            item.position > 4 ? { ...item, payout: 0 } : item
                        )
                    )
                }
                if (totalPlayers >= 18 && totalPlayers <= 24) {
                    let updatedData = data?.map(item =>
                        item.position === 1 ? { ...item, payout: Math.floor(((totalPrizepool * 45) / 100)) } : item
                    )
                    console.log("updatedData --->", updatedData);
                    await setData(updatedData);
                    let updatedData1 = updatedData?.map(item =>
                        item.position === 2 ? { ...item, payout: Math.floor(((totalPrizepool * 27) / 100)) } : item
                    )
                    await setData(updatedData1);
                    let updatedData2 = updatedData1?.map(item =>
                        item.position === 3 ? { ...item, payout: Math.floor(((totalPrizepool * 17) / 100)) } : item
                    )
                    await setData(updatedData2);
                    let updatedData3 = updatedData2?.map(item =>
                        item.position === 4 ? { ...item, payout: Math.floor(totalPrizepool - (updatedData2[0].payout + updatedData2[1].payout + updatedData2[2].payout)) } : item
                    )
                    await setData(updatedData3);
                    await setData(
                        updatedData3?.map(item =>
                            item.position > 4 ? { ...item, payout: 0 } : item
                        )
                    )
                }
                if (totalPlayers >= 25 && totalPlayers <= 29) {
                    let updatedData = data?.map(item =>
                        item.position === 1 ? { ...item, payout: Math.floor(((totalPrizepool * 38) / 100)) } : item
                    )
                    await setData(updatedData);
                    let updatedData1 = updatedData?.map(item =>
                        item.position === 2 ? { ...item, payout: Math.floor(((totalPrizepool * 25) / 100)) } : item
                    )
                    await setData(updatedData1);
                    let updatedData2 = updatedData1?.map(item =>
                        item.position === 3 ? { ...item, payout: Math.floor(((totalPrizepool * 17) / 100)) } : item
                    )
                    await setData(updatedData2);
                    let updatedData3 = updatedData2?.map(item =>
                        item.position === 4 ? { ...item, payout: Math.floor(((totalPrizepool * 12) / 100)) } : item
                    )
                    await setData(updatedData3);
                    let updatedData4 = updatedData3?.map(item =>
                        item.position === 5 ? { ...item, payout: Math.floor(totalPrizepool - (updatedData3[0].payout + updatedData3[1].payout + updatedData3[2].payout + updatedData3[3].payout)) } : item
                    )
                    await setData(updatedData4);
                    await setData(
                        updatedData4?.map(item =>
                            item.position > 5 ? { ...item, payout: 0 } : item
                        )
                    )
                }
                if (totalPlayers >= 30 && totalPlayers <= 34) {
                    let updatedData = data?.map(item =>
                        item.position === 1 ? { ...item, payout: Math.floor(((totalPrizepool * 37) / 100)) } : item
                    )
                    await setData(updatedData);
                    let updatedData1 = updatedData?.map(item =>
                        item.position === 2 ? { ...item, payout: Math.floor(((totalPrizepool * 24) / 100)) } : item
                    )
                    await setData(updatedData1);
                    let updatedData2 = updatedData1?.map(item =>
                        item.position === 3 ? { ...item, payout: Math.floor(((totalPrizepool * 15) / 100)) } : item
                    )
                    await setData(updatedData2);
                    let updatedData3 = updatedData2?.map(item =>
                        item.position === 4 ? { ...item, payout: Math.floor(((totalPrizepool * 10) / 100)) } : item
                    )
                    await setData(updatedData3);
                    let updatedData4 = updatedData3?.map(item =>
                        item.position === 5 ? { ...item, payout: Math.floor(((totalPrizepool * 8) / 100)) } : item
                    )
                    await setData(updatedData4);
                    let updatedData5 = updatedData4?.map(item =>
                        item.position === 6 ? { ...item, payout: Math.floor(totalPrizepool - (updatedData4[0].payout + updatedData4[1].payout + updatedData4[2].payout + updatedData4[3].payout + updatedData4[4].payout)) } : item
                    )
                    await setData(updatedData5);
                    await setData(
                        updatedData5?.map(item =>
                            item.position > 6 ? { ...item, payout: 0 } : item
                        )
                    )
                }
                if (totalPlayers >= 35 && totalPlayers <= 39) {
                    let updatedData = data?.map(item =>
                        item.position === 1 ? { ...item, payout: Math.floor(((totalPrizepool * 33) / 100)) } : item
                    )
                    await setData(updatedData);
                    let updatedData1 = updatedData?.map(item =>
                        item.position === 2 ? { ...item, payout: Math.floor(((totalPrizepool * 22) / 100)) } : item
                    )
                    await setData(updatedData1);
                    let updatedData2 = updatedData1?.map(item =>
                        item.position === 3 ? { ...item, payout: Math.floor(((totalPrizepool * 15) / 100)) } : item
                    )
                    await setData(updatedData2);
                    let updatedData3 = updatedData2?.map(item =>
                        item.position === 4 ? { ...item, payout: Math.floor(((totalPrizepool * 10) / 100)) } : item
                    )
                    await setData(updatedData3);
                    let updatedData4 = updatedData3?.map(item =>
                        item.position === 5 ? { ...item, payout: Math.floor(((totalPrizepool * 8) / 100)) } : item
                    )
                    await setData(updatedData4);
                    let updatedData5 = updatedData4?.map(item =>
                        item.position === 6 ? { ...item, payout: Math.floor(((totalPrizepool * 7) / 100)) } : item
                    )
                    await setData(updatedData5);
                    let updatedData6 = updatedData5?.map(item =>
                        item.position === 7 ? { ...item, payout: Math.floor(totalPrizepool - (updatedData5[0].payout + updatedData5[1].payout + updatedData5[2].payout + updatedData5[3].payout + updatedData5[4].payout + updatedData5[5].payout)) } : item
                    )
                    await setData(updatedData6);
                    await setData(
                        updatedData6?.map(item =>
                            item.position > 7 ? { ...item, payout: 0 } : item
                        )
                    )
                }
                if (totalPlayers >= 40 && totalPlayers <= 44) {
                    let updatedData = data?.map(item =>
                        item.position === 1 ? { ...item, payout: Math.floor(((totalPrizepool * 33) / 100)) } : item
                    )
                    await setData(updatedData);
                    let updatedData1 = updatedData?.map(item =>
                        item.position === 2 ? { ...item, payout: Math.floor(((totalPrizepool * 22) / 100)) } : item
                    )
                    await setData(updatedData1);
                    let updatedData2 = updatedData1?.map(item =>
                        item.position === 3 ? { ...item, payout: Math.floor(((totalPrizepool * 15) / 100)) } : item
                    )
                    await setData(updatedData2);
                    let updatedData3 = updatedData2?.map(item =>
                        item.position === 4 ? { ...item, payout: Math.floor(((totalPrizepool * 10) / 100)) } : item
                    )
                    await setData(updatedData3);
                    let updatedData4 = updatedData3?.map(item =>
                        item.position === 5 ? { ...item, payout: Math.floor(((totalPrizepool * 8) / 100)) } : item
                    )
                    await setData(updatedData4);
                    let updatedData5 = updatedData4?.map(item =>
                        item.position === 6 ? { ...item, payout: Math.floor(((totalPrizepool * 7) / 100)) } : item
                    )
                    await setData(updatedData5);
                    let updatedData6 = updatedData5?.map(item =>
                        item.position === 7 ? { ...item, payout: Math.floor(((totalPrizepool * 5) / 100)) } : item
                    )
                    await setData(updatedData6);
                    let updatedData7 = updatedData6?.map(item =>
                        item.position === 8 ? { ...item, payout: Math.floor(totalPrizepool - (updatedData6[0].payout + updatedData6[1].payout + updatedData6[2].payout + updatedData6[3].payout + updatedData6[4].payout + updatedData6[5].payout + updatedData6[6].payout)) } : item
                    )
                    await setData(updatedData7);
                    await setData(
                        updatedData7?.map(item =>
                            item.position > 8 ? { ...item, payout: 0 } : item
                        )
                    )
                }
                if (totalPlayers >= 45) {
                    let updatedData = data?.map(item =>
                        item.position === 1 ? { ...item, payout: Math.floor(((totalPrizepool * 28) / 100)) } : item
                    )
                    await setData(updatedData);
                    let updatedData1 = updatedData?.map(item =>
                        item.position === 2 ? { ...item, payout: Math.floor(((totalPrizepool * 18) / 100)) } : item
                    )
                    await setData(updatedData1);
                    let updatedData2 = updatedData1?.map(item =>
                        item.position === 3 ? { ...item, payout: Math.floor(((totalPrizepool * 12) / 100)) } : item
                    )
                    await setData(updatedData2);
                    let updatedData3 = updatedData2?.map(item =>
                        item.position === 4 ? { ...item, payout: Math.floor(((totalPrizepool * 9) / 100)) } : item
                    )
                    await setData(updatedData3);
                    let updatedData4 = updatedData3?.map(item =>
                        item.position === 5 ? { ...item, payout: Math.floor(((totalPrizepool * 8) / 100)) } : item
                    )
                    await setData(updatedData4);
                    let updatedData5 = updatedData4?.map(item =>
                        item.position === 6 ? { ...item, payout: Math.floor(((totalPrizepool * 7) / 100)) } : item
                    )
                    await setData(updatedData5);
                    let updatedData6 = updatedData5?.map(item =>
                        item.position === 7 ? { ...item, payout: Math.floor(((totalPrizepool * 6) / 100)) } : item
                    )
                    await setData(updatedData6);
                    let updatedData7 = updatedData6?.map(item =>
                        item.position === 8 ? { ...item, payout: Math.floor(((totalPrizepool * 5) / 100)) } : item
                    )
                    await setData(updatedData7);
                    let updatedData8 = updatedData7?.map(item =>
                        item.position === 9 ? { ...item, payout: Math.floor(totalPrizepool - (updatedData7[0].payout + updatedData7[1].payout + updatedData7[2].payout + updatedData7[3].payout + updatedData7[4].payout + updatedData7[5].payout + updatedData7[6].payout + updatedData7[7].payout)) } : item
                    )
                    await setData(updatedData8);
                    await setData(
                        updatedData8?.map(item =>
                            item.position > 9 ? { ...item, payout: 0 } : item
                        )
                    )
                }
            }
            if(Number(buyIn) >= 126){
                if (totalPlayers >= 2 && totalPlayers <= 5) {
                    let updatedData = data?.map(item =>
                        item.position === 1 ? { ...item, payout: Math.floor(((totalPrizepool * 100) / 100)) } : item
                    )
                    await setData(updatedData);
                    await setData(
                        updatedData?.map(item =>
                            item.position > 1 ? { ...item, payout: 0 } : item
                        )
                    )
                }
                if (totalPlayers >= 6 && totalPlayers <= 8) {
                    let updatedData = data?.map(item =>
                        item.position === 1 ? { ...item, payout: Math.floor(((totalPrizepool * 62) / 100)) } : item
                    )
                    await setData(updatedData);
                    let updatedData1 = updatedData?.map(item =>
                        item.position === 2 ? { ...item, payout: Math.floor(((totalPrizepool * 38) / 100)) } : item
                    )
                    await setData(updatedData1);
                    await setData(
                        updatedData1?.map(item =>
                            item.position > 2 ? { ...item, payout: 0 } : item
                        )
                    )
                }
                if (totalPlayers >= 9 && totalPlayers <= 14) {
                    let updatedData = data?.map(item =>
                        item.position === 1 ? { ...item, payout: Math.floor(((totalPrizepool * 50) / 100)) } : item
                    )
                    await setData(updatedData);
                    let updatedData1 = updatedData?.map(item =>
                        item.position === 2 ? { ...item, payout: Math.floor(((totalPrizepool * 30) / 100)) } : item
                    )
                    console.log("updatedData1 --->", updatedData1);
                    await setData(updatedData1);
                    let updatedData2 = updatedData1?.map(item =>
                        item.position === 3 ? { ...item, payout: Math.floor(totalPrizepool - (updatedData1[0].payout + updatedData1[1].payout)) } : item
                    )
                    await setData(updatedData2);
                    await setData(
                        updatedData2?.map(item =>
                            item.position > 3 ? { ...item, payout: 0 } : item
                        )
                    )
                }
                if (totalPlayers >= 15 && totalPlayers <= 17) {
                    let updatedData = data?.map(item =>
                        item.position === 1 ? { ...item, payout: Math.floor(((totalPrizepool * 45) / 100)) } : item
                    )
                    await setData(updatedData);
                    let updatedData1 = updatedData?.map(item =>
                        item.position === 2 ? { ...item, payout: Math.floor(((totalPrizepool * 27) / 100)) } : item
                    )
                    await setData(updatedData1);
                    let updatedData2 = updatedData1?.map(item =>
                        item.position === 3 ? { ...item, payout: Math.floor(((totalPrizepool * 17) / 100)) } : item
                    )
                    await setData(updatedData2);
                    let updatedData3 = updatedData2?.map(item =>
                        item.position === 4 ? { ...item, payout: Math.floor(totalPrizepool - (updatedData2[0].payout + updatedData2[1].payout + updatedData2[2].payout )) } : item
                    )
                    await setData(updatedData3);
                    await setData(
                        updatedData3?.map(item =>
                            item.position > 4 ? { ...item, payout: 0 } : item
                        )
                    )
                }
                if (totalPlayers >= 18 && totalPlayers <= 24) {
                    let updatedData = data?.map(item =>
                        item.position === 1 ? { ...item, payout: Math.floor(((totalPrizepool * 38) / 100)) } : item
                    )
                    await setData(updatedData);
                    let updatedData1 = updatedData?.map(item =>
                        item.position === 2 ? { ...item, payout: Math.floor(((totalPrizepool * 25) / 100)) } : item
                    )
                    await setData(updatedData1);
                    let updatedData2 = updatedData1?.map(item =>
                        item.position === 3 ? { ...item, payout: Math.floor(((totalPrizepool * 17) / 100)) } : item
                    )
                    await setData(updatedData2);
                    let updatedData3 = updatedData2?.map(item =>
                        item.position === 4 ? { ...item, payout: Math.floor(((totalPrizepool * 12) / 100)) } : item
                    )
                    await setData(updatedData3);
                    let updatedData4 = updatedData3?.map(item =>
                        item.position === 5 ? { ...item, payout: Math.floor(totalPrizepool - (updatedData3[0].payout + updatedData3[1].payout + updatedData3[2].payout + updatedData3[3].payout)) } : item
                    )
                    await setData(updatedData4);
                    await setData(
                        updatedData4?.map(item =>
                            item.position > 5 ? { ...item, payout: 0 } : item
                        )
                    )
                }
                if (totalPlayers >= 25 && totalPlayers <= 29) {
                    let updatedData = data?.map(item =>
                        item.position === 1 ? { ...item, payout: Math.floor(((totalPrizepool * 37) / 100)) } : item
                    )
                    await setData(updatedData);
                    let updatedData1 = updatedData?.map(item =>
                        item.position === 2 ? { ...item, payout: Math.floor(((totalPrizepool * 24) / 100)) } : item
                    )
                    await setData(updatedData1);
                    let updatedData2 = updatedData1?.map(item =>
                        item.position === 3 ? { ...item, payout: Math.floor(((totalPrizepool * 15) / 100)) } : item
                    )
                    await setData(updatedData2);
                    let updatedData3 = updatedData2?.map(item =>
                        item.position === 4 ? { ...item, payout: Math.floor(((totalPrizepool * 10) / 100)) } : item
                    )
                    await setData(updatedData3);
                    let updatedData4 = updatedData3?.map(item =>
                        item.position === 5 ? { ...item, payout: Math.floor(((totalPrizepool * 8) / 100)) } : item
                    )
                    await setData(updatedData4);
                    let updatedData5 = updatedData4?.map(item =>
                        item.position === 6 ? { ...item, payout: Math.floor(totalPrizepool - (updatedData4[0].payout + updatedData4[1].payout + updatedData4[2].payout + updatedData4[3].payout + updatedData4[4].payout)) } : item
                    )
                    await setData(updatedData5);
                    await setData(
                        updatedData5?.map(item =>
                            item.position > 6 ? { ...item, payout: 0 } : item
                        )
                    )
                }
                if (totalPlayers >= 30 && totalPlayers <= 34) {
                    let updatedData = data?.map(item =>
                        item.position === 1 ? { ...item, payout: Math.floor(((totalPrizepool * 33) / 100)) } : item
                    )
                    await setData(updatedData);
                    let updatedData1 = updatedData?.map(item =>
                        item.position === 2 ? { ...item, payout: Math.floor(((totalPrizepool * 22) / 100)) } : item
                    )
                    await setData(updatedData1);
                    let updatedData2 = updatedData1?.map(item =>
                        item.position === 3 ? { ...item, payout: Math.floor(((totalPrizepool * 15) / 100)) } : item
                    )
                    await setData(updatedData2);
                    let updatedData3 = updatedData2?.map(item =>
                        item.position === 4 ? { ...item, payout: Math.floor(((totalPrizepool * 10) / 100)) } : item
                    )
                    await setData(updatedData3);
                    let updatedData4 = updatedData3?.map(item =>
                        item.position === 5 ? { ...item, payout: Math.floor(((totalPrizepool * 8) / 100)) } : item
                    )
                    await setData(updatedData4);
                    let updatedData5 = updatedData4?.map(item =>
                        item.position === 6 ? { ...item, payout: Math.floor(((totalPrizepool * 7) / 100)) } : item
                    )
                    await setData(updatedData5);
                    let updatedData6 = updatedData5?.map(item =>
                        item.position === 7 ? { ...item, payout: Math.floor(totalPrizepool - (updatedData5[0].payout + updatedData5[1].payout + updatedData5[2].payout + updatedData5[3].payout + updatedData5[4].payout + updatedData5[5].payout)) } : item
                    )
                    await setData(updatedData6);
                    await setData(
                        updatedData6?.map(item =>
                            item.position > 7 ? { ...item, payout: 0 } : item
                        )
                    )
                }
                if (totalPlayers >= 35 && totalPlayers <= 39) {
                    let updatedData = data?.map(item =>
                        item.position === 1 ? { ...item, payout: Math.floor(((totalPrizepool * 32) / 100)) } : item
                    )
                    await setData(updatedData);
                    let updatedData1 = updatedData?.map(item =>
                        item.position === 2 ? { ...item, payout: Math.floor(((totalPrizepool * 20) / 100)) } : item
                    )
                    await setData(updatedData1);
                    let updatedData2 = updatedData1?.map(item =>
                        item.position === 3 ? { ...item, payout: Math.floor(((totalPrizepool * 13) / 100)) } : item
                    )
                    await setData(updatedData2);
                    let updatedData3 = updatedData2?.map(item =>
                        item.position === 4 ? { ...item, payout: Math.floor(((totalPrizepool * 9) / 100)) } : item
                    )
                    await setData(updatedData3);
                    let updatedData4 = updatedData3?.map(item =>
                        item.position === 5 ? { ...item, payout: Math.floor(((totalPrizepool * 8) / 100)) } : item
                    )
                    await setData(updatedData4);
                    let updatedData5 = updatedData4?.map(item =>
                        item.position === 6 ? { ...item, payout: Math.floor(((totalPrizepool * 7) / 100)) } : item
                    )
                    await setData(updatedData5);
                    let updatedData6 = updatedData5?.map(item =>
                        item.position === 7 ? { ...item, payout: Math.floor(((totalPrizepool * 6) / 100)) } : item
                    )
                    await setData(updatedData6);
                    let updatedData7 = updatedData6?.map(item =>
                        item.position === 8 ? { ...item, payout: Math.floor(totalPrizepool - (updatedData6[0].payout + updatedData6[1].payout + updatedData6[2].payout + updatedData6[3].payout + updatedData6[4].payout + updatedData6[5].payout + updatedData6[6].payout)) } : item
                    )
                    await setData(updatedData7);
                    await setData(
                        updatedData7?.map(item =>
                            item.position > 8 ? { ...item, payout: 0 } : item
                        )
                    )
                }
                if (totalPlayers >= 40 && totalPlayers <= 44) {
                    let updatedData = data?.map(item =>
                        item.position === 1 ? { ...item, payout: Math.floor(((totalPrizepool * 28) / 100)) } : item
                    )
                    await setData(updatedData);
                    let updatedData1 = updatedData?.map(item =>
                        item.position === 2 ? { ...item, payout: Math.floor(((totalPrizepool * 18) / 100)) } : item
                    )
                    await setData(updatedData1);
                    let updatedData2 = updatedData1?.map(item =>
                        item.position === 3 ? { ...item, payout: Math.floor(((totalPrizepool * 12) / 100)) } : item
                    )
                    await setData(updatedData2);
                    let updatedData3 = updatedData2?.map(item =>
                        item.position === 4 ? { ...item, payout: Math.floor(((totalPrizepool * 9) / 100)) } : item
                    )
                    await setData(updatedData3);
                    let updatedData4 = updatedData3?.map(item =>
                        item.position === 5 ? { ...item, payout: Math.floor(((totalPrizepool * 8) / 100)) } : item
                    )
                    await setData(updatedData4);
                    let updatedData5 = updatedData4?.map(item =>
                        item.position === 6 ? { ...item, payout: Math.floor(((totalPrizepool * 7) / 100)) } : item
                    )
                    await setData(updatedData5);
                    let updatedData6 = updatedData5?.map(item =>
                        item.position === 7 ? { ...item, payout: Math.floor(((totalPrizepool * 6) / 100)) } : item
                    )
                    await setData(updatedData6);
                    let updatedData7 = updatedData6?.map(item =>
                        item.position === 8 ? { ...item, payout: Math.floor(((totalPrizepool * 5) / 100)) } : item
                    )
                    await setData(updatedData7);
                    let updatedData8 = updatedData7?.map(item =>
                        item.position === 9 ? { ...item, payout: Math.floor(totalPrizepool - (updatedData7[0].payout + updatedData7[1].payout + updatedData7[2].payout + updatedData7[3].payout + updatedData7[4].payout + updatedData7[5].payout + updatedData7[6].payout + updatedData7[7].payout)) } : item
                    )
                    await setData(updatedData8);
                    await setData(
                        updatedData8?.map(item =>
                            item.position > 9 ? { ...item, payout: 0 } : item
                        )
                    )
                }
                if (totalPlayers >= 45) {
                    let updatedData = data?.map(item =>
                        item.position === 1 ? { ...item, payout: Math.floor(((totalPrizepool * 28) / 100)) } : item
                    )
                    await setData(updatedData);
                    let updatedData1 = updatedData?.map(item =>
                        item.position === 2 ? { ...item, payout: Math.floor(((totalPrizepool * 18) / 100)) } : item
                    )
                    await setData(updatedData1);
                    let updatedData2 = updatedData1?.map(item =>
                        item.position === 3 ? { ...item, payout: Math.floor(((totalPrizepool * 12) / 100)) } : item
                    )
                    await setData(updatedData2);
                    let updatedData3 = updatedData2?.map(item =>
                        item.position === 4 ? { ...item, payout: Math.floor(((totalPrizepool * 9) / 100)) } : item
                    )
                    await setData(updatedData3);
                    let updatedData4 = updatedData3?.map(item =>
                        item.position === 5 ? { ...item, payout: Math.floor(((totalPrizepool * 8) / 100)) } : item
                    )
                    await setData(updatedData4);
                    let updatedData5 = updatedData4?.map(item =>
                        item.position === 6 ? { ...item, payout: Math.floor(((totalPrizepool * 7) / 100)) } : item
                    )
                    await setData(updatedData5);
                    let updatedData6 = updatedData5?.map(item =>
                        item.position === 7 ? { ...item, payout: Math.floor(((totalPrizepool * 6) / 100)) } : item
                    )
                    await setData(updatedData6);
                    let updatedData7 = updatedData6?.map(item =>
                        item.position === 8 ? { ...item, payout: Math.floor(((totalPrizepool * 5) / 100)) } : item
                    )
                    await setData(updatedData7);
                    let updatedData8 = updatedData7?.map(item =>
                        item.position === 9 ? { ...item, payout: Math.floor(((totalPrizepool * 4) / 100)) } : item
                    )
                    await setData(updatedData8);
                    let updatedData9 = updatedData8?.map(item =>
                        item.position === 10 ? { ...item, payout: Math.floor(totalPrizepool - (updatedData8[0].payout + updatedData8[1].payout + updatedData8[2].payout + updatedData8[3].payout + updatedData8[4].payout + updatedData8[5].payout + updatedData8[6].payout + updatedData8[7].payout + updatedData8[8].payout)) } : item
                    )
                    await setData(updatedData9);
                    await setData(
                        updatedData9?.map(item =>
                            item.position > 10 ? { ...item, payout: 0 } : item
                        )
                    )
                }
            }
        }
        console.log("tournament is set")
    }
    // useEffect(async () => {
       
    // }, [totalPlayers])

    const deleteTournament = () => {
        axios({
            method: 'put',
            url: `http://143.110.254.46/poker/api/delete-tournament/${props?.match?.params?.slug}`,
            data: {
                tournament: [
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
            },
            headers: {
              Authorization: "Token "+localStorage.getItem("accessToken")?.trim()
            }
          })
            .then(function (response) {
              console.log(response.data.rank);
              props.history.goBack()
            });
        setShowDelete(false);
        console.log("delete");
        // props.history.goBack()
    }
    const fetchData = () => {
        axios({
            method: 'get',
            url: `http://143.110.254.46:8084/poker/api/tournament/${props?.match?.params?.slug}`,
            headers: {
              Authorization: "Token "+localStorage.getItem("accessToken")?.trim()
            }
        })
            .then(function (response) {
                setData(response.data.rank);
                setName(response.data.tournament[0].name)
                setBuyIn(response.data.tournament[0].buy_in)
                setRake(response.data?.tournament[0].rake)
            });
    }
    const setCangeWin = async (e, index) => {
        await setData(
            data?.map(item =>
                item.id === index
                    ? { ...item, payout: Number(e) }
                    : item
            )
        )
        data?.filter(item => item.id === index ? console.log(item) : item)
    }
    const setCangeTip = async (e, index) => {
        await setData(
            data?.map(item =>
                item.id === index
                    ? { ...item, tip: Number(e) }
                    : item
            )
        )
        data?.filter(item => item.id === index ? console.log(item) : item)
    }

    const [show, setShow] = useState(false);
    const [showDelete, setShowDelete] = useState(false)
    const [showSave, setShowSave] = useState(false);
    //console.log("tournamentDetail ----->", tournamentDetail)
    return (
        <div className="tournamnets-details-main">
            <div className="container">
                <div className="header">
                    <Header push={props.history.push}/>
                </div>
                <div className="row">
                    <div className="col-md-3 col-sm-3">
                        <div className="details-left-btn">
                            <Button id="orange-btn" onClick={() => props.history.goBack()}>Pending Tournaments</Button>
                            <Button id="orange-btn" onClick={() => props.history.push('/tournaments_overview')}>Tournaments Overview</Button>
                        </div>
                    </div>
                    <div className="col-md-9 col-sm-9">
                        <div className="details-table-btn">
                            <ul className="btn-row">
                                <li> <span className="lable" >Tournament ID</span> <span className="yello-value"> {`${props?.match?.params?.slug ? props?.match?.params?.slug : "Tournament ID"}`} </span> </li>
                                <li> <span className="lable" >Start</span> <span className="yello-value"> {`${tournamentDetail?.length > 0 ? moment.utc(tournamentDetail[0].start_tournament).format("HH:mm") + " - " + moment.utc(tournamentDetail[0].start_tournament).format("DD.MM.YY") : "Start"}`} </span> </li>
                                <li> <span className="lable" > End </span> <span className="yello-value"> {`${tournamentDetail?.length > 0 ? moment.utc(tournamentDetail[0].end_tournament).format("HH:mm") + " - " + moment.utc(tournamentDetail[0].end_tournament).format("DD.MM.YY") : "End"}`} </span> </li>
                                <li> <Button id="orange-btn" onClick={() => props.history.goBack()}> Back </Button> </li>
                            </ul>
                            <ul className="btn-row">
                                <li> <span className="lable" >Name</span> <input type="text" id="blue-input" placeholder="Input Name" value={name} onChange={(e) => setName(e.target.value)} />{nameValidation && <span className="lable" style={{color: "red"}} >Please enter the name</span> }</li>
                                <li> <span className="lable" >Buyin</span> <input type="text" id="blue-input" placeholder="BuyIn" value={buyIn} onChange={(e) => calculation(e)} />{buyInValidation && <span className="lable" style={{color: "red"}} >Please enter the BuyIn</span> } </li>
                                <li> <span className="lable" >Rake</span> <input type="text" id="blue-input" placeholder="Rake" value={rake} onChange={e => calculationRake(e.target.value)} /> {rakeValidation && <span className="lable" style={{color: "red"}} >Please enter the rake</span> }</li>
                            </ul>
                            <ul className="btn-row">
                                <li> <span className="lable" >Total Players</span> <span className="yello-value">{`${tournamentDetail?.length > 0 ? tournamentDetail[0].total_players : "Total Playes"}`}</span> </li>
                                <li> <span className="lable" >Total Pricepool</span> <span className="purple-value">{`${PrizePool ? PrizePool : "Total PrizePool"}`}</span> </li>
                                <li> <span className="lable" >Total Rake</span> <span className="purple-value"> {`${totalRake ? totalRake : "Total Rake"}`}</span> </li>
                                <li> <span className="lable" >Total Tip</span> <span className="purple-value"> {`${totalTip ? totalTip : "Total Tip"}`}</span> </li>
                            </ul>
                            <ul className="btn-row">
                                <li> <Button id="red-btn" onClick={() => setShowDelete(true)}> Delete </Button> </li>
                                <li> <Button id="pink-btn" onClick={() => fetchData()}> Reset </Button> </li>
                                {tournamentDetail && tournamentDetail[0].state === "Imported" ? <li> <Button id="green-btn" onClick={() => setShowSave(true)}> Save </Button> </li> : null}
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
                                    // console.log(item)                            
                                    return (
                                        <tbody>
                                            <tr>
                                                <td>{`#${item?.position}`}</td>
                                                <td>{item?.account_id?.account_name}</td>
                                                <td><input type="text" id="blue-input" value={item?.payout} onChange={(e) => setCangeWin(e.target.value, item?.id)} /></td>
                                                <td><input type="text" id="blue-input" value={item?.tip} onChange={(e) => setCangeTip(e.target.value, item?.id)} /></td>
                                            </tr>
                                        </tbody>
                                    )
                                })}
                            </Table>
                        </div>
                    </div>
                    <Modal show={showDelete} onHide={() => setShowDelete(false)}>
                        <Modal.Header closeButton>
                            <Modal.Title>Delete</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>Are you sure you want to delete this tournament?</Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={() => setShowDelete(false)}>
                                Close
                            </Button>
                            <Button variant="primary" onClick={() => deleteTournament()}>
                                Delete Tournament
                            </Button>
                        </Modal.Footer>
                    </Modal>
                    <Modal show={showSave} onHide={() => setShowSave(false)}>
                        <Modal.Header closeButton>
                            <Modal.Title>Save</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>Are you sure you want to save this tournament?</Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={() => setShowSave(false)}>
                                Close
                            </Button>
                            <Button variant="primary" onClick={() => handleSave()}>
                                Save Changes
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </div>
            </div>
        </div>
    )
}

export default Tournamentsdetails;