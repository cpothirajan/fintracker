import React, { Component } from "react";
import TableBody from "./tableBody";
import TableHeader from "./tableHeader";

class Table extends Component {
  state = {};
  render() {
    const { columns, sortColumn, onSort, dataToBind } = this.props;
    return (
      <table className="table">
        <TableHeader
          columns={columns}
          sortColumn={sortColumn}
          onSort={onSort}
        />
        <TableBody dataTable={dataToBind} columns={columns} />
      </table>
    );
  }
}

export default Table;
