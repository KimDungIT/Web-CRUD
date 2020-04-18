import React from "react";
import MatIconButton from "@material-ui/core/IconButton";
import Tooltip from '@material-ui/core/Tooltip'

class IconButton extends React.Component {
  render() {
    const {
      onClick,
      disable = false, // set default value neu khong truyen props disabled
      icon,
      title,
    } = this.props;

    return (
      <>
        <Tooltip title={title}>
          <MatIconButton onClick={onClick} disabled={disable}>
            {icon}
          </MatIconButton>
        </Tooltip>
      </>
    );
  }
}

export default IconButton;
