import React from 'react';
import {Component} from 'react-dom';
import {connect} from 'react-redux';

class Header extends React.Component{
  render(){
    return (
      <div style = {styles.headRow}>
        <div style = {styles.text}>
          { `Health: ${this.props.playerHealth}` }
        </div>
        
        <div style = {styles.text}>
          {`Weapon: ${this.props.playerWeapon}`}
        </div>
          
        <div style = {styles.text}>
          {`Attack: ${this.props.weaponAttack}`}
        </div>
        
        <div style = {styles.text}>
         { `Level: ${this.props.playerLevel}`}
        </div>
          
        <div style = {styles.text}>
          {`Next: ${this.props.playerExp}`}
        </div >
      </div>
    );
  }
}

const styles = {
  headRow:{
    display:          'flex',
    width:            '600px',
    justifyContent:   'space-around',
  },
  text:{
    color:            '#ccc',
    
  }
}


const mapStateToProps = (state) => ({
    playerHealth: state.currentState.playerHealth,
    playerWeapon: state.currentState.playerWeapon,
    playerExp:    state.currentState.playerExp,
    weaponAttack: state.currentState.weaponDamage,
    playerLevel:  state.currentState.playerLevel,
});


export default connect(
  mapStateToProps
)(Header);



