import React from 'react'
// const React = require('react')
// const random = require('lodash.random')
import ArrayIndexItem from "./array_index_item"

export default class ArrayIndex extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      array: undefined
    }
    this.hold = true;
    this.count = 3;
  }

  componentDidMount(){
    this.timerStart();
  }

  timerCallback(){
    if (this.props.arrays) {
      if (this.props.arrays.length === 0) {
        clearInterval(this.interval);
      }
      this.setState({
        array: this.props.arrays.shift(),
        stack: this.props.stacks.shift(),
        left: this.props.lefts.shift(),
        right: this.props.rights.shift()
      })
    }
  }

  timerStart(){
    this.interval = setInterval(this.timerCallback.bind(this), 500);
  }

  render(){
    let items, stack, left, right;
    if (this.state.array) {
      items = this.state.array.map((item, idx) => {
        return <div className={`idx-${idx} array-main-item`} key={`${item}-@i${idx}`}>
          <ArrayIndexItem item={item}/>
        </div>
      })
    }
    if (this.state.stack) {
      stack = this.state.stack.map((level, idx) => {
        return <li key={`${level}-${idx}`}>{level}</li>
      })
    }

    if (this.state.left) {
      left = this.state.left.map((item, idx) => {
        return <div className={`idx-${idx} array-main-item`} key={`${item}-@i${idx}`}>
          <ArrayIndexItem item={item} />
        </div>
      })
    }

    if (this.state.right) {
      right = this.state.right.map((item, idx) => {
        return <div className={`idx-${idx} array-main-item`} key={`${item}-@i${idx}`}>
          <ArrayIndexItem item={item} />
        </div>
      })
    }
    return(
      <div className="array-container">
        <div className="secondary-displays">
          <div className="left-right"><div>{left}</div></div>
          <div className="stack">
            <div>
              <ul>{stack}</ul>
              <div className="box-title-bottom">Stack</div>
            </div>
          </div>
          <div className="left-right"><div>{right}</div></div>
        </div>
        <div className="array-main">
          {items}
        </div>
      </div>
    )
  }
}