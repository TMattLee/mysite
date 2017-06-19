import React from 'react';
import {render, Component} from 'react-dom';
import { scaleLinear, scaleTime } from 'd3-scale';
import { max, min } from 'd3-array';
import { select } from 'd3-selection';
import { transition } from 'd3-transition';
import { axisBottom, axisLeft } from 'd3-axis';
import { timeYear } from 'd3-time';

class Graph extends React.Component{
  constructor(props){
    super(props);
    this.createBarChart = this.createBarChart.bind(this);
    this.monthArr = [
      'January', 'February', 'March', 'April', 'May', 'June', 
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
  }
   
  componentDidMount() {
    this.createBarChart()
  }
   
  componentDidUpdate() {
    this.createBarChart()
  }
   
  createBarChart() {
    const dataLength = this.props.json.data.length;
    const node = this.node;
    const margin = {top: 20, right: 30, bottom: 30, left: 60};
    const width = this.props.sizeX - margin.left - margin.right;
    const height = this.props.sizeY - margin.top - margin.bottom;
    
    const dateMin = new Date( this.props.json.data[0][0]);
    const dateMax = new Date( this.props.json.data[dataLength-1][0]);

    const dataMin = min(this.props.json.data, (d) => {
      return d[1];
    });
    const dataMax = max(this.props.json.data, (d) => {
      return d[1];
    });
    
    const xScale = scaleTime()
      .domain([dateMin, dateMax])
      .range([0,width]);
      
    const yScale = scaleLinear()
      .range([height,0])
      .domain([0,max(this.props.json.data,
        (d) =>{
          return d[1];
        })
      ]);
    
    const tooltip = select('body')
      .append('div')
      .style('position', 'absolute')
      .style('z-index', '10')
      .style('visibility', 'hidden')
      .style('background-color', '#888')
      .style('color', 'white')
      .style('border-radius', '5px')
      .style('width', '200px')
      .style('font-size', '1.2em')
      .style('font-family', 'Impact')
      .style('box-shadow', '2px 2px 20px #222');
      
    const chart = select('.chart')
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
      
    const xAxis = axisBottom(xScale);
    const yAxis = axisLeft(yScale);
    
    
    
    chart.append("g")
      .attr("class", "xAxis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);
    
    chart.append("g")
      .attr("class", "yAxis")
      .call(yAxis);
      
    chart.append('text')
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", "0.8em")
        .style("text-anchor", "end")
        .text("GDP, Billions in Dollars (US)");
      
    chart.selectAll('.bar')
      .data(this.props.json.data)
      .enter()
      .append('rect')
        .attr('class', 'bar')
        .style('fill',  barDefaultColor)
        .attr('x', 
          (d) => { 
            return xScale( new Date(d[0]) );
        })
        .attr('y', 
          (d) => { 
            return yScale(d[1]);
        })
        .attr('height', 
          (d) => { 
            return height - yScale(d[1]);
        })
        .attr('width', Math.ceil(width/this.props.json.data.length))
        .on('mouseover', (d,i) => {
          const dateArr = d[0].split('-');
          const monthNumeric = parseInt(dateArr[1]);
          const month = this.monthArr[monthNumeric-1];
          const year = dateArr[0];
          const rect = select(event.target);
          
          rect.style('fill','#ffbb66');
          
          tooltip.transition()
            .duration(200)
            .style("opacity", 0.9)
            .style('visibility', 'visible');
          tooltip.html(
              '<div style="margin: 10px;">'
                +'<div>'+ year + ' - ' + month + '</div>'
                +'<div>' + d[1].toFixed(2).toString() + ' Dollars in Billions (US)' + 
                '</div>'
              +'</div>'
            );
          tooltip.style('top', (event.pageY-10)+'px')
            .style('left',(event.pageX+10)+'px');
        })
        .on('mouseout', () => {
          let rect = select(event.target);
          rect.style('fill', barDefaultColor);
          tooltip.transition()
            .duration(300)
            .style("opacity", 0);
          
        });
  }
  
  render() {
   return (
      <div className="dataCard" style={styles.dataCard}>
        <div className="dataCardHeader" style={styles.dataCardHeader}>
           United States GDP
        </div>
        <svg className="chart" 
          width={this.props.sizeX} 
          height={this.props.sizeY}
          style={styles.data}>
        </svg>
        <div className="dataCardFooter" style={styles.dataCardFooter}>
          {this.props.json.description}
        </div>
      </div>);
    
  }
    
}

const barDefaultColor = '#fe9922';

const styles = {
  dataCard:{
    backgroundColor:  'white',
    boxShadow:        '2px 2px 10px #888',
    borderRadius:     '10px',
    padding:          '20px 0px',
    width:            '1000px',
  },
  dataCardHeader:{
    textAlign:        'center',
    fontSize:         '2em',
    fontFamily:       'sans-serif',
    color:            barDefaultColor,
  },
  data:{
    margin:           '0px auto',
  },
  dataCardFooter:{
    width:            '800px',
    fontSize:         '0.9em',
    color:            '#0022cc',
    margin:           '0px auto',
  }
};

export default Graph;