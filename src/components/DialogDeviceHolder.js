import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import callApi from "../util/ApiCaller";
import { notification } from "antd";
import "antd/dist/antd.css";

class DialogDeviceHolder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      deviceHolderName: "",
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();
    let { deviceHolderName } = this.state;
    if (deviceHolderName === "") {
      notification.error({
        message: "Error ",
        description: "Mandatory attribute (name) is missing",
      });
      return;
    }
    let deviceHolderObj = { deviceHolderName };
    callApi("device-holder", "POST", deviceHolderObj)
      .then((res) => {
        if (res.status === 200) {
          notification.success({
            message: "Success",
            description: "Add device holder successfully!",
          });
          this.props.setNeedRefreshDeviceHolderState(true);
          this.setState({ deviceHolderName: "" });
        }
      })
      .catch((error) => {
        if(error.response.data) {
          notification.error({
            message: error.response.data.status,
            description: error.response.data.message,
          })
        } else {
          notification.error({
            message: "Error",
            description: error.message,
          })
        }
      });
  };

  onChangeDiviceHolder = (event) => {
    this.setState({ deviceHolderName: event.target.value });
  };

  render() {
    return (
      <div>
        <Dialog
          open={this.props.openDialog}
          onClose={this.props.onCloseDialog}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Create device holder</DialogTitle>
          <DialogContent>
            <form onSubmit={this.handleSubmit} noValidate autoComplete="off">
              <TextField
                margin="dense"
                id="deviceHolderName"
                name="deviceHolderName"
                label="Device holder name"
                fullWidth
                autoFocus
                required
                onChange={this.onChangeDiviceHolder}
              />
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

export default DialogDeviceHolder;
