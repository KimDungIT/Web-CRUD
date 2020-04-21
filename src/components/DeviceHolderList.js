import React, { Component } from "react";
import MaterialTable from "material-table";
import DeviceHolderItem from "./DeviceHolderItem.js";

class DeviceHolderList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deviceHolderList: [],
      numberCard: 4,
    };
  }

  componentDidMount() {
    this.setState({
        deviceHolderList: this.props.deviceHolderList,
    });
  }

  render() {
    let { deviceHolderList } = this.props;
    const hasDeviceHolderList = deviceHolderList && deviceHolderList.length > 0;
    return (
      <div className="col-lg-12 col-md-12 col-sm-12">
        {hasDeviceHolderList && (
           <MaterialTable
           columns={[
            {
              field: "deviceItem",
              render: rowData => {
                let result = <> </>;
                if (rowData.deviceHolderItem && rowData.deviceHolderItem.length >0) {
                  result = rowData.deviceHolderItem.map((deviceHolder,index) => (
                    <div key={index} className="col-lg-3 col-md-3 col-sm-3 pr-1 pl-1 pb-3">
                     <DeviceHolderItem deviceHolderItem={deviceHolder} />
                    </div>
                  ))
                }
                return <div className='dislay-flexbox'> {result} </div>;
              }
            },
           ]}
           data={[{ deviceHolderItem: deviceHolderList } ]}
           options={{
            toolbar: false,
            
          }}
         />
        )}
      </div>
    );
  }
}

export default DeviceHolderList;
