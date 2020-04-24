import React, { Component } from "react";
import Header from "./components/Header.js";
import DevicesPage from "./pages/DevicesPage.js";
import DeviceDetailPage from "./pages/DeviceDetailPage.js";
import DeviceHolderPage from "./pages/DeviceHolderPage.js";
import NotFoundPage from "./pages/NotFoundPage.js";
import { notification } from "antd"
import {
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
              <Route path="/" exact component={DeviceHolderPage}></Route>
              <Route path="/:deviceHolder/devices" exact component={DevicesPage}></Route>
              <Route path="/:deviceHolder/devices/:name" exact component={DeviceDetailPage}></Route>
              <Route component={NotFoundPage}></Route>
            </Switch>
          </div>

        </div>
      </Router>
    );
  }
}

export default App;
