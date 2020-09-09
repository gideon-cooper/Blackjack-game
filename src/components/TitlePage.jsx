import React, { Component } from "react"
import { Link, Redirect } from "react-router-dom"

export default class TitlePage extends Component {
  render() {
    return (
      <div>
        <Link to="/Game">
          <button>Play Game</button>
        </Link>
      </div>
    )
  }
}
