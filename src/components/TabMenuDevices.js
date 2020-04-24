import React, { Component } from "react";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import DeviceList from "./DeviceList.js";
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

class TabMenuDevices extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      deviceList: [],
      deviceHolder: "",
      total:0,
      page:1,
      limit: 8,
    };
  }

  getDiviceList = (deviceHolder, page, limit) => {
    callApi(`device/${deviceHolder}?page=${page}&limit=${limit}`, "GET", null)
      .then((res) => {
        if (res.status === 200) {
          this.setState({
            deviceList: res.data.deviceVOS,
            total: res.data.total,
          });
        }
      })
      .catch((error) => {
        notification.error({
          message: "Error ",
          description: "aaaa " + error.message,
        });
      });
  };

  componentDidMount() {
    //send request get all devices
    this.setState({ deviceHolder: this.props.param });
    let {page, limit} = this.state;
    this.getDiviceList(this.props.param, page, limit);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.needRefreshTabMenu) {
      let {page, limit} = this.state;
      this.getDiviceList(this.props.param, page, limit);
      this.props.setNeedRefreshTabMenuState(false);
    }
  }

  changePage = (page, limit) => {
    this.setState({
      page: page,
      limit: limit,
    });
    this.getDiviceList(this.props.param, page, limit);
  }

  handleChange = (event, newValue) => {
    this.setState({ value: newValue });
  };

  render() {
    let { deviceList, total } = this.state;
    const { param } = this.props;
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
        {param && (
          <TabPanel value={this.state.value} index={0}>
            <LoadingSpinerComponent />
            <DeviceList changePage={this.changePage} param={param} deviceList={deviceList} total={total} />
          </TabPanel>
        )}
        <TabPanel value={this.state.value} index={1}></TabPanel>
        <TabPanel value={this.state.value} index={2}></TabPanel>
      </div>
    );
  }
}

export default TabMenuDevices;
