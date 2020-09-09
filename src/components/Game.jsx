import React, { Component } from "react"
import { Link, Redirect } from "react-router-dom"
import { getDeck, beginningDraw } from "../Cards"
import SecondPhase from "./SecondPhase"

export default class Game extends Component {
  state = {
    firstCard: "",
    secondCard: "",
    thirdCard: "",
    firstValue: "",
    secondValue: "",
    thirdValue: "",
    bet: 0,
    money: this.props.location.money || 100,
    total: 0,
    showSecondPhase: false,
    showGame: true,
    first: false,
  }
  a = () => {
    if (this.state.bet === 0) {
      alert("Must bet atleast $5")
    } else {
      beginningDraw().then((resp) => {
        this.setState({
          firstCard: resp[0].image,
          secondCard: resp[1].image,
          thirdCard: resp[2].image,
          firstValue: resp[0].value,
          secondValue: resp[1].value,
          thirdValue: resp[2].value,
          showSecondPhase: true,
          showGame: false,
          first: true,
        })
      })
    }
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
    console.log(this.props)
    getDeck()

    return (
      <>
        <div>
          <SecondPhase
            total={this.state.total}
            money={this.state.money}
            bet={this.state.bet}
            showSecondPhase={this.state.showSecondPhase}
            firstCard={this.state.firstCard}
            secondCard={this.state.secondCard}
            thirdCard={this.state.thirdCard}
            firstValue={this.state.firstValue}
            secondValue={this.state.secondValue}
            thirdValue={this.state.thirdValue}
            showGame={this.state.showGame}
            first={this.state.first}
          />
          <div style={{ display: this.state.showGame ? "block" : "none" }}>
            <button className="betButton-1" onClick={this.increaseBet}>
              10
            </button>
            <button className="betButton-2" onClick={this.increaseBet}>
              20
            </button>
            <button className="betButton-3" onClick={this.increaseBet}>
              40
            </button>
            <button className="betButton-4" onClick={this.increaseBet}>
              50
            </button>
            <button className="dealButton" onClick={this.a}>
              Deal
            </button>
            <h2 style={{ display: this.state.showGame ? "none" : "block" }}>
              {this.state.total}
            </h2>
            <h2>Bet: {this.state.bet}</h2>
            <h2>Money: {this.state.money}</h2>
          </div>
        </div>
      </>
    )
  }
}
