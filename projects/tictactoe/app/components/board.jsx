import React from 'react';
import {render} from 'react-dom';
import Display from './display.jsx';
import ScoreBoard from './score-board.jsx';
import DifficultyBar from './difficulty.jsx';



class TicTacToeBoard extends React.Component{
  constructor(props){
    super(props);
    
    // Assign game default states
    this.state = {
      '0': '',
      '1': '',
      '2': '',
      '3': '',
      '4': '',
      '5': '',
      '6': '',
      '7': '',
      '8': '',
      message: 'PICK A LETTER',
      output: '',
      currentDifficulty: 'NORMAL',
      
    };
    
    this.updateBoard = this.updateBoard.bind(this);
    this.selectSquare = this.selectSquare.bind(this);
    this.newGame = this.newGame.bind(this);  
    this.checkForMatch = this.checkForMatch.bind(this);
    this.getComputerMove = this.getComputerMove.bind(this);
    this.pickLetter = this.pickLetter.bind(this);
    this.getRandomProperty = this.getRandomProperty.bind(this);
    
    this.rotateClockwise  = this.rotateClockwise.bind(this);
    this.rotateAntiClockwise  = this.rotateAntiClockwise.bind(this);
    this.flipVertically = this.flipVertically.bind(this);
    this.flipHorizontally = this.flipHorizontally.bind(this);
    
    this.computerSelect = this.computerSelect.bind(this);
    this.doCenterLogic = this.doCenterLogic.bind(this);
    this.doCornerLogic = this.doCornerLogic.bind(this);
    this.doEdgeLogic = this.doEdgeLogic.bind(this);
    this.computerSelectRandomSquare = this.computerSelectRandomSquare.bind(this);
    
    this.tryToWin = this.tryToWin.bind(this);
    this.checkWinAngle = this.checkWinAngle.bind(this);
    this.changeDifficulty = this.changeDifficulty.bind(this);
    
    this.printArr = this.printArr.bind(this);
    this.outputMessage = '';
    this.playerLetter = '';
    this.computerLetter = '';
    this.mode = 'NORMAL';
    this.mustBlock = false;
    this.humansFirstMove = '';
    this.wins = 0;
    this.losses = 0;
    this.draws = 0;
    
  }
  componentWillMount(){
    // Apply new game parameters
    this.newGame();
  }
  
  newGame(){
    
    // Reset games variables and update states
    this.moves = ['','','','','','','','',''];
    this.selected = {};
    this.notSelected ={
      '0': 0,
      '1': 1,
      '2': 2,
      '3': 3,
      '4': 4,
      '5': 5,
      '6': 6,
      '7': 7,
      '8': 8,  
    };
    
    this.transSelected = this.selected;
    this.transNotSelected = this.notSelected;
    
    this.firstMove = true;
    this.cornerSelected = false;
    this.centerSeleected = false;
    this.edgeSeleected = false;
    this.mustBlock = false;
    this.done = false;
    this.computerTurn = false;
    
    this.currentPlayer = '';     
    this.playerLetter = '';
    this.computerLetter = '';
    this.message = "PICK A LETTER";
    this.outputMessage = '';
    this.humansFirstMove = '';
    
    this.updateBoard();
    this.copyMoves = this.moves;
    this.transform = '';
    
  }
  
  changeDifficulty(difficulty){
    this.mode = difficulty;
    this.setState({
      currentDifficulty: difficulty,
    });
  }
  
  getRandomProperty(obj) {
    
    // Selects a random property.
    // Allows CPU to pick a random square.
    
    let keys = Object.keys(obj);
    return obj[keys[ keys.length * Math.random() << 0]];
  }
  
  pickLetter(letter){
    
    //play selects x or o
    if(this.playerLetter === ""){
        if(letter === "X"){
        this.playerLetter = "XH";
        this.computerLetter = "OC";
        this.outputMessage = "YOU ARE X";
      }
      else{
        this.playerLetter = "OH";
        this.computerLetter = "XC";
        this.outputMessage = "YOU ARE O";
      }
      this.message = "PLAY!";
      this.updateBoard();
    }    
  }
  
  selectSquare(num){
    
    // Player selects from on open square on their turn.
    // If a previously selected square is clicked then 
    // nothing should happen.
    
    if(!(num in this.selected) && this.playerLetter !== '' && !this.done){
      if(this.firstMove){
        switch(num){
          case 0:
            this.cornerSelected = true;
            this.humansFirstMove = 0;
            break;
          case 2:
            this.cornerSelected = true;
            this.humansFirstMove = 2;
            break;
          case 6:
            this.cornerSelected = true;
            this.humansFirstMove = 6;
            break;
          case 8:
            this.cornerSelected = true;
            this.humansFirstMove = 8;
            break;
          case 4:
            this.centerSelected = true;
            break;  
          default:
            this.humansFirstMove = num;
            break;
        }
        this.firstMove = false;
      }
      this.computerTurn = false;
      this.selected[num] = this.playerLetter[0];
      delete this.notSelected[num];
      this.moves[num] = this.playerLetter;
      this.checkForMatch();
      
      this.updateBoard(); 
      if(!this.done){
        this.getComputerMove();
      }  
      
    }
  }
  
  computerSelect(num){
    this.selected[num] = this.computerLetter[0];
    delete this.notSelected[num];
    this.moves[num] = this.computerLetter;
  }
  
  getComputerMove(){
    
    // Computer selects from a random unoccupied
    // square on easy. Hard mode to be implemented
    // later.
    this.computerTurn = true;
    if(this.mode === 'EASY'){
      //Computer is completely random
     
      this.computerSelectRandomSquare();
      
      
      //console.log('computer chose: ', num, ' from ', this.notSelected);  
    }
    else if(this.mode === 'NORMAL'){
      // Computer is random but blocks and goes for the win
     
      let computerCanWin = this.tryToWin('C');
      let humanCanWin = this.tryToWin('H');
      if(computerCanWin){
        this.computerSelect(computerCanWin);        
      }
      else if(humanCanWin){
        this.computerSelect(humanCanWin);        
      }      
      else{
         this.computerSelectRandomSquare();
      }     
      
    }
    else{
      // Computer will do its best to win or draw.
      // 
      // Logic path will be determined based
      // on which move the player makes first.
      let computerCanWin = this.tryToWin('C');
      let humanCanWin = this.tryToWin('H');
      if(computerCanWin){
        this.computerSelect(computerCanWin);        
      }
      else if(humanCanWin){
        this.computerSelect(humanCanWin);        
      }      
      else{
        if(this.cornerSelected){
          this.doCornerLogic();          
        }
        else if(this.centerSelected){          
          this.doCenterLogic();          
        }
        else{
          this.doEdgeLogic();
        }
      }
      
    }
    this.checkForMatch();
    this.updateBoard(); 

    this.computerTurn = false;
  }
  
  
  doCornerLogic(){
    console.log('humanselect first ', this.humansFirstMove);
    if(!(4 in this.selected)){
      this.computerSelect(4);      
    }
    else{
      
      let currentState = [];
      switch(this.humansFirstMove){
        case 0:
          currentState = this.moves.slice('');
          break;
        case 2:
          this.transform ="FV";
          console.log(this.transform);
          currentState = this.flipVertically(this.moves.slice(''));
          break;
        case 6:
          this.transform ="FH";
          console.log('fh');
          currentState = this.flipHorizontally(this.moves.slice(''));
          break;
        case 8:
          this.transform = "RC";
          console.log('rc');
          currentState = this.rotateClockwise(this.moves.slice(''), 2);
          break;
      }
      console.log(currentState, this.transform);
      if(currentState[8] === ''){
        switch(this.transform){
          
          case "FV":
            this.computerSelect(6);
            console.log('flipped vert');
            break;
          case "FH":
            this.computerSelect(2);
            console.log('horz');
            break;
          case "RC":
            this.computerSelect(0);
            console.log('rotated');
            break;
          case '':
            this.computerSelect(8);
            console.log('no trans');
            break;

        }
        this.computerSelect(4);
      }
      else if(currentState[8][1] === 'H'){
        if(1 in this.notSelected){
          this.computerSelect(1);
        }
        else if(3 in this.notSelected){
          this.computerSelect(3);
        }
        else if(5 in this.notSelected){
          this.computerSelect(5);
        }
        else if(7 in this.notSelected){
          this.computerSelect(7);
        }
        else{
          this.computerSelectRandomSquare();
        }
      }
      else if(currentState[8][1] === 'C'){
        if(0 in this.notSelected){this.computerSelect(0);}
        else if (2 in this.notSelected){this.computerSelect(2);}
        else if (6 in this.notSelected){this.computerSelect(6);}
        else if (8 in this.notSelected){this.computerSelect(8);}
      }
      else{
        this.computerSelectRandomSquare();   
      }      
    }
    this.transform = '';
  }
  
  doCenterLogic(){
    if(!this.mustBlock){
      this.computerSelect(0);
      
      this.mustBlock = true;
    }
    else{
      
      if(!(2 in this.selected)){
        this.computerSelect(2);
      }
      else{
        let ranNum = this.getRandomProperty(this.notSelected);     
        console.log('need a random ', ranNum);
        this.computerSelect(ranNum);       
      }
      
    }
  }
  
  doEdgeLogic(){
    // random for now
    this.computerSelectRandomSquare();
  }
  
  computerSelectRandomSquare(){
    let ranNum = this.getRandomProperty(this.notSelected);     
    console.log('need a random ', ranNum);
    this.computerSelect(ranNum);
  }
  
  tryToWin(chr){
    
    // Look for win on top row. second element
    // in array denotes who moves where.
    if(this.checkWinAngle(0,1,2,chr)){ return this.checkWinAngle(0,1,2,chr);}
    if(this.checkWinAngle(0,2,1,chr)){ return this.checkWinAngle(0,2,1,chr);} 
    if(this.checkWinAngle(1,2,0,chr)){ return this.checkWinAngle(1,2,0,chr);} 
    
    // Middle row
    if(this.checkWinAngle(3,4,5,chr)){ return this.checkWinAngle(3,4,5,chr);} 
    if(this.checkWinAngle(3,5,4,chr)){ return this.checkWinAngle(3,5,4,chr);} 
    if(this.checkWinAngle(5,4,3,chr)){ return this.checkWinAngle(5,4,3,chr);} 
    
    // Bottom row
    if(this.checkWinAngle(6,7,8,chr)){ return this.checkWinAngle(6,7,8,chr);} 
    if(this.checkWinAngle(6,8,7,chr)){ return this.checkWinAngle(6,8,7,chr);} 
    if(this.checkWinAngle(7,8,6,chr)){ return this.checkWinAngle(8,7,6,chr);} 
    
    // First column
    if(this.checkWinAngle(0,3,6,chr)){ return this.checkWinAngle(0,3,6,chr);} 
    if(this.checkWinAngle(0,6,3,chr)){ return this.checkWinAngle(0,6,3,chr);} 
    if(this.checkWinAngle(6,3,0,chr)){ return this.checkWinAngle(6,3,0,chr);} 
    
    // Second column
    if(this.checkWinAngle(1,4,7,chr)){ return this.checkWinAngle(1,4,7,chr);} 
    if(this.checkWinAngle(1,7,4,chr)){ return this.checkWinAngle(1,7,4,chr);} 
    if(this.checkWinAngle(7,4,1,chr)){ return this.checkWinAngle(7,4,1,chr);} 
    
    // Third column
    if(this.checkWinAngle(2,5,8,chr)){ return this.checkWinAngle(2,5,8,chr);} 
    if(this.checkWinAngle(2,8,5,chr)){ return this.checkWinAngle(2,8,5,chr);} 
    if(this.checkWinAngle(8,5,2,chr)){ return this.checkWinAngle(8,5,2,chr);} 
    
    // On diagonal
    if(this.checkWinAngle(0,4,8,chr)){ return this.checkWinAngle(0,4,8,chr);} 
    if(this.checkWinAngle(0,8,4,chr)){ return this.checkWinAngle(0,8,4,chr);} 
    if(this.checkWinAngle(8,4,0,chr)){ return this.checkWinAngle(8,4,0,chr);} 
    
    // Off diagonal
    if(this.checkWinAngle(2,4,6,chr)){ return this.checkWinAngle(2,4,6,chr);} 
    if(this.checkWinAngle(2,6,4,chr)){ return this.checkWinAngle(2,6,4,chr);} 
    if(this.checkWinAngle(6,4,2,chr)){ return this.checkWinAngle(6,4,2,chr);} 
    
    return false;    
  }
  
  checkWinAngle(num1,num2,emptySpace,letter){
    
    if(!this.cornerSelected){
      if(this.moves[num1][1] === letter && 
        this.moves[num1][1] === this.moves[num2][1] && 
        this.moves[emptySpace] === '' ){
          console.log('Winning Position is: ', emptySpace);
          return emptySpace; 
      }
      else{
        return false;
      }
    }
    else{
      if(this.copyMoves[num1][1] === letter && 
        this.copyMoves[num1][1] === this.copyMoves[num2][1] && 
        this.copyMoves[emptySpace] === '' ){
          console.log('Winning Position is: ', emptySpace);
          return emptySpace; 
      }
      
      return false;
      
    }
  }
  
  rotateClockwise(arr,num){
    let temp = arr.slice('');
    let outArr = [];
    for(let i = 0; i < num ; i++){
      outArr.push(temp[6]);
      outArr.push(temp[3]);
      outArr.push(temp[0]);
      outArr.push(temp[7]);
      outArr.push(temp[4]);
      outArr.push(temp[1]);
      outArr.push(temp[8]);
      outArr.push(temp[5]);
      outArr.push(temp[2]);
      temp = outArr.slice('');
      outArr = [];
      this.printArr(temp);
    }
    return temp;
  }
  
  rotateAntiClockwise(arr,num){
    let temp = arr.slice('');
    let outArr = [];
    for(let i = 0; i < num ; i++){
      outArr.push(temp[2]);
      outArr.push(temp[5]);
      outArr.push(temp[8]);
      outArr.push(temp[1]);
      outArr.push(temp[4]);
      outArr.push(temp[7]);
      outArr.push(temp[0]);
      outArr.push(temp[3]);
      outArr.push(temp[6]);
      temp = outArr.slice('');
      outArr = [];
      this.printArr(temp);
    }
    return temp;
  }
  
  flipVertically(arr){
    let temp = arr.slice('');
    let outArr = [];
    
    outArr.push(temp[2]);
    outArr.push(temp[1]);
    outArr.push(temp[0]);
    outArr.push(temp[5]);
    outArr.push(temp[4]);
    outArr.push(temp[3]);
    outArr.push(temp[8]);
    outArr.push(temp[7]);
    outArr.push(temp[6]);
    temp = outArr.slice('');
    outArr = [];
    this.printArr(temp);
    
    return temp;
  }
  
  flipHorizontally(arr){
    let temp = arr.slice('');
    let outArr = [];
 
    outArr.push(temp[6]);
    outArr.push(temp[7]);
    outArr.push(temp[8]);
    outArr.push(temp[3]);
    outArr.push(temp[4]);
    outArr.push(temp[5]);
    outArr.push(temp[0]);
    outArr.push(temp[1]);
    outArr.push(temp[2]);
    temp = outArr.slice('');
    outArr = [];
    this.printArr(temp);
   
    return temp;
  }
  
  printArr(arr){
    console.log(arr[0],arr[1],arr[2]);
    console.log(arr[3],arr[4],arr[5]);
    console.log(arr[6],arr[7],arr[8]);
  }
  
  checkForMatch(){
    
    if( (this.moves[0] === this.moves[1] && this.moves[1] === this.moves[2] && this.moves[0] !== '' ) ||
      (this.moves[3] === this.moves[4] && this.moves[4] === this.moves[5] && this.moves[3] !== '')  ||
      (this.moves[6] === this.moves[7] && this.moves[7] === this.moves[8] && this.moves[6] !== '')   ||
      (this.moves[0] === this.moves[3] && this.moves[3] === this.moves[6] && this.moves[0] !== '')   ||
      (this.moves[1] === this.moves[4] && this.moves[4] === this.moves[7] && this.moves[1] !== '')   ||
      (this.moves[2] === this.moves[5] && this.moves[5] === this.moves[8] && this.moves[2] !== '')   ||
      (this.moves[0] === this.moves[4] && this.moves[4] === this.moves[8] && this.moves[0] !== '')   ||
      (this.moves[2] === this.moves[4] && this.moves[4] === this.moves[6] && this.moves[2] !== '')   ){
      if(this.computerTurn){
        this.currentPlayer = 'COMPUTER';
        this.message = this.currentPlayer + ' WINS!';
        this.losses++;
      }
      else{
        this.currentPlayer = 'YOU';
        this.message = this.currentPlayer + ' WIN!';
        this.wins++;
      }
      //console.log('Game Over: ', this.currentPlayer, ' Wins!');
      this.done = true;
      this.outputMessage = 'A NEW GAME WILL BEGIN SHORTLY...';
      this.updateBoard();
      setTimeout(function(){
        this.newGame();
      }.bind(this), 3000);
    }
    else if(Object.keys(this.notSelected).length === 0 && !this.done){
      this.message = 'DRAW GAME!'
      
      this.outputMessage = 'A NEW GAME WILL BEGIN SHORTLY...';
      this.draws++;
      this.updateBoard();
      setTimeout(function(){
        this.newGame();
      }.bind(this), 3000);
    }
    
  }
  
  updateBoard(){   
    this.setState({
      '0': this.moves[0][0],
      '1': this.moves[1][0],
      '2': this.moves[2][0],
      '3': this.moves[3][0],
      '4': this.moves[4][0],
      '5': this.moves[5][0],
      '6': this.moves[6][0],
      '7': this.moves[7][0],
      '8': this.moves[8][0],
      message: this.message,
      output: this.outputMessage,
    });  
  }
  
  render(){
    return(<div style = {styles.appContainer} >
      <div style = {styles.bodyLeft}>
        <DifficultyBar handleClick={this.changeDifficulty}
          difficulty ={this.state.currentDifficulty} />
      </div>
      <div style = {styles.bodyCenter}>
        <div>
          <Display message={this.state.message} size={1.8} />
        </div>
        <div style = {styles.letterRow}>
          <div onClick={()=> this.pickLetter('X')} style = {styles.text} > X </div> 
          <div onClick={()=> this.pickLetter('O')} style = {styles.text} > O </div> 
        </div>
        
        <div style = {styles.board}>
          <div style = {styles.boardRow}>
            <div style = {styles.boardSquare} 
              onClick = {() =>this.selectSquare(0)}> {this.state[0]} </div>
            <div style = {styles.boardSquare} 
              onClick = {() =>this.selectSquare(1)}> {this.state[1]} </div>
            <div style = {styles.boardSquare} 
              onClick = {() =>this.selectSquare(2)}> {this.state[2]} </div>
          </div>
          <div style = {styles.boardRow}>
            <div style = {styles.boardSquare} 
              onClick = {() =>this.selectSquare(3)}> {this.state[3]} </div>
            <div style = {styles.boardSquare} 
              onClick = {() =>this.selectSquare(4)}> {this.state[4]} </div>
            <div style = {styles.boardSquare} 
              onClick = {() =>this.selectSquare(5)}> {this.state[5]} </div>
          </div>
          <div style = {styles.boardRow}>
            <div style = {styles.boardSquare} 
              onClick = {() =>this.selectSquare(6)}> {this.state[6]} </div>
            <div style = {styles.boardSquare} 
              onClick = {() =>this.selectSquare(7)}> {this.state[7]} </div>
            <div style = {styles.boardSquare} 
              onClick = {() =>this.selectSquare(8)}> {this.state[8]} </div>
          </div>
        </div>
        <div >
          <Display message={this.state.output} size={1.6} />
        </div>
      </div>
      <div style = {styles.bodyRight}>
        <ScoreBoard wins = {this.wins} losses={this.losses} draws = {this.draws} />
      </div>
    </div>
    );
  }

}

const boardSize = '300px';

const styles = {
  
  appContainer:{
    display:          'flex',
    flexDirection:    'row',
    justifyContent:   'center',
    alignItems:       'center',
    width:            '100%',
   
  },
  bodyLeft:{
    width:            '25%',
    display:          'flex',
    flexDirection:    'column',
    justifyContent:   'center',
    alignItems:       'flex-end',
  },
  bodyRight:{
    width:            '25%',
    display:          'flex',
    flexDirection:    'column',
    justifyContent:   'center',
    alignItems:       'flex-start',
  },
  bodyCenter:{
    width:            '50%',
    display:          'flex',
    flexDirection:    'column',
    justifyContent:   'center',
    alignItems:       'center',
    
  },
  board:{
    display:          'flex',
    flexDirection:    'column',
    justifyContent:   'center',
    alignItems:       'space-around',
    width:             boardSize,
    height:            boardSize,
    backgroundColor:  '#999',
    margin:           '20px',
    borderRadius:     '5px',
  },
  
  boardRow:{
    display:          'flex',
    justifyContent:   'center',    
    margin:           '0px 5px 0px 5px',
  },
  
  boardSquare:{
    display:          'flex',
    justifyContent:   'center',
    alignItems:       'center',
    margin:           '5px',
    width:            '75px',
    height:           '75px',
    backgroundColor:  'silver',
    fontSize:         '3em',
    fontFamily:       'Comic Sans MS',
    color:            '#333',
  },
  
  letterRow:{
    display:          'flex',
    justifyContent:   'space-around',
    width:            '100px',
  },
  
  text:{
    color:            '#ccc',
    fontSize:         '1.8em',
    display:          'flex',
    justifyContent:   'center',
    margin:           '10px',
    height:           '30px',
    fontFamily:       'Comic Sans MS',
  }
};


export default TicTacToeBoard;