import React from 'react';
import {render} from 'react-dom';

export default class DoMarkdown extends React.Component{
  render(){
    this.markup = marked(this.props.markval,{sanitize: true});
    return <span dangerouslySetInnerHTML={{__html:this.markup}} />;
  }
}