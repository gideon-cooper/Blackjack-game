import React, { Component } from "react"
import { Link, Redirect } from "react-router-dom"
import { getDeck, beginningDraw } from "../Cards"
import SecondPhase from "./SecondPhase"

export default class GameOver extends Component {
  render() {
    return (
      <div style={{ display: this.props.show ? "block" : "none" }}>
        <h1>Game Over</h1>
      </div>
    )
  }
}
