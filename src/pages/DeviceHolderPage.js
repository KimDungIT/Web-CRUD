import React, { Component } from "react";
import PathDeviceHolder from "../components/PathDeviceHolder.js";
import TabMenuDeviceHolder from "../components/TabMenuDeviceHolder.js";

class DeviceHolderPage extends Component {
  constructor(props){
    super(props);
    this.state = {
      needRefreshDeviceHolder: false,
    }
  }

  setNeedRefreshDeviceHolderState = (value) => {
    this.setState({
        needRefreshDeviceHolder: value,
    })
  }

  render() {
    
    return (
      
      <div className="col-lg-12 col-md-12 col-sm-12">
        <div className="row" id="tool">
          <PathDeviceHolder setNeedRefreshDeviceHolderState={this.setNeedRefreshDeviceHolderState} />
        </div>
        <TabMenuDeviceHolder
        needRefreshDeviceHolder={this.state.needRefreshDeviceHolder}
        setNeedRefreshDeviceHolderState={this.setNeedRefreshDeviceHolderState}/>
      </div>
    );
  }
}

export default DeviceHolderPage;
