import React, { useEffect, useState } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import PandingTournaments from "./screens/PandingTournaments";
import Login from "./screens/Login";
import ChangePassword from "./screens/changePassword";
import Header from "./components/header";
import TournamentsDetails from './screens/tournamentsDetails';
import TournamentsOverview from "./screens/tournamentsOverview";
import Transaction from './screens/transaction';
import AccountDetails from './screens/accountDetails';
import AccountOverview from './screens/accountOverview';

const App = () => {
  return(
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/change_password" exact component={ChangePassword} />
        <Route path="/pandingtournaments" exact component={PandingTournaments} />
        <Route path="/tournaments_details/:slug" exact component={TournamentsDetails} />
        <Route path="/tournaments_overview" exact component={TournamentsOverview} />
        <Route path="/transaction" exact component={Transaction} />
        <Route path="/account-details" exact component={AccountDetails} />
        <Route path="/account-overview" exact component={AccountOverview} />
      </Switch>
  </BrowserRouter>
  )
}

export default App;