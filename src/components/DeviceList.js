import React, { Component } from "react";
import MaterialTable from "material-table";
import DeviceItem from "./DeviceItem.js";

class DeviceList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deviceList: [],
      numberCard: 4,
    };
  }

  componentDidMount() {
    this.setState({
      deviceList: this.props.deviceList,
    });
  }

  render() {
    let { deviceList } = this.props;
    const hasDeviceList = deviceList && deviceList.length > 0;
    return (
      <div className="col-lg-12 col-md-12 col-sm-12">
        {hasDeviceList && (
           <MaterialTable
           columns={[
            {
              field: "deviceItem",
              render: rowData => {
                let result = <> </>;
                if (rowData.deviceItem && rowData.deviceItem.length >0) {
                  result = rowData.deviceItem.map((device,index) => (
                    <div key={index} className="col-lg-3 col-md-3 col-sm-3 pr-1 pl-1 pb-3">
                     <DeviceItem deviceItem={device} />
                    </div>
                  ))
                }
                return <div className='dislay-flexbox'> {result} </div>;
              }
            },
           ]}
           data={[{ deviceItem: deviceList } ]}
           options={{
            toolbar: false,
            
          }}
         />
        )}
      </div>
    );
  }
}

export default DeviceList;
