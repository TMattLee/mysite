import React from 'react';
import { render } from 'react-dom';

export default class Square extends React.Component{

  pickColor(value){
    if((this.props.i > this.props.playerPosition[0] + 3 ||
      this.props.i < this.props.playerPosition[0] - 3 ||
      this.props.j < this.props.playerPosition[1] - 3 ||
      this.props.j > this.props.playerPosition[1] + 3 ||
      ( this.props.playerPosition[0] - 3 === this.props.i && 
        this.props.playerPosition[1] - 3 === this.props.j ) ||
      ( this.props.playerPosition[0] + 3 === this.props.i && 
        this.props.playerPosition[1] + 3 === this.props.j ) ||
      ( this.props.playerPosition[0] - 3 === this.props.i && 
        this.props.playerPosition[1] + 3 === this.props.j ) ||
      ( this.props.playerPosition[0] + 3 === this.props.i && 
        this.props.playerPosition[1] - 3 === this.props.j ) ) &&
      this.props.showOverlay){
       return 'black';
    }
    else{
      switch(value){
        case 'S':
          return 'white';
        case 'P':
          return 'blue';
        case 'E':
          return 'red';
        case 'I':
          return 'yellow';
        case 'H':
          return 'green';
        case 'B':
          return 'orange'
        default:
          return 'grey';
      }
    }
  }
  
  render(){
    this.pickColor= this.pickColor.bind(this);
    let color = '';
    if( this.props.health <= 0){
      color = 'W';
    }
    else{
      color  = this.pickColor(this.props.val);
    }
    return (
      <div style={ 
          Object.assign(
            {},
            styles.box,
            {
              backgroundColor: color
            }
          )
       }  >
      </div>
    );
    
  }
}

const styles = {
  box:{
    display:          'flex',
    margin:           '0px',
    width:            '10px',
    height:           '10px',
  },
};