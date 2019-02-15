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
      hostels: {}
    }
  }
  componentWillMount() {
    this.setState({ hostels })
  }
  render() {
    return (
      <div>
        <NavBar/>
        <div style={ListContainer}>
          <BuildList hostels={this.state.hostels}/>
        </div>  
      </div>
    );
  }
}

export default App;


const BuildList = (props) => {
  let hostels = props.hostels
  let list = []
  for (let i = 0; i < hostels.length; i++){
    if(hostels[i].michelinStars !== 0){
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