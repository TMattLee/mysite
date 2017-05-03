import React from 'react';
import {render} from 'react-dom';
import TicTacToeBoard from './components/board.jsx';

class App extends React.Component{
  render(){
    return(<div style = {styles.app}>
      <div style = {styles.text} > TIC TAC TOE </div>
      <TicTacToeBoard playerLetter={"X"} />
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
  }
}

render(<App/>, document.getElementById('app'));