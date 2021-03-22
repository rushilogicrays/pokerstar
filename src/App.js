import React, { useEffect, useState } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import PandingTournaments from "./screens/PandingTournaments";
import Login from "./screens/Login";
import ChangePassword from "./screens/changePassword";
import Header from "./components/header";

const App = () => {
  return(
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Header} />
        <Route path="/changePassword" exact component={ChangePassword} />
        <Route path="/pandingtournaments" exact component={PandingTournaments} />
      </Switch>
  </BrowserRouter>
  )
}

export default App;