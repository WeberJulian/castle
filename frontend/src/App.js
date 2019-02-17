import React, { Component } from 'react';
import hostels from "./hostels.json"
import HostelCard from "./HostelCard"
import Grid from '@material-ui/core/Grid';
import NavBar from "./NavBar"
import "./App.css"
import Network from './Network.js';

const ListContainer = {
  width: '70%',
  padding: "30px",
  margin: 'auto',
};

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      hostels: {},
      day: new Date(),
      filtering: "name"
    }
  }
  async componentWillMount() {
    let newHostels = await Network.fetchPrices(hostels)
    this.setState({ hostels:  newHostels})
  }
  updateFiltering(filtering) {
    this.setState({ filtering })
    this.filter(filtering)
  }
  filter(filtering) {
    let hostels = [...this.state.hostels]
    switch (filtering) {
      case "name":
        hostels.sort((a, b) => {
          if (a.name.toLowerCase() > b.name.toLowerCase()) {
            return 1
          }
          else {
            return -1
          }
        })
        break;
      case "stars":
        hostels.sort((a, b) => {
          if (a.michelinStars > b.michelinStars) {
            return -1
          }
          else {
            return 1
          }
        })
        break;
      case "price":
      hostels.sort((a, b) => {
        if (a.price > b.price) {
          return 1
        }
        else {
          return -1
        }
      })
        break;
    }
    this.setState({ hostels })
  }

  async onDayChange(day){
    this.setState({day})
    let newHostels = await Network.fetchPrices(hostels)
    this.setState({ hostels:  newHostels})
    this.filter(this.state.filtering)
  }

  render() {
    return (
      <div>
        <NavBar updateFiltering={this.updateFiltering.bind(this)} onDayChange={this.onDayChange.bind(this)} />
        <div style={ListContainer}>
          <BuildList hostels={this.state.hostels} day={this.state.day}/>
        </div>
      </div>
    );
  }
}

export default App;


const BuildList = (props) => {
  let hostels = props.hostels
  let list = []
  for (let i = 0; i < hostels.length; i++) {
    if (hostels[i].michelinStars !== 0) {
      list.push(
        <Grid item xs={6} key={i}>
          <HostelCard hostel={hostels[i]} day={props.day} />
        </Grid>
      )
    }
  }
  return (
    <Grid container spacing={24}>
      {list}
    </Grid>
  )
}