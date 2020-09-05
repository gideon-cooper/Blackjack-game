import React from "react"
import { Route, Link } from "react-router-dom"

import Game from "./components/Game"

import "./App.scss"

function App() {
  return (
    <div className="App">
      <Route path="/" component={Game} />
    </div>
  )
}

export default App
