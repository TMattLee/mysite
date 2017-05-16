import React from 'react';
import {render} from 'react-dom';
import Leaderboard from './components/leaderboard.jsx';

class App extends React.Component{
  render(){
    return (<div style = {styles.body}>
      <div style = {styles.title}>
        Camper Leaderboard
      </div>
      <div style = {styles.footer}>
        Built using React by <a href="https://tmattlee.github.io"
        style = {{textDecoration:'none',color: 'orange'}}>Matt Lee</a>
      </div>
      <div style = {styles.footer}>
        <a href="https://github.com/TMattLee/tmattlee.github.io/tree/master/projects/leaderboard"
        style = {{textDecoration:'none',color: 'orange'}}>
          View Source 
        </a>
      </div>
      <Leaderboard  /> 
      
    </div>);
  }
}

const color = '#ccc';
const styles = {
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
  app:{   
    paddingTop:       '150px',
  },
  footer:{
    color:            color,
    margin:           '10px',
    fontFamily:       'Impact',
    textAlign:        'center',
    textDecoration:   'none',
  },
}
render(<App />,document.getElementById('app'));