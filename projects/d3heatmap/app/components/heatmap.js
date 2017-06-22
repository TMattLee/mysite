import React from 'react';
import { render } from 'react-dom';
import { scaleLinear, scalePoint,scaleQuantile } from 'd3-scale';
import { max, min } from 'd3-array';
import { select } from 'd3-selection';
import { transition } from 'd3-transition';
import { axisBottom, axisLeft } from 'd3-axis';
import { format } from 'd3-format';

class HeatMap extends React.Component{
  constructor(props){
    super(props);
    this.createHeatMap = this.createHeatMap.bind(this);
    this.monthArr = [
      'January', 'February', 'March', 'April', 'May', 'June', 
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    
    this.colors = ["#5e4fa2", "#3288bd", "#66c2a5", "#abdda4", 
      "#e6f598", "#ffffbf", "#fee08b", "#fdae61", "#f46d43", "#d53e4f", 
      "#9e0142"];
  }
   
  componentDidMount() {
    this.createHeatMap()
  }
   
  componentDidUpdate() {
    this.createHeatMap()
  }
   
  createHeatMap() {
    const baseTemperature = this.props.data.baseTemperature;
    const data = this.props.data.monthlyVariance;
    
    
    // Compute resulting temperature for each entry
    for(let i = 0; i < data.length; i++){
      data[i].temp = baseTemperature + data[i].variance;
    }

    const dataLength = data.length;
    
    // Define Graph area
    const margin = {top: 20, right: 100, bottom: 30, left: 100};
    const width = this.props.sizeX - margin.left - margin.right;
    const height = this.props.sizeY - margin.top - margin.bottom;
    const graphHeight = height - 50;
    
    // Obtain min and max values for data domains
    const timeMin = min(data, (d) => {
      return d.year;
    });
    
    const timeMax = max(data, (d) => {
      return d.year;
    });
    
    const tempMin = min(data, (d,i) => {
      return d.temp
    });
    const tempMax = max(data, (d,i) => {
      return d.temp
    });
    
    const dataMin = 1;
    const dataMax = 12;
    const cellSize = 30;
    
    // Process range for a given input
    const xScale = scaleLinear()
      .domain([timeMin, timeMax])
      .range([0,width]);
      
    const yScale = scalePoint()
      .range([0,graphHeight-graphHeight/12/2])
      .domain(this.monthArr);
      
    const colorScale = scaleQuantile()
      .domain([tempMin,tempMax])
      .range(this.colors)
    
    // Create customizable tooltip
    const tooltip = select('body')
      .append('div')
      .style('position', 'absolute')
      .style('z-index', '10')
      .style('visibility', 'hidden')
      .style('background-color', '#555')
      .style('color', 'white')
      .style('border-radius', '5px')
      .style('font-size', '0.9em')
      .style('font-family', 'Sans-Serif')
      .style('box-shadow', '2px 2px 20px #222');
    
    // Define chart
    const chart = select('.chart')
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    
    // Define Axis
    const xAxis = axisBottom(xScale)
      .ticks(20)
      .tickFormat(format('d'));
  
    const yAxis = axisLeft(yScale);
    
    
    // Append bars to chart
    const bars = chart.selectAll('.bar')
      .data(data)
      .enter()
      .append('rect')
        .attr('class', 'bar')
        .style('fill', (d) => { // fills color based on a given temperature
          return colorScale(d.temp);
        })
        .attr('x', 
          (d) => { 
            return xScale(d.year)+1;
        })
        .attr('y', 
          (d) => { 
            return yScale(this.monthArr[d.month-1]) 
        })
        .attr('height', Math.ceil(graphHeight/12)+2)
        .attr('width', 4)
        .on('mouseover', (d,i) => {
          
          // Show tool tip on mouseover
          const rect = select(event.target);
          
          tooltip.transition()
            .duration(200)
            .style("opacity", 0.9)
            .style('visibility', 'visible');
            
          tooltip.html(
              '<div style="margin: 10px; text-align:right;">'
                + d.year.toString() + ' - ' + this.monthArr[d.month-1] + '<br>' 
                + d.temp.toFixed(3).toString() + ' &#8451' + '<br>' 
                + d.variance + ' &#8451' + '<br>' 
              +'</div>'
            );
            
          tooltip.style('top', (event.pageY-10)+'px')
            .style('left',(event.pageX+10)+'px');
            
        })
        .on('mouseout', (d) => {
          
          // Hides tooltip
          let rect = select(event.target);
          
          tooltip.transition()
            .duration(300)
            .style("opacity", 0);
        });
        
    const legend = chart.selectAll(".legend")
      .data([0].concat(colorScale.quantiles()), (d) => {
        return d;
      });
    
    const subLegend = legend.enter().append("g")
    .attr("class", "legend");

    subLegend.append("rect")
      .attr("x", (d, i) => {
        return cellSize * i + (width - cellSize *this.colors.length);
      })
      .attr("y", graphHeight + 45)
      .attr("width", cellSize)
      .attr("height", graphHeight/12/2)
      .style("fill", (d, i) => {
        return this.colors[i];
      });
  
    subLegend.append("text")
      .attr("class", "scales")
      .text( (d) => {
        return (Math.floor(d * 10) / 10);
      })
      .attr("x", (d, i) => {
        return ((cellSize * i) + Math.floor(cellSize / 2) - 6 + (width - cellSize * this.colors.length));
      })
      .attr("y", graphHeight + graphHeight/12 + 37)
      .style('font-family','Sans-serif')
      .style('font-size','0.7em');
    
    // Displays chart axis
    chart.append("g")
      .attr("class", "xAxis")
      .attr("transform", "translate(0," + (graphHeight + 2 + (graphHeight/12)/2).toString() + ")")
      .call(xAxis);
      
    chart.append('text')
        .text('Month')
        .attr('x', -250)
        .attr('y',-50)
        .attr('transform','rotate(-90)')
        .style('font-family','Sans-serif')
        .style('font-weight','bold');
    
    chart.append('text')
        .text('Year')
        .attr('x', 450)
        .attr('y', height)
        .attr('transform','translate(0,' + graphHeight/12/2 +')')
        .style('font-family','Sans-serif')
        .style('font-weight','bold');
    
    chart.append("g")
      .attr("class", "yAxis")
      .call(yAxis)
      .attr("transform", "translate(0," + graphHeight/12/2 +")");
  }
  
  render() {
   return (
      <div className="dataCard" style={styles.dataCard}>
        <div className="dataCardHeader" style={styles.dataCardHeader}>
           Average Monthly Temperature Globally

        </div>
        <svg className="chart" 
          
          style={styles.data}>
        </svg>
        <div className="dataCardFooter" style={styles.dataCardFooter}>
          1753 - 2015. Temperatures are in Celsius and reported as anomalies relative to the Jan 1951-Dec 1980 average.
         Estimated Jan 1951-Dec 1980 absolute temperature ℃: 8.66 +/- 0.07 .    </div>
      </div>);
  }
}

const headerColor = 'black';

const styles = {
  dataCard:{
    backgroundColor:  'white',
    boxShadow:        '2px 2px 10px #888',
    borderRadius:     '10px',
    padding:          '20px 0px',
    width:            '1200px',
  },
  dataCardHeader:{
    textAlign:        'center',
    fontSize:         '2em',
    fontFamily:       'sans-serif',
    color:            headerColor,
  },
  data:{
    margin:           '0px auto',
  },
  dataCardFooter:{
    width:            '800px',
    fontSize:         '0.9em',
    fontFamily:       'Sans-serif',
    color:            '#0022cc',
    margin:           '5px auto',
  }
};

export default HeatMap;