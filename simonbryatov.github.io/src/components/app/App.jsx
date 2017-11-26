import React from 'react'
import './App.scss';
import Header from '../header/Header.jsx'
import axios from 'axios'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

class App extends React.Component {
  
  constructor(props) {
  super(props);
  this.state = {
    data: "hello11"
  };
}
  componentWillMount() {
   axios.get("https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/GDP-data.json")
   .then((resp) => {
     
     let points = []
     let res = resp.data.data
     res.forEach((el) => {
     var obj = {}
     obj.name = el[0];
     obj.uv = el[1]
     points.push(obj)
   })
     this.setState({data: resp.data, points: points});
   console.log(this.state.data, this.state.points);
     
   })
   
  // console.log(points);
   //this.render();
  }
  
  render() {
  return (
    <div className="site-wrapper">
    Hello world!
    <h1>fuck this shit</h1>
    <Header />
<BarChart width={800} height={500} data={this.state.points}
            margin={{top: 5, right: 30, left: 20, bottom: 5}}>
       <XAxis dataKey="name"/>
       <YAxis/>
       <CartesianGrid strokeDasharray="3 3"/>
       <Tooltip />
       <Bar dataKey="uv" fill="#82ca9d"/>
      </BarChart>
    FUCK THIS SHIT
    </div>
  );
}
}

export default App;  