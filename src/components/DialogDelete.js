import React, { Component } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import callApi from "../util/ApiCaller";
import { notification } from "antd";
import "antd/dist/antd.css";
import { Typography } from "@material-ui/core";

class DialogDelete extends Component {

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.handleCloseDelete();
    const { history, param, title, name, deviceHolder} = this.props;
    if(title === "device holder") {
      this.deleteDeviceHolder(param, history);
    }
    if(title === "device") {
      this.deleteDeviceItem(name, history, deviceHolder)
    }
    if(title === "device holders") {
      this.deleteAllDeviceHolders();
    }
    
  };

  deleteDeviceHolder = (param, history) => {
    callApi(`device-holder/${param}`, "DELETE", null)
      .then((res) => {
        if (res.status === 200) {
          notification.success({
            message: "Success",
            description: "Delete device holder successfully!",
          });
          history.push("/");
        }
      })
      .catch((error) => {
        notification.error({
          message: "Error ",
          description: error.message,
        });
      });
  }

  deleteDeviceItem = (name, history, deviceHolder) => {
    callApi(`device/${name}`, "DELETE", null)
      .then((res) => {
        if (res.status === 200) {
          notification.success({
            message: "Success",
            description: "Delete device successfully!",
          });
          // this.props.setNeedRefreshDevice(true);
          history.push(`/${deviceHolder}/devices`);
        }
      })
      .catch((error) => {
        notification.error({
          message: "Error ",
          description: error.message,
        });
      });
  }

  deleteAllDeviceHolders = () => {
    callApi("device-holder", "DELETE", null)
      .then((res) => {
        if (res.status === 200) {
          notification.success({
            message: "Success",
            description: "Delete all device holder successfully!",
          });
          this.props.setNeedRefreshDeviceHolderState(true);
        }
      })
      .catch((error) => {
        notification.error({
          message: "Error ",
          description: error.message,
        });
      });
  }

  render() {
    const {openDialog} = this.props;
    return (
      <div>
          {openDialog && (
            <Dialog
            open={this.props.openDialog}
            onClose={this.props.handleCloseDelete}
            aria-labelledby="form-dialog-title"
          >
            <DialogTitle id="form-dialog-title">Delete {this.props.title}</DialogTitle>
            <DialogContent>
              <form onSubmit={this.handleSubmit} noValidate autoComplete="off">
          <Typography variant="body2" gutterBottom>Are you sure you want to delete this {this.props.title}?</Typography>
                <DialogActions>
                  <Button onClick={this.props.handleCloseDelete} color="primary">
                    No
                  </Button>
                  <Button
                    variant="contained"
                    type="submit"
                    color="primary"
                  >
                    Yes
                  </Button>
                </DialogActions>
              </form>
            </DialogContent>
          </Dialog>
          )}
      </div>
    );
  }
}

export default DialogDelete;
