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
    this.animateGrow = "animate-grow"
  }

  componentDidMount(){
    this.timerStart();
  }

  timerCallback(){
    if (this.props.arrays) {
      if (this.props.arrays.length === 0) {
        // clearInterval(this.interval);
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

  toggleAnimation(){
    if (this.animateGrow === "animate-grow") {
      this.animateGrow = "animate-grow2"
    } else {
      this.animateGrow = "animate-grow"
    }
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
        return <li key={`${level}-${idx}`}>{`[${level.join(", ")}]`}</li>
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
        let last = false;
        if (idx === this.state.left.length - 1
            && stackMessage !== "STACK LEVEL POPPED OFF"
            && this.state.message !== 5
            && this.state.message !== 6) {
            last = "left";
          }
        return <div className={`idx-${idx}`} key={`${item}-@i${idx}`}>
          <ArrayIndexItem item={item} leftRight={true} last={last}/>
        </div>
      })
    }

    if (this.state.right) {
      right = this.state.right.map((item, idx) => {
        let last = false;
        if (idx === this.state.right.length - 1 
            && stackMessage !== "STACK LEVEL POPPED OFF"
            && this.state.message !== 6
            && this.state.message !== 5) {
              last = "right";
            }
        return <div className={`idx-${idx}`} key={`${item}-@i${idx}`}>
          <ArrayIndexItem item={item} leftRight={true} last={last}/>
        </div>
      })
    }

    if (this.state.message) {
      message = this.state.message;
    }
    
    let styleMid = {};
    let styleMergeLeft = {};
    let styleMergeLeftStep = {};
    let classMergeLeftStep = "";
    let styleMergeRight = {};
    let styleMergeRightStep = {};
    let classMergeRightStep = "";
    let styleLRSorted = {};
    let styleMerging = {};
    let styleMergingLeft = {};
    let styleMergingRight = {};
    let classMergingLeft = "";
    let classMergingRight = "";
    let styleMerged = {};
    
    // triggers rerender so animation will run again
    this.toggleAnimation();  
    switch (this.state.message){
      case 1:
        styleMid = {
          backgroundColor: "black",
          color: "white"
        };
        break;
      case 2:
        styleMergeLeft = {
          backgroundColor: "black",
          color: "white"
        };
        styleMergeLeftStep = {
          backgroundColor: "red",
          color: "white"
        };
        classMergeLeftStep = this.animateGrow;
        break;
      case 3:
        styleMergeRight = {
          backgroundColor: "black",
          color: "white"
        };
        styleMergeRightStep = {
          backgroundColor: "red",
          color: "white"
        };
        classMergeRightStep = this.animateGrow;
        break;
      case 4:
        styleLRSorted = {
          backgroundColor: "black",
          color: "white"
        };
        break;
      case 5:
        styleMerging = {
          backgroundColor: "black",
          color: "white"
        };
        styleMergingLeft = {
          backgroundColor: "red",
          color: "white"
        };
        classMergingLeft = this.animateGrow;
        break;
      case 6:
        styleMerging = {
          backgroundColor: "black",
          color: "white"
        };
        styleMergingRight = {
          backgroundColor: "red",
          color: "white"
        };
        classMergingRight = this.animateGrow;
        break;
      case 7:
        styleMerged = {
          backgroundColor: "black",
          color: "white"
        }
        break;
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
        <div className="pseudo-container">
          {stackMessage}
          <ul id="list">
            <li style={styleMid}>find the midpoint</li>
            <li>
              <div style={styleMergeLeft}>
                for i = 0 to midpoint, leftArray.push(array[i])
              </div>
              <div 
                style={styleMergeLeftStep} 
                className='padding'
                >
                mergeSort(
                <strong className={classMergeLeftStep}>
                  leftArray
                </strong> 
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;)
              </div>
            </li>
            <li>
              <div style={styleMergeRight}>
                for i = 0 to midpoint, leftArray.push(array[i])
              </div>
              <div 
                style={styleMergeRightStep}
                className="padding">
                mergeSort(
                <strong className={classMergeRightStep}>
                  rightArray
                </strong>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;)
              </div>
            </li>
            <li style={styleLRSorted}>
              sorted left/right arrays have returned and must 
              <br/>be merged/sorted
            </li>
            <li>
              <div style={styleMerging}>
                if leftArray[0] is less than rightArray[0]
              </div>
              <div 
                style={styleMergingLeft}
                className='padding'>
                <strong className={classMergingLeft}>push leftArray[0]</strong>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;into mergedArray
              </div>
              <div 
                style={styleMergingRight}
                className='padding'>
                else&nbsp;<strong className={classMergingRight}>push rightArray[0]</strong>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; into mergedArray
              </div>
            </li>
            <li style={styleMerged}>
              Merge any already sorted items remaining
            </li>
            {/* {message} */}
          </ul>
        </div>
        <div className="array-main">
          {items}
        </div>
      </div>
    )
  }
}