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
      px = `${this.props.item * 10 + 20}px`;
      item = this.props.item;
    }
    
    
    let translate = "translate(0px, 0px)"
    let color = "white";
    let fontSize = "16px"
    if (this.props.item !== "undefined" && this.props.item < 1) {
      translate = "translate(0px, -20px)"
      color = "black"
      fontSize = "14px"
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
      style2 = { 
        color: "white",
        fontSize: fontSize
      }
    }
    let className = "array-index-item"
    if (this.props.last === "right") {
      className = "array-index-item animate-right"
    } else if (this.props.last === "left") {
      className = "array-index-item animate-left"
    }
    return (
      <div style={style}
      className={className}>
        <div style={style2}>{item}</div>
      </div>
    )
  }
}