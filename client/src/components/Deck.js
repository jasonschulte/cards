import React from 'react';
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Card from './Card'
import seedrandom from 'seedrandom'
import shuffle from '../lib/shuffle'

// [
//   'AH','2H','3H','4H','5H','6H','7H','8H','9H','10H','JH','QH','KH',
//   'AS','2S','3S','4S','5S','6S','7S','8S','9S','10S','JS','QS','KS',
//   'AD','2D','3D','4D','5D','6D','7D','8D','9D','10D','JD','QD','KD',
//   'AC','2C','3C','4C','5C','6C','7C','8C','9C','10C','JC','QC','KC',
//   'SJ','LJ'
// ]

const styles = (defaultTheme) => ({
  deck: {
    top: 'calc(50% + 4.5rem)',
    left: 'calc(50% + 3rem)',
    position: 'absolute',
  },
});

const mapStateToProps = (state) => {
  return {
    deck: state.deck
  }
}

const Deck = connect(mapStateToProps)((props) => {
  const { classes, deck } = props
  seedrandom('shuffle', { global: true });
  const cards = shuffle.do(deck);
  return (
    <List className={classes.deck}>
      {cards.map((card, index) => (
        <Card
          key={index}
          index={index}
          density={4}
          shuffleAnimation={'shuffle'+card}
        />
      ))}
    </List>
  );
});

export default withStyles(styles)(Deck);
