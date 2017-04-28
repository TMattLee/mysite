/*eslint-env browser */
import React from 'react';
import { render } from 'react-dom';
import SessionButton from './session-button.jsx';
import BreakButton from './break-button.jsx';



let displayMins = '';
let displaySecs = '';
let timerColor = '#acc';

let startBreakTime = 5;
let startWorkTime = 25;
let timer = 25*60;
let workTimerStart = timer;
let breakTimerStart = 5*60;
let overlayTick = 0;

let outputCalcMins = Math.floor(timer/60);
let outputCalcSecs = timer % 60;

class Pomodoro extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      isWorkTime: true,
      isBreakTime: false,
      started: false,
      stopped: true,
      workTime: startWorkTime,
      breakTime: startBreakTime,
      mins: startWorkTime < 10 ? '0'+ startWorkTime.toString() : startWorkTime.toString() ,
      secs: '00',
      output: "WORK TIME!",
      ovarlay: {},
            
    };
    
    this.countDown = this.countDown.bind(this);
    this.startStop = this.startStop.bind(this);
    this.getOverlay = this.getOverlay.bind(this);
    this.updateOverlay = this.updateOverlay.bind(this);
    this.updateTimer = this.updateTimer.bind(this);
    this.changeCount = this.changeCount.bind(this);
    this.workToBreak = this.workToBreak.bind(this);
    this.playSound = this.playSound.bind(this);
  }
  componentWillMount(){   
    
  }
  componentWillunmount(){   
    clearInterval(this.stopwatch);
  }
  
  componentDidMount(){
  
  }
  playSound(){
    var audio = document.createElement("audio");
    if (audio !== null && audio.canPlayType && audio.canPlayType("audio/mpeg")){
      audio.src = "./ping.mp3";
      audio.play();
    }
  }
 
  startStop(){
    if(this.state.started === true){
      this.setState({
        started: false,
        stopped: true,
      });
      clearInterval(this.stopwatch);      
    }
    else{
      this.setState({
        started: true,
        stopped: false,
      });
      this.stopwatch = setInterval(this.countDown, 1000);
    }
  }
  
  countDown(){
    if(timer > 0){
      timer -=1;
      
      this.updateTimer();   
      this.updateOverlay();
      let outputDisplay = displayMins + ':' + displaySecs;
      if(timer === 0){
        this.playSound(); 
      }
      //console.log(outputDisplay);
    }
    else{
           
      this.workToBreak();
      this.updateOverlay();
    }
  }
  
  workToBreak(){
    if(this.state.isWorkTime){
      timer = breakTimerStart;
      timerColor = '#f60';      
      this.setState({
        isBreakTime: true,
        isWorkTime: false,
        mins: this.state.breakTime < 10 ? '0'+ this.state.breakTime.toString() : this.state.breakTime.toString() ,
        output: 'BREAK TIME!',
      });       

    }
    else{
      timer = workTimerStart;
      timerColor = '#acc';      
      this.setState({
        isBreakTime: false,
        isWorkTime: true,
        mins: this.state.workTime < 10 ? '0'+ this.state.workTime.toString() : this.state.workTime.toString() ,
        output: 'WORK TIME!',
        overlay: this.getOverlay(),
      });      

    }
  }
  
  changeCount(sign, wt, type){
    var data = wt;
    //console.log(wt);
    if(this.state.stopped){
      if(type === 'w'){
        if( sign === '-' && wt > 1){
          data = wt - 1;
          if(this.state.isWorkTime){
            timer = data * 60;
          }
          workTimerStart = data * 60;        
        }
        if( sign === '+' && wt < 60){
          data = wt + 1;
          if(this.state.isWorkTime){
            timer = data * 60;
          }
          workTimerStart = data * 60; 
        }
        this.setState({
          workTime: data,
        });
      }
      else{
        if( sign === '-' && wt > 1){
          data = wt - 1;
          if(this.state.isBreakTime){
            timer = data * 60;
          }
          breakTimerStart = data * 60;
        }
        if( sign === '+' && wt < 60){
          data = wt + 1;
          if(this.state.isBreakTime){
            timer = data * 60;
          }
          breakTimerStart = data * 60;
        }
        this.setState({
          breakTime: data,
        });
      }
      
      this.updateTimer();
      this.updateOverlay();
    }    
  }
  
  updateTimer(){
    outputCalcMins = Math.floor(timer/60);
    outputCalcSecs = timer % 60;
    
    displaySecs = ('0'+ outputCalcSecs.toString()).slice(-2);
    displayMins = ('0'+ outputCalcMins.toString()).slice(-2);
    this.setState({
      mins: displayMins,
      secs: displaySecs,
    });
  }
  
  updateOverlay(){
    //console.log(this.state.breakTime, timer);
    if(this.state.isWorkTime){        
      overlayTick = Math.round(100*(workTimerStart + 1 - timer)/(workTimerStart)).toString();   
      this.setState({
        overlay: this.getOverlay(),
      });
      //console.log('here');
    }
    else{        
      overlayTick = Math.round(100*(breakTimerStart + 1 - timer)/(breakTimerStart)).toString();      
      this.setState({
        overlay: this.getOverlay(),
      });
      //console.log('there');
    }
  }
  
  getOverlay(){
    return {
      position:          'absolute',
      top:               '0',
      left:              '0',
      backgroundColor:   timerColor,
      paddingTop:        '200px',
      paddingLeft:       '200px',
      clipPath:          'circle('+overlayTick+'px at center)',
      zIndex:            '-1',
    }
  }
  
  
  render(){
    return( <div>
      <audio ref="audio" src ="./ping.mp3"></audio>
      <div style = {styles.message}>
        {this.state.output}
      </div>
      <div style = {styles.pomodoro} onClick = {this.startStop}>
      
        <div style = {this.state.overlay}  ></div>
        <div >
          {this.state.mins}:{this.state.secs}
        </div>
        
      </div>
      
      <div style = {styles.buttons}>
        <div>
          <SessionButton handleClick = {this.changeCount} workTime = {this.state.workTime} timerType = {'w'}/>
        </div>
        <div>
          <BreakButton handleClick = {this.changeCount} breakTime = {this.state.breakTime} timerType = {'b'}/>
        </div>
      </div>
      
    </div>);
  }
 
}

const color = '#FFFACD';

const styles = {
  pomodoro:{
    display:          'flex',
    flexDirection:    'column',
    border:           '4px solid '+ color,
    borderRadius:     '100%',
    width:            '200px',
    height:           '200px',
    margin:           'auto',
    padding:          'auto',
    alignItems:       'center',
    justifyContent:   'center',
    position:         'relative',
    fontSize:         '2em',
    color:            color,
    fontFamily:       "'Passion One', cursive",
    
  },
  overlay:{
    
  },
  message:{
    fontSize:         '2em',
    textAlign:        'center',
    margin:           '20px',
    color:            color,
    fontFamily:       "'Passion One', cursive",
  },
  buttons:{
    display:          'flex',
    justifyContent:   'space-around',    
  },
  
}

export default Pomodoro;