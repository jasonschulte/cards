import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux'
import Grid from '@material-ui/core/Grid';
// import Cards from './CardList';
import Game from './Game'
import TopNav from './TopNav';


const styles = (defaultTheme) => ({
  main: {
    height: '100%',
    maxWidth: '100%',
    position: 'relative',
  },
});

class App extends React.Component {
  componentDidMount(){
    this.props.dispatch({type: 'SOCKET_CONNECT'})
  }
  render () {
    const { classes } = this.props
    return (
      <Grid container className={classes.main} direction='column'>
        <Grid item>
          <TopNav />
        </Grid>
        <Grid item>
          <Game />
        </Grid>
      </Grid>
    );
  }
}
export default connect()(withStyles(styles)(App));
