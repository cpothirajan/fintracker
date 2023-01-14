import React, { Component } from "react";
import PropTypes from "prop-types";

class Pagination extends Component {
  state = {};
  cursorHand = {
    cursor: "pointer",
  };
  render() {
    const {
      currentPage,
      onPreviousClick,
      onPageChange,
      onNextClick,
    } = this.props;

    const items = this.getItemsArray();
    if (items.length === 1) return null;
    return (
      <nav aria-label="Page navigation example">
        <ul className="pagination">
          <li className={currentPage > 1 ? "page-item " : "page-item disabled"}>
            <a
              className="page-link"
              aria-label="Previous"
              onClick={() => onPreviousClick()}
            >
              <span aria-hidden="true">&laquo;</span>
            </a>
          </li>
          {items.map((item) => (
            <li
              key={item}
              style={this.cursorHand}
              className={
                currentPage === item ? "page-item active" : "page-item"
              }
            >
              <a className="page-link" onClick={() => onPageChange(item)}>
                {item}
              </a>
            </li>
          ))}
          <li
            className={
              currentPage + 1 > this.getTotalPages()
                ? "page-item disabled"
                : "page-item"
            }
            style={this.cursorHand}
          >
            <a
              className="page-link"
              aria-label="Next"
              onClick={() => onNextClick()}
            >
              <span aria-hidden="true">&raquo;</span>
            </a>
          </li>
        </ul>
      </nav>
    );
  }

  getItemsArray() {
    let items = [];
    const totalPages = this.getTotalPages();
    for (let i = 0; i < totalPages; i++) items.push(i + 1);
    return items;
  }
  getTotalPages() {
    const { totalRecords, pageSize } = this.props;
    return Math.ceil(totalRecords / pageSize);
  }
}

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalRecords: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  onPreviousClick: PropTypes.func.isRequired,
  onPageChange: PropTypes.func.isRequired,
  onNextClick: PropTypes.func.isRequired,
};

export default Pagination;
