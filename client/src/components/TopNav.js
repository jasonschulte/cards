import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import actions from '../actions'

const styles = (theme) => {
  return ({
    topNav: {
      width: '100%',
      backgroundColor: theme.palette.primary[900],
      flexGrow: 1,
    },
    button: {
      margin: theme.spacing.unit
    },
    select: {
      margin: theme.spacing.unit,
      minWidth: 120,
    },
  });
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(actions,dispatch)
}
const mapStateToProps = state => {
  return {
    selectedCard: state.selectedCard,
  }
}

const RemoveCardButton = connect(null,mapDispatchToProps)(withStyles(styles)((props) => {
  return(
    <Button variant="contained" className={props.classes.button} onClick={props.removeCard}>
      Remove Card
    </Button>
  );
}));

const PlayCardButton = connect(null,mapDispatchToProps)(withStyles(styles)((props) => {
  return(
    <Button variant="contained" className={props.classes.button} onClick={props.playCard}>
      Play Card
    </Button>
  );
}));

const ShuffleButton = connect(null,mapDispatchToProps)(withStyles(styles)((props) => {
  return(
    <Button variant="contained" className={props.classes.button} onClick={props.putShuffle}>
      Shuffle
    </Button>
  );
}));

const SelectedCard = connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)((props) => {
  return(
      <Select
        className={props.classes.select}
        value={props.selectedCard || '' }
        onChange={props.selectCard}
        inputProps={{
          name: 'selectedCard',
          id: 'selectedCard',
        }}
      >
        <MenuItem value="AS">Ace of Spades</MenuItem>
        <MenuItem value="2S">Two of Spaces</MenuItem>
        <MenuItem value="3S">Three of Spaces</MenuItem>
      </Select>
  );
}));

const TopNav = (props) => {
  const { classes } = props;
  return(
    <Grid container className={classes.topNav} justify='flex-end'>
      <Grid item>
      <InputLabel htmlFor="selectedCard">Card</InputLabel>
        <SelectedCard />
      </Grid>
      <Grid item>
        <PlayCardButton />
      </Grid>
      <Grid item>
        <RemoveCardButton />
      </Grid>
      <Grid item>
        <ShuffleButton />
      </Grid>
    </Grid>
  );
}

export default withStyles(styles, {withTheme: true})(TopNav);
