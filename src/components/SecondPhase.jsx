import React, { Component } from "react"
import { Link, Redirect } from "react-router-dom"
import { getDeck, beginningDraw, hit } from "../Cards"
import GameOver from "./GameOver"

export default class SecondPhase extends Component {
  state = {
    total: 0,
    dealerTotal: 0,
    hitCard: "",
    hitTime: false,
    firstCard: this.props.firstCard,
    secondCard: this.props.secondCard,
    thirdCard: this.props.thirdCard,
    fourthCard:
      "https://i.pinimg.com/originals/10/80/a4/1080a4bd1a33cec92019fab5efb3995d.png",
    fourthValue: "",
    fifthCard:
      "https://i.pinimg.com/originals/10/80/a4/1080a4bd1a33cec92019fab5efb3995d.png",
    fifthValue: "",
    lastCard:
      "https://i.pinimg.com/originals/10/80/a4/1080a4bd1a33cec92019fab5efb3995d.png",
    lastValue: "",
    showGame: false,
    hitValue: 0,
    over: false,
    money: this.props.money,
    bet: this.props.bet,
    winnings: 0,
    lastTime: false,
  }

  calculateScore = () => {
    console.log(this.props.firstValue)
    if (
      (this.props.firstValue === "KING" ||
        this.props.firstValue === "QUEEN" ||
        this.props.firstValue === "JACK") &&
      (this.props.secondValue === "KING" ||
        this.props.secondValue === "QUEEN" ||
        this.props.secondValue === "JACK")
    ) {
      return (this.state.total += 20)
    } else if (
      (this.props.firstValue === "ACE" ||
        this.props.firstValue === "KING" ||
        this.props.firstValue === "QUEEN" ||
        this.props.firstValue === "JACK") &&
      (this.props.secondValue === "ACE" ||
        this.props.secondValue === "KING" ||
        this.props.secondValue === "QUEEN" ||
        this.props.secondValue === "JACK")
    ) {
      return (this.state.total += 21)
    } else if (
      this.props.firstValue === "KING" ||
      this.props.firstValue === "QUEEN" ||
      this.props.firstValue === "JACK"
    ) {
      return (this.state.total += 10 + Number(this.props.secondValue))
    } else if (
      this.props.secondValue === "KING" ||
      this.props.secondValue === "QUEEN" ||
      this.props.secondValue === "JACK"
    ) {
      return (this.state.total += 10 + Number(this.props.firstValue))
    } else if (
      this.props.firstValue === "ACE" &&
      this.props.secondValue === "ACE"
    ) {
      return (this.state.total += 12)
    } else if (this.props.firstValue === "ACE") {
      return (this.state.total += 11 + Number(this.props.secondValue))
    } else if (this.props.secondValue === "ACE") {
      return (this.state.total += 11 + Number(this.props.firstValue))
    } else {
      return (this.state.total +=
        Number(this.props.firstValue) + Number(this.props.secondValue))
    }
  }
  dealerScore = () => {
    console.log(this.props.firstValue)
    if (
      this.props.thirdValue === "KING" ||
      this.props.thirdValue === "QUEEN" ||
      this.props.thirdValue === "JACK"
    ) {
      return (this.state.dealerTotal += 10)
    } else if (this.props.thirdValue === "ACE") {
      return (this.state.dealerTotal += 11)
    } else {
      return (this.state.dealerTotal += Number(this.props.thirdValue))
    }
  }
  hitScore = (value) => {
    console.log(value)
    if (value === "KING" || value === "QUEEN" || value === "JACK") {
      this.setState({ total: (this.state.total += 10) })
    } else if (value === "ACE") {
      if ((this.state.total += 11 > 21)) {
        this.setState({ total: (this.state.total += 1) })
      }
      this.setState({ total: (this.state.total += 11) })
    } else {
      this.setState({
        total: (this.state.total += Number(value)),
      })
    }
  }
  standDraw = (value) => {
    console.log(this.props.firstValue)
    if (value === "KING" || value === "QUEEN" || value === "JACK") {
      this.setState({ dealerTotal: (this.state.dealerTotal += 10) })
    } else if (value === "ACE") {
      if ((this.state.dealerTotal += 11 > 21)) {
        this.setState({ dealerTotal: (this.state.dealerTotal += 1) })
      }
      this.setState({
        dealerTotal: (this.state.dealerTotal += 11),
      })
    } else {
      this.setState({
        dealerTotal: (this.state.dealerTotal += Number(value)),
      })
    }
  }
  hitDraw = () => {
    hit().then((resp) => {
      if (this.state.hitValue === 0) {
        this.setState(
          {
            hitCard: resp[0].image,
            hitValue: resp[0].value,
            hitTime: true,
          },
          () => {
            this.hitScore(this.state.hitValue)
          }
        )
      } else {
        this.setState(
          {
            lastCard: resp[0].image,
            lastValue: resp[0].value,
            lastTime: true,
          },
          () => {
            this.hitScore(this.state.lastValue)
          }
        )
      }
    })
  }
  dealerDraw = () => {
    hit().then((resp) => {
      if (this.state.fourthValue === "") {
        this.setState(
          {
            fourthCard: resp[0].image,
            fourthValue: resp[0].value,
          },
          () => {
            this.standDraw(this.state.fourthValue)
          }
        )
      } else {
        this.setState(
          {
            fifthCard: resp[0].image,
            fifthValue: resp[0].value,
          },
          () => {
            this.standDraw(this.state.fifthValue)
          }
        )
      }
    })
  }
  stand = () => {}
  render() {
    if (this.state.hitTime === false && this.state.fourthValue === "") {
      this.calculateScore()
      this.dealerScore()
    }
    if (this.state.total === 21 && this.state.over !== true) {
      const b = this.props.bet * 2.5 + this.props.money
      this.setState({
        over: true,
        winnings: b,
      })
    } else if (
      this.state.total < 21 &&
      this.state.dealerTotal >= 17 &&
      this.state.over !== true
    ) {
      const a = this.props.bet * 2 + this.props.money
      this.setState({
        over: true,
        winnings: a,
      })
    } else if (this.state.total > 21 && this.state.over !== true) {
      this.setState({
        over: true,
        winnings: this.props.money,
      })
    }

    console.log("HEYYYYY")
    return (
      <>
        <div style={{ display: this.props.showSecondPhase ? "block" : "none" }}>
          <GameOver
            money={this.state.winnings}
            bet={this.props.bet}
            show={this.state.over}
          />
          <div className="cardContainer">
            <div className="playerContainer">
              <h2>Your hand</h2>
              <img
                style={{
                  display: this.state.showGame ? "none" : "inline",
                  width: "170px",
                  height: "250px",
                }}
                src={this.props.firstCard}
                alt=""
              />
              <img
                style={{
                  display: this.state.showGame ? "none" : "inline",
                  width: "170px",
                  height: "250px",
                }}
                src={this.props.secondCard}
                alt=""
              />
              <img
                style={{
                  display: this.state.hitTime ? "inline" : "none",
                  width: "170px",
                  height: "250px",
                }}
                src={this.state.hitCard}
                alt=""
              />
              <img
                style={{
                  display: this.state.lastValue !== "" ? "inline" : "none",
                  width: "170px",
                  height: "250px",
                }}
                src={this.state.lastCard}
                alt=""
              />
            </div>
            <div className="dealerContainer">
              <h2>Dealers hand</h2>
              <img
                style={{
                  display: this.state.showGame ? "none" : "inline",
                  width: "170px",
                  height: "250px",
                }}
                src={this.props.thirdCard}
                alt=""
              />
              <img
                style={{
                  display: this.state.showGame ? "none" : "inline",
                  width: "170px",
                  height: "250px",
                }}
                src={this.state.fourthCard}
                alt=""
              />
              <img
                style={{
                  display: this.state.fourthValue !== "" ? "inline" : "none",
                  width: "170px",
                  height: "250px",
                }}
                src={this.state.fifthCard}
                alt=""
              />
            </div>
          </div>

          <div className="gameButtonContainer">
            <button className="gameButton" onClick={this.hitDraw}>
              Hit
            </button>
            <button className="gameButton" onClick={this.dealerDraw}>
              Stand
            </button>
            <button
              className="gameButton"
              style={{ display: this.state.hitValue === 0 ? "inline" : "none" }}
            >
              Double
            </button>
          </div>

          <h2>Player value: {this.state.total}</h2>
          <h2>Bet: {this.props.bet}</h2>
          <h2>Money: {this.props.money}</h2>
          <h2>Dealer value: {this.state.dealerTotal}</h2>
        </div>
      </>
    )
  }
}
