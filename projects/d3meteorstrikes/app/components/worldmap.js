import React from 'react';
import { render } from 'react-dom';
import { select, event as d3Event } from 'd3-selection';
import { transition } from 'd3-transition';
import { 
  geoPath,
  geoGraticule
} from 'd3-geo';
import { geoCylindricalStereographic } from 'd3-geo-projection';
import { scalePow,scaleThreshold } from 'd3-scale';
import { zoom } from 'd3-zoom';

import { feature } from 'topojson';
  
import data from '../../meteorite.json';
import world from '../../world-110m.v1';

class WorldMap extends React.Component{
  constructor(props){
    super(props);
    this.createWorldMap = this.createWorldMap.bind(this);
    this.colors = ['#14A7CB','#18D282','#25DA1B',
      '#A2E21E','#E3E620','#EAAF22','#EE7324','#F13625'
    ];
    this.centered;
    
  }
   
  componentDidMount() {
    this.createWorldMap()
  }
   
  componentDidUpdate() {
    this.createWorldMap()
  }
   
  createWorldMap() {
  
    
    data.features = data.features.sort( (a,b) => {
      return parseInt(b.properties.mass) - parseInt(a.properties.mass);
    })
    
    let dataMin = data.features[data.features.length-1].properties.mass;
    let dataMax = data.features[0].properties.mass;
    
    const colorScale = scaleThreshold()
      .domain([1,10,1000,10000,100000,1000000,10000000])
      .range(this.colors)
    
    const rScale = scalePow()
      .exponent(0.4)
      .domain([dataMin, dataMax])
      .range([1, 25])
   
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
      .style('background-color', '#eee')
      .style('color', '#333')
      .style('border-radius', '2px')
      .style('font-size', '0.9em')
      .style('font-family', 'Sans-Serif')
      .style('box-shadow', '0px 0px 2px #222')
      .style('pointer-events', 'none');
    
    // Define chart
    const chart = select('.chart')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .call(
        zoom()
        .scaleExtent([1, 100])
        .translateExtent([[-1*margin.left,-1*margin.top],[width+margin.left,height+parseInt(1.5*margin.top)]])
        .on('zoom', () => {
          chart.attr("transform", d3Event.transform)
        })
      )
      .append('g')
      
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
      

    const projection = geoCylindricalStereographic()
      .scale(180)
      .translate([width / 2, height / 2])
      .precision(0.1);
      
    const path = geoPath().projection(projection);
      
    const graticule = geoGraticule();
    
    // Draw Map Objects
    chart.insert("path", ".graticule")
      .datum(feature(world, world.objects.countries))
      .attr("class", "land")
      .attr("d", path)
      .attr('fill', '#aaa')
      .attr('stroke', '#ddd');
      
    
    // Add points of impact
    const strikePoints = chart.append('g')
      .selectAll('path')
        .data(data.features)
        .enter()
          .append('circle')
          .attr('fill', (d, i) => {
            let massScale = d.properties.mass;
            return colorScale(massScale) ;
          })
          .attr('fill-opacity', 0.5)
          .attr('stroke', '#333')
          .attr('stroke-width', 1)
          .attr('cx', (d) => { return projection([d.properties.reclong,d.properties.reclat])[0] })
          .attr('cy', (d) => { return projection([d.properties.reclong,d.properties.reclat])[1] })
          .attr('r', (d) => {
            let massScale = d.properties.mass;
            if(massScale === null){
              return 1;
            }
            let radius = rScale(massScale)
            return radius <= 0 ? 1 : radius; 
          })
        .on('mouseover', (d,i) => {
        
          // Show tool tip on mouseover
          const rect = select(event.target);
          tooltip.transition().duration(200)
          tooltip.style('opacity', 0.9);
          tooltip.html(
              '<div style="margin: 10px;">'
                + d.properties.name + '<br>'
                + d.properties.mass + ' g' + '<br>'
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
  }
  
  render() {
   return (
      <div className='dataCard' style={styles.dataCard}>
        <div className='dataCardHeader' style={styles.dataCardHeader}>
          <div style={styles.headerText}>
            Global Meteorite Strikes By Mass In Grams
          </div>
        </div>
        <svg className='chart' style={styles.data}></svg>
        <div className='dataCardFooter' style={styles.dataCardFooter}>
          Use double-click or mouse wheel to zoom. Hold mouse button to pan.
        </div>
      </div>);
  }
}

const headerColor = '#444a54';

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
  dataCardFooter:{
    width:            '800px',
    fontSize:         '0.9em',
    fontFamily:       'Sans-serif',
    color:            '#0022cc',
    margin:           '5px auto',
    height:           '35px',
    textAlign:        'center',
    paddingTop:       '10px',
  },
  headerText:{
    display:          'flex',
    alignItems:       'center',
    justifyContent:   'center',
  }
};

export default WorldMap;