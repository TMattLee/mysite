import React from 'react';
import {render, Component} from 'react-dom';
import axios from 'axios';

import Graph from './graph';

class GDP extends React.Component{
  constructor(){
    super();
    this.state = {
      json: null,
    }
  }
  
  componentDidMount(){
    axios.get('https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/GDP-data.json')
    .then(
      (response) => {
        let jsonData = response.data;
        this.setState({
          json: jsonData,
        })
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
        <Graph json={this.state.json} sizeX = {1000} sizeY = {500} />
      </div>
    );
  }
    
}

const styles = {
    
};

export default GDP;
