import React, { Component } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";

class Like extends Component {
  render() {
    return this.props.liked ? (
      <FaHeart
        onClick={this.props.onClick}
        style={{ color: "red", cursor: "pointer" }}
      />
    ) : (
      <FaRegHeart onClick={this.props.onClick} style={{ cursor: "pointer" }} />
    );
  }
}

export default Like;
