import React from 'react'
// const React = require('react')
// const random = require('lodash.random')

export default class ArrayIndexItem extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {
    let height = "0px";
    let item = ""
    if (this.props.item !== "undefined") {
      height = `${this.props.item * 10 + 10}px`;
      item = this.props.item;
    }
    
    
    let translate = "translate(0px, 0px)"
    let color = "white";
    if (this.props.item !== "undefined" && this.props.item < 1) {
      translate = "translate(0px, -10px)"
      color = "black"
    }

    return (
      <div style={{
        height: height,
        backgroundColor: "blue",
        marginLeft: "4px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        alignItems: "center",
        width: "30px",
        background: "linear-gradient(to left, #4cb8c4, #3cd3ad)",
        // position: "absolute"
      }
      }>
        <div style={{
          transform: translate,
          color: color
        }}>{item}</div>
      </div>
    )
  }
}