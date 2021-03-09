import React, { Component, useState, useEffect } from 'react';
import './Board.css';
const calculateWinner = (squares) => {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    if (squares && squares.length) {
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (squares[a].value && squares[a].value === squares[b].value && squares[a].value === squares[c].value) {
                return squares[a].value;
            }
        }
    }
    return null;
}
export class SquareObj {
    constructor(id = '', value = '') {
        this.id = id;
        this.value = value
    }
}
const Square = ({ value, onClickProp, winner }) => {
    const [disabled, setDisabled] = useState(false);
    useEffect(() => {
        if(!value && disabled){
            // if the square receive an empty value and it was previously disabled, then enable it again
            setDisabled(false);
        }
        return () => null
    }, [value])
    return (
        <button className="square" disabled={disabled} onClick={() => {
            if( !winner ){
                setDisabled(true)
                onClickProp();
            }
        }}> { value }</button>
    );
}
const HistoryItem = ({ index, onClickFn }) => {
    return <li onClick={() => onClickFn()}>Go to movement {index}</li>
}
const MovementOrWinnerView = ({ boardActualGame, isPlayingX }) => {
    const calculated = calculateWinner(boardActualGame);
    
    if (boardActualGame && boardActualGame.length && calculated) {
        return <h4>The winner is {calculated}</h4>
    }
    return <h4>The next movement is: {isPlayingX ? 'X': 'O'}</h4>
}
export class Board extends Component {
    constructor() {
        super();
        this.state = {
            isPlayingX: true,
            boardActualGame: [],
            historyGame: []
        }
    }
    componentDidMount() {
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
            arr[i] = new SquareObj(i)
        }
        return arr;
    }
    handleClick(index) {
        let { isPlayingX, boardActualGame, historyGame } = this.state;
        if (!calculateWinner(boardActualGame)) {
            let cloneActualGame = JSON.parse(JSON.stringify(boardActualGame));
            historyGame = [...historyGame, cloneActualGame];
            cloneActualGame[index].value = isPlayingX ? 'X' : 'O';
            this.setState((state) => {
                return {
                    boardActualGame: cloneActualGame,
                    isPlayingX: !isPlayingX,
                    historyGame: historyGame
                }
            });
        }
    }
    goToMovement(index) {
        let { historyGame } = this.state;

        let boardGameAt = historyGame[index - 1];
        // index strts at 1
        //  array.slice(start, end (not included))
        //const animals = ['ant', 'bison'];
        //console.log(animals.slice(0, 1));
        // output:  ["ant"]
        let gameHistoryAt = this.state.historyGame.slice(0, index)
        this.setState(state => {
            return {
                ...state,
                boardActualGame: boardGameAt,
                historyGame: gameHistoryAt
            }
        })
    }
    renderSquare({ id, value }) {
        return (
            <Square
                key={id}
                value={value}
                winner={!!calculateWinner(this.state.boardActualGame)}
                onClickProp={() => this.handleClick(id)}
            />
        )
    }
    renderHistoryItem(index) {
        return (
            <HistoryItem
                key={index}
                index={index}
                onClickFn={() => this.goToMovement(index)}
            />
        )

    }
    render() {
        const { boardActualGame, historyGame, isPlayingX } = this.state;
        const historyItems = [];
        for (let index = 1; index < historyGame.length ; index++) {
            historyItems.push(this.renderHistoryItem(index ))
        }
        return <div className="containerTic">
            <div className="boardWrapper">
                <div className="boardTitle">
                    <MovementOrWinnerView
                    boardActualGame = { boardActualGame }
                    isPlayingX = { isPlayingX }
                    />
                </div>
                <div className="boardGrid">
                {
                    boardActualGame.map(square => this.renderSquare(square))
                }
                </div>
            </div>
            <div className="historyGame">
                <h4>Game movements</h4>
                <ul>
                    
                    {
                        historyItems
                    }
                </ul>
            </div>
        </div>

    }
}

