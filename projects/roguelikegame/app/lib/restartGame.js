import {resetGame, setGameOver} from '../actions/index';

function restartGame(){
  this.props.dispatch(resetGame());
}

export default restartGame;