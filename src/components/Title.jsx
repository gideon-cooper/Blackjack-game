import React, { Component } from "react"
import { Link, Redirect } from "react-router-dom"
import { getDeck, beginningDraw } from "../Cards"
import SecondPhase from "./SecondPhase"

export default class Title extends Component {
  render() {
    console.log(this.props)
    return (
      <div>
        {this.props.bet}
        <Redirect
          to={{
            pathname: "/Game",
            money: this.props.location.money,
            bet: this.props.location.bet,
          }}
        >
          asd
        </Redirect>
      </div>
    )
  }
}
