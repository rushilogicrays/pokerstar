import React, { useEffect, useState } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import PandingTournaments from "./screens/PandingTournaments";
import Login from "./screens/Login";
import ChangePassword from "./screens/changePassword";
import Header from "./components/header";
import TournamentsDetails from './screens/tournamentsDetails';

const App = () => {
  return(
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/change_password" exact component={ChangePassword} />
        <Route path="/pandingtournaments" exact component={PandingTournaments} />
        <Route path="/tournaments_details" exact component={TournamentsDetails} />
      </Switch>
  </BrowserRouter>
  )
}

export default App;