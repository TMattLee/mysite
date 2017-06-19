import React from 'react';
import {render, Component} from 'react-dom';
import GDP from './components/gdp';

export default class Test extends React.Component{
  render(){
    return (
      <div style = {styles.appContainer}>      
        <div style = {styles.title}>
          
        </div>
        <GDP />
        <div style = {styles.footer}>
          Built using React and D3 by <a href="https://tmattlee.github.io"
          style = {{textDecoration:'none',color: 'orange'}}>Matt Lee</a>
        </div>
        <div style = {styles.footer}>
          <a href="https://github.com/TMattLee/tmattlee.github.io/tree/master/projects/d3gdp"
          style = {{textDecoration:'none',color: 'orange'}}>
            View Source 
          </a>
        </div>
      </div>
    );
  }
}

const textColor = '#333';

const styles = {
  appContainer:{
    display:          'flex',
    flexDirection:    'column',
    alignItems:       'center',
  },
  title:{
    color:            textColor,
    fontSize:         '2.2em',
    fontFamily:       'Impact',
    textAlign:        'center',
    margin:           '10px auto',
  }, 
 
  footer:{
    color:            textColor,
    margin:           '10px',
    fontFamily:       'Impact',
    textAlign:        'center',
    textDecoration:   'none',
  },
}

render(<Test />, document.getElementById('app'));