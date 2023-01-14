import React, { Component } from "react";
import { Redirect, Route, Switch } from "react-router";
import "./App.css";
import InvestmentForm from "./components/investmentForm";
import MutualFunds from "./components/mutualFunds";
import NavBar from "./components/navBar";

class App extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <NavBar />
        <main className="container">
          <Switch>
            <Route
              path="/investments/:id"
              render={(props) => <InvestmentForm {...props} />}
            />
            <Route
              path="/investments"
              render={(props) => <MutualFunds {...props} />}
            />

            {/* <Route path="/not-found" component={NotFound} /> */}
            <Redirect from="/" exact to="/investments" />
            {/* <Redirect to="/not-found" /> */}
          </Switch>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
