import React, { Component } from 'react';
import { Paper, Grid, Button } from '@material-ui/core';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';


const container = {
    width: "90%",
    height: "75px",
    margin: "auto",
    marginTop: "40px",
}
const datePicker = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
}
const cell = {
    width: "100%",
    height: "100%",
}
const button = {
    margin: "7px"
}

export default class navBar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            filtering: "name"
        }
    }

    handleName() {
        this.setState({ filtering: "name" })
        this.props.updateFiltering("name")
    }

    handlePrice() {
        this.setState({ filtering: "price" })
        this.props.updateFiltering("price")
    }

    handleStars() {
        this.setState({ filtering: "stars" })
        this.props.updateFiltering("stars")
    }

    selectVariant(filter) {
        if (filter == this.state.filtering) {
            return "contained"
        }
        else {
            return "outlined"
        }
    }

    render() {
        return (
            <Paper style={container} elevation={1}>
                <Grid container spacing={24}>
                    <Grid item xs={3} style={cell}>
                        <div style={datePicker}>
                            <p style={{ marginRight: "10px" }}>Pick a Weekend :  </p>
                            <DayPickerInput initialMonth={new Date()}
                                disabledDays={{ daysOfWeek: [1, 2, 3, 4, 5] }}
                                onDayChange={day => this.props.onDayChange(day)} />
                        </div>
                    </Grid>
                    <Grid item xs={3} style={cell}>
                        <div style={datePicker}>
                            <Button
                                style={button}
                                onClick={this.handleName.bind(this)}
                                color="primary"
                                variant={this.selectVariant("name")}
                            >
                                Filter by name
                            </Button>
                        </div>
                    </Grid>
                    <Grid item xs={3} style={cell}>
                        <div style={datePicker}>
                            <Button 
                                style={button}
                                onClick={this.handleStars.bind(this)} 
                                color="primary" 
                                variant={this.selectVariant("stars")}
                            >
                                Filter by stars
                            </Button>
                        </div>
                    </Grid>
                    <Grid item xs={3} style={cell}>
                        <div style={datePicker}>
                            <Button 
                                style={button}
                                onClick={this.handlePrice.bind(this)} 
                                color="primary" 
                                variant={this.selectVariant("price")}
                            >
                                Filter by price
                            </Button>
                        </div>
                    </Grid>
                </Grid>
            </Paper>
        )
    }
}
