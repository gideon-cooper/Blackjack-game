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
    showGame: false,
    hitValue: 0,
    over: false,
    money: this.props.money,
    bet: this.props.bet,
    winnings: 0,
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
    } else if (
      (this.props.firstValue === "ACE" ||
        this.props.firstValue === "KING" ||
        this.props.firstValue === "QUEEN" ||
        this.props.firstValue === "JACK") &&
      (this.props.secondValue === "ACE" ||
        this.props.firstValue === "KING" ||
        this.props.firstValue === "QUEEN" ||
        this.props.firstValue === "JACK")
    ) {
      return (this.state.total += 21)
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
  hitScore = () => {
    console.log("ASD")
    if (
      this.state.hitValue === "KING" ||
      this.state.hitValue === "QUEEN" ||
      this.state.hitValue === "JACK"
    ) {
      this.setState({ total: (this.state.total += 10) })
    } else if (this.state.hitValue === "ACE") {
      if ((this.state.total += 11 > 21)) {
        this.setState({ total: (this.state.total += 1) })
      }
      this.setState({ total: (this.state.total += 11) })
    } else {
      console.log("ASD")
      this.setState({
        total: (this.state.total += Number(this.state.hitValue)),
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
      this.setState(
        {
          hitCard: resp[0].image,
          hitValue: resp[0].value,
          hitTime: true,
        },
        () => {
          this.hitScore()
        }
      )
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
    if (this.state.total > 21 && this.state.over !== true) {
      const a = this.props.bet * 2 + this.props.money
      console.log("----")
      console.log(a)
      console.log("----")
      this.setState({
        over: true,
        winnings: a,
      })
    }
    if (this.state.dealerTotal >= 17 && this.state.over !== true) {
      this.setState({
        over: true,
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
          <img
            style={{
              display: this.state.showGame ? "none" : "inline",
              width: "200px",
              height: "280px",
            }}
            src={this.props.firstCard}
            alt=""
          />
          <img
            style={{
              display: this.state.showGame ? "none" : "inline",
              width: "200px",
              height: "280px",
            }}
            src={this.props.secondCard}
            alt=""
          />
          <img
            style={{
              display: this.state.hitTime ? "inline" : "none",
              width: "200px",
              height: "280px",
            }}
            src={this.state.hitCard}
            alt=""
          />
          <img
            style={{
              display: this.state.showGame ? "none" : "inline",
              width: "200px",
              height: "280px",
            }}
            src={this.props.thirdCard}
            alt=""
          />
          <img
            style={{
              display: this.state.showGame ? "none" : "inline",
              width: "200px",
              height: "280px",
            }}
            src={this.state.fourthCard}
            alt=""
          />
          <img
            style={{
              display: this.state.fourthValue !== "" ? "inline" : "none",
              width: "200px",
              height: "280px",
            }}
            src={this.state.fifthCard}
            alt=""
          />

          <button onClick={this.hitDraw}>Hit</button>
          <button onClick={this.dealerDraw}>Stand</button>
          <h2>{this.state.total}</h2>
          <h2>Bet: {this.props.bet}</h2>
          <h2>Money: {this.props.money}</h2>
          <h2>{this.state.dealerTotal}</h2>
        </div>
      </>
    )
  }
}
