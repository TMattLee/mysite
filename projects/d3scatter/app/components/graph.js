import React from 'react';
import { render } from 'react-dom';
import axios from 'axios';

import Scatter from './scatter';

class Graph extends React.Component{
  constructor(){
    super();
    this.state = {
      json: null,
    }
  }
  
  componentDidMount(){
    axios.get('./cyclist-data.json')
    .then(
      (response) => {
        let jsonData = response.data;
        this.setState({
          json: jsonData,
        });
      }
    )
    .catch(
      (error) => {
        console.log(error);
      }
    );
  }
  
  render(){
    if(!this.state.json){
      return <div>Loading</div>;
    }
    return (
      <div>
        <Scatter data={this.state.json} sizeX = {1000} sizeY = {600} />
      </div>
    );
  }
    
}

const styles = {
    
};

export default Graph;
