import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import CardHeader from '@material-ui/core/CardHeader';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CardMedia from '@material-ui/core/CardMedia';
import Collapse from '@material-ui/core/Collapse';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import star from './michelin_star.png';

const styles = theme => ({
  card: {
    maxWidth: "100%",
    padding: 20,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  actions: {
    display: 'flex',
    justifyContent: 'center',
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: "red",
  }
});

class HostelCard extends Component {
  state = { expanded: false, anchorEl: null, };

  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { classes, hostel } = this.props;

    return (
      <Card className={classes.card}>
        <CardHeader
          action={
            <div>
              <IconButton aria-owns={this.state.anchorEl ? 'simple-menu' : undefined}
                aria-haspopup="true" onClick={this.handleClick}>
                <MoreVertIcon />
              </IconButton>
              <Menu
                id="simple-menu"
                anchorEl={this.state.anchorEl}
                open={Boolean(this.state.anchorEl)}
                onClose={this.handleClose}
              >
                <MenuItem onClick={()=>{window.location=hostel.uri;this.handleClose()}}>See on relaischateaux</MenuItem>
                <MenuItem onClick={()=>{window.location=hostel.michelinUri;this.handleClose()}}>See on Michelin</MenuItem>
              </Menu>
            </div>
          }
          title={hostel.name}
          subheader={hostel.location}
        />
        <CardMedia
          className={classes.media}
          image={hostel.image}
          title="Paella dish"
        />

        <CardContent>
          <Typography component="p">
            {hostel.citation}
          </Typography>
          <Typography variant="button" component="p" style={{marginTop: "15px"}}>
            Michelin's starring : <Starring nb={hostel.michelinStars}/>
          </Typography>
          
        </CardContent>

        <CardActions className={classes.actions} disableActionSpacing>
          <IconButton onClick={this.handleExpandClick}>
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>

        <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph>
              {hostel.description}
            </Typography>
          </CardContent>
        </Collapse>


      </Card>
    )
  }

}

HostelCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

const Starring = (props) => {
  let nb = props.nb
  let stars = []
  for (let i = 0; i < nb; i++){
    stars.push(<img src={star} alt="Logo" width="30" style={{marginHorizontal: '5px'}}/>)
  }
  return stars
}

export default withStyles(styles)(HostelCard);