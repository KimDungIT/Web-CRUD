import React, { Component } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import "antd/dist/antd.css";
import cloud from "../images/clound_icon.png";
import CardMedia from "@material-ui/core/CardMedia";
import InputAdornment from "@material-ui/core/InputAdornment";
import HardwareTypeDialog from "./HardwareTypeDialog"
import EditIcon from "@material-ui/icons/Edit";
import IconButton from "@material-ui/core/IconButton";

class DeviceDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      columnName: '',
    };
  }
  handleClickOpen = columnName => {
   
    this.setState({ 
      open: true,
      columnName,
    });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    let { deviceInfo } = this.props;
    return (
      <div className="col-lg-12 col-md-12 col-sm-12">
        <div className="row">
          <div className="col-lg-3 col-md-3 col-sm-3"></div>
          <div className="col-lg-6 col-md-6 col-sm-6 deviceDetailCard">
            <Card>
              <div className="row">
                <div
                  className="col-lg-3 col-md-3 col-sm-3 mx-auto my-auto"
                  id="img"
                >
                  <CardMedia
                    className="mx-auto my-auto imageCloud"
                    image={cloud}
                    title="Live from space album cover"
                  />
                </div>

                <div className="col-lg-9 col-md-9 col-sm-9">
                  <CardContent>
                    <div className="row">
                      <div className="col-lg-6 col-md-6 col-sm-6">
                        <Typography variant="caption" gutterBottom>
                          Device name
                        </Typography>
                        <Typography style={{ paddingBottom: "15px" }}>
                          {deviceInfo.name}
                        </Typography>
                        <Typography variant="caption" gutterBottom>
                          Hardware type
                        </Typography>
                        <div className="row">
                          <div className="col-lg-6 col-md-6 col-sm-6">
                            <Typography style={{ paddingBottom: "15px" }}>
                              {deviceInfo.hardwareType}
                            </Typography>
                          </div>
                          <div className="col-lg-6 col-md-6 col-sm-6">
                            <IconButton onClick={() => this.handleClickOpen('hardwareType')}>
                              <InputAdornment position="start">
                                <EditIcon />
                              </InputAdornment>
                            </IconButton>
                          </div>
                        </div>

                        <Typography variant="caption" gutterBottom>
                          Interface version
                        </Typography>
                        <div className="row">
                          <div className="col-lg-6 col-md-6 col-sm-6">
                            <Typography style={{ paddingBottom: "15px" }}>
                              {deviceInfo.interfaceVersion}
                            </Typography>
                          </div>
                          <div className="col-lg-6 col-md-6 col-sm-6">
                            <IconButton onClick={() => this.handleClickOpen('interfaceVersion')}>
                              <InputAdornment position="start">
                                <EditIcon />
                              </InputAdornment>
                            </IconButton>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-6">
                        <Typography variant="caption" gutterBottom>
                          Device state
                        </Typography>
                        <div className="row">
                          <div className="col-lg-6 col-md-6 col-sm-6">
                            <Typography style={{ paddingBottom: "15px" }}>
                              {deviceInfo.deviceState}
                            </Typography>
                          </div>
                          <div className="col-lg-6 col-md-6 col-sm-6">
                            <IconButton onClick={() => this.handleClickOpen('deviceState')}>
                              <InputAdornment position="start">
                                <EditIcon />
                              </InputAdornment>
                            </IconButton>
                          </div>
                        </div>
                        <Typography variant="caption" gutterBottom>
                          Device holder
                        </Typography>
                        <div className="row">
                          <div className="col-lg-6 col-md-6 col-sm-6">
                            <Typography>
                              {deviceInfo.deviceHolderName}
                            </Typography>
                          </div>
                          <div className="col-lg-6 col-md-6 col-sm-6">
                            <IconButton onClick={() => this.handleClickOpen('deviceHolderName')}>
                              <InputAdornment position="start">
                                <EditIcon />
                              </InputAdornment>
                            </IconButton>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </div>
              </div>
            </Card>
          </div>
          <div className="col-lg-3 col-md-3 col-sm-3"></div>
        </div>
        <HardwareTypeDialog
          openDialog={this.state.open}
          onCloseDialog={this.handleClose}
          deviceInfo={deviceInfo}
          columnName={this.state.columnName}
          setNeedRefreshDevice={this.props.setNeedRefreshDevice}
        />
      </div>
    );
  }
}

export default DeviceDetail;
