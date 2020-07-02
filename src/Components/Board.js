import React from "react";

function createGrid(n) {
  let gridParts = [];
  for (let j = 0; j < n; j++) {
    for (let i = 0; i < n; i++) {
      gridParts.push(<div className="grid-square" key={`${i}+${j}`} />);
    }
  }
  return gridParts;
}

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      matrixSize: 3,
    };
  }

  onMatrixSizeChange = (event) => {
    this.setState({
      matrixSize: event.target.value,
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
            {createGrid(this.state.matrixSize)}
          </div>
        </div>
      </div>
    );
  }
}

export default Board;
