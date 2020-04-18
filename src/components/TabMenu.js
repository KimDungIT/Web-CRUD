import React, { Component } from "react";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import DeviceList from "./DeviceList.js";
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

class TabMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      deviceList: [],
    };
  }

  getDiviceList = () => {
    callApi("device", "GET", null)
      .then((res) => {
        if (res.status === 200) {
          this.setState({
            deviceList: res.data,
          });
        }
      })
      .catch((error) => {
        notification.error({
          message: "Error ",
          description: error.message,
        });
      });
  };

  componentDidMount() {
    //send request get all devices
    this.getDiviceList();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.needRefreshTabMenu) {
      this.getDiviceList();
      this.props.setNeedRefreshTabMenuState(false);
    }
  }

  handleChange = (event, newValue) => {
    this.setState({ value: newValue });
  };

  render() {
    let { deviceList } = this.state;
    return (
      <div className="row">
        <AppBar position="static" elevation={0}>
          <Tabs
            value={this.state.value}
            onChange={this.handleChange}
            aria-label="tabs menu"
            // TabIndicatorProps={{ style: { background: "#00C9FF"}}}
            indicatorColor="primary"
            textColor="primary"
            className="tabHeader"
          >
            <Tab
              className="tabTitle"
              label="DEVICES"
              {...a11yProps(0, false)}
            />
            <Tab
              className="tabTitle"
              label="EXTENSIONS"
              {...a11yProps(1, false)}
            />
            <Tab
              className="tabTitle"
              label="LOGGING"
              {...a11yProps(2, false)}
            />
          </Tabs>
        </AppBar>
        <TabPanel value={this.state.value} index={0}>
          <DeviceList deviceList={deviceList} />
        </TabPanel>
        <TabPanel value={this.state.value} index={1}></TabPanel>
        <TabPanel value={this.state.value} index={2}></TabPanel>
      </div>
    );
  }
}

export default TabMenu;
