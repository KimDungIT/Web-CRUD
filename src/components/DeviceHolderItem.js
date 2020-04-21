import React, { Component } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import CardMedia from "@material-ui/core/CardMedia";
import connection from "./../images/connection.png";
import Tooltip from "@material-ui/core/Tooltip";

class DeviceHolderItem extends Component {
  render() {
    const { deviceHolderItem } = this.props;
    return (
      <div>
        {deviceHolderItem && (
          <Link to={`/${deviceHolderItem.deviceHolderName}/devices`}>
            <Card variant="outlined" className="cardRoot">
              <CardMedia
                className="cardCover"
                image={connection}
                title="device holders"
              />
              <div className="cardDetail">
                <CardContent className="cardText">
                  <Tooltip title={deviceHolderItem.deviceHolderName}>
                    <Typography variant="h6" gutterBottom>
                      {deviceHolderItem.deviceHolderName}
                    </Typography>
                  </Tooltip>
                  <Tooltip title= {`${deviceHolderItem.noOfDevices} devices`}>
                    <Typography variant="body2" gutterBottom>
                      {deviceHolderItem.noOfDevices} devices
                    </Typography>
                  </Tooltip>
                </CardContent>
              </div>
            </Card>
          </Link>
        )}
      </div>
    );
  }
}

export default DeviceHolderItem;
