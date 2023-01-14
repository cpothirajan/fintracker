import React, { Component } from "react";
import _ from "lodash";
import { Link } from "react-router-dom";

class TableBody extends Component {
  state = {};
  renderCell = (row, column) => {
    if (column.content) return column.content(row);
    if (column.linkTo) {
      const linkTo = column.linkTo + row._id;
      return <Link to={linkTo}>{_.get(row, column.path)}</Link>;
    }
    return _.get(row, column.path);
  };
  createKey = (row, column) => {
    return row._id + (column.path || column.key);
  };
  render() {
    const { dataTable, columns } = this.props;
    return (
      <tbody>
        {dataTable.map((row) => (
          <tr key={row._id}>
            {columns.map((c) => (
              <td key={this.createKey(row, c)}>{this.renderCell(row, c)}</td>
            ))}
          </tr>
        ))}
      </tbody>
    );
  }
}

export default TableBody;
