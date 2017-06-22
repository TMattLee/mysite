import React from 'react';
import { render } from 'react-dom';
import json from '../../countries.json';

import ForceMap from './forcemap';

class Graph extends React.Component{
  constructor(){
    super();
    this.state = {
      json: null,
    }
  }
  
  componentDidMount(){
    this.setState({
      json: json,
    });
  }
  
  render(){
    if(!this.state.json){
      return <div>Loading</div>;
    }
    return (
      <div>
        <ForceMap data={this.state.json} sizeX = {1200} sizeY = {650} />
      </div>
    );
  }
    
}

const styles = {
    
};

export default Graph;
