import React from 'react'
import './App.scss';
import Header from '../header/Header.jsx'
import axios from 'axios'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip} from 'recharts';

class App extends React.Component {
  
  constructor(props) {
  super(props);
  this.state = {
    data: "hello11"
  };
  this.renderTooltip = this.renderTooltip.bind(this);
}
 
  componentWillMount() {
   axios.get("https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/GDP-data.json")
   .then((resp) => {
     
     let points = []
     let tooltipPayload = []
     let res = resp.data.data
     res.forEach((el) => {
     var obj = {}
     obj.name = el[0];
     obj.val = el[1]
     obj.xAxisName = el[0].match(/^(.*?)-/)[1]
     points.push(obj)
     var obj2 = {}
     obj2.date = el[0];
     obj2.value = el[1]
     tooltipPayload.push(obj2);
   })
     this.setState({data: resp.data, points: points, tooltipPayload: tooltipPayload});
   console.log(this.state.data, this.state.points);
     
   })
  }
  
   renderTooltip(props) {
       if (props.payload[0]) {
           let data = props.payload[0].payload;
           console.log(data);
  return(<div className="custom-tooltip">
   <p>{"$" + data.val + "0 Billion"}</p>
   <p>{data.name}</p>
  </div>)
       }
 }

  render() {
  return (
   <div>
    
     <div className="flex-wrapper">
      <div className = "chart-container">
      <Header />
<BarChart width={1200} height={500} data={this.state.points} barCategoryGap = {0} barGap = {0}
            margin={{top: 5, right: 30, left: 20, bottom: 5}}>
       <XAxis dataKey="xAxisName"/>
       <YAxis label = {{fill: "#FF9066", dy: -5,   value: 'Gross Domestic Product, USA', angle: -90, offset: 71, color: "red",  position: 'insideLeft' }}/>
       <CartesianGrid strokeDasharray="2 3"/>
       <Tooltip cursor={{ stroke: 'white', strokeWidth: 1 }} content = {this.renderTooltip}/>
       <Bar dataKey="val" fill="#FF9066" barSize = {10}/>
      </BarChart>
      <p className = "description">Units: Billions of Dollars Seasonal Adjustment: Seasonally Adjusted Annual Rate Notes: A Guide to the National Income and Product Accounts of the United States (NIPA) - (http://www.bea.gov/national/pdf/nipaguid.pdf)</p>
      <p className = "credits">by <span className ="me">
      <a href = "https://github.com/SimonBryatov">Simon Bryatov</a>
      </span> in 2017</p>    
     </div>
    </div>
    </div>
  );
}
}

export default App;  