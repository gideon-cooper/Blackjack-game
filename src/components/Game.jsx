import React, { Component } from "react"
import { getDeck, beginningDraw } from "../Cards"

let total = 0

export default class Game extends Component {
  state = {
    firstCard: "",
    secondCard: "",
    firstValue: null,
    secondValue: null,
    bet: 0,
  }
  a = () => {
    beginningDraw().then((resp) => {
      this.setState({
        firstCard: resp[0].image,
        secondCard: resp[1].image,
        firstValue: resp[0].value,
        secondValue: resp[1].value,
      })
    })
  }
  increaseBet = (e) => {
    console.log(e.target.innerText)
    this.setState({
      bet: (this.state.bet += Number(e.target.innerText)),
    })
  }
  calculateScore = () => {}
  render() {
    getDeck()

    return (
      <div className="App">
        <h1>Blackjack</h1>
        <img src={this.state.firstCard} alt="" />
        <img src={this.state.secondCard} alt="" />
        <button onClick={this.a}>Deal</button>
        <button onClick={this.increaseBet}>5</button>
        <button onClick={this.a}>10</button>
        <button onClick={this.a}>20</button>
        <button onClick={this.a}>50</button>
        <h2>{total}</h2>
        <h2>Bet: {this.state.bet}</h2>
      </div>
    )
  }
}
