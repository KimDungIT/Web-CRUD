import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";

import MenuItem from "@material-ui/core/MenuItem";
import callApi from "../util/ApiCaller";
import { notification } from "antd";
import "antd/dist/antd.css";

class DialogEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deviceInfo: {},
    };
  }

  componentDidMount() {
    this.setState({ deviceInfo: this.props.deviceInfo });
  }

  changeName = () => {
    let result = "";
    const { columnName } = this.props;
    switch (columnName) {
      case "hardwareType":
        result = "hardware type";
        break;
      case "interfaceVersion":
        result = "interface version";
        break;
      case "connectionMechanism":
        result = "connection mechanism";
        break;
      default:
        break;
    }
    return result;
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      JSON.stringify(this.props.deviceInfo) !==
      JSON.stringify(prevProps.deviceInfo)
    ) {
      this.setState({ deviceInfo: this.props.deviceInfo });
    }
  }

  label = {
    hardwareType: "Hardware type",
    interfaceVersion: "Interface version",
    connectionMechanism: "Connection mechanism",
  };

  renderField = () => {
    const { columnName } = this.props;
    const connectionMechanismList = [
      { value: "Call home" },
      { value: "Non Callhome" },
    ];
    let result = <> </>;
    if (!columnName) {
      return result;
    }
    switch (columnName) {
      case "connectionMechanism":
        result = (
          <>
            <TextField
              id="connectionMechanism"
              select
              label="Connection mechanism"
              name="connectionMechanism"
              value={this.state.deviceInfo[columnName]}
              onChange={this.onChangeDiviceInfo}
              required
              fullWidth
            >
              {connectionMechanismList.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.value}
                </MenuItem>
              ))}
            </TextField>
          </>
        );
        break;
      default:
        result = (
          <>
            <TextField
              margin="dense"
              name={columnName}
              label={this.label[columnName]}
              fullWidth
              required
              onChange={this.onChangeDiviceInfo}
              value={this.state.deviceInfo[columnName]}
            />
          </>
        );
        break;
    }
    return result;
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.onCloseDialog();
    const {
      name,
      hardwareType,
      interfaceVersion,
      connectionMechanism,
      deviceHolderName,
    } = this.state.deviceInfo;
    const deviceInfo = {
      name,
      hardwareType,
      interfaceVersion,
      connectionMechanism,
      deviceHolderName,
    };
    console.log("connectionMechanism: ", deviceInfo);
    if (this.validateInput(deviceInfo)) {
      notification.error({
        message: "Error ",
        description: "Can not edit device",
      });
      return;
    }
    callApi(`device/${this.props.deviceInfo.name}`, "PUT", deviceInfo)
      .then((res) => {
        if (res.status === 200) {
          notification.success({
            message: "Success",
            description: "Edit device successfully!",
          });

          this.props.setNeedRefreshDevice(true);
        }
      })
      .catch((error) => {
        notification.error({
          message: "Error ",
          description: error.message,
        });
      });
  };

  validateInput = (device) => {
    let valid = false;
    //check empty string
    if (device.hardwareType === "") {
      valid = true;
    }
    if (device.interfaceVersion === "") {
      valid = true;
    }
    if (device.connectionMechanism === "") {
      valid = true;
    }
    return valid;
  };

  onChangeDiviceInfo = (event) => {
    const { name, value } = event.target;
    console.log("name: ", name);
    this.setState((prevState) => ({
      deviceInfo: {
        ...prevState.deviceInfo,
        [name]: value,
      },
    }));
  };

  render() {
    const renderField = this.renderField();
    const name = this.changeName();
    return (
      <div>
        <Dialog
          open={this.props.openDialog}
          onClose={this.props.onCloseDialog}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Edit {name}</DialogTitle>
          <DialogContent>
            <form onSubmit={this.handleSubmit} noValidate autoComplete="off">
              {renderField}
              <DialogActions>
                <Button onClick={this.props.onCloseDialog} color="primary">
                  Cancel
                </Button>
                <Button variant="contained" type="submit" color="primary">
                  Save
                </Button>
              </DialogActions>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}

export default DialogEdit;
