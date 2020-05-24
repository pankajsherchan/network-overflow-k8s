import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography
} from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import CardHeader from '@material-ui/core/CardHeader';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import FavoriteIcon from '@material-ui/icons/Favorite';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ShareIcon from '@material-ui/icons/Share';
import React from 'react';
import eventimg from '../../../assets/persons.svg';

const useStyles = makeStyles(theme => ({
  avatar: {
    backgroundColor: theme.palette.common.red
  },
  eventCardHeader: {
    ...theme.typography.h4
  },
  eventCardSubHeader: {
    color: theme.palette.common.blue,
    fontWeight: 600,
    fontSize: '0.5em'
  },
  eventCardTitle: {
    fontSize: '0.6em',
    fontWeight: 700
  },
  cardContent: {
    ...theme.typography.subtitle1,
    fontSize: '1em'
  },
  eventCardIcons: {
    backgroundColor: theme.palette.common.blue
  },
  root: {
    maxWidth: 345,
    boxShadow: '0 1px 2px rgba(0,0,0,0.15)',
    transition: 'box-shadow 0.3s ease-in-out',
    '&:hover': {
      boxShadow: '0 10px 25px rgba(0,0,0,0.3)'
    }
  },
  media: {
    height: 140
  }
}));

const EventCard = () => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            R
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title="Shrimp and Chorizo Paella"
        subheader="September 14, 2016"
        className={classes.eventCardHeader}
        classes={{
          subheader: classes.eventCardSubHeader,
          title: classes.eventCardTitle
        }}
      />
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={eventimg}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default EventCard;
