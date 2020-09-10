import React, { Component } from "react"
import { Link, Redirect } from "react-router-dom"
import card from "./cards2.png"

export default class TitlePage extends Component {
  render() {
    return (
      <div className="titlePage">
        <img src={card} alt="" />
        <Link to="/Game">
          <button className="playGame">Play Game</button>
        </Link>
      </div>
    )
  }
}
