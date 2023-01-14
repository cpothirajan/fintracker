import React, { Component, Fragment } from "react";
import { getMutualFundSchemes } from "../services/fakeMFService";
import { getNAV } from "../services/mutualFundService";
import Utils from "../utils/common";
import _ from "lodash";
import { Link } from "react-router-dom";

class MutualFunds extends Component {
  state = {
    mutualFunds: [],
    navLoaded: false,
  };
  getMutualFundData() {
    const mfNAVs = [];
    const mutualFunds = getMutualFundSchemes();
    const promises = Promise.all(
      mutualFunds.map((mf) => getNAV(mf.schemeCode))
    );
    promises.then((data) => {
      data.forEach((d) => {
        mfNAVs.push({
          schemeCode: d.data.meta.scheme_code,
          nav: d.data.data[0].nav,
        });
      });
      this.setNAV(mfNAVs, mutualFunds);
      mutualFunds.map(
        (m) =>
          (m.incomeFromFD =
            this.calculateIncomeForBankFDYearlyCompoundedTenPercent(m))
      );
      const groupedFunds = _.groupBy(mutualFunds, "schemeCode");
      const schemeCodes = Object.keys(groupedFunds);
      let transformedMutualFunds = [];
      for (let i = 0; i < schemeCodes.length; i++) {
        transformedMutualFunds.push(
          this.transformArrayIntoSingle(groupedFunds[schemeCodes[i]])
        );
      }
      this.setState({
        mutualFunds: _.sortBy(transformedMutualFunds, "schemeName"),
        navLoaded: true,
      });
    });
  }
  transformArrayIntoSingle(mutualFunds) {
    const sumOfAmount = _.sumBy(mutualFunds, "amount");
    const sumOfUnits = _.sumBy(mutualFunds, "units");
    const sumOfFDIncome = _.sumBy(mutualFunds, "incomeFromFD");
    let singleFund = mutualFunds[0];
    singleFund.amount = sumOfAmount;
    singleFund.units = sumOfUnits;
    singleFund.incomeFromFD = sumOfFDIncome;
    //console.log(singleFund);
    return singleFund;
  }
  calculateIncomeForBankFDYearlyCompoundedTenPercent(mutualFund) {
    const { amount: principal, startDate } = mutualFund;
    const days = Utils.differenceInDays(new Date(startDate), new Date());
    const time = Math.floor(days / 365);
    const remainingDays = days % 365;

    let currentAmount =
      principal + Utils.compoundInterest(principal, time, 0.1, 1);

    if (remainingDays > 0) {
      const perdayInt = (currentAmount * 0.1) / 365;
      currentAmount = currentAmount + perdayInt * remainingDays;
    }
    return currentAmount;
  }
  async componentDidMount() {
    this.getMutualFundData();
  }
  setNAV(mfNAVs, mutualFunds) {
    for (let i = 0; i < mutualFunds.length; i++) {
      for (let j = 0; i < mfNAVs.length; j++) {
        if (mutualFunds[i].schemeCode === mfNAVs[j].schemeCode) {
          mutualFunds[i].nav = parseFloat(mfNAVs[j].nav).toFixed(2);
          break;
        }
      }
    }
  }
  getTotal() {
    const { mutualFunds } = this.state;

    let total = 0.0;
    for (let i = 0; i < mutualFunds.length; i++) {
      let currentValue = (
        mutualFunds[i].units * parseFloat(mutualFunds[i].nav)
      ).toFixed(2);
      total = total + parseFloat(currentValue);
    }
    return total.toFixed(2);
  }

  getTotalInvestment() {
    const { mutualFunds } = this.state;

    let total = 0.0;
    for (let i = 0; i < mutualFunds.length; i++) {
      let currentValue = parseFloat(mutualFunds[i].amount).toFixed(2);
      total = total + parseFloat(currentValue);
    }
    return total.toFixed(2);
  }
  getTotalFD() {
    const { mutualFunds } = this.state;

    let total = 0.0;
    for (let i = 0; i < mutualFunds.length; i++) {
      total = total + parseFloat(mutualFunds[i].incomeFromFD);
    }
    return total.toFixed(2);
  }
  getDifferenceFromFD(mutualFund) {
    let currentMarketValue = (mutualFund.units * mutualFund.nav).toFixed(2);
    let FD = mutualFund.incomeFromFD ? mutualFund.incomeFromFD.toFixed(2) : 10;
    return (currentMarketValue - FD).toFixed(2);
  }
  render() {
    const { mutualFunds, navLoaded } = this.state;
    let totalInvestedAmount = this.getTotalInvestment();
    return (
      <Fragment>
        <h1>MutualFund Schemes</h1>

        <Link to="/investments/new" className="btn btn-primary mt-2 mb-2">
          Add New Mutual Fund
        </Link>
        {!navLoaded && (
          <div className="d-flex justify-content-center">
            <div className="spinner-border text-success" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        )}
        <table className="table">
          <thead>
            <tr>
              <th>Scheme Name</th>
              <th>Inv. Amount</th>
              <th>Units</th>
              <th>NAV</th>
              <th>Current Value</th>
              <th>FD</th>
              <th>Diff from FD</th>
            </tr>
          </thead>
          <tbody>
            {mutualFunds.map((mf) => (
              <tr
                key={
                  mf.startDate ? mf.schemeCode + mf.startDate : mf.schemeCode
                }
              >
                <td>{mf.schemeName}</td>
                <td>{mf.amount}</td>
                <td>{mf.units.toFixed(3)}</td>
                <td>{mf.nav}</td>
                <td>{(mf.units * mf.nav).toFixed(2)}</td>
                <td>{mf.incomeFromFD ? mf.incomeFromFD.toFixed(2) : 10}</td>
                <td>{this.getDifferenceFromFD(mf)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p>The total investment value is {this.getTotalInvestment()}</p>
        <p>The total current value is {this.getTotal()}</p>
        <p>The total FD value is {this.getTotalFD()}</p>
        <p>
          The total gold bond value is {23750 + 23598} against the buying price{" "}
          {5 * 5104 + 5 * 4662}
        </p>
      </Fragment>
    );
  }
}

export default MutualFunds;
