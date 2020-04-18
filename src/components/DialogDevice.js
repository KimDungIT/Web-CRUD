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
      deviceHolderList: [],
    };
  }

  componentDidMount() {
    callApi("device-holder", "GET", null)
      .then((res) => {
        if (res.status === 200) {
          this.setState({
            deviceHolderList: res.data,
          });
        }
      })
      .catch((error) => {
        notification.error({
          message: "Error ",
          description: error.message,
        });
      });
  }

  


  handleSubmit = (e) => {
    e.preventDefault();
    const {
      name,
      hardwareType,
      interfaceVersion,
      deviceState,
      deviceHolderName,
    } = this.state.deviceInfo;
    const deviceInfo = {
      name,
      hardwareType,
      interfaceVersion,
      deviceState,
      deviceHolderName,
    };
    const checkInsert =
      name &&
      hardwareType &&
      interfaceVersion &&
      deviceState &&
      deviceHolderName;
    if (!checkInsert) {
      notification.error({
        message: "Error ",
        description: "Can not insert device",
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
          this.setState({
            name: "",
            hardwareType: "",
            interfaceVersion: "",
            deviceState: "",
            deviceHolderName: "",
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

  onChangeDiviceInfo = event => {
    const {name, value} = event.target;
    this.setState( prevState => ({
      deviceInfo: {
        ...prevState.deviceInfo,
        [name]: value,
      }
    }));
  };

  render() {
    let { deviceHolderList } = this.state;
    const hasDeviceHolderList = deviceHolderList && deviceHolderList.length > 0;
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
                margin="dense"
                id="deviceState"
                name="deviceState"
                label="Device state"
                fullWidth
                required
                onChange={this.onChangeDiviceInfo}
              />
              {hasDeviceHolderList && (
                <TextField
                  id="deviceHolder"
                  name="deviceHolderName"
                  margin="dense"
                  select
                  label="Device holder"
                  onChange={this.onChangeDiviceInfo}
                  required
                  fullWidth
                >
                  {deviceHolderList.map((option) => (
                    <MenuItem key={option.deviceHolderName} value={option.deviceHolderName}>
                      {option.deviceHolderName}
                    </MenuItem>
                  ))}
                </TextField>
              )}

              <DialogActions>
                <Button onClick={this.props.onCloseDialog} color="primary">
                  Cancel
                </Button>
                <Button
                  onClick={this.props.onCloseDialog}
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
