import React, { useEffect, useState } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import PandingTournaments from "./screens/PandingTournaments";
import Login from "./screens/Login";

const App = () => {
  return(
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/pandingtournaments" exact component={PandingTournaments} />
      </Switch>
  </BrowserRouter>
  )
}

export default App;