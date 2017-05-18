import React from 'react';
import { render } from 'react-dom';

export default class Box extends React.Component{
  constructor(props){
    super(props);
    this.pickColor= this.pickColor.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }
  
  handleClick(){
    this.props.handleClick(this.props.i,this.props.j)
  }
  
  pickColor(value){
    
    switch(value){
      case 1:
        return styles.boxPink;
      default:
        return styles.boxBlack;
    }
  }
  render(){
    
    return (
      <div style={ this.pickColor(this.props.val) }  
        onClick={ this.handleClick }>
        
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
    backgroundColor:  '#222',
  },
  boxPink:{
    display:          'flex',
    margin:           '2px',
    width:            '10px',
    height:           '10px',
    backgroundColor:  '#c00',
  },
};