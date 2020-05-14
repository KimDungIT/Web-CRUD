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

class DialogDevice extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      deviceInfo: {},
      deviceHolderName: "",
    };
  }

  componentDidMount() {
    this.setState({deviceHolderName: this.props.deviceHolder});
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const {deviceHolderName} = this.state;
    this.props.onCloseDialog();
    const {
      name,
      hardwareType,
      interfaceVersion,
      connectionMechanism,
    } = this.state.deviceInfo;
    const deviceInfo = {
      name,
      hardwareType,
      interfaceVersion,
      connectionMechanism,
      deviceHolderName,
    };
    const checkInsert =
      name &&
      hardwareType &&
      interfaceVersion &&
      connectionMechanism &&
      deviceHolderName;
      if (!checkInsert) {
        notification.error({
          message: "Error",
          description: "Mandatory attributes (hwType, version or connectionMechanism) are missing",
        });
        return;
      }
    
    callApi("device", "POST", deviceInfo)
      .then((res) => {
        if (res.status === 200) {
          notification.success({
            message: "Success",
            description: "Add device successfully!",
          });
          this.props.setNeedRefreshTabMenuState(true);
          this.setState({ deviceInfo: {}});
        }
      })
      .catch((error) => {
        if(error.response.data) {
          notification.error({
            message: error.response.data.status,
            description: error.response.data.message,
          });
        } else {
          if(error.response.data) {
            notification.error({
              message: "Error",
              description: error.response.data.message,
            })
          } else {
            notification.error({
              message: "Error",
              description: error.message,
            })
          }
        }
      });
  };

  onChangeDiviceInfo = (event) => {
    const { name, value } = event.target;
    this.setState((prevState) => ({
      deviceInfo: {
        ...prevState.deviceInfo,
        [name]: value,
      },
    }));
  };

  render() {
    const connectionMechanismList = [
      { value: "Call home" },
      { value: "Non Callhome" },
    ];
    return (
      <div>
        <Dialog
          open={this.props.openDialog}
          onClose={this.props.onCloseDialog}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Create device</DialogTitle>
          <DialogContent>
            <form onSubmit={this.handleSubmit} noValidate autoComplete="off">
              <TextField
                margin="dense"
                id="name"
                name="name"
                label="Device name"
                fullWidth
                autoFocus
                required
                onChange={this.onChangeDiviceInfo}
              />
              <TextField
                margin="dense"
                id="hardwareType"
                name="hardwareType"
                label="Hardware type"
                fullWidth
                required
                onChange={this.onChangeDiviceInfo}
              />
              <TextField
                margin="dense"
                id="interfaceVersion"
                name="interfaceVersion"
                label="Interface version"
                fullWidth
                required
                onChange={this.onChangeDiviceInfo}
              />
              <TextField
                id="connectionMechanism"
                name="connectionMechanism"
                margin="dense"
                select
                label="Connection mechanism"
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
                <TextField
                  id="deviceHolder"
                  name="deviceHolderName"
                  margin="dense"
                  label="Device holder"
                  value={this.props.deviceHolder}
                  required
                  disabled
                  fullWidth
                >
                 
                </TextField>

              <DialogActions>
                <Button onClick={this.props.onCloseDialog} color="primary">
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  type="submit"
                  color="primary"
                >
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

export default DialogDevice;
