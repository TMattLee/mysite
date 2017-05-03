import React from 'react';
import {render} from 'react-dom';

class Display extends React.Component{
  render(){
    styles.text.fonSize =  this.props.size.toString() + 'em';
    return (<div style = {styles.text}>
    {this.props.message}
    </div>);
  }
}
const styles = {
  text:{
    color:            '#ccc',       
    display:          'flex',
    justifyContent:   'center',
    margin:           '10px',
    height:           '30px',
    fontFamily:       'Comic Sans MS',
  }
};
export default Display;