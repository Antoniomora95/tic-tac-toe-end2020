import React, { Component } from 'react';
import './Board.css';

const SquareView = ({value, onClickProp }) => {
    return(
        <div className="square"  onClick={ () => onClickProp()}> { value }</div>
    );
}
export class SquareObj {
    constructor(id = '', value = ''){
        this.id = id;
        this.value = value
    }
}
export class Board extends Component {
    constructor(){
        super();
        this.state = {
            isPlayingX: true,
            boardActualGame: [],
            historyGame: []
        }
    }
    componentDidMount(){
        this.setState(state => {
            return {
                ...state,
                boardActualGame: this.fillInitialArray(9)
            }
        })
    }
    fillInitialArray(length_) {
        var arr = new Array(length_);
        for (var i = 0; i < length_; i++) {
            arr[i] = new SquareObj(i, '*')
        }
        return arr;
      }
      handleClick(index){
          // update actual board, push the actual board into the history, calculate a winner, etc
          let { isPlayingX, boardActualGame, historyGame } = this.state;
          // clone the array, remember that this is an array of objects, even though you clone the array
          // the references to the objects are the same let cloned = [...arr] won't work
          let cloneActualGame = JSON.parse(JSON.stringify(boardActualGame));
          // concat the arrays
          historyGame = [...historyGame, cloneActualGame];
         console.log(historyGame);
          cloneActualGame[index].value = isPlayingX ? 'X': 'O';
          this.setState((state)=> {
              return {
                  boardActualGame: cloneActualGame,
                  isPlayingX: !isPlayingX,
                  historyGame: historyGame
              }
          });
      }
      componentDidUpdate(){
          
      }

      renderSquare({ id, value }){
          return(
            <SquareView
            key={id}
            value = { value }
            onClickProp = { () => this.handleClick(id)}
            />
          )
      }
      render(){
          const { boardActualGame } = this.state;
          return <div className="board">
              {
                  boardActualGame.map(square => this.renderSquare(square))
              }
          </div>
      }
}

