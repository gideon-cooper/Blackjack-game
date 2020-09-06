import React, { Component } from "react"
import { getDeck, beginningDraw } from "../Cards"

export default class Game extends Component {
  state = {
    image: "",
  }
  a = () => {
    beginningDraw().then((resp) => {
      this.setState({
        image: resp[0].image,
      })
    })
  }
  render() {
    getDeck()

    return (
      <div className="App">
        <h1>Blackjack</h1>
        <img src={this.state.image} alt="" />
        <button onClick={this.a}>Deal</button>
      </div>
    )
  }
}
