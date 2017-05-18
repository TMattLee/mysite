import React from 'react';
import { render } from 'react-dom';
import GameOfLife from './components/game-of-life.jsx';

class App extends React.Component{
  render(){
    return <div className = "appContainer" style = {styles.body}>
      <div style = {styles.title}>
        Game of Life
      </div>
      <div style = {styles.app} className = "gameOfLifeContainer">
        <GameOfLife />
      </div>
      <div style = {styles.footer}>
        Built using React by <a href="https://tmattlee.github.io"
        style = {{textDecoration:'none',color: 'orange'}}>Matt Lee</a>
      </div>
      <div style = {styles.footer}>
        <a href="https://github.com/TMattLee/tmattlee.github.io/tree/master/projects/gameoflife"
        style = {{textDecoration:'none',color: 'orange'}}>
          View Source 
        </a>
      </div>
    </div>;
  }
}

const color = '#ccc';

const styles ={
  app:{
    display:          'flex',
    flexDirection:    'column',
    alignItems:       'center',
    justifyContent:   'center',

    margin:           '30px 0px 30px 0px',
  },
  body:{
    display:          'flex',
    flexDirection:    'column',
    justifyContent:   'center',
    alignItems:       'center',
  },
  title:{
    color:            color,
    fontSize:         '2.2em',
    fontFamily:       'Impact',
    textAlign:        'center',
    margin:           '10px auto',
  },
 
  footer:{
    color:            color,
    margin:           '10px',
    fontFamily:       'Impact',
    textAlign:        'center',
    textDecoration:   'none',
  },
}

render(<App />, document.getElementById("app"));