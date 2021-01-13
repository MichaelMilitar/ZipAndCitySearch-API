import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

class CityInfo extends Component {
  constructor(props){
    super(props);
    this.state = {
      check: true,
      first: true,
      zipcodes: ["Can't find this city"] ,
      city: "",
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  fetchCityData(city){
    axios.get("https://ctp-zip-api.herokuapp.com/city/" + city)
    .then(response => {
      let result = response.data;
      this.setState({zipcodes:result, check:true});
    })
    .catch(err => {
      console.log(err);
      this.setState({check:false});
    });
  }

  handleClick() {
    let upperCaseCity = this.state.city.toUpperCase();
    if (!this.state.first) {
      upperCaseCity = ""
    };
      this.setState ({
          first : !this.state.first,
          city: upperCaseCity,
      });
  }
  handleChange (event) {
    
    this.setState({
        city:  event.target.value
    });
}
  render() {
    if (this.state.first) {
      return (
          <div >
            <h1 className = "App-header">City Search </h1>
            <h2  className = "App-subheader">City: <input classname="inputLine" type='text' placeholder = "Enter City Name Here" value = {this.state.city} onChange={this.handleChange}/></h2>
              
              <button className= "button" onClick={this.handleClick}>Submit</button>
          </div>
      );
  } else {
      this.fetchCityData(this.state.city);
      let zipcodes = (<p>City Not Found</p>);
      if(this.state.check){
        zipcodes = this.state.zipcodes.map((zipcode)=>
        <ParticularZip data={zipcode}/>
        );
      }; 
    let correctCity = this.state.city.toLowerCase();
    correctCity = correctCity.charAt(0).toUpperCase() + correctCity.slice(1);
    return(
      <div>
        <h1 className = "App-header">City Search Results</h1>
        <h2 className = "App-subheader">City: {correctCity}</h2>
        <ul className = "zipList">{zipcodes}</ul>
        <button className= "button" onClick={this.handleClick}>Try Again</button>
      </div>

    );
  }
  }
}
class ParticularZip extends Component {

  render() {
      let zip = this.props.data;
      return (
          <li>
              <p>{zip}</p>
              
          </li>
      );
  }
}


class App extends Component {
  render() {
      return (
          <div>
            <CityInfo />
          </div>

      );
  }
}

export default App;