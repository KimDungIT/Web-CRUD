import React, { Component } from "react";
import Path from "../components/Path.js";
import TabMenu from "../components/TabMenu.js";

class NetworkPage extends Component {
  constructor(props){
    super(props);
    this.state = {
      needRefreshTabMenu: false,
    }
  }

  setNeedRefreshTabMenuState = (value) => {
    this.setState({
      needRefreshTabMenu: value,
    })
  }

  render() {
    return (
      <div className="col-lg-12 col-md-12 col-sm-12">
        <div className="row" id="tool">
          <Path setNeedRefreshTabMenuState={this.setNeedRefreshTabMenuState} />
        </div>
        <TabMenu
        needRefreshTabMenu={this.state.needRefreshTabMenu}
        setNeedRefreshTabMenuState={this.setNeedRefreshTabMenuState}/>
      </div>
    );
  }
}

export default NetworkPage;
