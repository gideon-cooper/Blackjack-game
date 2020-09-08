import React, { Component } from "react"
import { Link, Redirect } from "react-router-dom"
import { getDeck, beginningDraw, hit } from "../Cards"
import GameOver from "./GameOver"

export default class Game extends Component {
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
    showGame: false,
    hitValue: 0,
    over: false,
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
  standDraw = () => {
    console.log(this.props.firstValue)
    if (
      this.state.fourthValue === "KING" ||
      this.state.fourthValue === "QUEEN" ||
      this.state.fourthValue === "JACK"
    ) {
      this.setState({ dealerTotal: (this.state.dealerTotal += 10) })
    } else if (this.state.fourthValue === "ACE") {
      if ((this.state.dealerTotal += 11 > 21)) {
        this.setState({ dealerTotal: (this.state.dealerTotal += 1) })
      }
      this.setState({
        dealerTotal: (this.state.dealerTotal += 11),
      })
    } else {
      this.setState({
        dealerTotal: (this.state.dealerTotal += Number(this.state.fourthValue)),
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
      console.log(resp)
      this.setState(
        {
          fourthCard: resp[0].image,
          fourthValue: resp[0].value,
        },
        () => {
          this.standDraw()
        }
      )
    })
  }
  stand = () => {}
  render() {
    if (this.state.hitTime === false && this.state.fourthValue === "") {
      this.calculateScore()
      this.dealerScore()
    }
    if (this.state.total > 21 && this.state.over !== true) {
      this.setState({
        over: true,
      })
    }
    if (this.state.dealerTotal >= 17 && this.state.over !== true) {
      this.setState({
        over: true,
      })
    }

    return (
      <>
        <div style={{ display: this.props.showSecondPhase ? "block" : "none" }}>
          <GameOver show={this.state.over} />
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
