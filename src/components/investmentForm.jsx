import React, { Component, Fragment } from "react";
import { getAllMutualFunds } from "../services/mutualFundService";
import Form from "./common/form";
class InvestmentForm extends Form {
  state = {
    data: {
      schemeCode: "",
      //   title: "",
      //   numberInStock: "",
      //   dailyRentalRate: "",
    },
    mutualFunds: [],
    dataLoaded: false,
    errors: {},
  };
  async componentDidMount() {
    await this.populatemutualFunds();
    //await this.populateMovie();
  }
  async populatemutualFunds() {
    let { data } = await getAllMutualFunds();
    data = data;
    console.log(data.length);
    this.setState({
      mutualFunds: data,
      dataLoaded: true,
    });
  }
  render() {
    const { mutualFunds, dataLoaded } = this.state;
    return (
      <Fragment>
        <h1>Investment Form</h1>
        {!dataLoaded && (
          <div className="d-flex justify-content-center">
            <div className="spinner-border text-success" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        )}
        <form onSubmit={this.handleSubmit}>
          {this.renderInputField("title", "Title")}
          {this.renderSelectField(
            "schemeCode",
            "MutualFunds",
            "schemeName",
            mutualFunds
          )}
          {this.renderInputField("numberInStock", "Number in Stock")}
          {this.renderInputField("dailyRentalRate", "Rate")}
          {this.renderButton("Save")}
        </form>
      </Fragment>
    );
  }
}

export default InvestmentForm;
