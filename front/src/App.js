import "./App.css";
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Navigation from "./components/Navigation.js";

import LoginPage from "./pages/LoginPage.js";

function HomePage() {
  return <div>Home</div>;
}

function App() {
  const [user, setUser] = useState(null);

  function getUser() {
    fetch("/getUser")
      .then((res) => res.json())
      .then((_user) => {
        if (_user.username) setUser(_user.username);
      });
  }

  useEffect(getUser, []);

  return (
    <Router>
      <div className="App">
        <h1>Passport demo </h1>

        <Navigation user={user}></Navigation>

        <Switch>
          <Route path="/login">
            <LoginPage />
          </Route>
          <Route path="/">
            <HomePage />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
