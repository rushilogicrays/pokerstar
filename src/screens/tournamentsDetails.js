import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Logo from '../images/logo.png';
import Header from '../components/header';
import PandingTournaments from './PandingTournaments';
import TournamentsDetails from './tournamentsDetails';

const Tournamentsdetails = () => {
    return (
        <div className="tournamnets-details-main">
            <div className="container">
                <div className="header">
                    <Header/>
                </div>
                <div className="row">
                    <div className="col-md-3 col-sm-3">
                        <div className="details-left-btn">
                            <Button id="orange-btn">Panding Tournaments</Button>
                            <Button id="orange-btn">Tournaments Overview</Button>
                        </div>
                    </div>
                    <div className="col-md-9 col-sm-9">
                        <div className="details-table-btn">
                            <ul className="btn-row-1">
                                <li> <Button id="yello-btn"> Tournament ID </Button> </li>
                                <li> <Button id="yello-btn"> Start </Button> </li>
                                <li> <Button id="yello-btn"> End </Button> </li>
                                <li> <Button id="orange-btn"> Back </Button> </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Tournamentsdetails;