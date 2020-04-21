import React, { Component } from "react";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Typography from "@material-ui/core/Typography";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import DeleteIcon from "@material-ui/icons/Delete";
import ReplayIcon from "@material-ui/icons/Replay";
import IconButtonCommon from "./common/button/IconButton";
import "../common.css";
import "antd/dist/antd.css";
import { Link } from "react-router-dom";
import Tooltip from "@material-ui/core/Tooltip";
import DialogDelete from "./DialogDelete.js";

class PathDeviceDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      openDelete: false,
    };
  }

  onClickDeleteButton = () => {
    this.setState({ openDelete: true });
  };

  onClickReloadButton = () => {
    this.props.setNeedRefreshDevice(true);
  };

  handleCloseDelete = () => {
    this.setState({ openDelete: false });
  };

  pathIconButton = () => [
    {
      pathName: "Breadcrumb",
      iconButtons: [
        {
          id: 1,
          icon: <DeleteIcon />,
          disable: false,
          onClick: this.onClickDeleteButton,
          title: "Delete device",
        },
        {
          id: 2,
          icon: <ReplayIcon />,
          disable: false,
          onClick: this.onClickReloadButton,
          title: "Refresh",
        },
      ],
    },
  ];

  pathList = [
    {
      name: "Device holders",
      color: "inherit",
      to: "/",
      onClick: this.handleClick,
      className: "link",
    },
    {
      name: this.props.deviceHolder,
      color: "inherit",
      to: `/${this.props.deviceHolder}/devices`,
      onClick: this.handleClick,
      className: "link",
    },
    {
      name: this.props.name,
      color: "textPrimary",
      className: "link",
    },
  ];

  handleClick = (event) => {
    event.preventDefault();
    console.info("You clicked a breadcrumb.");
  };

  render() {
    const pathIconButton = this.pathIconButton();
    const iconButtonList = pathIconButton[0].iconButtons.map(
      (iconButton, index) => (
        <IconButtonCommon
          key={index}
          icon={iconButton.icon}
          disable={iconButton.disable}
          onClick={iconButton.onClick}
          title={iconButton.title}
        />
      )
    );
    const length = this.pathList.length;
    return (
      <div className="col-lg-12 col-md-12 col-sm-12">
        <div className="row">
          <div className="col-lg-8 col-md-8 col-sm-8 path">
            <Breadcrumbs
              separator={<NavigateNextIcon fontSize="small" />}
              aria-label="breadcrumb"
            >
              {this.pathList.map((element, index) =>
                length === index + 1 ? (
                  <Tooltip title={element.name}>
                    <Typography
                      key={index}
                      color={element.color}
                      className={element.className}
                    >
                      {element.name}
                    </Typography>
                  </Tooltip>
                ) : (
                  <Tooltip title={element.name}>
                    <Link
                      key={index}
                      color={element.color}
                      to={element.to}
                      onClick={element.onClick}
                      className={element.className}
                    >
                      {element.name}
                    </Link>
                  </Tooltip>
                )
              )}
            </Breadcrumbs>
            <h3 id="currentName">{this.props.name}</h3>
          </div>
          <div className="col-lg-4 col-md-4 col-sm-4 content-flex-end">
            {iconButtonList}
          </div>
        </div>
        <DialogDelete
          title="device"
          history={this.props.history}
          name={this.props.name}
          deviceHolder={this.props.deviceHolder}
          openDialog={this.state.openDelete}
          handleCloseDelete={this.handleCloseDelete}
          setNeedRefreshDevice={this.props.setNeedRefreshDevice}
        />
      </div>
    );
  }
}

export default PathDeviceDetail;
