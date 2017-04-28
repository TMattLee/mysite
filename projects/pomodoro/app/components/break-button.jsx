import React from 'react';
import { render } from 'react-dom';

class BreakButton extends React.Component{
  
  render(){
    var x = this.props.breakTime;
    var type =  this.props.timerType;
    
    return(<div>
      <div style = {styles.text}>
        BREAK LENGTH
      </div>
      <div style = {styles.breakRow}>
        <div onClick={this.props.handleClick.bind(this, '-',x,type)} style = {styles.text}>
          -
        </div>
        <div>
          {x}
        </div>
        <div onClick={this.props.handleClick.bind(this, '+', x,type)} style = {styles.text}>
          +
        </div>
      </div>
    </div>
    );
  }
}

const color = '#FFFACD';

const styles = {
  breakRow:{
    display:          'flex',
    justifyContent:   'space-around',
    alignItems:       'center',
    fontSize:         '2em',
    color:            color,
    fontFamily:       "'Passion One', cursive",
  },
  text:{
    fontSize:         '1.7em',
    color:            color,
    fontFamily:       "'Passion One', cursive",
  },
}

export default BreakButton;