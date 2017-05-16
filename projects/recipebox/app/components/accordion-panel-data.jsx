import React from 'react';
import { render } from 'react-dom';
import { ButtonToolbar, Button, Well} from 'react-bootstrap';

export default class PanelData extends React.Component{
  constructor(){
    super();
    this.parseIngredients = this.parseIngredients.bind(this);

  }
  
  parseIngredients(arr){
    if(arr.length > 0){
      console.log('ingredients', arr);
      return arr.map( (item, i) => {
        if( (i === arr.length - 1) ){
           return ( 
            <div key={i}>
              {item}
            </div>
          ); 
        }
        else {
          return( 
            <div key={i}>
             
              <div key={i}>
                {item}
              </div>
              <div style = {styles.underline}></div>
            </div>
          );
         
        }
      });
    }
    else{
      console.log("There are no ingredients. ");
    }
  }
  
  render(){
    return (
      <div style = {styles.contents} className="panelDiv">
        <div style = {{width: '600px', textAlign: 'center', fontSize: '1.5em' }} >
          Ingredients
        </div>
        <Well>
          <div style = {{width: '580px' }} >
            { this.parseIngredients(this.props.panelData) } 
          </div>
        </Well>
      </div>
    );
  }
}

const styles = {
  contents:{
    display:          'flex',
    flexDirection:    'column',
    alignItems:       'flex-start',
    justifyContent:   'flex-start',
    width:            '600px',
    minHeight:        '40px',
    
  },
  underline:{
    borderBottom:    'solid 1px #ccc',
    borderRadius:     '10px',
    margin:           '5px 0px',
  }
};