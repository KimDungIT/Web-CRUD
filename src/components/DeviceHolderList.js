import React, { Component } from "react";
import MaterialTable from "material-table";
import DeviceHolderItem from "./DeviceHolderItem.js";
import TablePagination from "@material-ui/core/TablePagination";

class DeviceHolderList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deviceHolderList: [],
      numberRowPerPage: 8,
      totalRow: 0,
      page: 0,
    };
  }

  componentDidMount() {
    this.setState({
      deviceHolderList: this.props.deviceHolderList,
      totalRow: this.props.total,
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      JSON.stringify(this.props.deviceHolderList) !==
      JSON.stringify(prevProps.deviceHolderList)
    ) {
      this.setState({
        deviceHolderList: this.props.deviceHolderList,
        totalRow: this.props.total,
      });
    }
  }

  handleChangePage = (page) => {
    this.setState({ page: page });
    let limit = this.state.numberRowPerPage;
    this.props.changePage(page + 1, limit);
  };

  handleChangeRowPerPage = (value) => {
    this.setState({ numberRowPerPage: value });
    this.setState({ page: 0});
    this.props.changePage(1, value);
  };

  render() {
    let { deviceHolderList, totalRow } = this.state;
    console.log("tttt: ", this.props.total);
    const hasDeviceHolderList = deviceHolderList && deviceHolderList.length > 0;
    return (
      <div className="col-lg-12 col-md-12 col-sm-12">
        {hasDeviceHolderList && (
          <MaterialTable
            columns={[
              {
                field: "deviceItem",
                render: (rowData) => {
                  let result = <> </>;
                  if (
                    rowData.deviceHolderItem &&
                    rowData.deviceHolderItem.length > 0
                  ) {
                    result = rowData.deviceHolderItem.map(
                      (deviceHolder, index) => (
                        <div
                          key={index}
                          className="col-lg-3 col-md-3 col-sm-3 pr-1 pl-1 pb-3"
                        >
                          <DeviceHolderItem deviceHolderItem={deviceHolder} />
                        </div>
                      )
                    );
                  }
                  return <div className="dislay-flexbox"> {result} </div>;
                },
              },
            ]}
            data={[{ deviceHolderItem: deviceHolderList }]}
            options={{
              toolbar: false,
            }}
            components={{
              Pagination: (props) => (
                <TablePagination
                  // {...props}
                  component="div"
                  labelRowsPerPage="Items per page:"
                  rowsPerPageOptions={[8, 16, 24]}
                  rowsPerPage={this.state.numberRowPerPage}
                  count={totalRow}
                  page={this.state.page}
                  onChangePage={(e, page) => this.handleChangePage(page)}
                  onChangeRowsPerPage={(event) => {
                    this.handleChangeRowPerPage(event.target.value);
                  }}
                />
              ),
            }}
          />
        )}
      </div>
    );
  }
}

export default DeviceHolderList;
