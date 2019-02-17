import React, { Component } from 'react';
import hostels from "./hostels.json"
import HostelCard from "./HostelCard"
import Grid from '@material-ui/core/Grid';
import NavBar from "./NavBar"
import "./App.css"

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
      date: new Date(),
      filtering: "name"
    }
  }
  componentWillMount() {
    this.setState({ hostels })
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
      case "stars":
        break;
    }
    this.setState({ hostels })
  }
  render() {
    return (
      <div>
        <NavBar updateFiltering={this.updateFiltering.bind(this)} />
        <div style={ListContainer}>
          <BuildList hostels={this.state.hostels} />
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
          <HostelCard hostel={hostels[i]} />
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