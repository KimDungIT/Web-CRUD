import React, { Component } from "react";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import DeviceHolderList from "./DeviceHolderList.js";
import callApi from "../util/ApiCaller.js";
import { notification } from "antd";
import "antd/dist/antd.css";
import LoadingSpinerComponent from "./common/loading/loading.js";

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

class TabMenuDeviceHolder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      deviceHolderList: [],
      total:0,
      page:1,
      limit: 8,
    };
  }

  getDiviceHolderList = (page, limit) => {
    callApi(`device-holder?page=${page}&limit=${limit}`, "GET", null)
      .then((res) => {
        if (res.status === 200) {
          console.log("device holders: ", res.data);
          this.setState({
            deviceHolderList: res.data.deviceHolderVOS,
            total: res.data.total,
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
    //send request get all device holder
    let {page, limit} = this.state;
    this.getDiviceHolderList(page, limit);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.needRefreshDeviceHolder) {
      let {page, limit} = this.state;
      this.getDiviceHolderList(page, limit);
      this.props.setNeedRefreshDeviceHolderState(false);
    }
  }

  changePage = (page, limit) => {
    this.setState({
      page: page,
      limit: limit,
    });
    this.getDiviceHolderList(page, limit);
  }

  handleChange = (event, newValue) => {
    this.setState({ value: newValue });
  };

  render() {
    let { deviceHolderList } = this.state;
    let {total} = this.state;
    console.log("total: ", total);
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
              label="DEVICE HOLDERS"
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
          <LoadingSpinerComponent />
          <DeviceHolderList changePage={this.changePage} deviceHolderList={deviceHolderList} total = {total} />
        </TabPanel>
        <TabPanel value={this.state.value} index={1}></TabPanel>
        <TabPanel value={this.state.value} index={2}></TabPanel>
      </div>
    );
  }
}

export default TabMenuDeviceHolder;
