import React from 'react';
import {render} from 'react-dom';

class DifficultyBar extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      difficulty: 'easy'
    };
  }
  render(){
    return(
      <div style = {styles.difficulty}>
        <div style = {this.props.difficulty === 'EASY' ? styles.textSelected : styles.text} 
          onClick={ this.props.handleClick.bind(this, 'EASY') } >
          EASY
        </div>
        <div style = {this.props.difficulty === 'NORMAL' ? styles.textSelected : styles.text}  
          onClick={ this.props.handleClick.bind(this, 'NORMAL') }  >
          NORMAL
        </div>
        <div style = {this.props.difficulty === 'HARD' ? styles.textSelected : styles.text} 
          onClick={ this.props.handleClick.bind(this, 'HARD') }  >
          HARD
        </div>
        
      </div>
    
    );  
  }
}

const styles = {
  difficulty:{
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
    color:            '#333',  
    backgroundColor:  '#999',
    border:           '2px solid #ccc',
  },
  textSelected:{
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

export default DifficultyBar;