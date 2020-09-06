import React from "react"
import { Route, Link } from "react-router-dom"

import Game from "./components/Game"

import "./App.scss"

export default class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Route path="/" component={Game} />
      </div>
    )
  }
}
