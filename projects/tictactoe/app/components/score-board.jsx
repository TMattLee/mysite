import React from 'react';
import {render} from 'react-dom';

class ScoreBoard extends React.Component{
  render(){
    return (
      <div style = {styles.scoreBoard}>
        <div style = {styles.text} >
        WINS:  {this.props.wins}
        </div>
        <div style = {styles.text} >
        LOSSES: {this.props.losses}
        </div>
        <div style = {styles.text} >
        DRAWS: {this.props.draws}
        </div>
      </div>        
    );
  }
}

const styles = {
  scoreBoard:{
    display:          'flex',
    flexDirection:    'column',
    justifyContent:   'center',
    alignItems:       'center',
  },
  text:{
    color:            '#ccc',       
    display:          'flex',
    justifyContent:   'center',
    margin:           '10px',
    height:           '30px',
    fontFamily:       'Comic Sans MS',
  }
}


export default ScoreBoard;