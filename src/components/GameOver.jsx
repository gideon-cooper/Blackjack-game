import React, { Component } from "react"
import { Link, Redirect } from "react-router-dom"
import { getDeck, beginningDraw } from "../Cards"
import SecondPhase from "./SecondPhase"

export default class GameOver extends Component {
  render() {
    return (
      <div style={{ display: this.props.show ? "block" : "none" }}>
        <h1>Game Over</h1>
        {this.props.bet}
        <Link
          to={{
            pathname: "/Title",
            money: this.props.money,
            bet: this.props.bet,
          }}
        >
          <button>Play Again?</button>
        </Link>
      </div>
    )
  }
}
