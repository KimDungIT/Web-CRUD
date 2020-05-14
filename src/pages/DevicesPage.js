import React, { Component } from "react";
import PathDevices from "../components/PathDevices.js";
import TabMenuDevices from "../components/TabMenuDevices.js";

class DevicesPage extends Component {
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
    let param = this.props.match.params.deviceHolder;
    const {history} = this.props;
    return (
      <div className="col-lg-12 col-md-12 col-sm-12">
        <div className="row" id="tool">
          <PathDevices 
          history={history}
          param={param}
          setNeedRefreshTabMenuState={this.setNeedRefreshTabMenuState} />
        </div>
        <TabMenuDevices
        param={param}
        needRefreshTabMenu={this.state.needRefreshTabMenu}
        setNeedRefreshTabMenuState={this.setNeedRefreshTabMenuState}/>
      </div>
    );
  }
}

export default DevicesPage;
