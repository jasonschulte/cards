import React from 'react';
import { connect } from 'react-redux'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const mapStateToProps = state => {
  return {
    cards: state.cards,
  }
}

const CardList = connect(mapStateToProps)((props) => {
  return (
    <List>
      {props.cards.map((card, index) => (
          <ListItem key={index}>
            <ListItemText primary={card.name} />
          </ListItem>
        )
      )}
    </List>
  );
});
export default CardList;
