import React from 'react';
import {render} from 'react-dom';

class RawInput extends React.Component{
  constructor(props){
    super(props);
    this.updateText = this.updateText.bind(this);
  }
  
  updateText(evt){
  
    let newValue=evt.target.value;
    //onsole.log(typeof(newValue));
    //console.log(newValue);
    this.props.handleChange(newValue);
  }
  
  
  render(){
    return( <textarea rows="22" type="text" name="textarea" 
    value={this.props.val} onChange={this.updateText} 
    className="form-control"
    style = {{width: '500px', height: '700px'}}></textarea>);
  }
}

export default RawInput;