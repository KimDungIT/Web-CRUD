import React, { Component } from "react";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Typography from "@material-ui/core/Typography";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import DeleteIcon from "@material-ui/icons/Delete";
import ReplayIcon from "@material-ui/icons/Replay";
import IconButtonCommon from "./common/button/IconButton";
import "../common.css";
import DialogDeviceHolder from "./DialogDeviceHolder.js";
import Tooltip from "@material-ui/core/Tooltip";
import DialogDelete from "./DialogDelete.js";

class PathDeviceHolder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openAdd: false,
      openDelete: false,
    };
  }

  onClickDeleteButton = () => {
    this.setState({ openDelete: true });
  };

  onClickReloadButton = () => {
    console.log("perform click reload buton");
    this.props.setNeedRefreshDeviceHolderState(true);
  };

  handleClickOpen = () => {
    this.setState({ openAdd: true });
  };

  handleClose = () => {
    this.setState({ openAdd: false });
  };

  handleCloseDelete = () => {
    this.setState({ openDelete: false });
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
          title: "Create device holder",
        },
        {
          id: 2,
          icon: <DeleteIcon />,
          disable: false,
          onClick: this.onClickDeleteButton,
          title: "Delete device holder",
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
                  Device holders
                </Typography>
              </Tooltip>
            </Breadcrumbs>
            <h3 id="currentName">Device holders</h3>
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
            <DialogDeviceHolder
              openDialog={this.state.openAdd}
              onCloseDialog={this.handleClose}
              setNeedRefreshDeviceHolderState={this.props.setNeedRefreshDeviceHolderState}
            />
            <DialogDelete
          title="device holders list"
          openDialog={this.state.openDelete}
          handleCloseDelete={this.handleCloseDelete}
          setNeedRefreshDeviceHolderState={this.props.setNeedRefreshDeviceHolderState}
        />
          </div>
        </div>
      </div>
    );
  }
}

export default PathDeviceHolder;
