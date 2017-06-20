import React from 'react';
import { render } from 'react-dom';
import { scaleLinear } from 'd3-scale';
import { max, min } from 'd3-array';
import { select } from 'd3-selection';
import { transition } from 'd3-transition';
import { axisBottom, axisLeft } from 'd3-axis';

class Scatter extends React.Component{
  constructor(props){
    super(props);
    this.createScatterPlot = this.createScatterPlot.bind(this);
  }
   
  componentDidMount() {
    this.createScatterPlot()
  }
   
  componentDidUpdate() {
    this.createScatterPlot()
  }
   
  createScatterPlot() {
    let data = this.props.data;
    
    for(let key in data){
      if(data[key].Doping ===""){
        data[key].color = 'green';
        data[key].legend = 'Has No Doping Allegations';
      }
      else{
        data[key].color = 'red';
        data[key].legend = 'Has Doping Allegations';
      }
    }
    
    const dataLength = data.length;
    const node = this.node;
    const margin = {top: 20, right: 30, bottom: 30, left: 60};
    const width = this.props.sizeX - margin.left - margin.right;
    const height = this.props.sizeY - margin.top - margin.bottom;
    
    const timeMin = min(data, (d) => {
      return d.Seconds;
    });
    const timeMax = max(data, (d) => {
      return d.Seconds;
    });
    
    const dataMin = min(data, (d) => {
      return d.Place;
    });
    const dataMax = max(data, (d) => {
      return d.Place;
    });
    
    const xScale = scaleLinear()
      .domain([185, 0])
      .range([0,width]);
      
    const yScale = scaleLinear()
      .range([0,height])
      .domain([1,38]);
    
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
      
    const chart = select('.chart')
      .attr("width", width + margin.left + margin.right+100)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
      
    const xAxis = axisBottom(xScale);
    const yAxis = axisLeft(yScale);
      
    const dots = chart.selectAll('.dot')
      .data(data)
      .enter()
      .append('circle')
        .attr('class', 'dot')
        .attr("r", 4)
        .style('fill',  
          (d) => {
            return d.color;
        })
        .attr('cx', 
          (d) => { 
            return xScale( d.Seconds-timeMin);
        })
        .attr('cy', 
          (d) => { 
            return yScale(d.Place);
        })
        .attr('height', 
          (d) => { 
            return height - yScale(d.Place);
        })
        .attr('width', Math.ceil(width/data.length))
        .on('mouseover', (d,i) => {
          
          const rect = select(event.target);
          
          rect.style('fill','#ffbb66');
          
          tooltip.transition()
            .duration(200)
            .style("opacity", 0.9)
            .style('visibility', 'visible');
          tooltip.html(
              '<div style="margin: 10px;">'
                + '(' + d.Place + ') ' 
                + d.Name + ', ' + d.Year.toString() + '<br>' 
                + d.Nationality + '<br>' 
                + d.Doping + '<br>' 
              +'</div>'
            );
          tooltip.style('top', (event.pageY-10)+'px')
            .style('left',(event.pageX+10)+'px');
        })
        .on('mouseout', (d) => {
          let rect = select(event.target);
          rect.style('fill', d.color);
          tooltip.transition()
            .duration(300)
            .style("opacity", 0);
          
        });
        
    const labels = chart.selectAll('text')
      .data(data)
      .enter()
      .append('text')
        .text(
          (d) => {
            return d.Name;
        })
        .attr('x', 
          (d) => { 
            return xScale(d.Seconds-timeMin);
        })
        .attr('y', 
          (d) => { 
            return yScale(d.Place);
        })
        
        .attr('width', Math.ceil(width/data.length))
        .attr("transform", "translate(15,+4)")
        .style('font-size', '0.7em')
        .style('font-family', 'Sans-Serif');
    
    const legend = chart.append('g')
      .attr('x',0)
      .attr('y',0)
      .attr("transform", "translate(700,400)")
    
    legend.append('circle')
      .attr('r', 4)
      .style('fill', 'green')
      
    legend.append('text')
      .attr("transform", "translate(15,4)")
      .text('Has No Doping Allegations')
      .style('position', 'relative')
      .style('font-size', '0.7em')
      .style('font-family', 'Sans-Serif');
      
    legend.append('circle')
      .attr("transform", "translate(0,20)")
      .attr('r', 4)
      .style('fill', 'red')
    
    legend.append('text')
      .attr("transform", "translate(15,24)")
      .text('Has Doping Allegations')
      .style('font-size', '0.7em')
      .style('font-family', 'Sans-Serif');
      
    chart.append("g")
      .attr("class", "xAxis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);
      
    chart.append('text')
        .attr("x", width-10)
        .attr("y", height-10)
        .attr("dx", "0.8em")
        .style("text-anchor", "end")
        .text("Seconds After First Place");
    
    chart.append("g")
      .attr("class", "yAxis")
      .call(yAxis);
      
    chart.append('text')
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", "0.8em")
        .style("text-anchor", "end")
        .text("Ranking");
      
  }
  
  render() {
   return (
      <div className="dataCard" style={styles.dataCard}>
        <div className="dataCardHeader" style={styles.dataCardHeader}>
           Cyclist Data
        </div>
        <svg className="chart" 
          width={this.props.sizeX+100} 
          height={this.props.sizeY}
          style={styles.data}>
        </svg>
       
      </div>);
    
  }
    
}

const dotDefaultColor = 'green';
const dotDopingColor = 'magenta';

const styles = {
  dataCard:{
    backgroundColor:  'white',
    boxShadow:        '2px 2px 10px #888',
    borderRadius:     '10px',
    padding:          '20px 0px',
    width:            '1100px',
  },
  dataCardHeader:{
    textAlign:        'center',
    fontSize:         '2em',
    fontFamily:       'sans-serif',
    color:            dotDefaultColor,
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

export default Scatter;