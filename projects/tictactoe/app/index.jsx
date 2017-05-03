import React from 'react';
import {render} from 'react-dom';
import TicTacToeBoard from './components/board.jsx';

class App extends React.Component{
  render(){
    return(<div style = {styles.app}>
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
  }
}

render(<App/>, document.getElementById('app'));