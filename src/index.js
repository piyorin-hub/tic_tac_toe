import React from 'react';
import ReactDOM from 'react';
import './index.css';

// class Square extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       // Square コンポーネントに自分がクリックされたことを「覚えさせ」て、“X” マークでマスを埋める
//       value: null,
//     };
//   }
//   render() {
//     return (
//       <button className="square" onClick={()=> this.setState({value: 'X'})}>
//         {this.state.value}
//       </button>
//     );
//   }
// }
function Square(props) {
  return (
    <button className='square' onClick={props.onClick}>
      {props.value}
    </button>
  );
}

// Board にコンストラクタを追加し、初期 state として 9 個のマス目に対応する 9 個の null 値をセット
class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      // プレーヤが着手するたびに、どちらのプレーヤの手番なのかを決める xIsNext（真偽値）が反転,ゲームの状態が保存
      xIsNext: true,
    };
  }
  handleClick(i) {
    const squares = this.state.squares.slice();
    // squares を直接変更する代わりに、.slice() を呼んで配列のコピーを作成
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext,
    });
  }
  renderSquare(i) {
    return (
      // Board から Square に関数を渡すことにして、マス目がクリックされた時に Square にその関数を呼んでもらう
    <Square 
      value={this.state.squares[i]}
      onClick={() => this.handleClick(i)}
    />);
  }


  render() {
    const status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    const winner = calculateWinner(this.state.squares);
    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }
  
    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);


function calculateWinner(squares) {
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
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}