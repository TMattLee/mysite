import React from 'react';
import { render } from 'react-dom';
import Box from './box.jsx';

export default class GameOfLife extends React.Component{
  constructor(){
    super();
    this.size = 30;
    this.gameArr =[];
    for(let i = 0; i < this.size+2; i++){
      let newArr = []
      for(let j = 0; j < this.size*2+2; j++){
        newArr.push(0);
      }
      this.gameArr.push(newArr);
    }
    
    this.drawGrid = this.drawGrid.bind(this);
    this.drawRow = this.drawRow.bind(this);
    this.getLivingCells =  this.getLivingCells.bind(this);
    this.getFinalGrid = this.getFinalGrid.bind(this);
    this.updateArr = this.updateArr.bind(this);
    this.gameLoop = this.gameLoop.bind(this);
    this.printArr = this.printArr.bind(this);
    this.checkAlive = this.checkAlive.bind(this);
    this.assignRandom = this.assignRandom.bind(this);
    this.clearBoard = this.clearBoard.bind(this);
    this.start = this.start.bind(this);
    this.stop = this.stop.bind(this);
    this.swapColors = this.swapColors.bind(this);
    this.changeGridSetup = this.changeGridSetup.bind(this);
    
    this.assignRandom();
    
    this.isRunning = false;
    this.generations = 0;
    
    this.state = {
      showArr: this.gameArr,
      isAlive: true,
      running: false,
    }
  }
  
  assignRandom(){
    for(let i = 1; i < this.gameArr.length - 1; i++){
      for(let j = 1; j < this.gameArr[i].length - 1; j++){
        let ran =  Math.floor(Math.random()*(1+1));
        this.gameArr[i][j] = ran;
      }
    }
  }
  
  start(){
    if(!this.isRunning){
      this.gameGo = setInterval(this.gameLoop, 100);
      this.isRunning = true;
      this.setState({
        isAlive: true,
        running: this.isRunning,
      });
    }
  }
  
  stop(){
    clearInterval(this.gameGo);
    this.isRunning = false;
    this.setState({
      running: this.isRunning,
    });
  }
  
  clearBoard(){
    if(!this.isRunning){
      for(let i = 1; i < this.gameArr.length - 1; i++){
        for(let j = 1; j < this.gameArr[i].length - 1; j++){
          this.gameArr[i][j] = 0;
        }
      }
      this.generations = 0;
      this.updateArr();
     }
  }
  
  drawGrid(){
    return this.gameArr.map( (item, i) => {
        return <div style={styles.boxRow} key={i} > {this.drawRow(item,i)} </div>;
      }
    );
  }
  
  drawRow(rowArr,rowIndex){
    return rowArr.map( (item,j) => {
      if( rowIndex !== 0 && 
        rowIndex !== this.gameArr.length - 1 &&
        j !== 0 &&
        j !== this.gameArr[rowIndex].length - 1) {
        return (
          <Box className="box" key={j} i={rowIndex} j ={j}
            handleClick={this.swapColors} val={this.gameArr[rowIndex][j]}
          />
        );
      }
    });
  }
  
  swapColors(i,j){
    if(!this.isRunning){
      console.log('swap ', i);
      if( this.gameArr[i][j] === 1){
        this.gameArr[i][j] = 0;
        this.updateArr();
      }
      else if(this.gameArr[i][j] === 0){
        this.gameArr[i][j] = 1;
        this.updateArr();
      }
    }
  }
  
  changeGridSetup(n){
    if(!this.isRunning){
      this.generations = 0;
      this.size = n;
      this.gameArr =[];
      for(let i = 0; i < this.size+2; i++){
        let newArr = []
        for(let j = 0; j < this.size*2+2; j++){
          newArr.push(0);
          console.log('loop');
        }
        this.gameArr.push(newArr);
      }
      console.log(this.gameArr, 'lame',n);
      this.assignRandom();
      this.start();
      
    }
  }
  
  
  getCount(i,j){
    let total = 0;
    if(this.gameArr[i-1][j-1] === 1){
      total++;
    }
    if(this.gameArr[i-1][j] === 1){
      total++;
    }
    if(this.gameArr[i-1][j+1] === 1){
      total++;
    }
    if(this.gameArr[i][j-1] === 1){
      total++;
    }
    if(this.gameArr[i][j+1] === 1){
      total++;
    }
    if(this.gameArr[i+1][j-1] === 1){
      total++;
    }
    if(this.gameArr[i+1][j] === 1){
      total++;
    }
    if(this.gameArr[i+1][j+1] === 1){
      total++;
    }
    return total;
  }
  
  getLivingCells(larr){
    for(let i = 1; i < this.gameArr.length - 1; i++){
      for(let j = 1; j < this.gameArr[i].length - 1; j++){
        let count = this.getCount(i,j);
        if( (count === 2 || count === 3) && (this.gameArr[i][j] === 1)){
          larr[i][j] = 1;
        }
        else if( (count === 3) && (this.gameArr[i][j] === 0)){
          larr[i][j] = 1;
        }
        else{
          larr[i][j] = 0;
        }
      }
    }
    return larr;
  }
  
  getFinalGrid(liveArr){
   this.gameArr = liveArr;
  }
  
  updateArr(){
    this.setState({
      showArr: this.gameArr,
    });
  }
  
  gameLoop(){
    this.generations++;
    this.checkAlive(this.gameArr);
    if(this.state.isAlive){
      let newArr = this.gameArr.map((tempArr) => {
        return tempArr.slice();
      });
      let liveArr = this.getLivingCells(newArr);
      this.getFinalGrid(liveArr);
      this.updateArr();
    }
    
  }
  
  printArr(arr){
    for(let i = 1; i < this.gameArr.length - 1; i++){
      let row = '';
      for(let j = 1; j < this.gameArr[i].length - 1; j++){
        row += arr[i][j].toString() + ' ';
      }
      console.log('row ', i, ' ', row);
    }
  }
  
  componentDidMount(){
    this.start();
  }
  
  componentWillUnmount(){
    this.stop();
  }
  
  checkAlive(arr){
    let total = 0;
    for(let i = 1; i <  this.gameArr.length - 1; i++){
      for(let j = 1; j <  this.gameArr.length - 1; j++){
        if(arr[i][j] === 1){
          return;
        }
      }
    }
    this.setState({
      isAlive: false,
    });
    this.stop();
  }
  
  render(){
    return (
      <div style = {styles.boardContainer}>
        <div>
          { this.drawGrid() }
        </div>
        <div style = {styles.buttonContainer}>
          <div style = {styles.button} onClick={this.start}>
            start
          </div>
          <div style = {styles.button} onClick={this.stop}>
            stop
          </div>
          <div style = {styles.button} onClick={this.clearBoard}>
            clear
          </div>
          <div style = {styles.button} onClick={this.changeGridSetup.bind(this,20) }>
            20x40
          </div>
          <div style = {styles.button} onClick={this.changeGridSetup.bind(this,30) }>
            30x60
          </div>
        
        </div>
        <div style = {styles.buttonContainer}>
          <div style = {styles.displayGenerations} >
            Generations: {this.generations}
          </div>
          
        </div>
      </div>
    );
  }
}

const styles = {
  boxBlack:{
    display:          'flex',
    margin:           '2px',
    width:            '10px',
    height:           '10px',
    backgroundColor:  '#555',
  },
  boxPink:{
    display:          'flex',
    margin:           '2px',
    width:            '10px',
    height:           '10px',
    backgroundColor:  '#c00',
  },
  boxRow:{
    display:          'flex',
  },
  boardContainer:{
    display:          'flex',
    flexDirection:    'column',
    justifyContent:   'center',
    border:           '2px solid black'
  },
  buttonContainer:{
    display:          'flex',
    justifyContent:   'space-around',
    margin:           '5px',
  },
  button:{
    display:          'flex',
    justifyContent:   'center',
    alignItems:       'center',
    width:            '50px',
    height:           '20px',
    backgroundColor:  'red',
    color:            '#ccc',
    cursor:           'pointer',
    border:           'solid 2px #222'
  },
  displayGenerations:{
    display:          'flex',
    justifyContent:   'center',
    alignItems:       'center',
    width:            '200px',
    height:           '20px',
    color:            '#ccc',
    margin:           '5px',
  }
};