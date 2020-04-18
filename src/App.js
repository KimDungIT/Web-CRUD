import React, { Component } from "react";
import Header from "./components/Header.js";
import NetworkPage from "./pages/NetworkPage.js";
import DeviceDetailPage from "./pages/DeviceDetailPage.js";
import NotFoundPage from "./pages/NotFoundPage.js";
import { notification } from "antd"
import {
  Redirect,
  Switch,
  Route,
  BrowserRouter as Router,
} from "react-router-dom";


class App extends Component {
  render() {
    notification.config({
      duration: 3
    });
    return (
      <Router>
        <div className="container-fluid">
          <Header />
          <div className="row">
            <Switch>
              <Route path="/" exact component={NetworkPage}></Route>
              <Route path="/:name" component={DeviceDetailPage}></Route>
              <Route component={NotFoundPage}></Route>
            </Switch>
          </div>

        </div>
      </Router>
    );
  }
}

export default App;
