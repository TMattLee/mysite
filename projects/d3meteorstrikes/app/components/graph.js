import React from 'react';
import { render } from 'react-dom';

import WorldMap from './worldmap';

class Graph extends React.Component{
  render(){
    return (
      <div>
        <WorldMap sizeX = {1200} sizeY = {650} />
      </div>
    );
  }
    
}

const styles = {
    
};

export default Graph;
