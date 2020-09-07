import React, { Component } from "react"
import { Link, Redirect } from "react-router-dom"
import { getDeck, beginningDraw } from "../Cards"

export default class Game extends Component {
  state = {
    total: 0,
  }
  calculateScore = () => {
    console.log(this.props.firstValue)
    if (
      (this.props.firstValue === "KING" ||
        this.props.firstValue === "QUEEN" ||
        this.props.firstValue === "JACK") &&
      (this.props.secondValue === "KING" ||
        this.props.secondValue === "QUEEN" ||
        this.props.secondValue === "JACK")
    ) {
      return (this.state.total += 20)
    } else if (
      this.props.firstValue === "KING" ||
      this.props.firstValue === "QUEEN" ||
      this.props.firstValue === "JACK"
    ) {
      return (this.state.total += 10 + Number(this.props.secondValue))
    } else if (
      this.props.secondValue === "KING" ||
      this.props.secondValue === "QUEEN" ||
      this.props.secondValue === "JACK"
    ) {
      return (this.state.total += 10 + Number(this.props.firstValue))
    } else {
      return (this.state.total +=
        Number(this.props.firstValue) + Number(this.props.secondValue))
    }
  }
  render() {
    this.calculateScore()
    return (
      <>
        <div style={{ display: this.props.showSecondPhase ? "block" : "none" }}>
          <button>Hit</button>
          <button>Stand</button>
          <h2>{this.state.total}</h2>
          <h2>Bet: {this.props.bet}</h2>
          <h2>Money: {this.props.money}</h2>
        </div>
      </>
    )
  }
}
