function checkCollision(key, args){
  let collisionType = null;
  let nextSquare = null;
  const { mapArr,props } = args;
  let i = null;
  let j = null;
  let id = '';

  
  switch(key){
    case 'ArrowUp':
      i = props.playerPositionY-1;
      j = props.playerPositionX;
      nextSquare = mapArr[props.playerPositionY-1][props.playerPositionX];
      break;
    case 'ArrowDown':
      i = props.playerPositionY+1;
      j = props.playerPositionX;
      nextSquare = mapArr[props.playerPositionY+1][props.playerPositionX];
      break;
    case 'ArrowLeft':
      i = props.playerPositionY;
      j = props.playerPositionX-1;
      nextSquare = mapArr[props.playerPositionY][props.playerPositionX-1];
      break;
    case 'ArrowRight':
      i = props.playerPositionY;
      j = props.playerPositionX+1;
      nextSquare = mapArr[props.playerPositionY][props.playerPositionX+1];
      break;
    default:
      return;
  }
  
  switch(nextSquare){
    case 'S':
      return {
        type: 'EMPTY'
        };
    case 'E':
      id = 'mon' + i.toString()+ '-' + j.toString();
      return {
        type: 'ENEMY',
        id:   id, 
        pos_i:    i,
        pos_j:    j
      };
    case 'B':
      id = 'mon' + i.toString()+ '-' + j.toString();
      return {
        type: 'ENEMY',
        id:   id, 
        pos_i:    i,
        pos_j:    j
      };
    case 'H':
      id = 'item' + i.toString()+ '-' + j.toString();
     return {
        type: 'HEALTH',
        id:   id, 
        pos_i:    i,
        pos_j:    j
      };
    case 'I':
      id = 'item' + i.toString()+ '-' + j.toString();
      return {
        type: 'ITEM',
        id:   id, 
        pos_i:    i,
        pos_j:    j
      };
  

    default:
      return {type: 'WALL'};
  }
}

export default checkCollision;