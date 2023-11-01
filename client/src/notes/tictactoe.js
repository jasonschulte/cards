// import React from 'react';
// import ReactDOM from 'react-dom';
// import './index.css';
// import App from './App';
// import * as serviceWorker from './serviceWorker';
//
// ReactDOM.render(<App />, document.getElementById('root'));
//
// // If you want your app to work offline and load faster, you can change
// // unregister() to register() below. Note this comes with some pitfalls.
// // Learn more about service workers: http://bit.ly/CRA-PWA
// serviceWorker.unregister();
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
  const className = ['square'];
  if(props.winner){
    className.push('winning');
  }
  return (
    <button className={className.join(' ')} onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square
        key={i}
        winner={this.props.winner.includes(i)}
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    )
  }
  render() {
    const board = []
    for (let row=0;row<3;row++){
      const renderRow = []
      for (let col=0;col<3;col++){
        renderRow.push(this.renderSquare((row * 3) + col));
      }
      board.push(<div key={row} className="board-row">{renderRow}</div>)
    }

    return (
      <div>
        {board}
      </div>
    );
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
      }],
      stepNumber: 0,
      xIsNext: true,
    };
    this.aiRecursionCounter = 0;
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[this.state.stepNumber];
    const squares = current.squares.slice();
    if (i === null){
      const aiBoard = squares.map(function(val,i){
        return (val ? val : i)
      })
      this.aiRecursionCounter = 0;
      const aiMove = this.getAiMove(aiBoard,this.props.aiPlayer);
      console.log(this.aiRecursionCounter);
      console.log(aiMove);
      i = aiMove.index
    }
    if (
      squares[i] ||
      !squares.includes(null) ||
      calculateWinner(squares).length
    ) {
      return;
    }
    const row = (i / 3) | 0;
    const col = (i % 3);
    const movePos = { row: row, col: col };
    squares[i] = this.state.xIsNext ? 'X' : 'O';

    this.setState({
      history: history.concat([{
        squares: squares,
        movePos: movePos,
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }

  availableSquares(squares){
    return squares.filter(value => !isNaN(value));
  }

  getAiMove(squares,player){
    this.aiRecursionCounter++;
    const aiPlayer = this.props.aiPlayer
    const huPlayer = (aiPlayer === 'X' ? 'O' : 'X')
    const availableSquares = this.availableSquares(squares);
    const winner = calculateWinner(squares);
    if (availableSquares.length === 0){
      return {score: 0};
    }
    if (winner.length){
      const player = squares[winner[0]]
      if(player === huPlayer){
        return {score: -10};
      }else{
        return {score: 10};
      }
    }
    let moves = [];
    for (let i = 0; i< availableSquares.length; i++){
      let move = {};
      move.index = squares[availableSquares[i]];
      squares[availableSquares[i]] = player;
      let result = this.getAiMove(squares,(player === aiPlayer ? huPlayer : aiPlayer))
      move.score = result.score;
      squares[availableSquares[i]] = move.index
      moves.push(move);
    }
    let bestMove;
    if(player === aiPlayer){
      let bestScore = -10000;
      for(let i = 0; i < moves.length; i++){
        if(
          moves[i].score > bestScore
        ){
          bestScore = moves[i].score;
          bestMove = i;
        }
      }
    }else{
      let bestScore = 10000;
      for(let i = 0; i < moves.length; i++){
        if(
          moves[i].score < bestScore
        ){
          bestScore = moves[i].score;
          bestMove = i;
        }
      }
    }
    return moves[bestMove];
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    })
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);
    let status;
    if (winner.length) {
      const player = current.squares[winner[0]]
      status = 'Winner: ' + player ;
    } else if (history.length < 10) {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    } else {
      status = 'Game is a Draw';
    }

    if(
      (this.state.xIsNext && this.props.aiPlayer === 'X') ||
      (!this.state.xIsNext && this.props.aiPlayer === 'O')
    ){
      setTimeout(this.handleClick.bind(this,null),100);
      // this.handleClick(null);
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
            winner={winner}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <MoveList
            moves={this.state.history}
            currentStep={this.state.stepNumber}
            onClick={(move) => this.jumpTo(move)}
          />
        </div>
      </div>
    );
  }
}

class MoveList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ascending: true,
    };
  }
  renderMoves(){
    const moves = this.props.moves.map((step, move) => {
      let desc = '', player = '', pos = '';
      if(move){
        desc += 'Go to move #' + move + ' ';
        player += move % 2 === 0 ? 'O' : 'X';
        pos += '( ' + step.movePos.row + ' , ' + step.movePos.col + ' )';
      }else{
        desc += ('Go to game start');
      }
      return (
        <li key={move}>
          <button
            className={move === this.props.currentStep ? 'currentStep' : ''}
            onClick={() => this.props.onClick(move)}>{desc}
          </button>
          <span className='player'>{player}</span>
          <span className='pos'>{pos}</span>
        </li>
      );
    })
    if(!this.state.ascending){
      moves.reverse();
    }
    return moves;
  }
  reverseSort(){
    this.setState({
      ascending: !this.state.ascending
    })
  }
  render() {
    const charCode = ( this.state.ascending ? 8595 : 8593 );
    return (
      <div className="moveList">
        <button
          className="sortMoves"
          onClick={() => this.reverseSort()}
        >
          Sort moves {String.fromCharCode(charCode)}
        </button>
        <ol>{this.renderMoves()}</ol>
      </div>
    )
  }
}

// ========================================

ReactDOM.render(
  <Game
    aiPlayer='O'
  />,
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
    if (
      squares[a] &&
      squares[a] === squares[b] &&
      squares[a] === squares[c]
    ) {
      return lines[i]
    }
  }
  return [];
}
