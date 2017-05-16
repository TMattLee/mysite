import React from 'react';
import {render} from 'react-dom';

let showArrow = function(){
  return '\u2193';
}

class BoardHeader extends React.Component{
  
  render(){
    console.log('props are ', this.props);
    return (<div style = { styles.header }>
      <div style={  Object.assign({}, styles.userNumber, fontFam) } >#</div>
      <div style={  Object.assign({}, styles.userName, fontFam) } >Camper Name</div>
      <div style={  Object.assign({}, styles.blank, fontFam) } ></div>
      <div style={ 
        this.props.sortRecent ? 
          Object.assign({},styles.userRecentSelected, fontFam) : 
          Object.assign({}, styles.userRecent, fontFam) 
        } 
        onClick={ this.props.handleClick.bind(this,'r') } >
        30 Day 
        <div style={{width: '20px'}}  >{ this.props.sortRecent ? showArrow() : " "}</div>
      </div>
      <div style={ 
        !this.props.sortRecent ? 
          Object.assign({}, styles.userAllTimeSelected, fontFam) : 
          Object.assign({}, styles.userAllTime , fontFam) 
        }  
        onClick={ this.props.handleClick.bind(this,'a') }>
        AllTime
        <div style={{width: '20px'}}>{ !this.props.sortRecent ? showArrow() : " " }</div>
      </div>
    </div>);
  }
}

const fontFam ={
  fontFamily:         'Arial Black',
};

const styles = {
  header:{
    display:          'flex',
    width:            '800px',
    justifyContent:   'space-around',
    alignItems:       'center',
    borderTop:        'solid 2px black',
    borderBottom:     'solid 2px black',
    backgroundColor:  'white',
  },
  userRow:{
    display:          'flex',
    width:            '800px',
    height:           '60px',
    justifyContent:   'space-around',
    alignItems:       'center',
    
  },
  userName:{
    display:          'flex',
    alignItems:       'center',
    width:            '400px',
    height:           '50px',
    fontSize:         '1.1em',
  },
  blank:{
    display:          'flex',
    justifyContent:   'center',
    alignItems:       'center',
    width:            '50px',
    height:           '50px',
    fontSize:         '1.1em',
  },
  userNumber:{
    display:          'flex',
    justifyContent:   'center',
    alignItems:       'center',
    width:            '50px',
    height:           '50px',
    fontSize:         '1.1em',
  },
  userRecent:{
    display:          'flex',
    justifyContent:   'center',
    alignItems:       'center',
    width:            '120px',
    height:           '50px',
    cursor:           'pointer',
    fontSize:         '1.1em',
  },
  userAllTime:{
    display:          'flex',
    justifyContent:   'center',
    alignItems:       'center',
    width:            '100px',
    height:           '50px',
    cursor:           'pointer',
    fontSize:         '1.1em',
  },
  userRecentSelected:{
    display:          'flex',
    justifyContent:   'center',
    alignItems:       'center',
    width:            '120px',
    height:           '50px',
    cursor:           'pointer',
    fontWeight:       'bold',

    fontSize:         '1.15em',
  },
  userAllTimeSelected:{
    display:          'flex',
    justifyContent:   'center',
    alignItems:       'center',
    width:            '100px',
    height:           '50px',
    cursor:           'pointer',
    fontWeight:       '500',

    fontSize:         '1.15em',
    fontWeight:       'bold',
  }
}

export default BoardHeader;