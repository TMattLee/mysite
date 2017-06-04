import {
  addEnemy
} from '../actions/index';

function addNewEnemy(enemyId,i,j,kind){
  this.props.dispatch(addEnemy(enemyId,i,j,kind));
}

export default addNewEnemy;