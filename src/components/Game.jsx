import React, { Component } from "react"
import { Link, Redirect } from "react-router-dom"
import { getDeck, beginningDraw } from "../Cards"
import SecondPhase from "./SecondPhase"

export default class Game extends Component {
  state = {
    firstCard: "",
    secondCard: "",
    firstValue: null,
    secondValue: null,
    bet: 0,
    money: 100,
    total: 0,
    showSecondPhase: false,
  }
  a = () => {
    beginningDraw().then((resp) => {
      this.setState({
        firstCard: resp[0].image,
        secondCard: resp[1].image,
        firstValue: resp[0].value,
        secondValue: resp[1].value,
        showSecondPhase: true,
      })
    })
  }
  increaseBet = (e) => {
    console.log(e.target.innerText)
    if (this.state.money < Number(e.target.innerText)) {
      alert("No money")
    } else {
      this.setState({
        bet: (this.state.bet += Number(e.target.innerText)),
        money: (this.state.money -= Number(e.target.innerText)),
      })
    }
  }
  calculateScore = () => {}

  render() {
    getDeck()

    return (
      <>
        <div>
          <img src={this.state.firstCard} alt="" />
          <img src={this.state.secondCard} alt="" />
          <SecondPhase
            total={this.state.total}
            money={this.state.money}
            bet={this.state.bet}
            showSecondPhase={this.state.showSecondPhase}
          />
          <button onClick={this.a}>Deal</button>
          <button onClick={this.increaseBet}>5</button>
          <button onClick={this.increaseBet}>10</button>
          <button onClick={this.increaseBet}>20</button>
          <button onClick={this.increaseBet}>50</button>
          <h2>{this.state.total}</h2>
          <h2>Bet: {this.state.bet}</h2>
          <h2>Money: {this.state.money}</h2>
        </div>
      </>
    )
  }
}
