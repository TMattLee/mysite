import React from 'react';
import {render} from 'react-dom';
import axios from 'axios';

import BoardHeader from './board-header.jsx';

const options = {  
  method: 'GET',
  uri: 'https://fcctop100.herokuapp.com/api/fccusers/top/recent',
}


class Leaderboard extends React.Component{
  constructor(){
    super();
    this.recentUrl = 'https://fcctop100.herokuapp.com/api/fccusers/top/recent';
    this.allTimeUrl = 'https://fcctop100.herokuapp.com/api/fccusers/top/alltime';
    this.state = {
      sortRecent: false,
      recent100:  null,
      allTime100: null,
      done:       null,
    };
    this.getRecent = this.getRecent.bind(this);
    this.getAlltime = this.getAlltime.bind(this);
    this.showCampers = this.showCampers.bind(this);
    this.changeSort = this.changeSort.bind(this);
    this.checkDone = this.checkDone.bind(this);
    
  }
  
  getRecent(){
    axios.get(this.recentUrl)
    .then(response => { 
      console.log(response) 
      this.setState({
        recent100: response.data,
      });
      this.getAlltime();
    } );
    
  }
  
  getAlltime(){
    axios.get(this.allTimeUrl)
    .then(response => { 
      console.log(response) 
      this.setState({
        allTime100: response.data,
        done:       true,
      })
    } );
    
    
  }
  
  componentDidMount(){
    this.getRecent();
    
    this.checker = setInterval( this.checkDone(), 200);
  }
  
  componentWillUnmount(){
    clearInterval(this.checker);
  }
  
  changeSort(val){
    console.log('Click');
    if(val === 'r'){
      this.setState({
        sortRecent: true,
      });
    }
    else{
      this.setState({
        sortRecent: false,
      });
    }
  }
  
  checkDone(){
    console.log('checking... ')
    if(this.state.allTime100 && this.state.recent100){
      
      clearInterval(this.checker);
    }
    else{
      if(!this.state.allTime100){
        console.log('no alltime');
      }
      if(!this.state.recent100){
        console.log('no recent');
      }
    }
  }
  
  showCampers(){
    let camperArr = [];
    if(this.state.sortRecent){
      camperArr = this.state.recent100;
    }
    else{
      camperArr = this.state.allTime100;
    }
    return camperArr.map( (item, i) => { 
      return (<div key={i} style = { i % 2 === 1 ? styles.userRow : styles.userRowOdd}>
        <div style={ styles.userNumber } >
          {i+1}
        </div>
        <div style={ styles.userName } >
          { item.username }
        </div>
        <img src= {item.img} style={ styles.userPic } />
        <div style={ styles.userRecent } >
          { item.recent }
          
        </div>
        <div style={ styles.userAllTime } >
          { item.alltime }
          
        </div>
      </div>);
    } );
  }
  
  render(){
    if (!this.state.done){
      return (<div> <BoardHeader handleClick={ this.changeSort } /> </div>);
    }
    return (<div  style = { styles.board } >
      <BoardHeader handleClick={ this.changeSort }
        sortRecent={this.state.sortRecent} />
      <div> { this.showCampers() } </div>
    </div>);
      
 
  }
  
}

const fontFamily = 'Arial Black';

const styles = {
  board:{
    display:          'flex',
    flexDirection:    'column',
    justifyContent:   'center',
    alignItems:       'center',
    width:            '800px',
    minHeight:        '50px',
  },
  userRow:{
    display:          'flex',
    width:            '800px',
    height:           '60px',
    justifyContent:   'space-around',
    alignItems:       'center',
    margin:           '5px 0px',
    borderTop:        'solid 2px black',
    borderBottom:     'solid 2px black',
    backgroundColor:  'white',
  },
  userRowOdd:{
    display:          'flex',
    width:            '800px',
    height:           '60px',
    justifyContent:   'space-around',
    alignItems:       'center',
    margin:           '5px 0px',
    borderTop:        'solid 2px black',
    borderBottom:     'solid 2px black',
    backgroundColor:  'gray',
    
  },
  userName:{
    display:          'flex',
    alignItems:       'center',
    width:            '400px',
    height:           '50px',
    fontSize:         '1.1em',
    fontFamily:       fontFamily,
  },
  userPic:{
    display:          'flex',
    justifyContent:   'center',
    alignItems:       'center',
    width:            '50px',
    height:           '50px',
  },
  userNumber:{
    display:          'flex',
    justifyContent:   'center',
    alignItems:       'center',
    width:            '50px',
    height:           '50px',
    fontSize:         '1.1em',
    fontFamily:       fontFamily,
  },
  userRecent:{
    display:          'flex',
    justifyContent:   'center',
    alignItems:       'center',
    width:            '100px',
    height:           '50px',
    fontSize:         '1.1em',
    fontFamily:       fontFamily,
  },
  userAllTime:{
    display:          'flex',
    justifyContent:   'center',
    alignItems:       'center',
    width:            '100px',
    height:           '50px',
    fontSize:         '1.1em',
    fontFamily:       fontFamily,
  }
};

export default Leaderboard;