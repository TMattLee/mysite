import React from 'react';
import { render } from 'react-dom';
import { select } from 'd3-selection';
import { transition } from 'd3-transition';
import { axisBottom, axisLeft } from 'd3-axis';
import { drag } from 'd3-drag'
import { forceSimulation, 
  forceLink, 
  forceManyBody, 
  forceCenter,
  forceX, 
  forceY } from 'd3-force';
  
import flagjson from '../../flags.json';

class ForceMap extends React.Component{
  constructor(props){
    super(props);
    this.createForceMap = this.createForceMap.bind(this);
  }
   
  componentDidMount() {
    this.createForceMap()
  }
   
  componentDidUpdate() {
    this.createForceMap()
  }
   
  createForceMap() {
    const data = this.props.data;
    
    // Define Graph area
    const margin = {top: 20, right: 100, bottom: 30, left: 100};
    const width = this.props.sizeX - margin.left - margin.right;
    const height = this.props.sizeY - margin.top - margin.bottom;
    const graphHeight = height - 50;
    
    // Create customizable tooltip
    const tooltip = select('body')
      .append('div')
      .style('position', 'absolute')
      .style('z-index', '10')
      .style('opacity', 0)
      .style('background-color', '#555')
      .style('color', 'white')
      .style('border-radius', '5px')
      .style('font-size', '0.9em')
      .style('font-family', 'Sans-Serif')
      .style('box-shadow', '2px 2px 20px #222')
      .style('pointer-events', 'none');
    
    // Define chart
    const chart = select('.chart')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
      
    const node = chart.append('g');
    
    node.selectAll('image').data(data.nodes).enter()
      .append('symbol')
        .attr('id', d => d.code )
        .attr('class','flag')
        .attr('viewBox', (d) => {
          let coordinates = flagjson[d.code].position.split(' ');
          return coordinates[0] + ' ' + coordinates[1] + ' 16 11';
        })
        .append('image')
          .attr('xlink:href', 'flags.png')
          .attr('width', '256px')
          .attr('height', '176px')
    
    const nodeElements = node.selectAll('g').data(data.nodes).enter()
      .append('use')
        .attr('xlink:href', (d) => {
          return '#' + d.code
        })
        .attr('width', 16)
        .attr('height', 11)
        .on('mouseover', (d,i) => {
        
          // Show tool tip on mouseover
          const rect = select(event.target);
          tooltip.transition().duration(200)
          tooltip.style('opacity', 0.9);
          tooltip.html(
              '<div style="margin: 10px; text-align:right;">'
                + d.country
              +'</div>'
            );
            
          tooltip.style('top', (event.pageY-10)+'px')
            .style('left',(event.pageX+10)+'px');
            
        })
        .on('mouseout', (d) => {
          // Hides tooltip
          let rect = select(event.target);
          tooltip.transition().duration(200)
          tooltip.style('opacity', 0);
        });
        
    const linkElements =  chart.append('g')
      .selectAll('line')
      .data(data.links)
      .enter().append('line')
        .attr('stroke-width', 1)
        .attr('stroke', '#E5E5E5')
    
    const simulation = forceSimulation()
      .nodes(data.nodes)
      .force('charge', forceManyBody().strength(-50))
      .force('link', forceLink(data.links).distance(15))
      .force('x', forceX())
      .force('y', forceY())
      .force('center', forceCenter(width / 2, graphHeight / 2))
        .on('tick', () => {
          nodeElements
            .attr('x', node => node.x)
            .attr('y', node => node.y)
          linkElements
           .attr('x1', link => link.source.x)
           .attr('y1', link => link.source.y)
           .attr('x2', link => link.target.x)
           .attr('y2', link => link.target.y)
        })
        
    const dragDrop = drag()
      .on('start', node => {
        node.fx = node.x
        node.fy = node.y
      })
      .on('drag', node => {
        simulation.alphaTarget(0.7).restart()
        node.fx = event.x-135
        node.fy = event.y-120
      })
      .on('end', node => {
        if (!event.active) {
          simulation.alphaTarget(0)
        }
        node.fx = null
        node.fy = null
      })
    
    nodeElements.call(dragDrop);
      
    
  }
  
  render() {
   return (
      <div className='dataCard' style={styles.dataCard}>
        <div className='dataCardHeader' style={styles.dataCardHeader}>
          <div style={styles.headerText}>
            National Contiguity Via Force Directed Graph
          </div>
        </div>
        <svg className='chart' style={styles.data}></svg>
      </div>);
  }
}

const headerColor = 'lightblue';

const styles = {
  dataCard:{
    backgroundColor:  'white',
    boxShadow:        '2px 2px 10px #888',
    borderRadius:     '10px',
    width:            '1200px',
  },
  dataCardHeader:{
    fontSize:         '2em',
    fontFamily:       'sans-serif',
    color:            headerColor,
  },
  data:{
    backgroundColor:  headerColor,
  },
  headerText:{
    display:          'flex',
    alignItems:       'center',
    justifyContent:   'center',
  }
};

export default ForceMap;
