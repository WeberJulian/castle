import React, { Component } from 'react';
import { Paper, Grid, Button } from '@material-ui/core';


const container = {
    width: "90%",
    height: "85px",
    margin: "auto",
    marginTop: "40px",
}
const centered = {
    margin: "auto"
}

export default class navBar extends Component{
    constructor(props){
        super(props)
        this.state = {

        }
    }

    handleClick(){
        console.log("Click")
    }

    render(){
        return (
            <Paper style={container} elevation={1}>
                <Grid container spacing={24}>
                    <Grid item xs={3}>
                        <Button onClick={this.handleClick.bind(this)} style={centered}>Hello</Button>
                    </Grid>
                    <Grid item xs={3}>
                    <Button onClick={this.handleClick.bind(this)}>Hello</Button>
                    </Grid>
                    <Grid item xs={3}>
                    <Button onClick={this.handleClick.bind(this)}>Hello</Button>
                    </Grid>
                    <Grid item xs={3}>
                    <Button onClick={this.handleClick.bind(this)}>Hello</Button>
                    </Grid>
                </Grid>
            </Paper>
        )
    }
}
