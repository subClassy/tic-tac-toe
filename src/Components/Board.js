import React from "react";
import ReactModal from "react-modal";

function createGrid(n, onBoxClick, matrix) {
  let gridParts = [];
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      let symbol = "";
      if (matrix[i][j] === 1) {
        symbol = "X";
      } else if (matrix[i][j] === 2) {
        symbol = "O";
      } else {
        symbol = "";
      }
      gridParts.push(
        <div
          className="grid-square"
          key={`${i}+${j}`}
          name={`${i}+${j}`}
          onClick={onBoxClick}
        >
          <span className="symbol">{symbol}</span>
        </div>
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
      winner: "null",
      showModal: false,
    };
  }

  showModal = () => {
    this.setState({
      showModal: true,
    });
  };

  closeModal = () => {
    this.resetBoard();
    this.setState({
      showModal: false,
    });
  };

  onMatrixSizeChange = (event) => {
    this.setState({
      matrixSize: event.target.value,
      matrix: creatEmptyMatrix(event.target.value),
    });
  };

  checkGameComplete = (matrix) => {
    let gameComplete = true;
    for (let i = 0; i < matrix.length; i++) {
      if (matrix[i].indexOf(0) !== -1) {
        gameComplete = false;
        break;
      }
    }
    return gameComplete;
  };

  onBoxClick = (event) => {
    let playerTurn = this.state.playerTurn;
    let { matrix } = this.state;
    const position = event.target.getAttribute("name").split("+");
    let message = "";
    if (matrix[position[0]][position[1]] === 0) {
      matrix[position[0]][position[1]] = playerTurn;
      if (checkWinner(matrix, position, playerTurn)) {
        message = "Match Over";
        this.setState({
          winner: playerTurn,
        });
        this.showModal();
      }
      if (this.checkGameComplete(matrix)) {
        message = "draw";
        this.setState({
          winner: message,
        });
        this.showModal();
      }
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

  resetBoard = () => {
    this.setState({
      playerTurn: 1,
      message: "",
      winner: "null",
      showModal: false,
      matrix: creatEmptyMatrix(this.state.matrixSize),
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
        <h4 className="error-message">{this.state.message}</h4>
        <div className="board">
          <div className="grid-container" style={gridAlignmentStyle}>
            {createGrid(
              this.state.matrixSize,
              this.onBoxClick,
              this.state.matrix
            )}
          </div>
          <div>
            <button onClick={this.resetBoard} className="reset-button">
              Reset Board
            </button>
          </div>
        </div>
        <ReactModal
          isOpen={this.state.showModal}
          contentLabel="Match Result"
          className="modal"
        >
          <div className="modal-container">
            {this.state.winner !== "draw" ? (
              <div>
                The Winner of the Match is Player {this.state.playerTurn}
              </div>
            ) : (
              <div>The Match ended in a Draw</div>
            )}
            <button onClick={this.closeModal} className="reset-button">
              Reset and Continue
            </button>
          </div>
        </ReactModal>
      </div>
    );
  }
}

export default Board;
