import React from 'react';
import {render} from 'react-dom';
import Markdown from './components/markdown.jsx';

class App extends React.Component{
  render(){
    return (<div>
      <div style = {styles.title}>
        Markdown Previewer
      </div>
      <Markdown /> 
      <div style = {styles.footer}>
        Built using React by <a href="https://tmattlee.github.io"
        style = {{textDecoration:'none',color: 'orange'}}>Matt Lee</a>
      </div>
      <div style = {styles.footer}>
        <a href="https://github.com/TMattLee/tmattlee.github.io/tree/master/projects/markdown"
        style = {{textDecoration:'none',color: 'orange'}}>
          View Source
        </a>
      </div>
      </div>);
  }
}

const color = '#333';
const styles = {
  body:{
    width:            '1200px',
    height:            '760px',
    
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