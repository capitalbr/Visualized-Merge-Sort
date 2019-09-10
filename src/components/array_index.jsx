import React from 'react'
// const React = require('react')
// const random = require('lodash.random')
import ArrayIndexItem from "./array_index_item"

export default class ArrayIndex extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      array: undefined,
      pausePlay: "PAUSE",
      style: {
        color: "gray",
        pointerEvents: "none"
      }
    }
    this.delaySet = 500;
    this.delaySetEmphasis = 1500
    this.hold = true;
    this.delay = this.delaySet;
    this.animateGrow = "animate-grow"
    this.initializePausePlay = true;
    this.handler = () => {};
  }

  componentDidMount(){
    this.timerStart();
    this.addNewCallListener();
  }

  addNewCallListener(){
    document.getElementById("new-call").addEventListener("click", () => {
      // debugger
      if (this.state.pausePlay === "START") this.togglePausePlay();
    });
  }

  timerCallback(){
    if (this.props.arrays) {
      if (this.props.arrays.length === 0) {
        this.initializePausePlay = true;
        this.setState({
          style: {
            color: "gray",
            pointerEvents: "none"
          }
        })
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
    if (this.state.pausePlay === "START") return;
    if (initialSet) return delay;
    clearInterval(this.interval);
    this.delay = delay;
    this.timerStart();
  }

  speedControl(speed){
    switch (speed){
      case "very fast":
        this.delaySet = 125;
        this.delaySetEmphasis = 375;
        break;
      case "fast":
        this.delaySet = 250;
        this.delaySetEmphasis = 750;
        break;
      case "slow":
        this.delaySet = 1000;
        this.delaySetEmphasis = 3000;
        break;
      case "very slow":
        this.delaySet = 2000;
        this.delaySetEmphasis = 6000;
        break;
      default:
        this.delaySet = 500;
        this.delaySetEmphasis = 1500;
    }
    this.intervalPause();
    if (this.state.pausePlay === "PAUSE") this.timerStart();
  }

  intervalPause(){
    clearInterval(this.interval);
    this.interval = undefined;
  }

  timerStart(){
    this.interval = setInterval(this.timerCallback.bind(this), this.delay);
  }

  togglePausePlay(){
    this.interval ? this.intervalPause() : this.timerStart();
    if (this.state.pausePlay === "START") {
      this.setState({ pausePlay: "PAUSE" });
    } else if (this.state.pausePlay === "PAUSE") {
      this.setState({ pausePlay: "START" });
    }
  }

  toggleAnimation(){
    if (this.animateGrow === "animate-grow") {
      this.animateGrow = "animate-grow2"
    } else {
      this.animateGrow = "animate-grow"
    }
  }

  render(){
    let stack, left, right, message;

    let items = <div id="awaiting-input">
      <div id="a">A</div>
      <div id="w">w</div>
      <div id="a2">a</div>
      <div id="i">i</div>
      <div id="t">t</div>
      <div id="i2">i</div>
      <div id="n">n</div>
      <div id="g">g</div>&nbsp;
      <div id="i3">I</div>
      <div id="n2">n</div>
      <div id="p">p</div>
      <div id="u">u</div>
      <div id="t2">t</div>
    </div>
    let stackMessage = "PRESS NEW CALL TO START"
    if (this.state.array) {
      items = this.state.array.map((item, idx) => {
        return <div className={`idx-${idx} array-main-item`} key={`${item}-@i${idx}`}>
          <ArrayIndexItem item={item}/>
        </div>
      })

      if (this.initializePausePlay) {
        this.setState({ 
          pausePlay: "PAUSE",
          style: {}
        });
        this.initializePausePlay = false;
        this.handler = () => {
          return this.togglePausePlay.bind(this);
        }
      }
    }
    
    if (this.state.stack) {
      stack = this.state.stack.map((level, idx) => {
        return <li key={`${level}-${idx}`}>{`[${level.join(", ")}]`}</li>
      })
      let pStack = this.state.priorStack;
      let sLength = this.state.stack.length
      
      if (pStack && pStack.length < sLength){
          stackMessage = "RECURSIVE CALL MADE"
          this.intervalSet(this.delaySetEmphasis, false);
        } else if (pStack && pStack.length > sLength) {
          stackMessage = "STACK LEVEL POPPED OFF"
          this.intervalSet(this.delaySetEmphasis, false);
        } else if (pStack && pStack.length === sLength
            && pStack[0] !== this.state.stack[0]){
          stackMessage = "STACK LEVEL POPPED OFF AND NEW STACK CALL MADE"
          this.intervalSet(this.delaySetEmphasis, false);
        } else {
          stackMessage = "CURRENT STACK IN PROGRESS"
          if (this.delay !== this.delaySet){
            this.intervalSet(this.delaySet, false);
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
        <div className="left-container">
          <div className="title-and-description">
            <div className="title">
             <strong>Visualizing</strong> <div>Merge Sort</div>
            </div>
            <div className="description">
              An animated version of the recursive merge sort algorithm 
              built with JavaScript, React, Webpack, Babel, and Sass.
            </div>
          </div>
          <div className="instructions">
            <h2>Instructions</h2>
            <div>
              <li>New Call = start/reset</li>
              <li>After pressing New Call 2 new buttons appear</li>
              <li>&nbsp;&nbsp;&nbsp;&nbsp;
                1) Start/Pause
              </li>
              <li>&nbsp;&nbsp;&nbsp;&nbsp;
                2) Next Step = go at 
                  your own 
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  pace while paused
              </li>
              <li>Red Bar = Current midpoint</li>
              <li>Pseudo code highlighting shows whats 
                happening at each step
              </li>
              <li>
                Stack levels are represented by the argument passed to them
              </li>
            </div>
          </div>
          <div className="speed-controls">
            <h2>
              Speed Controls
            </h2>
            <div className="speed-controls-labels">
              <strong id="slow">Slow</strong>
              <strong id="medium">Medium</strong>
              <strong id="fast">Fast</strong>
            </div>
            <div className="speed-controls-buttons">
              <div 
                className="speed-button speed-button-very-slow"
                onClick={e => this.speedControl("very slow")}>
              </div>
              <div 
                className="speed-button speed-button-slow"
                onClick={e => this.speedControl("slow")}>
              </div>
              <div 
                className="speed-button speed-button-normal"
                onClick={e => this.speedControl()}>  
              </div>
              <div 
                className="speed-button speed-button-fast"
                onClick={e => this.speedControl("fast")}>
              </div>
              <div 
                className="speed-button speed-button-very-fast"
                onClick={e => this.speedControl("very fast")}>
              </div>
            </div>
          </div>
          <div className="developer">
            <div className="title">
              Developer Info
            </div>
            <div id="name">Bradley Barnes</div>
            <div className="links">GitHub</div>
            <div id="linkedin-link" className="links">Linkedin</div>
            <div id="portfolio-link" className="links">Portfolio</div>
          </div>
        </div>
        <div className="right-container">
          <div className="secondary-displays">
            <div className="left-right">
              <div className="box-title-bottom">LEFT ARRAY</div>
              <div id="left-right-item">{left}</div>
            </div>
            <div className="stack">
              <div>
                <ul>{stack}</ul>
                <div className="box-title-bottom">STACK</div>
              </div>
            </div>
            <div className="left-right">
              <div className="box-title-bottom">RIGHT ARRAY</div>
              <div id="left-right-item">{right}</div>
            </div>
          </div>
          <div className="pseudo-container">
            <div className="stackMessage">{stackMessage}</div>
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
          <div 
            className="user-controls" 
            id="play-pause"
            style={this.state.style}>
            <div className="menu-card">
              <div onClick={this.handler()}>
                {this.state.pausePlay}
              </div>
            </div>
            <div className="menu-card">
              <div onClick={this.timerCallback.bind(this)}>
                NEXT STEP
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}