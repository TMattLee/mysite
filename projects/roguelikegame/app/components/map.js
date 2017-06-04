import React from 'react';
import {Component} from 'react-dom';
import {connect} from 'react-redux';

import Header from './header'
import Square from './square';

import toggleOverlay from '../lib/toggleOverlay';
import restartGame from '../lib/restartGame';
import {itemList} from '../lib/items'
import processInput from '../lib/processInput';
import addNewEnemy from '../lib/addNewEnemy';
import addNewItem from '../lib/addNewItem';
import deleteEntities from '../lib/deleteEntities';
import updateMap from '../lib/updateMap';
import addMapArr from '../lib/addMapArr';




import {
  roomHorizontal,
  passage
} from '../lib/floors';

class Map extends React.Component{
  constructor(props){
    super(props);
    
    this.size = 40;
    this.takenSpaces = {};
    this.itemList = itemList.slice('');
    this.restartGame = restartGame.bind(this);
    this.addNewEnemy = addNewEnemy.bind(this);
    this.deleteEntities = deleteEntities.bind(this);
    this.addNewItem = addNewItem.bind(this);
    this.toggleOverlay = toggleOverlay.bind(this);
    this.updateMap = updateMap.bind(this);
    this.addMapArr = addMapArr.bind(this);

    this.drawEntities = this.drawEntities.bind(this);
    this.startNewGame = this.startNewGame.bind(this);
    this.bindEvents = this.bindEvents.bind(this);
    
    this.startNewGame();
  }
  
  startNewGame(){
    this.gameOver = false;
    this.restartGame(); // reset states
    this.mapArr = [];
    this.map1 = [];
    this.createMapArr();
    this.entityObj = {};
    
    this.bossArr = [  // Boss spawns randomly in 1 of 25 rooms
      0,0,0,0,0,
      0,0,0,0,0,
      0,0,0,0,0,
      0,0,0,0,0,
      0,0,0,0,1
    ];
    
    this.itemList = itemList.slice('');
    this.createRooms();
    this.addMapArr(this.mapArr);
    
  }
  
  bindEvents(){
    document.addEventListener("keydown", processInput.bind(this));
  }
  
  drawPlayer(){
    this.mapArr[this.props.playerPositionY][this.props.playerPositionX] = 'P';
  }
  
  drawMap(){
    return this.props.map.map( (item, i) => {
        return <div style={styles.boxRow} key={i} > {this.drawMapRow(item,i)} </div>;
      }
    );
  }
  
  drawMapRow(rowArr,rowIndex){
    return rowArr.map( (item,j) => {
      if( rowIndex !== 0 && 
        rowIndex !== this.mapArr.length - 1 &&
        j !== 0 &&
        j !== this.mapArr[rowIndex].length - 1) {
        return (
          <Square className="square" key={j} i={rowIndex} j ={j}
            val={this.mapArr[rowIndex][j]} 
            playerPosition={[
              this.props.playerPositionY,
              this.props.playerPositionX
            ]}
            showOverlay = {this.props.showOverlay}/> 
        );
      }
    });
  }
  
  createMapArr(){
    for(let i = 0; i < this.size+2; i++){
      let newArr = [];
      for(let j = 0; j < this.size + 30 + 2; j++){
        newArr.push("W");
      }
      this.mapArr.push(newArr);
      this.map1.push(newArr);
    }
  }
  
  updateMapArr(){
    for(let i = 0; i < this.size+2; i++){
      this.mapArr[i] = this.map1[i].slice(0);
    }
  }
  
  parseRoomHorizontal(a,b){
    
    if(this.bossArr.length > 0){
      let roomTypeVar = Math.floor(Math.random()*this.bossArr.length);
      if(this.bossArr[roomTypeVar]===1){
        this.parseRoomHorizontalBoss(a,b);
        
      }
      else{
        a = a + 4;
        b = b + 4;
        for(let i = 0; i < roomHorizontal.length; i++){
          for(let j = 0; j < roomHorizontal[i].length; j++){
            let rand = Math.floor(Math.random()*60 + 1);
            let y = i + a;
            let x = j + b;
            let label = y.toString() + '-' + x.toString();
            if(rand === 10){
              let enemyId = 'mon' + label;
              this.addNewEnemy(enemyId, y, x, 'E');
            }
            else if (rand === 7 && Object.keys(this.itemList).length > 0){
              if( Math.floor(Math.random()*10) % 2 === 0){
                let itemNum = Math.floor(Math.random()*this.itemList.length);
                let itemId = 'item' + label;
                this.addNewItem(itemId, y, x, this.itemList[itemNum]);
                this.itemList.splice(itemNum,1);
              }
            }
            this.map1[i+a][j+b] = roomHorizontal[i][j];
          }
        }
      }
      this.bossArr.splice(roomTypeVar,1);
    } 
    else{
      a = a + 4;
      b = b + 4;
      for(let i = 0; i < roomHorizontal.length; i++){
        for(let j = 0; j < roomHorizontal[i].length; j++){
          let rand = Math.floor(Math.random()*60 + 1);
          let y = i + a;
          let x = j + b;
          let label = y.toString() + '-' + x.toString();
          if(rand === 10){
            let enemyId = 'mon' + label;
            this.addNewEnemy(enemyId, y, x, 'E');
          }
          else if (rand === 7 && Object.keys(this.itemList).length > 0){
            if( Math.floor(Math.random()*10) % 2 === 0){
              let itemNum = Math.floor(Math.random()*this.itemList.length);
              let itemId = 'item' + label;
              this.addNewItem(itemId, y, x, this.itemList[itemNum]);
              this.itemList.splice(itemNum,1);
            }
          }
          this.map1[i+a][j+b] = roomHorizontal[i][j];
        }
      }
    }
  }
  
  parseRoomHorizontalBoss(a,b){
    a = a + 4;
    b = b + 4;
    for(let i = 0; i < roomHorizontal.length; i++){
      for(let j = 0; j < roomHorizontal[i].length; j++){
        this.map1[i+a][j+b] =roomHorizontal[i][j];
      }
    }
    let y = a + 2;
    let x = b + 5;
    let kind = 'B';
    let label = y.toString() + '-' + x.toString();
    let enemyId = 'mon' + label;
    this.addNewEnemy(enemyId, y, x, kind);
  }
  
  parsePassageHorizontal(a,b){
    a = a + 4;
    b = b + 4;
    for(let j = 0; j < passage.length; j++){
      this.map1[a][j+b] = passage[j];
    }
  }
  
  parsePassageVertical(a,b){
    a = a + 4;
    b = b + 4;
    for(let i = 0; i < passage.length; i++){
      this.map1[a+i][b] = passage[i];
    }
  }
  
  createRooms(){
    this.parseRoomHorizontal(2,2);
    this.parsePassageHorizontal(4,12);
    this.parseRoomHorizontal(2,14);
    this.parsePassageHorizontal(4,24);
    this.parseRoomHorizontal(2,26);
    this.parsePassageHorizontal(4,36);
    this.parseRoomHorizontal(2,38);
    this.parsePassageHorizontal(4,48);
    this.parseRoomHorizontal(2,50);
    
    this.parsePassageVertical(6,7);
    this.parsePassageVertical(6,19);
    this.parsePassageVertical(6,31);
    this.parsePassageVertical(6,43);
    this.parsePassageVertical(6,55);
    
    this.parseRoomHorizontal(8,2);
    this.parsePassageHorizontal(10,12);
    this.parseRoomHorizontal(8,14);
    this.parsePassageHorizontal(10,24);
    this.parseRoomHorizontal(8,26);
    this.parsePassageHorizontal(10,36);
    this.parseRoomHorizontal(8,38);
    this.parsePassageHorizontal(10,48);
    this.parseRoomHorizontal(8,50);
    
    this.parsePassageVertical(12,7);
    this.parsePassageVertical(12,19);
    this.parsePassageVertical(12,31);
    this.parsePassageVertical(12,43);
    this.parsePassageVertical(12,55);
    
    this.parseRoomHorizontal(14,2);
    this.parsePassageHorizontal(16,12);
    this.parseRoomHorizontal(14,14);
    this.parsePassageHorizontal(16,24);
    this.parseRoomHorizontal(14,26);
    this.parsePassageHorizontal(16,36);
    this.parseRoomHorizontal(14,38);
    this.parsePassageHorizontal(16,48);
    this.parseRoomHorizontal(14,50);
    
    this.parsePassageVertical(18,7);
    this.parsePassageVertical(18,19);
    this.parsePassageVertical(18,31);
    this.parsePassageVertical(18,43);
    this.parsePassageVertical(18,55);
    
    this.parseRoomHorizontal(20,2);
    this.parsePassageHorizontal(22,12);
    this.parseRoomHorizontal(20,14);
    this.parsePassageHorizontal(22,24);
    this.parseRoomHorizontal(20,26);
    this.parsePassageHorizontal(22,36);
    this.parseRoomHorizontal(20,38);
    this.parsePassageHorizontal(22,48);
    this.parseRoomHorizontal(20,50);
    
    this.parsePassageVertical(24,7);
    this.parsePassageVertical(24,19);
    this.parsePassageVertical(24,31);
    this.parsePassageVertical(24,43);
    this.parsePassageVertical(24,55);
    
    this.parseRoomHorizontal(26,2);
    this.parsePassageHorizontal(28,12);
    this.parseRoomHorizontal(26,14);
    this.parsePassageHorizontal(28,24);
    this.parseRoomHorizontal(26,26);
    this.parsePassageHorizontal(28,36);
    this.parseRoomHorizontal(26,38);
    this.parsePassageHorizontal(28,48);
    this.parseRoomHorizontal(26,50);
  }
  
  drawEntities(entities){

    for(let entityName in entities){
      if (entities.hasOwnProperty(entityName)) {
        let key = entities[entityName];
        this.mapArr[key.position[0][0]][key.position[0][1]] = key.kind;
      }
    }
  }

  componentWillMount(){
    this.bindEvents();
  }
  
  componentWillReceiveProps(nextProps){
    if(this.gameOver){
      console.log(nextProps);
    }
    
  }
  
  componentDidUpdate(){
    if(this.gameOver){
      setTimeout(this.startNewGame, 3000);
      this.gameOver = false;
    }
  }

  render(){
    this.gameOver = this.props.gameOver;
    if(!this.gameOver){
      this.drawEntities(this.props.enemyObj);
      this.drawEntities(this.props.itemObj);
      this.drawPlayer();
      return (
        <div style = {styles.gameContainer}> 
          <Header />
          { this.drawMap() }
          <div>
            <div onClick={this.toggleOverlay} style = {styles.gameButton}>
              Toggle Overlay
            </div>
          </div>
        </div>
      );
    }
    else{
      return (
        <div style = {styles.gameContainer}>
          <div style = { styles.bigText }>
          {this.props.message}
          </div> 
          <div style = { styles.text }>
           A New Game Will Begin Shortly
          </div> 
        </div>  
      );
    }
  }
}

const styles ={
  gameContainer:{
    display:          'flex',
    flexDirection:    'column',
    alignItems:       'center',
    justifyContent:   'center',
    width:            '700px',
    height:           '500px',
  },
  boxRow:{
    display:          'flex',
  },
  bigText:{
    display:          'flex',
    flexDirection:    'column',
    alignItems:       'center',
    color:            '#ccc',
    fontSize:         '3em',
    fontFamily:       'Impact',
  },
  text:{
    display:          'flex',
    flexDirection:    'column',
    alignItems:       'center',
    color:            '#ccc',
    fontSize:         '2em',
    fontFamily:       'Impact',
  },
  gameButton:{
    backgroundColor:  '#ccc',
    border:           'solid 2px grey',
    cursor:           'pointer',
    margin:           '20px auto',
  }
};

const mapStateToProps = (state) => ({
    playerPositionX:  state.currentState.playerPositionX,
    playerPositionY:  state.currentState.playerPositionY,
    weaponDamage:     state.currentState.weaponDamage,
    enemyObj:         state.currentState.enemyObj,
    map:              state.currentState.map,
    itemObj:          state.currentState.itemObj,
    bossIsDead:       state.currentState.bossIsDead,
    playerIsDead:     state.currentState.playerIsDead,
    gameOver:         state.currentState.gameOver,
    showOverlay:      state.currentState.showOverlay,
    message:          state.currentState.message,
});


export default connect(
  mapStateToProps
)(Map);