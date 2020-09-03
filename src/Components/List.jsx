import React, { Component } from "react"
import ListItem from "./ListItem"

export default class List extends Component {
  state = {
    list: [
      { title: "hey", content: "asasas" },
      { title: "heyy", content: "wqqwqw" },
    ],
  }
  render() {
    return (
      <ul>
        <ListItem list={this.state.list[0]} />
      </ul>
    )
  }
}
