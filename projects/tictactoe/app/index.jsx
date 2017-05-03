import React from 'react';
import {render} from 'react-dom';
import TicTacToeBoard from './components/board.jsx';

class App extends React.Component{
  render(){
    return(<div style = {styles.app}>
      <div style = {styles.text} > TIC TAC TOE </div>
      <TicTacToeBoard playerLetter={"X"} />
      <div style = {styles.footer}>
        Built using React by <a href="https://tmattlee.github.io"
        style = {{textDecoration:'none',color: 'orange'}}>Matt Lee</a>
      </div>
      <div style = {styles.footer}>
        <a href="https://github.com/TMattLee/tmattlee.github.io/tree/master/projects/tictactoe"
        style = {{textDecoration:'none',color: 'orange'}}>
          View Source
        </a>
      </div>
    </div>);
  }
}
const color = '#FFFACD';

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
  
}

render(<App/>, document.getElementById('app'));