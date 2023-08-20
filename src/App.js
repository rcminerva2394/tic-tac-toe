import React, { useReducer } from 'react';
import './App.css';

const MAKE_MOVE = 'make_move';
const RESET = 'reset';

const initialState = {
  board: [0, 1, 2, 3, 4, 5, 6, 7, 8],
  player: 'X',
};

function isWinning(board, player) {
  if (
    // All winning combinations
    (board[0] === player && board[1] === player && board[2] === player) ||
    (board[3] === player && board[4] === player && board[5] === player) ||
    (board[6] === player && board[7] === player && board[8] === player) ||
    (board[0] === player && board[4] === player && board[8] === player) ||
    (board[2] === player && board[4] === player && board[6] === player) ||
    (board[0] === player && board[3] === player && board[6] === player) ||
    (board[1] === player && board[4] === player && board[7] === player) ||
    (board[2] === player && board[5] === player && board[8] === player)
  ) {
    return true;
  } else {
    return false;
  }
}

function checkWinner(board, player, freeSpots) {
  if (isWinning(board, player)) {
    return `Player ${player} has won!`;
  } else if (freeSpots.length === 0) {
    return `It's a draw!`;
  }
}

const reducer = (state, action) => {
  switch (action.type) {
    case MAKE_MOVE:
      const newBoard = state.board.map((cell) => {
        if (cell === action.index) {
          return state.player;
        }
        return cell;
      });

      const freeSpots = newBoard.filter((cell) => cell !== 'X' && cell !== 'O');

      const winner = checkWinner(newBoard, state.player, freeSpots);
      return {
        ...state,
        board: newBoard,
        player: state.player === 'X' ? 'O' : 'X',
        freeSpots,
        winner,
      };

    case RESET:
      return initialState;

    default:
      return state;
  }
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleClick = (i) => {
    if (!state.winner) {
      dispatch({ type: MAKE_MOVE, index: i });
    }
  };

  const cellStyle = (cell) => {
    const style = {
      backgroundColor: cell === 'X' ? '#fdba74' : '#22d3ee',
      color: cell === 'X' ? '#431407' : '#083344',
    };
    return style;
  };

  const cells = state.board.map((cell, i) => {
    if (typeof cell === 'number') {
      return <p key={i} onClick={() => handleClick(i)}></p>;
    }

    return (
      <p key={i} style={cellStyle(cell)}>
        {cell}
      </p>
    );
  });

  return (
    <>
      <div className='app'>
        <h1>Tic Tac Toe</h1>
        {state.winner && (
          <div>
            <p style={{ fontSize: '1.5rem' }}>{state.winner}</p>
            <button
              className='btn-reset'
              onClick={() => dispatch({ type: RESET })}
            >
              Play another game
            </button>
          </div>
        )}
        <div className='board'>{cells}</div>
      </div>
    </>
  );
}

export default App;
