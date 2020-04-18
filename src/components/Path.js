import React, { Component } from "react";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Typography from "@material-ui/core/Typography";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import DeleteIcon from "@material-ui/icons/Delete";
import ReplayIcon from "@material-ui/icons/Replay";
import IconButtonCommon from "./common/button/IconButton";
import "../common.css";
import DialogDevice from "./DialogDevice.js";
import callApi from "../util/ApiCaller.js";
import { notification } from "antd";
import "antd/dist/antd.css";
import Tooltip from "@material-ui/core/Tooltip";

class Path extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Path: [],
      open: false,
    };
  }

  onClickDeleteButton = () => {
    callApi("device", "DELETE", null)
      .then((res) => {
        if (res.status === 200) {
          notification.success({
            message: "Success",
            description: "Delete all devices successfully!",
          });
          this.props.setNeedRefreshTabMenuState(true);
        }
      })
      .catch((error) => {
        notification.error({
          message: "Error ",
          description: error.message,
        });
      });
  };

  onClickReloadButton = () => {
    console.log("perform click reload buton");
    this.props.setNeedRefreshTabMenuState(true);
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  pathIconButton = [
    {
      pathName: "Breadcrumb",
      iconButtons: [
        {
          id: 1,
          icon: <AddCircleOutlineIcon />,
          disable: false,
          onClick: this.handleClickOpen,
          title: "Create device",
        },
        {
          id: 2,
          icon: <DeleteIcon />,
          disable: false,
          onClick: this.onClickDeleteButton,
          title: "Delete device",
        },
        {
          id: 3,
          icon: <ReplayIcon />,
          disable: false,
          onClick: this.onClickReloadButton,
          title: "Refresh",
        },
      ],
    },
  ];

  handleClick = (event) => {
    event.preventDefault();
    console.info("You clicked a breadcrumb.");
  };

  render() {
    return (
      <div className="col-lg-12 col-md-12 col-sm-12">
        <div className="row">
          <div className="col-lg-8 col-md-8 col-sm-8 path">
            <Breadcrumbs
              separator={<NavigateNextIcon fontSize="small" />}
              aria-label="breadcrumb"
            >
              <Tooltip title="Devices">
                <Typography color="textPrimary" className="link">
                  Devices
                </Typography>
              </Tooltip>
            </Breadcrumbs>
            <h3 id="currentName">Devices</h3>
          </div>
          <div className="col-lg-4 col-md-4 col-sm-4 content-flex-end">
            {this.pathIconButton[0].iconButtons.map((iconButton, index) => (
              <IconButtonCommon
                key={index}
                icon={iconButton.icon}
                disable={iconButton.disable}
                onClick={iconButton.onClick}
                title={iconButton.title}
              />
            ))}
            <DialogDevice
              openDialog={this.state.open}
              onCloseDialog={this.handleClose}
              setNeedRefreshTabMenuState={this.props.setNeedRefreshTabMenuState}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Path;
