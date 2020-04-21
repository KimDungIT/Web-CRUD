import React, { Component } from "react";
import PathDeviceDetail from "../components/PathDeviceDetail.js";
import TabMenuDeviceDetail from "../components/TabMenuDeviceDetail.js";

class DeviceDetailPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      needRefreshDevice: false,
    };
  }

  setNeedRefreshDevice = (value) => {
    this.setState({
      needRefreshDevice: value,
    });
  };

  render() {
    let {deviceHolder, name} = this.props.match.params;
    const {history} = this.props;
    return (
      <div className="col-lg-12 col-md-12 col-sm-12">
        <div className="row" id="tool">
          <PathDeviceDetail
            history={history}
            name={name}
            deviceHolder={deviceHolder}
            setNeedRefreshDevice={this.setNeedRefreshDevice}
          />
        </div>
        <TabMenuDeviceDetail
          name={name}
          deviceHolder={deviceHolder}
          needRefreshDevice={this.state.needRefreshDevice}
          setNeedRefreshDevice={this.setNeedRefreshDevice}
        />
      </div>
    );
  }
}

export default DeviceDetailPage;
