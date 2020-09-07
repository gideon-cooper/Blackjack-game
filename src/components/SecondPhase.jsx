import React, { Component } from "react"
import { Link, Redirect } from "react-router-dom"
import { getDeck, beginningDraw, hit } from "../Cards"

export default class Game extends Component {
  state = {
    total: 0,
    dealerTotal: 0,
    hitCard: "",
    hitTime: false,
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
    } else {
      return (this.state.dealerTotal += Number(this.props.thirdValue))
    }
  }
  b = () => {
    hit().then((resp) => {
      console.log(resp)
      this.setState({
        hitCard: resp[0].image,
        hitTime: true,
      })
    })
  }
  render() {
    this.calculateScore()
    this.dealerScore()
    return (
      <>
        <div style={{ display: this.props.showSecondPhase ? "block" : "none" }}>
          <img
            style={{
              display: this.state.hitTime ? "inline" : "none",
              width: "200px",
              height: "280px",
            }}
            src={this.state.hitCard}
            alt=""
          />
          <button onClick={this.b}>Hit</button>
          <button>Stand</button>
          <h2>{this.state.total}</h2>
          <h2>Bet: {this.props.bet}</h2>
          <h2>Money: {this.props.money}</h2>
          <h2>{this.state.dealerTotal}</h2>
        </div>
      </>
    )
  }
}
