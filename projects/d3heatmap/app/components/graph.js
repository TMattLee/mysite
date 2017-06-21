import React from 'react';
import { render } from 'react-dom';
import json from '../../global-temperature.json';

import HeatMap from './heatmap';

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
        <HeatMap data={this.state.json} sizeX = {1200} sizeY = {550} />
      </div>
    );
  }
    
}

const styles = {
    
};

export default Graph;
