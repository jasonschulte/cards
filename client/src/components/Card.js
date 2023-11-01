import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux'
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import CardBack from './assets/back.svg'
import shuffle from '../lib/shuffle'

const styles = () => {
  let styles = {
    card: {
      position: 'absolute',
      backgroundImage: `url(${CardBack})`,
      backgroundSize: '100% 100%',
      width: '6rem',
      height: '9rem',
    },
    ...shuffle.styles
  }
  return (styles)
};

const mapStateToProps = (state) => {
  return {
    deck: state.deck
  }
}

const Card = connect(mapStateToProps)((props) => {
  const { classes, index, shuffleAnimation, density } = props
  return (
    <ListItem
      className={classes.card}
      style={{
        zIndex: index,
        bottom: index/density,
        right: index/density,
        animation: shuffleAnimation + ' 0.3s linear 0s 6 alternate',
      }}
    >
      <ListItemText />
    </ListItem>
  );
});

export default withStyles(styles)(Card);
