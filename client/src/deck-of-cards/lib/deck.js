
import createElement from './createElement'

import animationFrames from './animationFrames'
import ease from './ease'
import shuffle from './modules/shuffle'

import observable from './observable'
import queue from './queue'
import prefix from './prefix'
import translate from './translate'

import Card from './card'

export default function Deck (jokers) {
  // init cards array
  var cards = new Array(jokers ? 54 : 52)

  var $el = createElement('div')
  var self = observable({mount, unmount, cards, $el})
  var $root

  var modules = Deck.modules
  var module

  // make queueable
  queue(self)

  // load modules
  for (module in modules) {
    addModule(modules[module])
  }

  // add class
  $el.classList.add('deck')

  var card

  // create cards
  for (var i = cards.length; i; i--) {
    card = cards[i - 1] = Card(i - 1)
    card.setSide('back')
    card.mount($el)
  }

  return self

  function mount (root) {
    // mount deck to root
    $root = root
    $root.appendChild($el)
  }

  function unmount () {
    // unmount deck from root
    $root.removeChild($el)
  }

  function addModule (module) {
    module.deck && module.deck(self)
  }
}
Deck.animationFrames = animationFrames
Deck.ease = ease
Deck.modules = {shuffle}
Deck.Card = Card
Deck.prefix = prefix
Deck.translate = translate
