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
    const [originalData, setOriginalData] = useState(undefined);
    const [buyIn, setBuyIn] = useState("");
    const [rake, setRake] = useState(undefined);
    const [name, setName] = useState(undefined);
    const [PrizePool, setPrizePool] = useState(undefined);
    const [totalPlayers, setTotalPlayers] = useState(undefined);
    let totalPrizepool = (data?.length * (buyIn - rake))
    let totalRake = (data?.length * rake)
    var a = data
    let totalTip = 0;
    if (a?.length > 0) {
        for (var i = 0; i < a?.length; i++) {
            totalTip += a[i]?.tip;
        }
    }
    //console.log("tournamentDetail ----->", tournamentDetail[0].total_players);
    //console.log('total', totalPlayers);
    //console.log("data ---->", data);
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
                setPrizePool(response?.data?.tournament[0]?.total_prizepool)
                setOriginalData(response.data.rank)
                setTotalPlayers(response?.data?.tournament[0]?.total_players)
            });
    }, []);

    useEffect(async () => {
        if (tournamentDetail) {
            if (buyIn >= 1 && buyIn <= 75) {
                if (totalPlayers >= 2 && totalPlayers <= 5) {
                    setData(
                        data?.map(item =>
                            item.position === 1
                                ? { ...item, payout: ((PrizePool * 100) / 100) }
                                : { ...item, payout: "" }
                        )
                    )
                    console.log("2 to 5");
                }
                if (totalPlayers >= 6 && totalPlayers <= 8) {
                    setData(
                        data?.map(item =>
                            item.position === 1
                                ? { ...item, payout: ((PrizePool * 62) / 100) }
                                : item.position === 2 ? { ...item, payout: ((PrizePool * 38) / 100) } : { ...item, payout: "" }

                        )
                    )
                    console.log("6 to 8")
                }
                if (totalPlayers >= 9 && totalPlayers <= 14) {
                    let updatedData = data?.map(item =>
                        item.position === 1 ? { ...item, payout: ((PrizePool * 50) / 100) } : item
                    )
                    await setData(updatedData);
                    let updatedData1 = updatedData?.map(item =>
                        item.position === 2 ? { ...item, payout: ((PrizePool * 30) / 100) } : item
                    )
                    await setData(updatedData1);
                    let updatedData2 = updatedData1?.map(item =>
                        item.position === 3 ? { ...item, payout: ((PrizePool * 20) / 100) } : item
                    )
                    await setData(updatedData2);
                    let updatedData3 = updatedData2?.map(item =>
                        item.position === 4 ? { ...item, payout: "" } : item
                    )
                    await setData(updatedData3);
                    await setData(
                        updatedData3?.map(item =>
                            item.position > 4 ? { ...item, payout: "" } : item
                        )
                    )
                }
                if (totalPlayers >= 15 && totalPlayers <= 17) {
                    let updatedData = data?.map(item =>
                        item.position === 1 ? { ...item, payout: ((PrizePool * 50) / 100) } : item
                    )
                    await setData(updatedData);
                    let updatedData1 = updatedData?.map(item =>
                        item.position === 2 ? { ...item, payout: ((PrizePool * 30) / 100) } : item
                    )
                    await setData(updatedData1);
                    let updatedData2 = updatedData1?.map(item =>
                        item.position === 3 ? { ...item, payout: ((PrizePool * 20) / 100) } : item
                    )
                    await setData(updatedData2);
                    let updatedData3 = updatedData2?.map(item =>
                        item.position === 4 ? { ...item, payout: "" } : item
                    )
                    await setData(updatedData3);
                    await setData(
                        updatedData3?.map(item =>
                            item.position > 4 ? { ...item, payout: "" } : item
                        )
                    )
                }
                if (totalPlayers >= 18 && totalPlayers <= 24) {
                    let updatedData = data?.map(item =>
                        item.position === 1 ? { ...item, payout: ((PrizePool * 45) / 100) } : item
                    )
                    await setData(updatedData);
                    let updatedData1 = updatedData?.map(item =>
                        item.position === 2 ? { ...item, payout: ((PrizePool * 27) / 100) } : item
                    )
                    await setData(updatedData1);
                    let updatedData2 = updatedData1?.map(item =>
                        item.position === 3 ? { ...item, payout: ((PrizePool * 17) / 100) } : item
                    )
                    await setData(updatedData2);
                    let updatedData3 = updatedData2?.map(item =>
                        item.position === 4 ? { ...item, payout: ((PrizePool * 11) / 100) } : item
                    )
                    await setData(updatedData3);
                    await setData(
                        updatedData3?.map(item =>
                            item.position > 4 ? { ...item, payout: "" } : item
                        )
                    )
                }
                if (totalPlayers >= 25 && totalPlayers <= 29) {
                    let updatedData = data?.map(item =>
                        item.position === 1 ? { ...item, payout: ((PrizePool * 38) / 100) } : item
                    )
                    await setData(updatedData);
                    let updatedData1 = updatedData?.map(item =>
                        item.position === 2 ? { ...item, payout: ((PrizePool * 25) / 100) } : item
                    )
                    await setData(updatedData1);
                    let updatedData2 = updatedData1?.map(item =>
                        item.position === 3 ? { ...item, payout: ((PrizePool * 17) / 100) } : item
                    )
                    await setData(updatedData2);
                    let updatedData3 = updatedData2?.map(item =>
                        item.position === 4 ? { ...item, payout: ((PrizePool * 12) / 100) } : item
                    )
                    await setData(updatedData3);
                    let updatedData4 = updatedData3?.map(item =>
                        item.position === 5 ? { ...item, payout: ((PrizePool * 8) / 100) } : item
                    )
                    await setData(updatedData4);
                    await setData(
                        updatedData4?.map(item =>
                            item.position > 5 ? { ...item, payout: "" } : item
                        )
                    )
                }
                if (totalPlayers >= 30 && totalPlayers <= 34) {
                    console.log("30 to 34");
                    let updatedData = data?.map(item =>
                        item.position === 1 ? { ...item, payout: ((PrizePool * 37) / 100) } : item
                    )
                    await setData(updatedData);
                    let updatedData1 = updatedData?.map(item =>
                        item.position === 2 ? { ...item, payout: ((PrizePool * 24) / 100) } : item
                    )
                    await setData(updatedData1);
                    let updatedData2 = updatedData1?.map(item =>
                        item.position === 3 ? { ...item, payout: ((PrizePool * 15) / 100) } : item
                    )
                    await setData(updatedData2);
                    let updatedData3 = updatedData2?.map(item =>
                        item.position === 4 ? { ...item, payout: ((PrizePool * 10) / 100) } : item
                    )
                    await setData(updatedData3);
                    let updatedData4 = updatedData3?.map(item =>
                        item.position === 5 ? { ...item, payout: ((PrizePool * 8) / 100) } : item
                    )
                    await setData(updatedData4);
                    let updatedData5 = updatedData4?.map(item =>
                        item.position === 6 ? { ...item, payout: ((PrizePool * 6) / 100) } : item
                    )
                    await setData(updatedData5);
                    await setData(
                        updatedData5?.map(item =>
                            item.position > 6 ? { ...item, payout: "" } : item
                        )
                    )
                }
                if (totalPlayers >= 35 && totalPlayers <= 39) {
                    let updatedData = data?.map(item =>
                        item.position === 1 ? { ...item, payout: ((PrizePool * 33) / 100) } : item
                    )
                    await setData(updatedData);
                    let updatedData1 = updatedData?.map(item =>
                        item.position === 2 ? { ...item, payout: ((PrizePool * 22) / 100) } : item
                    )
                    await setData(updatedData1);
                    let updatedData2 = updatedData1?.map(item =>
                        item.position === 3 ? { ...item, payout: ((PrizePool * 15) / 100) } : item
                    )
                    await setData(updatedData2);
                    let updatedData3 = updatedData2?.map(item =>
                        item.position === 4 ? { ...item, payout: ((PrizePool * 10) / 100) } : item
                    )
                    await setData(updatedData3);
                    let updatedData4 = updatedData3?.map(item =>
                        item.position === 5 ? { ...item, payout: ((PrizePool * 8) / 100) } : item
                    )
                    await setData(updatedData4);
                    let updatedData5 = updatedData4?.map(item =>
                        item.position === 6 ? { ...item, payout: ((PrizePool * 7) / 100) } : item
                    )
                    await setData(updatedData5);
                    let updatedData6 = updatedData5?.map(item =>
                        item.position === 7 ? { ...item, payout: ((PrizePool * 5) / 100) } : item
                    )
                    await setData(updatedData6);
                    await setData(
                        updatedData6?.map(item =>
                            item.position > 7 ? { ...item, payout: "" } : item
                        )
                    )
                }
                if (totalPlayers >= 40 && totalPlayers <= 44) {
                    let updatedData = data?.map(item =>
                        item.position === 1 ? { ...item, payout: ((PrizePool * 32) / 100) } : item
                    )
                    await setData(updatedData);
                    let updatedData1 = updatedData?.map(item =>
                        item.position === 2 ? { ...item, payout: ((PrizePool * 20) / 100) } : item
                    )
                    await setData(updatedData1);
                    let updatedData2 = updatedData1?.map(item =>
                        item.position === 3 ? { ...item, payout: ((PrizePool * 13) / 100) } : item
                    )
                    await setData(updatedData2);
                    let updatedData3 = updatedData2?.map(item =>
                        item.position === 4 ? { ...item, payout: ((PrizePool * 9) / 100) } : item
                    )
                    await setData(updatedData3);
                    let updatedData4 = updatedData3?.map(item =>
                        item.position === 5 ? { ...item, payout: ((PrizePool * 8) / 100) } : item
                    )
                    await setData(updatedData4);
                    let updatedData5 = updatedData4?.map(item =>
                        item.position === 6 ? { ...item, payout: ((PrizePool * 7) / 100) } : item
                    )
                    await setData(updatedData5);
                    let updatedData6 = updatedData5?.map(item =>
                        item.position === 7 ? { ...item, payout: ((PrizePool * 6) / 100) } : item
                    )
                    await setData(updatedData6);
                    let updatedData7 = updatedData6?.map(item =>
                        item.position === 8 ? { ...item, payout: ((PrizePool * 5) / 100) } : item
                    )
                    await setData(updatedData7);
                    await setData(
                        updatedData7?.map(item =>
                            item.position > 8 ? { ...item, payout: "" } : item
                        )
                    )
                }
                if (totalPlayers >= 45) {
                    console.log("46 above");
                    let updatedData = data?.map(item =>
                        item.position === 1 ? { ...item, payout: ((PrizePool * 28) / 100) } : item
                    )
                    await setData(updatedData);
                    let updatedData1 = updatedData?.map(item =>
                        item.position === 2 ? { ...item, payout: ((PrizePool * 18) / 100) } : item
                    )
                    await setData(updatedData1);
                    let updatedData2 = updatedData1?.map(item =>
                        item.position === 3 ? { ...item, payout: ((PrizePool * 12) / 100) } : item
                    )
                    await setData(updatedData2);
                    let updatedData3 = updatedData2?.map(item =>
                        item.position === 4 ? { ...item, payout: ((PrizePool * 9) / 100) } : item
                    )
                    await setData(updatedData3);
                    let updatedData4 = updatedData3?.map(item =>
                        item.position === 5 ? { ...item, payout: ((PrizePool * 8) / 100) } : item
                    )
                    await setData(updatedData4);
                    let updatedData5 = updatedData4?.map(item =>
                        item.position === 6 ? { ...item, payout: ((PrizePool * 7) / 100) } : item
                    )
                    await setData(updatedData5);
                    let updatedData6 = updatedData5?.map(item =>
                        item.position === 7 ? { ...item, payout: ((PrizePool * 6) / 100) } : item
                    )
                    await setData(updatedData6);
                    let updatedData7 = updatedData6?.map(item =>
                        item.position === 8 ? { ...item, payout: ((PrizePool * 5) / 100) } : item
                    )
                    await setData(updatedData7);
                    let updatedData8 = updatedData7?.map(item =>
                        item.position === 9 ? { ...item, payout: ((PrizePool * 7) / 100) } : item
                    )
                    await setData(updatedData8);
                    await setData(
                        updatedData8?.map(item =>
                            item.position > 9 ? { ...item, payout: "" } : item
                        )
                    )
                }
            }
            if(buyIn >= 76 && buyIn <= 125){
                if (totalPlayers >= 2 && totalPlayers <= 5) {
                    console.log("2 to 5");
                    let updatedData = data?.map(item =>
                        item.position === 1 ? { ...item, payout: ((PrizePool * 100) / 100) } : item
                    )
                    await setData(updatedData);
                    await setData(
                        updatedData?.map(item =>
                            item.position > 1 ? { ...item, payout: "" } : item
                        )
                    )
                }
                if (totalPlayers >= 6 && totalPlayers <= 8) {
                    let updatedData = data?.map(item =>
                        item.position === 1 ? { ...item, payout: ((PrizePool * 62) / 100) } : item
                    )
                    await setData(updatedData);
                    let updatedData1 = updatedData?.map(item =>
                        item.position === 2 ? { ...item, payout: ((PrizePool * 38) / 100) } : item
                    )
                    await setData(updatedData1);
                    await setData(
                        updatedData1?.map(item =>
                            item.position > 2 ? { ...item, payout: "" } : item
                        )
                    )
                }
                if (totalPlayers >= 9 && totalPlayers <= 14) {
                    let updatedData = data?.map(item =>
                        item.position === 1 ? { ...item, payout: ((PrizePool * 50) / 100) } : item
                    )
                    await setData(updatedData);
                    let updatedData1 = updatedData?.map(item =>
                        item.position === 2 ? { ...item, payout: ((PrizePool * 30) / 100) } : item
                    )
                    await setData(updatedData1);
                    let updatedData2 = updatedData1?.map(item =>
                        item.position === 3 ? { ...item, payout: ((PrizePool * 20) / 100) } : item
                    )
                    await setData(updatedData2);
                    await setData(
                        updatedData2?.map(item =>
                            item.position > 3 ? { ...item, payout: "" } : item
                        )
                    )
                }
                if (totalPlayers >= 15 && totalPlayers <= 17) {
                    let updatedData = data?.map(item =>
                        item.position === 1 ? { ...item, payout: ((PrizePool * 45) / 100) } : item
                    )
                    await setData(updatedData);
                    let updatedData1 = updatedData?.map(item =>
                        item.position === 2 ? { ...item, payout: ((PrizePool * 27) / 100) } : item
                    )
                    await setData(updatedData1);
                    let updatedData2 = updatedData1?.map(item =>
                        item.position === 3 ? { ...item, payout: ((PrizePool * 17) / 100) } : item
                    )
                    await setData(updatedData2);
                    let updatedData3 = updatedData2?.map(item =>
                        item.position === 4 ? { ...item, payout: ((PrizePool * 11) / 100) } : item
                    )
                    await setData(updatedData3);
                    await setData(
                        updatedData3?.map(item =>
                            item.position > 4 ? { ...item, payout: "" } : item
                        )
                    )
                }
                if (totalPlayers >= 18 && totalPlayers <= 24) {
                    let updatedData = data?.map(item =>
                        item.position === 1 ? { ...item, payout: ((PrizePool * 45) / 100) } : item
                    )
                    await setData(updatedData);
                    let updatedData1 = updatedData?.map(item =>
                        item.position === 2 ? { ...item, payout: ((PrizePool * 27) / 100) } : item
                    )
                    await setData(updatedData1);
                    let updatedData2 = updatedData1?.map(item =>
                        item.position === 3 ? { ...item, payout: ((PrizePool * 17) / 100) } : item
                    )
                    await setData(updatedData2);
                    let updatedData3 = updatedData2?.map(item =>
                        item.position === 4 ? { ...item, payout: ((PrizePool * 11) / 100) } : item
                    )
                    await setData(updatedData3);
                    await setData(
                        updatedData3?.map(item =>
                            item.position > 4 ? { ...item, payout: "" } : item
                        )
                    )
                }
                if (totalPlayers >= 25 && totalPlayers <= 29) {
                    let updatedData = data?.map(item =>
                        item.position === 1 ? { ...item, payout: ((PrizePool * 38) / 100) } : item
                    )
                    await setData(updatedData);
                    let updatedData1 = updatedData?.map(item =>
                        item.position === 2 ? { ...item, payout: ((PrizePool * 25) / 100) } : item
                    )
                    await setData(updatedData1);
                    let updatedData2 = updatedData1?.map(item =>
                        item.position === 3 ? { ...item, payout: ((PrizePool * 17) / 100) } : item
                    )
                    await setData(updatedData2);
                    let updatedData3 = updatedData2?.map(item =>
                        item.position === 4 ? { ...item, payout: ((PrizePool * 12) / 100) } : item
                    )
                    await setData(updatedData3);
                    let updatedData4 = updatedData3?.map(item =>
                        item.position === 5 ? { ...item, payout: ((PrizePool * 8) / 100) } : item
                    )
                    await setData(updatedData4);
                    await setData(
                        updatedData4?.map(item =>
                            item.position > 5 ? { ...item, payout: "" } : item
                        )
                    )
                }
                if (totalPlayers >= 30 && totalPlayers <= 34) {
                    let updatedData = data?.map(item =>
                        item.position === 1 ? { ...item, payout: ((PrizePool * 37) / 100) } : item
                    )
                    await setData(updatedData);
                    let updatedData1 = updatedData?.map(item =>
                        item.position === 2 ? { ...item, payout: ((PrizePool * 24) / 100) } : item
                    )
                    await setData(updatedData1);
                    let updatedData2 = updatedData1?.map(item =>
                        item.position === 3 ? { ...item, payout: ((PrizePool * 15) / 100) } : item
                    )
                    await setData(updatedData2);
                    let updatedData3 = updatedData2?.map(item =>
                        item.position === 4 ? { ...item, payout: ((PrizePool * 10) / 100) } : item
                    )
                    await setData(updatedData3);
                    let updatedData4 = updatedData3?.map(item =>
                        item.position === 5 ? { ...item, payout: ((PrizePool * 8) / 100) } : item
                    )
                    await setData(updatedData4);
                    let updatedData5 = updatedData4?.map(item =>
                        item.position === 6 ? { ...item, payout: ((PrizePool * 6) / 100) } : item
                    )
                    await setData(updatedData5);
                    await setData(
                        updatedData5?.map(item =>
                            item.position > 6 ? { ...item, payout: "" } : item
                        )
                    )
                }
                if (totalPlayers >= 35 && totalPlayers <= 39) {
                    let updatedData = data?.map(item =>
                        item.position === 1 ? { ...item, payout: ((PrizePool * 33) / 100) } : item
                    )
                    await setData(updatedData);
                    let updatedData1 = updatedData?.map(item =>
                        item.position === 2 ? { ...item, payout: ((PrizePool * 22) / 100) } : item
                    )
                    await setData(updatedData1);
                    let updatedData2 = updatedData1?.map(item =>
                        item.position === 3 ? { ...item, payout: ((PrizePool * 15) / 100) } : item
                    )
                    await setData(updatedData2);
                    let updatedData3 = updatedData2?.map(item =>
                        item.position === 4 ? { ...item, payout: ((PrizePool * 10) / 100) } : item
                    )
                    await setData(updatedData3);
                    let updatedData4 = updatedData3?.map(item =>
                        item.position === 5 ? { ...item, payout: ((PrizePool * 8) / 100) } : item
                    )
                    await setData(updatedData4);
                    let updatedData5 = updatedData4?.map(item =>
                        item.position === 6 ? { ...item, payout: ((PrizePool * 7) / 100) } : item
                    )
                    await setData(updatedData5);
                    let updatedData6 = updatedData5?.map(item =>
                        item.position === 7 ? { ...item, payout: ((PrizePool * 5) / 100) } : item
                    )
                    await setData(updatedData6);
                    await setData(
                        updatedData6?.map(item =>
                            item.position > 7 ? { ...item, payout: "" } : item
                        )
                    )
                }
                if (totalPlayers >= 40 && totalPlayers <= 44) {
                    let updatedData = data?.map(item =>
                        item.position === 1 ? { ...item, payout: ((PrizePool * 33) / 100) } : item
                    )
                    await setData(updatedData);
                    let updatedData1 = updatedData?.map(item =>
                        item.position === 2 ? { ...item, payout: ((PrizePool * 22) / 100) } : item
                    )
                    await setData(updatedData1);
                    let updatedData2 = updatedData1?.map(item =>
                        item.position === 3 ? { ...item, payout: ((PrizePool * 15) / 100) } : item
                    )
                    await setData(updatedData2);
                    let updatedData3 = updatedData2?.map(item =>
                        item.position === 4 ? { ...item, payout: ((PrizePool * 10) / 100) } : item
                    )
                    await setData(updatedData3);
                    let updatedData4 = updatedData3?.map(item =>
                        item.position === 5 ? { ...item, payout: ((PrizePool * 8) / 100) } : item
                    )
                    await setData(updatedData4);
                    let updatedData5 = updatedData4?.map(item =>
                        item.position === 6 ? { ...item, payout: ((PrizePool * 7) / 100) } : item
                    )
                    await setData(updatedData5);
                    let updatedData6 = updatedData5?.map(item =>
                        item.position === 7 ? { ...item, payout: ((PrizePool * 5) / 100) } : item
                    )
                    await setData(updatedData6);
                    let updatedData7 = updatedData6?.map(item =>
                        item.position === 8 ? { ...item, payout: ((PrizePool * 5) / 100) } : item
                    )
                    await setData(updatedData7);
                    await setData(
                        updatedData7?.map(item =>
                            item.position > 8 ? { ...item, payout: "" } : item
                        )
                    )
                }
                if (totalPlayers >= 45) {
                    let updatedData = data?.map(item =>
                        item.position === 1 ? { ...item, payout: ((PrizePool * 28) / 100) } : item
                    )
                    await setData(updatedData);
                    let updatedData1 = updatedData?.map(item =>
                        item.position === 2 ? { ...item, payout: ((PrizePool * 18) / 100) } : item
                    )
                    await setData(updatedData1);
                    let updatedData2 = updatedData1?.map(item =>
                        item.position === 3 ? { ...item, payout: ((PrizePool * 12) / 100) } : item
                    )
                    await setData(updatedData2);
                    let updatedData3 = updatedData2?.map(item =>
                        item.position === 4 ? { ...item, payout: ((PrizePool * 9) / 100) } : item
                    )
                    await setData(updatedData3);
                    let updatedData4 = updatedData3?.map(item =>
                        item.position === 5 ? { ...item, payout: ((PrizePool * 8) / 100) } : item
                    )
                    await setData(updatedData4);
                    let updatedData5 = updatedData4?.map(item =>
                        item.position === 6 ? { ...item, payout: ((PrizePool * 7) / 100) } : item
                    )
                    await setData(updatedData5);
                    let updatedData6 = updatedData5?.map(item =>
                        item.position === 7 ? { ...item, payout: ((PrizePool * 6) / 100) } : item
                    )
                    await setData(updatedData6);
                    let updatedData7 = updatedData6?.map(item =>
                        item.position === 8 ? { ...item, payout: ((PrizePool * 5) / 100) } : item
                    )
                    await setData(updatedData7);
                    let updatedData8 = updatedData7?.map(item =>
                        item.position === 9 ? { ...item, payout: ((PrizePool * 7) / 100) } : item
                    )
                    await setData(updatedData8);
                    await setData(
                        updatedData8?.map(item =>
                            item.position > 9 ? { ...item, payout: "" } : item
                        )
                    )
                }
            }
            if(buyIn >= 126){
                if (totalPlayers >= 2 && totalPlayers <= 5) {
                    let updatedData = data?.map(item =>
                        item.position === 1 ? { ...item, payout: ((PrizePool * 100) / 100) } : item
                    )
                    await setData(updatedData);
                    await setData(
                        updatedData?.map(item =>
                            item.position > 1 ? { ...item, payout: "" } : item
                        )
                    )
                }
                if (totalPlayers >= 6 && totalPlayers <= 8) {
                    let updatedData = data?.map(item =>
                        item.position === 1 ? { ...item, payout: ((PrizePool * 62) / 100) } : item
                    )
                    await setData(updatedData);
                    let updatedData1 = updatedData?.map(item =>
                        item.position === 2 ? { ...item, payout: ((PrizePool * 38) / 100) } : item
                    )
                    await setData(updatedData1);
                    await setData(
                        updatedData1?.map(item =>
                            item.position > 2 ? { ...item, payout: "" } : item
                        )
                    )
                }
                if (totalPlayers >= 9 && totalPlayers <= 14) {
                    let updatedData = data?.map(item =>
                        item.position === 1 ? { ...item, payout: ((PrizePool * 50) / 100) } : item
                    )
                    await setData(updatedData);
                    let updatedData1 = updatedData?.map(item =>
                        item.position === 2 ? { ...item, payout: ((PrizePool * 30) / 100) } : item
                    )
                    await setData(updatedData1);
                    let updatedData2 = updatedData1?.map(item =>
                        item.position === 3 ? { ...item, payout: ((PrizePool * 20) / 100) } : item
                    )
                    await setData(updatedData2);
                    await setData(
                        updatedData2?.map(item =>
                            item.position > 3 ? { ...item, payout: "" } : item
                        )
                    )
                }
                if (totalPlayers >= 15 && totalPlayers <= 17) {
                    let updatedData = data?.map(item =>
                        item.position === 1 ? { ...item, payout: ((PrizePool * 45) / 100) } : item
                    )
                    await setData(updatedData);
                    let updatedData1 = updatedData?.map(item =>
                        item.position === 2 ? { ...item, payout: ((PrizePool * 27) / 100) } : item
                    )
                    await setData(updatedData1);
                    let updatedData2 = updatedData1?.map(item =>
                        item.position === 3 ? { ...item, payout: ((PrizePool * 17) / 100) } : item
                    )
                    await setData(updatedData2);
                    let updatedData3 = updatedData2?.map(item =>
                        item.position === 4 ? { ...item, payout: ((PrizePool * 11) / 100) } : item
                    )
                    await setData(updatedData3);
                    await setData(
                        updatedData3?.map(item =>
                            item.position > 4 ? { ...item, payout: "" } : item
                        )
                    )
                }
                if (totalPlayers >= 18 && totalPlayers <= 24) {
                    let updatedData = data?.map(item =>
                        item.position === 1 ? { ...item, payout: ((PrizePool * 38) / 100) } : item
                    )
                    await setData(updatedData);
                    let updatedData1 = updatedData?.map(item =>
                        item.position === 2 ? { ...item, payout: ((PrizePool * 25) / 100) } : item
                    )
                    await setData(updatedData1);
                    let updatedData2 = updatedData1?.map(item =>
                        item.position === 3 ? { ...item, payout: ((PrizePool * 17) / 100) } : item
                    )
                    await setData(updatedData2);
                    let updatedData3 = updatedData2?.map(item =>
                        item.position === 4 ? { ...item, payout: ((PrizePool * 12) / 100) } : item
                    )
                    await setData(updatedData3);
                    let updatedData4 = updatedData3?.map(item =>
                        item.position === 5 ? { ...item, payout: ((PrizePool * 8) / 100) } : item
                    )
                    await setData(updatedData4);
                    await setData(
                        updatedData4?.map(item =>
                            item.position > 5 ? { ...item, payout: "" } : item
                        )
                    )
                }
                if (totalPlayers >= 25 && totalPlayers <= 29) {
                    let updatedData = data?.map(item =>
                        item.position === 1 ? { ...item, payout: ((PrizePool * 37) / 100) } : item
                    )
                    await setData(updatedData);
                    let updatedData1 = updatedData?.map(item =>
                        item.position === 2 ? { ...item, payout: ((PrizePool * 24) / 100) } : item
                    )
                    await setData(updatedData1);
                    let updatedData2 = updatedData1?.map(item =>
                        item.position === 3 ? { ...item, payout: ((PrizePool * 15) / 100) } : item
                    )
                    await setData(updatedData2);
                    let updatedData3 = updatedData2?.map(item =>
                        item.position === 4 ? { ...item, payout: ((PrizePool * 10) / 100) } : item
                    )
                    await setData(updatedData3);
                    let updatedData4 = updatedData3?.map(item =>
                        item.position === 5 ? { ...item, payout: ((PrizePool * 8) / 100) } : item
                    )
                    await setData(updatedData4);
                    let updatedData5 = updatedData4?.map(item =>
                        item.position === 6 ? { ...item, payout: ((PrizePool * 6) / 100) } : item
                    )
                    await setData(updatedData5);
                    await setData(
                        updatedData5?.map(item =>
                            item.position > 6 ? { ...item, payout: "" } : item
                        )
                    )
                }
                if (totalPlayers >= 30 && totalPlayers <= 34) {
                    let updatedData = data?.map(item =>
                        item.position === 1 ? { ...item, payout: ((PrizePool * 33) / 100) } : item
                    )
                    await setData(updatedData);
                    let updatedData1 = updatedData?.map(item =>
                        item.position === 2 ? { ...item, payout: ((PrizePool * 22) / 100) } : item
                    )
                    await setData(updatedData1);
                    let updatedData2 = updatedData1?.map(item =>
                        item.position === 3 ? { ...item, payout: ((PrizePool * 15) / 100) } : item
                    )
                    await setData(updatedData2);
                    let updatedData3 = updatedData2?.map(item =>
                        item.position === 4 ? { ...item, payout: ((PrizePool * 10) / 100) } : item
                    )
                    await setData(updatedData3);
                    let updatedData4 = updatedData3?.map(item =>
                        item.position === 5 ? { ...item, payout: ((PrizePool * 8) / 100) } : item
                    )
                    await setData(updatedData4);
                    let updatedData5 = updatedData4?.map(item =>
                        item.position === 6 ? { ...item, payout: ((PrizePool * 7) / 100) } : item
                    )
                    await setData(updatedData5);
                    let updatedData6 = updatedData5?.map(item =>
                        item.position === 7 ? { ...item, payout: ((PrizePool * 5) / 100) } : item
                    )
                    await setData(updatedData6);
                    await setData(
                        updatedData6?.map(item =>
                            item.position > 7 ? { ...item, payout: "" } : item
                        )
                    )
                }
                if (totalPlayers >= 35 && totalPlayers <= 39) {
                    let updatedData = data?.map(item =>
                        item.position === 1 ? { ...item, payout: ((PrizePool * 32) / 100) } : item
                    )
                    await setData(updatedData);
                    let updatedData1 = updatedData?.map(item =>
                        item.position === 2 ? { ...item, payout: ((PrizePool * 20) / 100) } : item
                    )
                    await setData(updatedData1);
                    let updatedData2 = updatedData1?.map(item =>
                        item.position === 3 ? { ...item, payout: ((PrizePool * 13) / 100) } : item
                    )
                    await setData(updatedData2);
                    let updatedData3 = updatedData2?.map(item =>
                        item.position === 4 ? { ...item, payout: ((PrizePool * 9) / 100) } : item
                    )
                    await setData(updatedData3);
                    let updatedData4 = updatedData3?.map(item =>
                        item.position === 5 ? { ...item, payout: ((PrizePool * 8) / 100) } : item
                    )
                    await setData(updatedData4);
                    let updatedData5 = updatedData4?.map(item =>
                        item.position === 6 ? { ...item, payout: ((PrizePool * 7) / 100) } : item
                    )
                    await setData(updatedData5);
                    let updatedData6 = updatedData5?.map(item =>
                        item.position === 7 ? { ...item, payout: ((PrizePool * 6) / 100) } : item
                    )
                    await setData(updatedData6);
                    let updatedData7 = updatedData6?.map(item =>
                        item.position === 8 ? { ...item, payout: ((PrizePool * 5) / 100) } : item
                    )
                    await setData(updatedData7);
                    await setData(
                        updatedData7?.map(item =>
                            item.position > 8 ? { ...item, payout: "" } : item
                        )
                    )
                }
                if (totalPlayers >= 40 && totalPlayers <= 44) {
                    let updatedData = data?.map(item =>
                        item.position === 1 ? { ...item, payout: ((PrizePool * 28) / 100) } : item
                    )
                    await setData(updatedData);
                    let updatedData1 = updatedData?.map(item =>
                        item.position === 2 ? { ...item, payout: ((PrizePool * 18) / 100) } : item
                    )
                    await setData(updatedData1);
                    let updatedData2 = updatedData1?.map(item =>
                        item.position === 3 ? { ...item, payout: ((PrizePool * 12) / 100) } : item
                    )
                    await setData(updatedData2);
                    let updatedData3 = updatedData2?.map(item =>
                        item.position === 4 ? { ...item, payout: ((PrizePool * 9) / 100) } : item
                    )
                    await setData(updatedData3);
                    let updatedData4 = updatedData3?.map(item =>
                        item.position === 5 ? { ...item, payout: ((PrizePool * 8) / 100) } : item
                    )
                    await setData(updatedData4);
                    let updatedData5 = updatedData4?.map(item =>
                        item.position === 6 ? { ...item, payout: ((PrizePool * 7) / 100) } : item
                    )
                    await setData(updatedData5);
                    let updatedData6 = updatedData5?.map(item =>
                        item.position === 7 ? { ...item, payout: ((PrizePool * 6) / 100) } : item
                    )
                    await setData(updatedData6);
                    let updatedData7 = updatedData6?.map(item =>
                        item.position === 8 ? { ...item, payout: ((PrizePool * 5) / 100) } : item
                    )
                    await setData(updatedData7);
                    let updatedData8 = updatedData7?.map(item =>
                        item.position === 9 ? { ...item, payout: ((PrizePool * 7) / 100) } : item
                    )
                    await setData(updatedData8);
                    await setData(
                        updatedData8?.map(item =>
                            item.position > 9 ? { ...item, payout: "" } : item
                        )
                    )
                }
                if (totalPlayers >= 45) {
                    let updatedData = data?.map(item =>
                        item.position === 1 ? { ...item, payout: ((PrizePool * 28) / 100) } : item
                    )
                    await setData(updatedData);
                    let updatedData1 = updatedData?.map(item =>
                        item.position === 2 ? { ...item, payout: ((PrizePool * 18) / 100) } : item
                    )
                    await setData(updatedData1);
                    let updatedData2 = updatedData1?.map(item =>
                        item.position === 3 ? { ...item, payout: ((PrizePool * 12) / 100) } : item
                    )
                    await setData(updatedData2);
                    let updatedData3 = updatedData2?.map(item =>
                        item.position === 4 ? { ...item, payout: ((PrizePool * 9) / 100) } : item
                    )
                    await setData(updatedData3);
                    let updatedData4 = updatedData3?.map(item =>
                        item.position === 5 ? { ...item, payout: ((PrizePool * 8) / 100) } : item
                    )
                    await setData(updatedData4);
                    let updatedData5 = updatedData4?.map(item =>
                        item.position === 6 ? { ...item, payout: ((PrizePool * 7) / 100) } : item
                    )
                    await setData(updatedData5);
                    let updatedData6 = updatedData5?.map(item =>
                        item.position === 7 ? { ...item, payout: ((PrizePool * 6) / 100) } : item
                    )
                    await setData(updatedData6);
                    let updatedData7 = updatedData6?.map(item =>
                        item.position === 8 ? { ...item, payout: ((PrizePool * 5) / 100) } : item
                    )
                    await setData(updatedData7);
                    let updatedData8 = updatedData7?.map(item =>
                        item.position === 9 ? { ...item, payout: ((PrizePool * 4) / 100) } : item
                    )
                    await setData(updatedData8);
                    let updatedData9 = updatedData8?.map(item =>
                        item.position === 10 ? { ...item, payout: ((PrizePool * 3) / 100) } : item
                    )
                    await setData(updatedData9);
                    await setData(
                        updatedData9?.map(item =>
                            item.position > 10 ? { ...item, payout: "" } : item
                        )
                    )
                }
            }
        }
        console.log("tournament is set")
    }, [totalPlayers])

    const deleteTournament = () => {
        // axios({
        //     method: 'delete',
        //     url: `http://143.110.254.46/poker/api/delete-tournament/${props?.match?.params?.slug}`,
        //     // headers: {
        //     //   Authorization: "Token "+localStorage.getItem("accessToken").trim()
        //     // }
        //   })
        //     .then(function (response) {
        //       console.log(response.data.rank);
        //     });
        console.log("delete");
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

    const handleSave = () => {
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
                                <li> <span className="lable" >Tournament ID</span> <span className="yello-value"> {`${props?.match?.params?.slug ? props?.match?.params?.slug : "Tournament ID"}`} </span> </li>
                                <li> <span className="lable" >Start</span> <span className="yello-value"> {`${tournamentDetail?.length > 0 ? moment(tournamentDetail[0].start_tournament).format("h:mm") + " - " + moment(tournamentDetail[0].start_tournament).format("DD.MM.YY") : "Start"}`} </span> </li>
                                <li> <span className="lable" > End </span> <span className="yello-value"> {`${tournamentDetail?.length > 0 ? moment(tournamentDetail[0].end_tournament).format("h:mm") + " - " + moment(tournamentDetail[0].end_tournament).format("DD.MM.YY") : "End"}`} </span> </li>
                                <li> <Button id="orange-btn" onClick={() => props.history.goBack()}> Back </Button> </li>
                            </ul>
                            <ul className="btn-row">
                                <li> <span className="lable" >Name</span> <input type="text" id="blue-input" placeholder="Input Name" value={name} onChange={(e) => setName(e.target.value)} /> </li>
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
                                <li> <span className="lable" >Buyin</span> <input type="text" id="blue-input" placeholder="BuyIn" value={buyIn} onChange={(e) => setBuyIn(e.target.value)} /> </li>
                                <li> <span className="lable" >Rake</span> <input type="text" id="blue-input" placeholder="Rake" value={rake} onChange={e => setRake(e.target.value)} /> </li>
                            </ul>
                            <ul className="btn-row">
                                <li> <span className="lable" >Total Players</span> <span className="yello-value">{`${tournamentDetail?.length > 0 ? tournamentDetail[0].total_players : "Total Playes"}`}</span> </li>
                                <li> <span className="lable" >Total Pricepool</span> <span className="purple-value">{`${totalPrizepool ? totalPrizepool : "Total Players"}`}</span> </li>
                                <li> <span className="lable" >Total Rake</span> <span className="purple-value"> {`${totalRake ? totalRake : "Total Rake"}`}</span> </li>
                                <li> <span className="lable" >Total Tip</span> <span className="purple-value"> {`${totalTip ? totalTip : "Total Tip"}`}</span> </li>
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
                </div>
            </div>
        </div>
    )
}

export default Tournamentsdetails;