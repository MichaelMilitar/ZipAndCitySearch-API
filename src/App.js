import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

class ZipInfo extends Component {
  constructor(props){
    super(props);
    this.state = {
      check: true,
      first: true,
      zipCode: "",
      data: [{
                LocationText: "City",
                State: "State",
                Lat: "0",
                Long: "0",
                EstimatedPopulation: "0",
                TotalWages: "1",
            }
        ]
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  handleClick() {
    this.setState ({
      first : !this.state.first,
    });
  }
  handleChange (event) {
    this.setState({
      zipCode: event.target.value
    });
  }
  fetchZipData(zipcode){
    axios.get("https://ctp-zip-api.herokuapp.com/zip/" + zipcode)
    .then(response => {
      let result = response.data.map(city => {
        return {
          LocationText: city.LocationText,
          State: city.State,
          Lat: city.Lat,
          Long: city.Long,
          EstimatedPopulation: city.EstimatedPopulation,
          TotalWages: city.TotalWages,
        };
      });
      this.setState({data:result, check:true});
    })
    .catch(err => {
      console.log(err);
      this.setState({check:false});
    });
  }

  render(){
    if (this.state.first) {
      return (
        <div>
          <h1 className = "App-header">Zip Code Search </h1>
          <h2  className = "App-subheader">Zip Code: 
          <input type='text' placeholder = "Enter Zip Code Here" value = {this.state.zipCode} onChange={this.handleChange}/> </h2>
          <button className= "button" onClick={this.handleClick}>Submit</button>
        </div>
      );
    } else {
      this.fetchZipData(this.state.zipCode);
      let cities = (<p>Zip Code Not Found</p>);
      if(this.state.check){
        cities = this.state.data.map((city)=>
          <ParticularCity data={city}/>
        );
      }
      return(
        <div>
        <h1 className = "App-header">Zip Code Search Results</h1>
        <h2 className = "App-subheader">Zip Code: {this.state.zipCode}</h2>
        <div className = "cityList">{cities}</div>
        <button className= "button" onClick={this.handleClick}>Try Again</button>
        </div>
      );
    }
  }
}

class ParticularCity extends Component {
  render(){
    let {
        LocationText,
        Lat,
        Long,
        EstimatedPopulation,
        TotalWages,
    } = this.props.data;

    return (
      <div className="container">
        <p className="locationText">{LocationText}</p>
        <p>Location: ({Lat}, {Long})</p>
        <p>Estimated Population: {EstimatedPopulation}</p>
        <p>Total Wages: {TotalWages}</p>
      </div>
    );
  }
}

class App extends Component {
  render() {
    return (
      <div className="centered">
        <ZipInfo zipcode/>
      </div>
    );
  }
}

export default App;