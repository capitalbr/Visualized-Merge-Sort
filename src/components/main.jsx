import React from 'react'
// const React = require('react')
// const random = require('lodash.random')
import ArrayIndex from "./array_index"

export default class Main extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      iterations: []
    }
  }

  iterationStore(array, arrays, mid, left = [], right = [], message = 0){
    // array = array.filter( el => el !== undefined);
    let arrayOfObjects = array.map((n, idx) => {
      if (n === undefined) return { n: "undefined" }
      if (idx === mid) {
        return { n: n, class: "mid" };
      } else {
        return { n: n }
      }
    });

    let leftObjects = left.map((n, idx) => {
      return { n: n }
    })
    
    let rightObjects = right.map((n, idx) => {
      return { n: n }
    })
    let newIterations = this.state.iterations;
    newIterations.push({
      arrays,
      arrayOfObjects,
      leftObjects,
      rightObjects,
      message
    })
    this.setState({
      iterations: newIterations
    })
    
  }

  splitter(array, arrays, midpoint){
    let left = [];
    let right = [];
    let copyArray = array.slice();
    array.forEach((el, idx) => {
      // this.iterationStore(copyArray.filter((el, i) => i === idx), arrays, midpoint, left, right);
      if (idx < midpoint) {
        left.push(el);
        // delete copyArray[idx];
        copyArray[idx] = "undefined";
        this.iterationStore(copyArray, arrays, midpoint, left.slice(), right.slice(), 2);
      } else {
        right.push(el);
        // delete copyArray[idx];
        copyArray[idx] = "undefined";
        this.iterationStore(copyArray, arrays, midpoint, left.slice(), right.slice(), 3);
      }
    })
  }

  mergeSort(array, arrays = []) {
    arrays = [array].concat(arrays);
    if (array.length <= 1) return array;
    this.iterationStore(array, arrays)
    const midpoint = Math.floor(array.length / 2);
    this.iterationStore(array, arrays, midpoint, [], [], 1);
    this.splitter(array, arrays, midpoint);
    const sortedLeft = this.mergeSort(array.slice(0, midpoint), arrays);
    const sortedRight = this.mergeSort(array.slice(midpoint), arrays);
    // debugger
    this.iterationStore([], arrays, midpoint, sortedLeft, sortedRight.slice(), 4);
    return this.merge(sortedLeft, sortedRight, arrays, midpoint);
  }

  merge(left, right, arrays, midpoint) {
    let merged = [];

    while (left.length && right.length) {
      if (left[0] < right[0]) {
        merged.push(left.shift());
        this.iterationStore(merged, arrays, midpoint, left.slice(), right.slice(), 5);
      } else {
        merged.push(right.shift());
        this.iterationStore(merged, arrays, midpoint, left.slice(), right.slice(), 6);
      }
    }

    merged = merged.concat(left, right);
    this.iterationStore(merged, arrays, midpoint, [], [], 7)
    return merged;
  }

  restartAnimation(e){
    e.preventDefault();
    // this.setState({
    //   iterations: []
    // })
    this.state.iterations = [];
    let array = [];
    for (let i = 0; i < 10; i++) {
      array.push(Math.floor(Math.random() * 
      Math.floor(Math.random() * 100)))
    }
    this.mergeSort(array)
  }

  render(){
    let arrays, lefts, rights, stacks, messages;
    if (this.state.iterations[0]) {
      // debugger
      arrays = this.state.iterations.map(step => {
        return Object.values(step.arrayOfObjects).map( object => {
          return object;
        })
      })
      
      stacks = this.state.iterations.map(step => {
        return step.arrays
      })

      lefts = this.state.iterations.map(step => {
        return step.leftObjects
      })

      rights = this.state.iterations.map(step => {
        return step.rightObjects
      })

      messages = this.state.iterations.map(step => {
        return step.message;
      })
    }
    
    return(
      <div className="main">
        
        <ArrayIndex arrays={arrays} stacks={stacks} lefts={lefts} rights={rights}
          messages={messages}
        />
        <div id="new-call" className="user-controls">
          <div className="menu-card" onClick={this.restartAnimation.bind(this)}>
              <div>NEW CALL</div>
          </div>
        </div>
        {/* <div style={{display: "flex"}}>
          <ul>{arrays}</ul>
          <ul>{left}</ul> 
          <ul>{right}</ul>
        </div> */}
      </div>
    )
  }
}

// module.exports = Main;
// const merge = new Main;
// console.log(merge.mergeSort([3, 1, 5, 8, 3]));


// Array.prototype.mergeSort = function (func) {
//   if (this.length <= 1) return this;

//   if (!func) func = (left, right) => {
//     return left < right ? -1 : left > right ? 1 : 0;
//   };

//   const midpoint = Math.floor(this.length / 2);
//   const sortedLeft = this.slice(0, midpoint).mergeSort(func);
//   const sortedRight = this.slice(midpoint).mergeSort(func);
//   return merge(sortedLeft, sortedRight, func);
// };

// function merge(left, right, comparator) {
//   let merged = [];

//   while (left.length && right.length) {
//     switch (comparator(left[0], right[0])) {
//       case -1:
//         merged.push(left.shift());
//         break;
//       case 0:
//         merged.push(left.shift());
//         break;
//       case 1:
//         merged.push(right.shift());
//         break;
//     }
//   }

//   merged = merged.concat(left, right);
//   return merged;
// }



// using <li></li>
// arrays = this.state.iterations.map(step => {
//   return <li>{Object.values(step.arrayOfObjects).map(object => {
//     return object.n;
//   })}</li>
// })
