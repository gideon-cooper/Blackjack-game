import React, { Component } from "react"
import { Link, Redirect } from "react-router-dom"
import { getDeck, beginningDraw } from "../Cards"
import SecondPhase from "./SecondPhase"

export default class GameOver extends Component {
  render() {
    return (
      <div
        className="gameOverContainer"
        style={{ display: this.props.show ? "block" : "none" }}
      >
        <h1>
          {this.props.money - this.props.original > 0
            ? `You won $${
                this.props.blackJack ? this.props.bet * 2.5 : this.props.bet * 2
              }`
            : this.props.sameCard
            ? "Push to next round"
            : "You lost"}
        </h1>
        <Link
          to={{
            pathname: "/Title",
            money: this.props.money,
            bet: this.props.bet,
          }}
        >
          <button className="playAgain">Play Again</button>
        </Link>
      </div>
    )
  }
}
