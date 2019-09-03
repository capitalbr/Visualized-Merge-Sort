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
    this.delay = 500;
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
        right: this.props.rights.shift(),
        message: this.props.messages.shift(),
        priorStack: this.state.stack
      })
    }
  }

  intervalSet(delay = 500, initialSet = true){
    if (initialSet) return delay;
    clearInterval(this.interval);
    this.delay = delay;
    this.timerStart();
  }

  timerStart(){
    this.interval = setInterval(this.timerCallback.bind(this), this.delay);
  }

  render(){
    let items, stack, left, right, stackMessage, message;
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
      let pStack = this.state.priorStack;
      let sLength = this.state.stack.length
      
      if (pStack && pStack.length < sLength){
          stackMessage = "RECURSIVE CALL MADE"
          this.intervalSet(1500, false);
        } else if (pStack && pStack.length > sLength) {
          stackMessage = "STACK LEVEL POPPED OFF"
          this.intervalSet(1500, false);
        } else if (pStack && pStack.length === sLength
            && pStack[0] !== this.state.stack[0]){
          stackMessage = "STACK LEVEL POPPED OFF AND NEW STACK CALL MADE"
          this.intervalSet(1500, false);
        } else {
          stackMessage = "CURRENT STACK IN PROGRESS"
          if (this.delay !== 500){
            this.intervalSet(500, false);
          }
        }
    }

    if (this.state.left) {
      left = this.state.left.map((item, idx) => {
        return <div className={`idx-${idx}`} key={`${item}-@i${idx}`}>
          <ArrayIndexItem item={item} leftRight={true}/>
        </div>
      })
    }

    if (this.state.right) {
      right = this.state.right.map((item, idx) => {
        return <div className={`idx-${idx}`} key={`${item}-@i${idx}`}>
          <ArrayIndexItem item={item} leftRight={true}/>
        </div>
      })
    }

    if (this.state.message) {
      message = this.state.message;
    }
    
    return(
      <div className="array-container">
        <div className="secondary-displays">
          <div className="left-right">
            <div className="box-title-bottom">LEFT</div>
            <div id="left-right-item">{left}</div>
          </div>
          <div className="stack">
            <div>
              <ul>{stack}</ul>
              <div className="box-title-bottom">STACK</div>
            </div>
          </div>
          <div className="left-right">
            <div className="box-title-bottom">RIGHT</div>
            <div id="left-right-item">{right}</div>
          </div>
        </div>
              {stackMessage}
        <div className="array-main">
          {items}
        </div>
        <div>
          {message}
        </div>
      </div>
    )
  }
}