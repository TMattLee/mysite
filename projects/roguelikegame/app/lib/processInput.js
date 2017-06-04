import checkCollision from './checkCollision';

import {
  moveUp, 
  moveDown,
  moveLeft,
  moveRight,
  damageEnemy,
  damagePlayer,
  pickUpItem
} from '../actions/index';

function processInput(event){
  let colObj = {};      // collision object
  let prev = [this.props.playerPositionY,this.props.playerPositionX];
  switch(event.key){
    case 'ArrowUp':
      colObj = checkCollision(event.key,this);
      switch(colObj.type){
        case 'WALL':
          break;
        case 'ENEMY':
          this.props.dispatch(damageEnemy(colObj.id, colObj.pos_i, colObj.pos_j));
          this.props.dispatch(damagePlayer(colObj.id));
          break;
        case 'ITEM':
          this.props.dispatch(pickUpItem(colObj.id, colObj.pos_i, colObj.pos_j));
          break;
        case 'HEALTH':
          this.props.dispatch(pickUpItem(colObj.id, colObj.pos_i, colObj.pos_j));
          break;
        default:
          this.props.dispatch(moveUp(prev));
          break;
      }
      break;
    case 'ArrowDown':
      colObj = checkCollision(event.key,this);
      switch(colObj.type){
        case 'WALL':
          break;
        case 'ENEMY':
          this.props.dispatch(damageEnemy(colObj.id, colObj.pos_i, colObj.pos_j));
          this.props.dispatch(damagePlayer(colObj.id));
          break;
        case 'ITEM':
          this.props.dispatch(pickUpItem(colObj.id, colObj.pos_i, colObj.pos_j));
          break;
        case 'HEALTH':
          this.props.dispatch(pickUpItem(colObj.id, colObj.pos_i, colObj.pos_j));
          break;
        default:
          this.props.dispatch(moveDown(prev));
          break;
      }
      break;
      
    case 'ArrowLeft':
      colObj = checkCollision(event.key,this);
      switch(colObj.type){
        case 'WALL':
          break;
        case 'ENEMY':
          this.props.dispatch(damageEnemy(colObj.id, colObj.pos_i, colObj.pos_j));
          this.props.dispatch(damagePlayer(colObj.id));
          break;
        case 'ITEM':
          this.props.dispatch(pickUpItem(colObj.id, colObj.pos_i, colObj.pos_j));
          break;
        case 'HEALTH':
          this.props.dispatch(pickUpItem(colObj.id, colObj.pos_i, colObj.pos_j));
          break;
        default:
          this.props.dispatch(moveLeft(prev));
          break;
  
      }
      break;
    case 'ArrowRight':
      colObj = checkCollision(event.key,this);
      switch(colObj.type){
        case 'WALL':
          break;
        case 'ENEMY':
          this.props.dispatch(damageEnemy(colObj.id, colObj.pos_i, colObj.pos_j));
          this.props.dispatch(damagePlayer(colObj.id));
          break;
        case 'ITEM':
          this.props.dispatch(pickUpItem(colObj.id, colObj.pos_i, colObj.pos_j));
          break;
        case 'HEALTH':
          this.props.dispatch(pickUpItem(colObj.id, colObj.pos_i, colObj.pos_j));
          break;
        default:
          this.props.dispatch(moveRight(prev));
          break;
      }
      break;
    default:
      break;
  }
}

export default processInput;