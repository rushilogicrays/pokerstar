import React, { useEffect, useState } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import PandingTournaments from "./screens/PandingTournaments";
import Login from "./screens/Login";
import ChangePassword from "./screens/changePassword";
import Header from "./components/header";
import TournamentsDetails from './screens/tournamentsDetails';
import TournamentsOverview from "./screens/tournamentsOverview";
import Transaction from './screens/transaction';
import Account from './screens/account';
import AccountDetails from './screens/accountDetails';
import AccountOverview from './screens/accountOverview';
import ReportingNonConfirmedDeposit from './screens/ReportingNonConfirmedDeposit';
import ReportingAllAccountDebt from './screens/ReportingAllAccountDebt';

const App = () => {
      {/* uncomment for server deploment */}
    {/* <BrowserRouter> */}
  return(
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/change_password" exact component={ChangePassword} />
        <Route path="/pandingtournaments" exact component={PandingTournaments} />
        <Route path="/tournaments_details/:slug" exact component={TournamentsDetails} />
        <Route path="/tournaments_overview" exact component={TournamentsOverview} />
        <Route path="/transaction/:slug" exact component={Transaction} />
        <Route path="/account" exact component={Account} />
        <Route path="/account-details" exact component={AccountDetails} />
        <Route path="/account-overview" exact component={AccountOverview} />
        <Route path="/reporting-non-confirmed-deposit" exact component={ReportingNonConfirmedDeposit} />
        <Route path="/reporting-all-account-debt" exact component={ReportingAllAccountDebt} />
      </Switch>
  </BrowserRouter>
  )
}

export default App;