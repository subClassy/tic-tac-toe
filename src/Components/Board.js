import React from "react";

function createGrid(n, onBoxClick) {
  let gridParts = [];
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      gridParts.push(
        <div
          className="grid-square"
          key={`${i}+${j}`}
          name={`${i}+${j}`}
          onClick={onBoxClick}
        />
      );
    }
  }
  return gridParts;
}

function creatEmptyMatrix(n) {
  let matrix = [];
  for (let i = 0; i < n; i++) {
    let row = [];
    for (let j = 0; j < n; j++) {
      row.push(0);
    }
    matrix.push(row);
  }
  return matrix;
}

function checkWinner(matrix, position, playerTurn) {
  console.log(matrix, position, playerTurn);
  // check along the row of the recently marked spot
  let winnerExist = true;
  for (let i = 0; i < matrix.length; i++) {
    if (matrix[position[0]][i] !== playerTurn) {
      winnerExist = false;
      break;
    }
  }
  if (winnerExist === true) {
    return winnerExist;
  }
  // check along the column of the recently marked spot
  winnerExist = true;
  for (let i = 0; i < matrix.length; i++) {
    if (matrix[i][position[1]] !== playerTurn) {
      winnerExist = false;
      break;
    }
  }
  if (winnerExist === true) {
    return winnerExist;
  }
  // check if current position lies on a diagonal
  if (parseInt(position[0]) + parseInt(position[1]) === matrix.length - 1) {
    winnerExist = true;
    for (let i = 0; i < matrix.length; i++) {
      if (matrix[i][matrix.length - i - 1] !== playerTurn) {
        winnerExist = false;
        break;
      }
    }
  }
  if (winnerExist === true) {
    return winnerExist;
  }
  // check if current position lies on a diagonal
  if (parseInt(position[0]) === parseInt(position[1])) {
    winnerExist = true;
    for (let i = 0; i < matrix.length; i++) {
      if (matrix[i][i] !== playerTurn) {
        winnerExist = false;
        break;
      }
    }
  }
  if (winnerExist === true) {
    return winnerExist;
  }
  return false;
}

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      matrixSize: 3,
      matrix: creatEmptyMatrix(3),
      playerTurn: 1,
      message: "",
    };
  }

  onMatrixSizeChange = (event) => {
    this.setState({
      matrixSize: event.target.value,
      matrix: creatEmptyMatrix(event.target.value),
    });
  };

  onBoxClick = (event) => {
    let playerTurn = this.state.playerTurn;
    let { matrix } = this.state;
    const position = event.target.getAttribute("name").split("+");
    let message = "";
    if (matrix[position[0]][position[1]] === 0) {
      matrix[position[0]][position[1]] = playerTurn;
      let symbol = "";
      if (playerTurn === 1) {
        symbol = "X";
      } else {
        symbol = "O";
      }
      event.target.innerHTML = `<span class="symbol">${symbol}</span>`;
      console.log(checkWinner(matrix, position, playerTurn));
    } else {
      message = "Invalid Move";
    }
    if (message === "") {
      if (playerTurn === 1) {
        playerTurn = 2;
      } else {
        playerTurn = 1;
      }
    }
    this.setState({
      playerTurn,
      matrix,
      message,
    });
  };

  render() {
    const gridAlignmentStyle = {
      gridTemplateColumns: `repeat(${this.state.matrixSize}, 1fr)`,
    };
    return (
      <div>
        <div className="size-input">
          <label>Enter the Matrix Size for your game:</label>
          <input
            type="number"
            defaultValue={this.state.matrixSize}
            onChange={this.onMatrixSizeChange}
          />
        </div>
        <div className="board">
          <div className="grid-container" style={gridAlignmentStyle}>
            {createGrid(this.state.matrixSize, this.onBoxClick)}
          </div>
        </div>
      </div>
    );
  }
}

export default Board;
