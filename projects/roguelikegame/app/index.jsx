import React from 'react';
import {render, Component} from 'react-dom';
import thunkMiddleware from 'redux-thunk';
import {createLogger} from 'redux-logger';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux'; 
import reducers from './reducers/index';


import Map from './components/map.js';

//const loggerMiddleware = createLogger();

const store = createStore(
  reducers,
  applyMiddleware(
    thunkMiddleware // lets us dispatch() functions
    //,loggerMiddleware // neat middleware that logs actions
  ));

export default class Test extends React.Component{
  render(){
    return (
      <div style = {styles.appContainer}>      
        <div style = {styles.title}>
          Rogue-like Game
        </div>
        <Provider store = {store}>
          <Map />
        </Provider>
        <div style = {styles.footer}>
          Built using React by <a href="https://tmattlee.github.io"
          style = {{textDecoration:'none',color: 'orange'}}>Matt Lee</a>
        </div>
        <div style = {styles.footer}>
          <a href="https://github.com/TMattLee/tmattlee.github.io/tree/master/projects/roguelikegame"
          style = {{textDecoration:'none',color: 'orange'}}>
            View Source 
          </a>
        </div>
      </div>
    );
  }
}

const footerTextColor = '#ccc';

const styles = {
  appContainer:{
    display:          'flex',
    flexDirection:    'column',
    alignItems:       'center',
  },
  title:{
    color:            footerTextColor,
    fontSize:         '2.2em',
    fontFamily:       'Impact',
    textAlign:        'center',
    margin:           '10px auto',
  }, 
 
  footer:{
    color:            footerTextColor,
    margin:           '10px',
    fontFamily:       'Impact',
    textAlign:        'center',
    textDecoration:   'none',
  },
}

render(<Test />, document.getElementById('app'));