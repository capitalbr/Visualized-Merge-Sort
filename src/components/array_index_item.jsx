import React from 'react'
// const React = require('react')
// const random = require('lodash.random')

export default class ArrayIndexItem extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {
    let px = "0px";
    let item = ""
    if (this.props.item !== "undefined") {
      px = `${this.props.item * 10 + 10}px`;
      item = this.props.item;
    }
    
    
    let translate = "translate(0px, 0px)"
    let color = "white";
    if (this.props.item !== "undefined" && this.props.item < 1) {
      translate = "translate(0px, -10px)"
      color = "black"
    }
    
    let style = {
      height: px,
    }
    let style2 = {
      transform: translate,
      color: color
    }

    if (this.props.leftRight){
      style = {
        width: px,
      }
      style2 = { color: "white" }
    }

    return (
      <div style={style}
      className="array-index-item">
        <div style={style2}>{item}</div>
      </div>
    )
  }
}