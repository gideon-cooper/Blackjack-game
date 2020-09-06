import React, { Component } from "react"
import { Link, Redirect } from "react-router-dom"
import { getDeck, beginningDraw } from "../Cards"

export default class Game extends Component {
  render() {
    return (
      <>
        <div style={{ display: this.props.showSecondPhase ? "block" : "none" }}>
          <button>Hit</button>
          <button>Stand</button>
          <h2>{this.props.total}</h2>
          <h2>Bet: {this.props.bet}</h2>
          <h2>Money: {this.props.money}</h2>
        </div>
      </>
    )
  }
}
