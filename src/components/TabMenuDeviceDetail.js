import React, { Component } from "react";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import DeviceDetail from "./DeviceDetail.js";
import callApi from "../util/ApiCaller.js";
import { notification } from "antd";
import "antd/dist/antd.css";

const a11yProps = (index, disable) => {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
    disabled: disable,
  };
};

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;
  return (
    <div hidden={value !== index} {...other} className="tabContent">
      {value === index && <div>{children}</div>}
    </div>
  );
};

class TabMenuDeviceDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      deviceInfo: "",
    };
  }

  getDevice = () => {
    let param = this.props.param;
    callApi(`device?name=${param}`, "GET", null)
      .then((res) => {
        if (res.status === 200) {
          this.setState({
            deviceInfo: res.data,
          })
        }
      })
      .catch((error) => {
        notification.error({
          message: "Error ",
          description: error.message,
        });
      });
  }
  componentDidMount() {
    this.getDevice();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.needRefreshDevice) {
      this.getDevice();
      this.props.setNeedRefreshDevice(false);
    }
  }

  handleChange = (event, newValue) => {
    this.setState({ value: newValue });
  };

  render() {
    let { deviceInfo } = this.state;
    return (
      <div className="row">
        <AppBar position="static" elevation={0}>
          <Tabs
            value={this.state.value}
            onChange={this.handleChange}
            // TabIndicatorProps={{ style: { background: "#28b8ed" } }}
            className="tabHeader"
            indicatorColor="primary"
            textColor="primary"
          >
            <Tab  className="tabTitle" label="DEVICE" {...a11yProps(0, false)} />
            <Tab  className="tabTitle" label="EXTENSIONS" {...a11yProps(1, false)} />
            <Tab  className="tabTitle" label="LOGGING" {...a11yProps(2, false)} />
          </Tabs>
        </AppBar>
        <TabPanel value={this.state.value} index={0}>
          <DeviceDetail
            deviceInfo={deviceInfo}
            setNeedRefreshDevice={this.props.setNeedRefreshDevice}
          />
        </TabPanel>
        <TabPanel value={this.state.value} index={1}></TabPanel>
        <TabPanel value={this.state.value} index={2}>
        </TabPanel>
      </div>
    );
  }
}

export default TabMenuDeviceDetail;
