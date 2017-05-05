import React from 'react';
import {render} from 'react-dom';
import SimonBoard from './components/simon-board.jsx';

class App extends React.Component{
  render(){
    return( <div>
      <div style = {styles.text} > SIMON </div>
      <SimonBoard />
      <div style = {styles.footer}>
        <a href="https://tmattlee.github.io/projects/simon"
        style = {{textDecoration:'none',color: 'orange'}}>
          View Source
        </a>
      </div>
    </div>);
  }
}

const styles = {
  app:{
    display:          'flex',
    flexDirection:    'column',
    justifyContent:   'center',
    alignItems:       'center',
    width:            '100%',
  },
  text:{
    color:            '#ccc',       
    display:          'flex',
    justifyContent:   'center',
    margin:           '10px',
    height:           '30px',
    fontFamily:       'Comic Sans MS',
    fontSize:         '3em',
  },
  footer:{
    color:            '#ccc',
    margin:           '40px',
    fontFamily:       'Comic Sans MS',
    textAlign:        'center',
    textDecoration:   'none',
  },
  
};

render(<App/>, document.getElementById('app'));