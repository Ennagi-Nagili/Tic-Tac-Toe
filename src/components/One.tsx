import { useState } from "react";
import { Square } from "./Square";
import "./Board.scss";

const isFirst = Math.floor(Math.random() * 2);
let first = true;
let me = "X";

if (isFirst === 1) {
  first = false;
  me = "O";
}

const lines = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

export const One = () => {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [myTurn, setMyTurn] = useState(first);

  function handleClick(i: number) {
    if (squares[i] || calculateWinner(squares)) {
      return;
    }

    const nextSquares = squares.slice();

    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }

    setSquares(nextSquares);
    setXIsNext(!xIsNext);
    setMyTurn(!myTurn);
  }

  const winner = calculateWinner(squares);
  let status;
  if (winner === "Draw") {
    status = "Draw";
  } else if (winner != "") {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");

    if (!myTurn) {
      play(handleClick, squares);
      console.log("yeees");
    }
  }

  return (
    <div>
      <div style={{fontSize: 36}}>You are {me}</div>
      <div className="board">
        <div>
          <div className="status">{status}</div>

          <div className="board-row">
            <Square
              value={squares[0]}
              onSquareClick={() => {
                if (myTurn) {
                  handleClick(0);
                }
              }}
            />
            <Square
              value={squares[1]}
              onSquareClick={() => {
                if (myTurn) {
                  handleClick(1);
                }
              }}
            />
            <Square
              value={squares[2]}
              onSquareClick={() => {
                if (myTurn) {
                  handleClick(2);
                }
              }}
            />
          </div>

          <div className="board-row">
            <Square
              value={squares[3]}
              onSquareClick={() => {
                if (myTurn) {
                  handleClick(3);
                }
              }}
            />
            <Square
              value={squares[4]}
              onSquareClick={() => {
                if (myTurn) {
                  handleClick(4);
                }
              }}
            />
            <Square
              value={squares[5]}
              onSquareClick={() => {
                if (myTurn) {
                  handleClick(5);
                }
              }}
            />
          </div>

          <div className="board-row">
            <Square
              value={squares[6]}
              onSquareClick={() => {
                if (myTurn) {
                  handleClick(6);
                }
              }}
            />
            <Square
              value={squares[7]}
              onSquareClick={() => {
                if (myTurn) {
                  handleClick(7);
                }
              }}
            />
            <Square
              value={squares[8]}
              onSquareClick={() => {
                if (myTurn) {
                  handleClick(8);
                }
              }}
            />
          </div>

          <div className="btn">
            <button
              className="restart"
              onClick={() => window.location.reload()}
            >
              Restart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

function calculateWinner(squares: any[]) {
  let winner: string = "";

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      winner = squares[a];
    } else if (squares.indexOf(null) == -1 && winner == "") {
      winner = "Draw";
    }
  }
  return winner;
}

function play(handleClick: Function, squares: any[]) {
  let board: number[] = [];

  for (let i = 0; i < squares.length; i++) {
    if (squares[i] == null) {
      board.push(i);
    }
  }

  if (board.length >= 8) {
    handleClick(board[Math.floor(Math.random() * board.length)]);
  } else if (board.length === 1) {
    handleClick(board[0]);
  } else {
    if (isFirst === 0) {
      if (calculateProbability(squares, "O") !== null) {
        handleClick(calculateProbability(squares, "O"));
      } else {
        if (calculateProbability(squares, "X") !== null) {
          handleClick(calculateProbability(squares, "X"));
        } else {
          handleClick(gogo(squares, "O"));
        }
      }
    } else {
      if (calculateProbability(squares, "X") !== null) {
        handleClick(calculateProbability(squares, "X"));
      } else {
        if (calculateProbability(squares, "O") !== null) {
          handleClick(calculateProbability(squares, "O"));
        } else {
          handleClick(gogo(squares, "X"));
          console.log(gogo(squares, "X"));
        }
      }
    }
  }
}

function calculateProbability(squares: any[], side: string) {
  const probs = [
    [0, 1, 2],
    [1, 2, 0],
    [0, 2, 1],
    [3, 4, 5],
    [3, 5, 4],
    [4, 5, 3],
    [6, 7, 8],
    [6, 8, 7],
    [7, 8, 6],
    [0, 3, 6],
    [0, 6, 3],
    [3, 6, 0],
    [1, 4, 7],
    [1, 7, 4],
    [4, 7, 1],
    [2, 5, 8],
    [2, 8, 5],
    [5, 8, 2],
    [0, 4, 8],
    [0, 8, 4],
    [4, 8, 0],
    [2, 4, 6],
    [2, 6, 4],
    [4, 6, 2],
  ];

  let sq = null;

  for (let i = 0; i < probs.length; i++) {
    const [a, b, c] = probs[i];
    if (
      squares[a] &&
      squares[a] === side &&
      squares[b] === side &&
      squares[c] === null
    ) {
      return c;
    }
  }
  return sq;
}

function gogo(squares: any[], side: string) {
  for (let i in squares) {
    if (squares[i] === side) {
      for (let j in lines) {
        const a = contains(lines[j], Number(i));
        if (a.value) {
          let t = -1;
          if (a.index === 0) {
            t = 1;
          } else if (a.index === 1) {
            t = 2;
          } else {
            t = 0;
          }

          if (squares[lines[j][t]] !== null) {
            if (t === 0) {
              return lines[j][2];
            } else if (t === 1) {
              return lines[j][0];
            } else {
              return lines[j][1];
            }
          } else {
            return lines[j][t];
          }
        }
      }
    }
  }
}

function contains(arr: number[], element: number) {
  let con = { value: false, index: -1 };

  for (let i in arr) {
    if (arr[i] === element) {
      con = { value: true, index: Number(i) };
    }
  }

  return con;
}
