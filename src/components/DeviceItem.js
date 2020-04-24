import React, { Component } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import CardMedia from "@material-ui/core/CardMedia";
import cloud from "./../images/clound_icon.png";
import Tooltip from "@material-ui/core/Tooltip";

class DeviceItem extends Component {
  render() {
    const { deviceItem } = this.props;
    const result = deviceItem.hardwareType + " " + deviceItem.interfaceVersion;
    return (
      <div>
        {deviceItem && (
          <Link to={`/${deviceItem.deviceHolderName}/devices/${deviceItem.name}`}>
            <Card variant="outlined" className="cardRoot">
              <CardMedia className="cardCover" image={cloud} title="device" />
              <div className="cardDetail">
                <CardContent className="cardText">
                  <Tooltip title={deviceItem.name}>
                    <Typography variant="h6" gutterBottom>
                      {deviceItem.name}
                    </Typography>
                  </Tooltip>
                  <Tooltip title={result}>
                    <Typography variant="body2" gutterBottom>
                      {deviceItem.hardwareType} {deviceItem.interfaceVersion}
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

export default DeviceItem;
