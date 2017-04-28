/*globals  p p*/
/*eslint-env es_modules*/
import React from 'react';
import { render } from 'react-dom';
import Pomodoro from './components/pomodoro.jsx';

class App extends React.Component { 
  render () {
    return( <div>
      <div style = {styles.title}>
        Pomodoro Clock
      </div>
      <div style = {styles.app}>        
        <Pomodoro />      
      </div>
      <div style = {styles.footer}>
        Built using React by <a href="https://tmattlee.github.io"
        style = {{textDecoration:'none',color: 'orange'}}>Matt Lee</a>
      </div>
      <div style = {styles.footer}>
        <a href="https://tmattlee.github.io/projects/pomodoro/app/"
        style = {{textDecoration:'none',color: 'orange'}}>
          View Source
        </a>
      </div>
    </div>);
  };
};


const color = '#FFFACD';
const styles = {
  title:{
    color:            color,
    fontSize:         '2.2em',
    fontFamily:       'Impact',
    textAlign:        'center',
    margin:           '30px auto 20px auto',
  },
  app:{   
    paddingTop:       '150px',
  },
  footer:{
    color:            color,
    margin:           '40px',
    fontFamily:       'Impact',
    textAlign:        'center',
    textDecoration:   'none',
  },
  
};

render(<App/>, document.getElementById('app'));