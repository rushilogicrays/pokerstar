import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import Header from './../components/header';

const TournamentsOverview = () => {
    const [value, onChange] = useState(new Date());
    return (
        <div className="tournaments-overview-main">
            <div className="container">
                <div className="tournaments-overview-header">
                    <Header />
                </div>
                <div className="row">
                    <div className="col-md-3 col-sm-3">
                        <div className="tournaments-calander">
                            <Calendar
                                onChange={onChange}
                                value={value}
                            />
                        </div>
                    </div>
                    <div className="col-md-9 col-sm-9"></div>
                </div>
            </div>

        </div>
    )
}

export default TournamentsOverview;