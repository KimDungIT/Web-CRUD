import React, { Component } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import CardMedia from "@material-ui/core/CardMedia";
import cloud from "./../images/clound_icon.png";

class DeviceItem extends Component {
  render() {
    const { deviceItem } = this.props;
    return (
      <div>
        {deviceItem && (
          <Link to={`/${deviceItem.name}`}>
            <Card variant="outlined" className="cardRoot">
              <CardMedia
                className="cardCover"
                image={cloud}
                title="cloud"
              />
              <div className="cardDetail">
                <CardContent className="cardText">
                  <Typography variant="h6" gutterBottom>
                    {deviceItem.name}
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    {deviceItem.hardwareType} {deviceItem.interfaceVersion}
                  </Typography>
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
