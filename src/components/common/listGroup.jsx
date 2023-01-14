import React, { Component } from "react";

class ListGroup extends Component {
  state = {};
  cursorHand = {
    cursor: "pointer",
  };
  render() {
    const {
      items,
      textProperty,
      valueProperty,
      selectedGenre,
      onItemSelect,
    } = this.props;
    return (
      <ul className="list-group">
        {items.map((item) => (
          <li
            key={item[valueProperty]}
            style={this.cursorHand}
            className={
              selectedGenre === item
                ? "list-group-item active"
                : "list-group-item"
            }
            onClick={() => onItemSelect(item)}
          >
            {item[textProperty]}
          </li>
        ))}
      </ul>
    );
  }
}
ListGroup.defaultProps = {
  textProperty: "name",
  valueProperty: "_id",
};
export default ListGroup;
