import seedrandom from 'seedrandom'

class Shuffle {
  constructor() {
    this.length = 40
  }

  get styles () {
    const styles = []
    for (let i=0; i<this.length; i++){
      const direction = i % 2 ? '' : '-';
      const minDistance = 2
      const maxDistance = 5
      const distance = minDistance + ( i * ( maxDistance / this.length ) )
      styles['@keyframes shuffle'+i] = {
        to: {
          right: direction+distance+'em',
          bottom: 0,
          zIndex: i,
        }
      }
    }
    return styles;
  }

  do(deck) {
    seedrandom('shuffle', { global: true });
    let styles = [];
    const cards = [...Array(deck.numCards)].map((u) => {
      if (styles.length === 0){
        styles = [...Array(shuffle.length)].map((u, i) => i)
      }
      const i = Math.floor( (Math.random() * styles.length + deck.shuffle) % styles.length )
      return styles.splice(i,1)[0];
    })
    return cards;
  }
}

const shuffle = new Shuffle()
export default shuffle;
