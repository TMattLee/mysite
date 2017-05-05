/*eslint-env browser */
/*globals div style:true es_modules */
import React from 'react';
import {render} from 'react-dom';

class SimonBoard extends React.Component{
  constructor(){
    super();
    this.bpm = 90;
    this.speed = Math.round( (60/this.bpm) * 1000);
    this.colorArr = ['red','green','cyan','yellow'];
    this.computerPattern = [];
    
    this.state = {
      computerTurn:      'true',
      currentDifficulty: 'EASY',
      currentColor:      '',
      message:           'PLAY',
    };
    this.gameLimit = 19;
    
    this.audio1 = document.createElement("audio");
    this.audio1.src = 'https://s3.amazonaws.com/freecodecamp/simonSound1.mp3';
    
    this.audio2 = document.createElement("audio");
    this.audio2.src = 'https://s3.amazonaws.com/freecodecamp/simonSound2.mp3';
    
    this.audio3 = document.createElement("audio");
    this.audio3.src = 'https://s3.amazonaws.com/freecodecamp/simonSound3.mp3';
    
    this.audio4 = document.createElement("audio");
    this.audio4.src = 'https://s3.amazonaws.com/freecodecamp/simonSound4.mp3';
    this.ping = document.createElement("audio");
    this.ping.src = './ping.mp3';
    
    this.startPlayback = this.startPlayback.bind(this);
    this.playback = this.playback.bind(this);
    this.playSound = this.playSound.bind(this);
    this.changeColor = this.changeColor.bind(this);
    this.pieHighlight = this.pieHightlight.bind(this);
    this.clearColor = this.clearColor.bind(this);
    this.currentColor;
    this.newGame = this.newGame.bind(this);
    this.computerLoop = this.computerLoop.bind(this);
    this.addRandomColor = this.addRandomColor.bind(this);

    this.checkPlayerInput = this.checkPlayerInput.bind(this);
    this.checkForWin = this.checkForWin.bind(this);    
  }
  
  componentDidMount(){
    this.newGame();
  }
  
  componentWillunmount(){   
    clearInterval(this.beatBox);
  }
  
  newGame(){
    console.log('new game!');
    this.speed = Math.round( (60/this.bpm) * 1000);
    this.difficulty = 'EASY';
    this.canSelectDifficulty = true;
    this.computerTurn = true;
    this.computerPattern = [];
    this.state = {
      computerTurn:      'true',
      currentDifficulty: 'EASY',
      currentColor:       '',
      message:           'PLAY',
    };
    
    this.arrElem = 0;
    this.playerArrElem = 0;
   
    this.win = false;
    this.gameLimit = 19;
    
    this.computerLoop();
  }
  
  selectDifficulty(difficulty){
    if(this.canSelectDifficulty){
      this.difficulty = difficulty;
      this.setState({
        currentDifficulty: difficulty,
      });
      if(this.difficulty==='HARD'){
        this.speed = this.speed = Math.round( (60/120) * 1000);
      }
    }
    else{
      this.ping.play();
    }
  }
  
  reset(){
    setTimeout(this.newGame, 1000);
  }
  
  computerLoop(){
    this.canSelectDifficulty = false;

    if(this.computerPattern.length <= this.gameLimit){
      this.computerTurn = true;
      this.addRandomColor();
      setTimeout(this.startPlayback, 1000);
      
    }
    else{
      this.canSelectDifficulty = true;
      this.newGame();
    }
  }  
  
  checkPlayerInput(color){
    if(this.computerTurn === false ){
      
      this.changeColor(color);
      this.playSound();
      if(this.computerPattern[this.playerArrElem] === color){
        this.playerArrElem++;
        this.checkForWin();
        if(!this.win && this.playerArrElem === this.computerPattern.length){
          this.playerArrElem = 0;
          setTimeout(this.computerLoop, 500);
        }

      } else if(this.difficulty === 'EASY'){
        this.playerArrElem = 0;
        this.computerTurn = true;
        this.ping.play();
        setTimeout(this.startPlayback, 1000);
      }
      else{
        
        this.playerArrElem = 0;
        this.ping.play();
        
        this.setState({
          message:    'GAME OVER',
        });
        setTimeout(this.newGame, 1500);
      }
    }
  }
  
  checkForWin(){
    if(this.playerArrElem > this.gameLimit){
      console.log('win');
      this.computerTurn = true;
      this.win = true;
      this.computerPattern = [];
      this.setState({
        message: 'YOU WIN',
      });      
      setTimeout(this.newGame, 1500);
    }
  }
   
  startPlayback(){
    this.beatBox = setInterval(this.playback, this.speed);     
  }
  
  playback(){
    if(this.arrElem === this.computerPattern.length){
      this.arrElem = 0;      
      this.clearColor();
      console.log('not looping');
      clearInterval(this.beatBox);
      setTimeout( function(){
        this.canSelectDifficulty = true;
        this.computerTurn = false;
      }.bind(this), 300);
    }
    else{
      console.log('looping. arrelem = ', this.arrElem);
      this.changeColor(this.computerPattern[this.arrElem]);
      this.playSound();
      this.arrElem++;
      
    }     
  }
  
  playSound(){
    switch(this.currentColor){
      case 'cyan':
        this.audio1.currentTime = 0;
        this.audio1.play();
        break;
      case 'red':
        this.audio2.currentTime = 0;
        this.audio2.play();
        break;
      case 'yellow':
        this.audio3.currentTime = 0;
        this.audio3.play();
        break;
      case 'green':
        this.audio4.currentTime = 0;
        this.audio4.play();
        break;
    }
    return;
  }
  
  addRandomColor(){
    let rand = Math.floor(Math.random()*4);
    this.computerPattern.push(this.colorArr[rand]);
  }
  
  changeColor(color){
    this.currentColor = color;
    console.log('changing color to ', color);
    this.setState({
      currentColor: this.currentColor,
    });
    setTimeout(this.clearColor, 200);
  }
  
  pieHightlight(color){    
    if(color === this.currentColor){
      return "pink";
    }
    else{
      return color;
    }
  }
  
  clearColor(){
    this.currentColor = '';
    this.setState({
      currentColor: '',
    });
  } 
  
  
  
  render(){
    
    return( <div style = {styles.appContainer}>
      <div style = {styles.bodyLeft}>
        <div style = {this.difficulty === 'EASY' ? styles.highlightedText : styles.difficultyText } onClick = {this.selectDifficulty.bind(this,'EASY')} >
          EASY
        </div>
        <div style = {this.difficulty === 'NORMAL' ? styles.highlightedText : styles.difficultyText } onClick = {this.selectDifficulty.bind(this,'NORMAL')} >
          NORMAL
        </div>
        <div style = {this.difficulty === 'HARD' ? styles.highlightedText : styles.difficultyText } onClick = {this.selectDifficulty.bind(this,'HARD')} >
          HARD
        </div>
      
      </div>
      <div style = {styles.bodyCenter} className="Board">
        <div style = {styles.message}> {this.state.message} </div>
        <div style={styles.boardContainer}>
          <div style={styles.circle1}> </div>
          <div style={styles.circle2}> </div>
          <div style={styles.circle3}> </div>
          
        
          <svg style={styles.overlayColors}>
            <path style={styles.button} fill={this.pieHightlight("red")}
              onClick={this.checkPlayerInput.bind(this,'red')}
              d={"m150,150 L150,10 A150,150 1 0,1 290, 150 z"}>
            </path>
            <path style={styles.button} fill={this.pieHightlight("cyan")} 
              onClick={this.checkPlayerInput.bind(this,'cyan')}
              d={"M150,150 L290,150 A150,150 1 0,1 150, 290 z"}>
            </path>
            <path style={styles.button} fill={this.pieHightlight("green")} 
              onClick={this.checkPlayerInput.bind(this,'green')}
              d={"M150,150 L150,290 A150,150 1 0,1 10, 150 z"}>
            </path>
            <path style={styles.button} fill={this.pieHightlight("yellow")} 
              onClick={this.checkPlayerInput.bind(this,'yellow')}
              d={"M150,150 L10,150 A150,150 1 0,1 150,10 z"}>
            </path>
          </svg>
          
          <svg style={styles.ring} >
            <circle  cx={"150"} cy={"150"} r={"140"} fill={"transparent"} stroke={"#333"} strokeWidth={"10"}></circle>
          </svg> 
          <div style = {styles.scoreboard}>
            <div style = {styles.text}>
            {this.computerPattern.length}
            </div>
            <div style={styles.resetLabel}> RESET </div>
          </div>         
        </div>
      </div>
      <div style = {styles.bodyRight}>
      
      </div>
    </div>);
  }
}

const styles = {
  appContainer:{
    display:          'flex',
    flexDirection:    'row',
    width:            '100%',
    height:           '550px',
    alignItems:       'center',
    justifyContent:   'center',
  },
  
  bodyLeft:{
    display:          'flex',
    flexDirection:    'column',
    width:            '20%',
    alignItems:       'flex-end',
    justifyContent:   'center',
  },
  
  bodyCenter:{
    display:          'flex',
    flexDirection:    'column',
    width:            '60%',
    alignItems:       'center',
    justifyContent:   'center',
    height:           '100%',
  },
  
  bodyRight:{
    display:          'flex',
    flexDirection:    'column',
    width:            '20%',
    alignItems:       'flex-start',
    justifyContent:   'center',
  },
  
  boardContainer:{
    position:         'relative',
    width:            '300px',
    height:           '300px',
  },
  button: {
    border:           '2px solid red',
  },
  button_hover: {
    fill:             'pink',
  },
  overlayColors: {
    position:         'absolute',
    top:              '0',
    left:             '0',
    width:            '300px',
    height:           '300px',
    zIndex:           '1'
  },
  ring: {
    position:         'absolute',
    width:            '300px',
    height:           '300px',
    top:              '0',
    left:             '0', 
    zIndex:           '-1'
  },
  circle1: {
    position:         'absolute',
    top:              '0',
    left:             '0',
    paddingTop:       '300px',
    paddingLeft:      '300px',
    clipPath:         'circle(80px at center)',
    backgroundColor:  '#333',
    zIndex:           '3'
  },
  circle2: {
    position:         'absolute',
    top:              '0',
    left:             '0',
    paddingTop:       '300px',
    paddingLeft:      '300px',
    clipPath:         'circle(70px at center)',
    backgroundColor:  '#ccc',
    zIndex:           '4'
  },
  circle3: {
    position:         'absolute',
    top:              '0',
    left:             '0',
    paddingTop:       '340px',
    paddingLeft:      '300px',
    clipPath:         'circle(10px at center)',
    backgroundColor:  'red',
   
    zIndex:           '10'
  },
  centerContainer:{
    display:          'flex',
    flexDirection:    'column',
    justifyContent:   'center',
    alignItems:       'center',
  },
  resetLabel: {    
    display:          'flex',
    flexDirection:    'column',
    justifyContent:   'center',
    alignItems:       'center',
    fontFamily:       'Comic Sans MS',
    fontSize:         '0.8em',
    color:            '#333',   
    marginTop:        '25px',
    zIndex:           '20',
  },
  innerCircle: {
    zIndex:           '1'
  },
  startButton:{
    color:            '#333',
    backgroundColor:  'pink',
    width:            '50px',
    height:           '20px',
  },
  scoreboard:{
    width:            '300px',
    height:           '300px',
    display:          'flex',
    flexDirection:    'column',
    justifyContent:   'center',
    alignItems:       'center',
  },
  text:{         
    display:          'flex',
    justifyContent:   'center',
    alignItems:       'center',
    margin:           '10px',
    height:           '30px',
    width:            '80px',
    fontFamily:       'Comic Sans MS',
    color:            'IndianRed',  
    backgroundColor:  'brown',
    border:           '2px solid crimson',
    zIndex:           '99',
  },
  message:{
    display:          'flex',
    justifyContent:   'center',
    alignItems:       'center',
    color:            '#ddd',  
    fontFamily:       'Comic Sans MS',
    fontSize:         '1.5em',
  },
  difficultyText:{
    display:          'flex',
    justifyContent:   'center',
    alignItems:       'center',
    margin:           '10px',
    height:           '30px',
    width:            '80px',
    fontFamily:       'Comic Sans MS',
    color:            '#333',  
    backgroundColor:  '#999',
    border:           '2px solid #ccc',
  },
  highlightedText:{
    display:          'flex',
    justifyContent:   'center',
    alignItems:       'center',
    margin:           '10px',
    height:           '30px',
    width:            '80px',
    fontFamily:       'Comic Sans MS',
    color:            '#333',  
    backgroundColor:  '#ddd',
    border:           '2px solid #eee',
    fontWeight:       '600',
  }
  
};

export default SimonBoard;