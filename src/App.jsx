import React from "react"
import { Route, Link } from "react-router-dom"

import Game from "./components/Game"
import SecondPhase from "./components/SecondPhase"

import "./App.scss"

export default class App extends React.Component {
  render() {
    return (
      <>
        <h1>Blackjack</h1>
        <div className="App">
          <Route exact path="/" component={Game} />
          <Route path="/SecondPhase" component={SecondPhase} />
        </div>
      </>
    )
  }
}
