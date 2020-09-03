import React, { Component } from "react"

import TopHeader from "./Components/TopHeader"
import List from "./Components/List"

import "./App.css"

export default class App extends Component {
  render() {
    return (
      <div>
        <TopHeader />
        <div className="container">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore,
            ullam.
          </p>
          <List />
        </div>
      </div>
    )
  }
}
