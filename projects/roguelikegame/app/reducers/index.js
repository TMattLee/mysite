import { combineReducers } from 'redux';
import * as actions from '../actions/index.js';



const initialState = { 
  playerHealth:     50,
  playerLevel:      1,
  playerExp:        100,
  playerWeapon:     'Fist',
  weaponDamage:     10,
  enemyObj:         {},
  itemObj:          {},
  bossIsDead:       false,
  playerIsDead:     false,
  playerPositionX:  7,
  playerPositionY:  7,
  showOverlay:      true,
  gameOver:         false,
  message:          '',
  map:              [],
};

function currentState(state=initialState,actions){
  let newEnemyObj = {};
  let newItemObj = {};
  let newMap = [];
  switch(actions.type){
    // Movement States
    case 'MOVE_UP':
      newMap = state.map;
      newMap[actions.prev_i][actions.prev_j] = 'S';
      return Object.assign({},state,{
        playerPositionY:  state.playerPositionY-1,
        map:              newMap,
      });
    case 'MOVE_DOWN':
      newMap = state.map;
      newMap[actions.prev_i][actions.prev_j] = 'S';
      return Object.assign({},state,{
        playerPositionY: state.playerPositionY+1,
        map:              newMap,
      });
    case 'MOVE_LEFT':
      newMap = state.map;
      newMap[actions.prev_i][actions.prev_j] = 'S';
      return Object.assign({},state,{
        playerPositionX: state.playerPositionX-1,
        map:              newMap,
      });
    case 'MOVE_RIGHT':
      newMap = state.map;
      newMap[actions.prev_i][actions.prev_j] = 'S';
      return Object.assign({},state,{
        playerPositionX: state.playerPositionX+1,
        map:              newMap,
      });
    
    // Item States  
    case 'ADD_ENEMY':
      newEnemyObj = Object.assign({},state.enemyObj );
      if(actions.kind === 'B'){
        newEnemyObj[actions.id] = {
          health:   500,
          position: [actions.position],
          kind:     actions.kind,
          level:    actions.level,
          exp:      actions.exp*actions.level*10,
        }
      }
      else {
        newEnemyObj[actions.id] = {
          health:   actions.health,
          position: [actions.position],
          kind:     actions.kind,
          level:    actions.level,
          exp:      actions.exp*actions.level,
        }
      }
      return Object.assign( {}, state, {enemyObj: newEnemyObj} );
    

    case 'DAMAGE_ENEMY':
      let playerDamage = state.weaponDamage + 
      Math.floor(Math.random()*(state.playerLevel*4 - 1) + 1);
      newEnemyObj = Object.assign({},state.enemyObj );
      newEnemyObj[actions.id].health -= playerDamage;
      if(newEnemyObj[actions.id].health <= 0){
        newMap = state.map;
        newMap[actions.pos_i][actions.pos_j] = 'S';
        if(newEnemyObj[actions.id].kind === 'B'){
          return Object.assign(
            {},
            state,
            {
              bossIsDead:   true, 
              message:      'YOU WIN',
              gameOver:     true,
            }
          );
        }
        if(newEnemyObj[actions.id].hasOwnProperty('exp')){
          let newExp = state.playerExp - newEnemyObj[actions.id].exp;
          let newPlayerLevel = state.playerLevel;
          let newPlayerHealth = state.playerHealth;
          if(newExp <= 0){
            newPlayerLevel = newPlayerLevel + 1;
            newExp = 100 + newPlayerLevel*5 - newExp;
            newPlayerHealth = newPlayerHealth + newPlayerLevel*4;
          }
          delete newEnemyObj[actions.id];
          return Object.assign(
            {},
            state,
            {
              playerHealth: newPlayerHealth,
              playerLevel:  newPlayerLevel,
              playerExp:    newExp,
              enemyObj:     newEnemyObj
            }
          );
        }
        else{
          delete newEnemyObj[actions.id];
          return Object.assign({},state,{enemyObj:newEnemyObj});
        }
      }
      else{
        return Object.assign({},state,{enemyObj: newEnemyObj});
      }
      
    case 'DAMAGE_PLAYER':
      if(state.enemyObj[actions.id] === undefined){
        return state;
      }
      let newPlayerHealth = state.playerHealth;
      let enemyLevel = state.enemyObj[actions.id].level;
      let enemyKind = state.enemyObj[actions.id].kind;
      let enemyDamage = 0;
      if(enemyKind === 'B'){
        enemyDamage = Math.floor(Math.random()*(20-5) + 5);
      }
      else{
        enemyDamage = Math.floor(Math.random()*(8-enemyLevel*2) + enemyLevel*2);
      }
      newPlayerHealth = newPlayerHealth - enemyDamage;
      if(newPlayerHealth <= 0){
        return Object.assign(
          {},
          state,
          {
            playerHealth: newPlayerHealth,
            playerIsDead: true,
            gameOver:     true,
            message:      'YOU LOSE!',
          }
        );
      }
      return Object.assign({},state,{playerHealth: state.playerHealth - enemyDamage});
      
    
    case 'ADD_ITEM':
      newItemObj = Object.assign({},state.itemObj );
      newItemObj[actions.id] = {
        id:       actions.id,
        health:   1,
        label:    actions.label,
        name:     actions.name,
        attack:   actions.attack,
        position: [actions.position],
        kind:     actions.kind,
      };
      return Object.assign({},state,{itemObj:newItemObj});
    
    case 'DELETE_ITEM':
      newItemObj = Object.assign({},state.itemObj );
      delete newItemObj[actions.id];
      return Object.assign({},state,{itemObj:newItemObj});
      
    case 'PICK_UP_ITEM':
      newItemObj = Object.assign({},state.itemObj );
      newItemObj[actions.id].health = -1;
      newMap = state.map;
      newMap[actions.pos_i][actions.pos_j] = 'S';
      if(newItemObj[actions.id].label === 'ITEM_HEALTH'){
        delete newItemObj[actions.id];
        return Object.assign(
          {},
          state,
          {
            playerHealth: state.playerHealth + 20,
            itemObj:      newItemObj,
            map:          newMap,
          }
        );
      }
      delete newItemObj[actions.id];
      if(state.itemObj[actions.id].attack > state.weaponDamage){
        return Object.assign(
          {},
          state,
          {
            playerWeapon: state.itemObj[actions.id].name,
            weaponDamage: state.itemObj[actions.id].attack,
            itemObj:      newItemObj,
            map:          newMap,
          }
        );
      }
      else{
        return Object.assign({}, state, { map: newMap });
      }
    case 'RESET_GAME':
      return Object.assign({},state, initialState );
      
      
    case 'TOGGLE':
      return Object.assign({},state, {showOverlay: !state.showOverlay} );
      
    case 'MAP_UPDATE':
      return state;
      
    case 'ADD_MAP':
      return Object.assign({},state,{map: actions.map});
      
    default:
      return state;
  }
}

const reducers = combineReducers({
 currentState
});

export default reducers;