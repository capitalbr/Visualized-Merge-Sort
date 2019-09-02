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
        array: this.props.arrays.shift()
      })
    }
  }

  timerStart(){
    this.interval = setInterval(this.timerCallback.bind(this), 500);
  }

  render(){
    let items;
    if (this.state.array) {
      items = this.state.array.map((item, idx) => {
        return <div className={`idx-${idx} array-main-item`} key={`${item}-@i${idx}`}>
          <ArrayIndexItem item={item}/>
        </div>
      })
    }
    
    
    return(
      <div className="array-container">
        <div className="array-main">
          {items}
        </div>
      </div>
    )
  }
}