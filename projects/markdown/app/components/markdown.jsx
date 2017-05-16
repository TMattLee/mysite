import React from 'react';
import {render} from 'react-dom';
import RawInput from './rawinput.jsx';
import DoMarkdown from './do-markdown.jsx';


  
class Markdown extends React.Component{
  constructor(){
    super();
    this.startString = `Heading\n=======\n\nSub-heading\n-----------\n \n### Another 
      deeper heading\n \nParagraphs are separated\nby a blank line.\n\nLeave 2 spaces 
      at the end of a line to do a  \nline break\n\nText attributes *italic*, **bold**,
      \n\`monospace\`,~~strikethrough~~ .\n\nShopping list:\n\n  * apples\n  
      * oranges\n  * pears\n\nNumbered list:\n\n  1. apples\n  2. oranges\n  3. 
      pears\n\nThe rain---not the reign---in\nSpain.\n\n Sample provided by:
      *[Herman Fassett](https://freecodecamp.com/hermanfassett)*`;
    this.state = {
      value: this.startString,
    }
    this.updateValue = this.updateValue.bind(this);
  }
  
  updateValue(newStr){
    //console.log('value is a: ',typeof(newStr));
    this.setState({
      value: newStr,
    });
  }

  render(){

    return (<div style = {styles.markdownContainer} >
      <div style = {styles.leftPane} className="leftPane" >
        <RawInput val={this.state.value} handleChange={this.updateValue} />
      </div>
      <div style = {styles.rightPane} className="rightPane" >
        <DoMarkdown markval={this.state.value} />
      </div>
    </div>);
  }
}

const styles = {
  leftPane:{
    display:           'flex',
    flexDirection:    'column',
    width:            '550px',
    height:           '750px',
  },
  rightPane:{
    display:           'flex',
    flexDirection:    'column',
    width:            '550px',
    height:           '750px',
    
  },
  markdownContainer:{
    display:          'flex',
    flexDirection:    'row',
    height:           '800px',
    
    alignItems:       'center',
    justifyContent:   'space-around',
  }
}

export default Markdown;